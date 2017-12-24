import { h, Component } from "preact";
import * as THREE from "three";

namespace Birds {
  export interface Props {}
  export interface State {}
}

class Bird extends THREE.Geometry {
  private vertices: THREE.Vector3[];
  private faces: THREE.Face3[];
  constructor() {
    super();
    this.vertices = [
      [5, 0, 0],
      [-5, -2, 1],
      [-5, 0, 0],
      [5, -2, -1],
      [0, 2, -6],
      [0, 2, 6],
      [2, 0, 0],
      [-3, 0, 0]
    ].map(v => new THREE.Vector3(...v));

    this.faces = [[0, 2, 1], [4, 7, 6], [5, 6, 7]].map(
      f => new THREE.Face3(...f)
    );
    super.computeFaceNormals();
  }
}

class Boid {
  private vector = new THREE.Vector3();
  private _acceleration = new THREE.Vector3();
  private _neighborhoodRadius = 100;
  private _maxSpeed = 4;
  private _maxSteerForce = 0.1;
  private _avoidWalls = true;
  private _goal;
  constructor(
    private _position,
    private _velocity,
    private _width = 500,
    private _height = 500,
    private _depth = 200
  ) {}

  public get position(): THREE.Vector3 {
    return this._position;
  }

  public get velocity(): THREE.Vector3 {
    return this._velocity;
  }

  public move(): void {
    this._velocity.add(this._acceleration);

    const length = this._velocity.length();

    if (length > this._maxSpeed) {
      this._velocity.divideScalar(length / this._maxSpeed);
    }

    this._position.add(this._velocity);
    this._acceleration.set(0, 0, 0);
  }

  private flock(boids: Boid[]) {
    if (this._goal) {
      this._acceleration.add(this.reach(this._goal, 0.005));
    }

    this._acceleration.add(this.alignment(boids));
    this._acceleration.add(this.cohesion(boids));
    this._acceleration.add(this.separation(boids));
  }

  public checkBounds(): void {
    if (this._position.x > this._width) this._position.x = -this._width;
    if (this._position.x < -this._width) this._position.x = this._width;
    if (this._position.y > this._height) this._position.y = -this._height;
    if (this._position.y < -this._height) this._position.y = this._height;
    if (this._position.z > this._depth) this._position.z = -this._depth;
    if (this._position.z < -this._depth) this._position.z = this._depth;
  }

  public avoid(target: THREE.Vector3): THREE.Vector3 {
    const steer = new THREE.Vector3();
    steer.copy(this._position);
    steer.sub(target);
    steer.multiplyScalar(1 / this._position.distanceToSquared(target));
    return steer;
  }

  public repulse(target: THREE.Vector3): void {
    const distance = this._position.distanceTo(target);

    if (distance < 150) {
      const steer = new THREE.Vector3();

      steer.subVectors(this._position, target);
      steer.multiplyScalar(0.5 / distance);

      this._acceleration.add(steer);
    }
  }

  public reach(target: THREE.Vector3, amount: number): THREE.Vector3 {
    const steer = new THREE.Vector3();

    steer.subVectors(target, this._position);
    steer.multiplyScalar(amount);

    return steer;
  }

  private alignment(boids: Boid[]): THREE.Vector3 {
    let boid;
    const velSum = new THREE.Vector3();
    let count = 0;

    for (let i = 0, il = boids.length; i < il; i++) {
      // for (let boid in boids) {
      // console.log(boid);
      if (Math.random() > 0.6) continue;

      boid = boids[i];

      const distance = boid.position.distanceTo(this._position);

      if (distance > 0 && distance <= this._neighborhoodRadius) {
        velSum.add(boid.velocity);
        count++;
      }
    }

    if (count > 0) {
      velSum.divideScalar(count);

      const l = velSum.length();

      if (l > this._maxSteerForce) {
        velSum.divideScalar(l / this._maxSteerForce);
      }
    }

    return velSum;
  }

