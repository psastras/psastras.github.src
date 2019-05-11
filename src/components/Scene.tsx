import * as THREE from "three";
import * as meshline from "three.meshline";
import * as React from "react";
import { useState, useRef } from "react";
import { apply, useRender } from "react-three-fiber";

apply(meshline);

const numLines = 100;
const lines = new Array(numLines).fill(0);
const colors = ["#F23847", "#BF3945", "#F2BBBF", "#400711", "#F28888"];

const Fatline = () => {
  const material = useRef<any>();
  const [color] = useState(
    () => colors[Math.floor(colors.length * Math.random())]
  );
  const [ratio] = useState(() => 0.5 + 0.5 * Math.random());
  const [width] = useState(() => 2.5 * Math.max(0.001, 0.05 * Math.random()));
  // Calculate wiggly curve
  const [curve] = useState(() => {
    let pos = new THREE.Vector3(
      30 - 60 * Math.random(),
      -5,
      10 - 20 * Math.random()
    );
    return new Array(30)
      .fill(0)
      .map(() =>
        pos
          .add(
            new THREE.Vector3(
              2 - Math.random() * 4,
              4 - Math.random() * 2,
              5 - Math.random() * 10
            )
          )
          .clone()
      );
  });
  // Hook into the render loop and decrease the materials dash-offset
  useRender(() => (material.current.uniforms.dashOffset.value -= 0.0001));
  return (
    <mesh>
      {/** MeshLine and CMRCurve are a OOP factories, not scene objects, hence all the imperative code in here :-( */}
      <meshLine
        onUpdate={(self: { parent: { geometry: any }; geometry: any }) =>
          (self.parent.geometry = self.geometry)
        }
      >
        <geometry
          onUpdate={(self: { parent: { setGeometry: (arg0: any) => void } }) =>
            self.parent.setGeometry(self)
          }
        >
          <catmullRomCurve3
            args={[curve]}
            onUpdate={(self: {
              parent: { vertices: any };
              getPoints: (arg0: number) => void;
            }) => (self.parent.vertices = self.getPoints(500))}
          />
        </geometry>
      </meshLine>
      {/** MeshLineMaterial on the other hand is a regular material, so we can just attach it */}
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={ratio}
      />
    </mesh>
  );
};

export const Scene = () => {
  let group = useRef<any>();
  let theta = 0;
  // Hook into the render loop and rotate the scene a bit
  useRender(() =>
    group.current.rotation.set(
      0,
      5 * Math.sin(THREE.Math.degToRad((theta += 0.01))),
      0
    )
  );
  return (
    <group ref={group}>
      {lines.map((_, index) => (
        <Fatline key={index} />
      ))}
    </group>
  );
};
