import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Environment,
  Center,
} from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { Grid } from "@mui/material";

export const Section = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Grid sx={{ height: "100vh", backgroundColor: "#a4a4a4" }}>
    <Canvas
      shadows
      camera={{ position, fov }}
      gl={{ preserveDrawingBuffer: true }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
      style={{ height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  </Grid>
);

function Shirt() {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
  const texture = useTexture(snap.decal);

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        material-color={snap.color}
      >
        <Decal
          position={[
            snap.decalPosition.x,
            snap.decalPosition.y,
            snap.decalPosition.z,
          ]}
          rotation={[0, 0, 0]}
          scale={snap.decalScale}
          map={texture}
        />
      </mesh>
    </group>
  );
}

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(shadows.current.getMesh().material.color, "#000", 0.25, delta)
  );

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);
  const [isRotating, setIsRotating] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // Handle left mouse button press to enable rotation
  const handlePointerDown = (event) => {
    if (event.button === 0) {
      setIsRotating(true);
      lastMousePosition.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handlePointerUp = () => {
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    if (isRotating) {
      const deltaX = event.clientX - lastMousePosition.current.x;
      const deltaY = event.clientY - lastMousePosition.current.y;

      group.current.rotation.y -= deltaX * 0.01; 
      group.current.rotation.x -= deltaY * 0.01;

      lastMousePosition.current = { x: event.clientX, y: event.clientY };
    }
  };

  // Handle zooming with scroll wheel
  const handleWheel = (event) => {
    const zoomFactor = 0.1;
    state.camera.position.z += event.deltaY * zoomFactor;
  };

  return (
    <group
      ref={group}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {children}
    </group>
  );
}
