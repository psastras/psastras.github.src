import * as React from "react";
import { useRef } from "react";
import { useRender, useResource } from "react-three-fiber";

function Particle({ geometry, material }: { geometry: any; material: any }) {
  let ref = useRef<any>();
  let t = Math.random() * 100;
  let speed = 0.01 + Math.random() / 200;
  let factor = 20 + Math.random() * 100;
  let xFactor = -50 + Math.random() * 100;
  let yFactor = -50 + Math.random() * 100;
  let zFactor = -30 + Math.random() * 60;
  useRender(() => {
    t += speed;
    const s = Math.cos(t);
    ref.current.scale.set(s, s, s);
    ref.current.rotation.set(s * 5, s * 5, s * 5);
    ref.current.position.set(
      xFactor + Math.cos((t / 30) * factor) + (Math.sin(t * 1) * factor) / 10,
      yFactor + Math.sin((t / 20) * factor) + (Math.cos(t * 2) * factor) / 10,
      zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 20
    );
  });
  return <mesh ref={ref} material={material} geometry={geometry} />;
}

export function Swarm({ mouse }: { mouse: any }) {
  const light = useRef<any>();
  const [geometryRef, geometry] = useResource() as any;
  const [materialRef, material] = useResource() as any;
  useRender(() =>
    light.current.position.set(mouse.current[0] / 20, -mouse.current[1] / 20, 0)
  );
  return (
    <>
      <pointLight ref={light} distance={50} intensity={1.5} color="white" />
      <spotLight intensity={0.5} position={[10, 10, 40]} penumbra={1} />
      <mesh>
        <planeGeometry attach="geometry" args={[10000, 10000]} />
        <meshPhongMaterial
          attach="material"
          color="#575757"
          depthTest={false}
        />
      </mesh>
      <dodecahedronBufferGeometry ref={geometryRef} args={[0.5, 0]} />
      {/* <tetrahedronBufferGeometry ref={geometryRef} args={[0.5, 0]} />
      <meshPhysicalMaterial ref={materialRef} /> */}
      <meshPhongMaterial ref={materialRef} attach="material" wireframe />
      {geometry &&
        new Array(2000)
          .fill(0)
          .map((_, index) => (
            <Particle key={index} material={material} geometry={geometry} />
          ))}
    </>
  );
}
