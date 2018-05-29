import THREE = require("three");
import { disposeScene } from "./helpers";

class Scene {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;

  init = () => {
    this.scene = new THREE.Scene();

    this.scene.add(this.diamond());
    this.scene.add(this.diamond(-100, -50, 0, 0.5, 1, 0.5));
    this.scene.add(this.diamond(100, 50, 0, 0.5, 0.5, 0.5));
    this.scene.add(this.diamond(50, -100, 60, 0.2, 0.8, 0.2));
    this.scene.add(this.diamond(-100, 100, 50, 0.1, 0.1, 0.1));
    this.scene.add(...this.lights());

    this.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
    this.camera.position.y = 0;
    this.camera.position.z = 350;
    this.camera.lookAt(-70, 0, 0);

    return { scene: this.scene, camera: this.camera };
  };

  diamond = (
    px = 0,
    py = 0,
    pz = 0,
    sx = 1,
    sy = 1,
    sz = 1
  ): THREE.Object3D => {
    const obj = new THREE.Object3D();

    const geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(0, 10000, 0),
      new THREE.Vector3(0, 0, 0)
    );

    obj.add(
      new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0x111111
        })
      ),
      new THREE.Mesh(
        new THREE.OctahedronGeometry(50, 0),
        new THREE.MeshPhongMaterial({
          shininess: 20,
          color: 0xffffff,
          specular: 0xffffff
        })
      )
      // new THREE.Mesh(
      //   new THREE.OctahedronGeometry(55, 0),
      //   new THREE.MeshBasicMaterial({
      //     wireframe: true,
      //     color: 0xffffff
      //   })
      // )
    );
    obj.position.set(px, py, pz);
    obj.scale.set(sx, sy * 1.5, sz);
    obj.rotateY(Math.PI / 4);
    obj.userData = {
      dr: (Math.random() - 0.5) * -0.5
    };
    return obj;
  };

  lights = (): THREE.Light[] => {
    const light1 = new THREE.PointLight(0xaaffff, 1, 300);
    light1.position.set(100, 100, 250);

    return [light1];
  };

  disposeObject = (obj: any): void => {
    if (obj.geometry) {
      obj.geometry.dispose();
      obj.geometry = undefined;
    }

    if (obj.material) {
      if (obj.material.map) {
        obj.material.map.dispose();
        obj.material.map = undefined;
      }

      obj.material.dispose();
      obj.material = undefined;
    }
  };

  dispose = () => {
    disposeScene(this.scene);
  };

  draw = (clock: THREE.Clock) => {
    const dt = clock.getDelta();
    // this.scene.rotateY(dt * 0.2);
    for (const obj of this.scene.children) {
      obj.rotateY(dt * 0.25 * obj.userData.dr);
    }
    return { scene: this.scene, camera: this.camera };
  };
}

export const BoxScene = new Scene();