  private cohesion(boids: Boid[]): THREE.Vector3 {
    let boid,
      distance,
      posSum = new THREE.Vector3(),
      steer = new THREE.Vector3(),
      count = 0;

    for (let i = 0, il = boids.length; i < il; i++) {
      if (Math.random() > 0.6) continue;

      boid = boids[i];
      distance = boid.position.distanceTo(this._position);

      if (distance > 0 && distance <= this._neighborhoodRadius) {
        posSum.add(boid.position);
        count++;
      }
    }

    if (count > 0) {
      posSum.divideScalar(count);
    }

    steer.subVectors(posSum, boid.position);

    var l = steer.length();

    if (l > this._maxSteerForce) {
      steer.divideScalar(l / this._maxSteerForce);
    }

    return steer;
  }

  private separation(boids: Boid[]): THREE.Vector3 {
    let boid,
      distance,
      posSum = new THREE.Vector3(),
      repulse = new THREE.Vector3();

    for (var i = 0, il = boids.length; i < il; i++) {
      if (Math.random() > 0.6) continue;

      boid = boids[i];
      distance = boid.position.distanceTo(this._position);

      if (distance > 0 && distance <= this._neighborhoodRadius) {
        repulse.subVectors(this._position, boid.position);
        repulse.normalize();
        repulse.divideScalar(distance);
        posSum.add(repulse);
      }
    }

    return posSum;
  }

  public run(boids: Boid[]): void {
    if (this._avoidWalls) {
      this.vector.set(-this._width, this._position.y, this._position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);

      this.vector.set(this._width, this._position.y, this._position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);

      this.vector.set(this._position.x, -this._height, this._position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);

      this.vector.set(this._position.x, this._height, this._position.z);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);

      this.vector.set(this._position.x, this._position.y, -this._depth);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);

      this.vector.set(this._position.x, this._position.y, this._depth);
      this.vector = this.avoid(this.vector);
      this.vector.multiplyScalar(5);
      this._acceleration.add(this.vector);
    }

    if (Math.random() > 0.5) {
      this.flock(boids);
    }

    this.move();
  }
}

export class Birds extends Component<Birds.Props, Birds.State> {
  componentDidMount(): void {
    var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight,
      SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2,
      SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

    var camera, scene, renderer, birds, bird;

    var boid, boids;

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        75,
        SCREEN_WIDTH / SCREEN_HEIGHT,
        1,
        10000
      );
      camera.position.z = 450;

      scene = new THREE.Scene();

      birds = [];
      boids = [];

      for (var i = 0; i < 200; i++) {
        boid = boids[i] = new Boid(
          new THREE.Vector3(
            Math.random() * 400 - 200,
            Math.random() * 400 - 200,
            Math.random() * 400 - 200
          ),
          new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
          )
        );
        bird = birds[i] = new THREE.Mesh(
          new Bird(),
          new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
          })
        );
        bird.phase = Math.floor(Math.random() * 62.83);
        scene.add(bird);
      }

      renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("birds"),
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

      document.addEventListener("mousemove", onDocumentMouseMove, false);

      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
      var vector = new THREE.Vector3(
        event.clientX - SCREEN_WIDTH_HALF,
        -event.clientY + SCREEN_HEIGHT_HALF,
        0
      );

      for (var i = 0, il = boids.length; i < il; i++) {
        boid = boids[i];

        vector.z = boid.position.z;

        boid.repulse(vector);
      }
    }

    //

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      for (var i = 0, il = birds.length; i < il; i++) {
        boid = boids[i];
        boid.run(boids);

        bird = birds[i];
        bird.position.copy(boids[i].position);

        let color = bird.material.color;
        color.r = color.g = color.b = (500 - bird.position.z) / 1000;

        bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

        bird.phase =
          (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
        bird.geometry.vertices[5].y = bird.geometry.vertices[4].y =
          Math.sin(bird.phase) * 5;
      }

      renderer.render(scene, camera);
    }
  }

  render(): JSX.Element {
    return (
      <canvas
        style={{
          position: "absolute",
          zIndex: 1
        }}
        id="birds"
      />
    );
  }
}
