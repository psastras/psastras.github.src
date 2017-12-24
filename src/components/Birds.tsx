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
  private _maxSteerForce = 0.05;
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

    this._acceleration.add(this.updateAcceleration(boids));
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

  private updateAcceleration(boids: Boid[]): THREE.Vector3 {
    const velSum = new THREE.Vector3();
    const posSum = new THREE.Vector3();
    const repSum = new THREE.Vector3();
    const repulse = new THREE.Vector3();
    const steer = new THREE.Vector3();
    let alignmentCount = 0;
    let cohesionCount = 0;
    let seperationCount = 0;

    for (const boid of boids) {
      const distance = boid.position.distanceTo(this._position);
      if (distance > 0 && distance <= this._neighborhoodRadius) {
        // alignment
        if (Math.random() < 0.1) {
          velSum.add(boid.velocity);
          alignmentCount++;
        }
        // cohesion
        if (Math.random() < 0.1) {
          posSum.add(boid.position);
          cohesionCount++;
        }
        // separation
        if (Math.random() < 0.8) {
          repulse.subVectors(this._position, boid.position);
          repulse.normalize();
          repulse.divideScalar(distance);
          repSum.add(repulse);
          seperationCount++;
        }
      }
    }

    if (alignmentCount > 0) {
      velSum.divideScalar(alignmentCount);
      const l = velSum.length();
      if (l > this._maxSteerForce) {
        velSum.divideScalar(l / this._maxSteerForce);
      }
    }

    if (cohesionCount > 0) {
      posSum.divideScalar(cohesionCount);
    }
    steer.subVectors(posSum, this._position);
    const l = steer.length();
    if (l > this._maxSteerForce) {
      steer.divideScalar(l / this._maxSteerForce);
    }

    return velSum.add(repSum).add(steer);
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

class World {
  private camera: THREE.PerspectiveCamera;
  private boids = new Array<Boid>();
  private birds = new Array<THREE.Mesh>();
  private scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer;
  private animation: number;

  constructor(
    canvas: HTMLCanvasElement,
    private screenWidth = window.innerWidth,
    private screenHeight = window.innerHeight
  ) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true
    });
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.screenWidth / this.screenHeight,
      1,
      10000
    );
    this.camera.position.z = 450;

    for (let i = 0; i < 300; i++) {
      this.boids.push(
        new Boid(
          new THREE.Vector3(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 400 - 200
          ),
          new THREE.Vector3(
            Math.random() * 1 - 0.5,
            Math.random() * 1 - 0.5,
            Math.random() * 1 - 0.5
          )
        )
      );
      const bird = new THREE.Mesh(
        new Bird(),
        new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff,
          side: THREE.DoubleSide
        })
      );
      bird.phase = Math.floor(Math.random() * 62.83);
      this.birds.push(bird);
      this.scene.add(bird);
    }

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.screenWidth, this.screenHeight);

    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    window.addEventListener("resize", this.onWindowResize, false);
  }

  private onWindowResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private onDocumentMouseMove = (event): void => {
    const vector = new THREE.Vector3(
      event.clientX - this.screenWidth / 2,
      -event.clientY + this.screenHeight / 2,
      0
    );

    for (const boid of this.boids) {
      vector.z = boid.position.z;
      boid.repulse(vector);
    }
  };

  public animate = (): void => {
    this.animation = requestAnimationFrame(this.animate);

    this.render();
  };

  private render = (): void => {
    for (let i = 0, il = this.birds.length; i < il; i++) {
      const boid = this.boids[i];
      boid.run(this.boids);

      const bird = this.birds[i];
      bird.position.copy(this.boids[i].position);

      let color = bird.material.color;
      color.r = color.g = color.b = Math.max(
        1 - (200 + bird.position.z) / 200,
        Math.max(
          1 - (500 - Math.abs(bird.position.y)) / 500,
          1 - (500 - Math.abs(bird.position.x)) / 500
        )
      );

      bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
      bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

      bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
      bird.geometry.vertices[5].y = bird.geometry.vertices[4].y =
        Math.sin(bird.phase) * 5;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    cancelAnimationFrame(this.animation);
    document.removeEventListener("mousemove", this.onDocumentMouseMove, false);
    window.removeEventListener("resize", this.onWindowResize, false);
  }
}

export class Birds extends Component<Birds.Props, Birds.State> {
  private canvas: HTMLCanvasElement;
  private world: World;
  componentDidMount(): void {
    this.world = new World(this.canvas);
    this.world.animate();
  }

  componentWillUnmount(): void {
    this.world.destroy();
  }

  render(): JSX.Element {
    return (
      <canvas
        style={{
          position: "absolute",
          zIndex: 1
        }}
        ref={e => (this.canvas = e as HTMLCanvasElement)}
      />
    );
  }
}
