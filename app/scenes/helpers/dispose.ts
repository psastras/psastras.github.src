const disposeObject = (obj: any): void => {
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

export const disposeScene = (scene: THREE.Scene) => {
  for (const child of scene.children) {
    disposeObject(child);
  }
};
