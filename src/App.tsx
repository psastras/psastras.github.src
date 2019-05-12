import * as React from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import { Scene } from "./components/Scene";
import { Overlay } from "./components/Overlay";

export const App = () => (
  <div className="main">
    <Canvas
      style={{ background: "#0D0D0D" }}
      camera={{ position: new Vector3(0, 0, 10), fov: 75 }}
      pixelRatio={window.devicePixelRatio}
    >
      <Scene />
    </Canvas>
    <Overlay />
  </div>
);
