
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetworkOrb = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#0080ff" wireframe opacity={0.7} transparent />
      </mesh>
    </Float>
  );
};

const PredictionPrism = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.z += 0.005;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.8) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#00ff88" wireframe />
    </mesh>
  );
};

const BiasBloom = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.4}>
      <group ref={groupRef} position={position}>
        {/* Central core */}
        <mesh>
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#ffffff" wireframe />
        </mesh>
        {/* Orbiting elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 1.2,
              Math.sin((i / 6) * Math.PI * 2) * 1.2,
              0
            ]}
          >
            <tetrahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#00ff88" wireframe />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const AlgorithmTotem = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.006;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 8]} />
        <meshStandardMaterial color="#0080ff" wireframe />
      </mesh>
      {/* Middle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 0.8, 6]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      {/* Top */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.4, 0.6, 4]} />
        <meshStandardMaterial color="#00ff88" wireframe />
      </mesh>
    </group>
  );
};

const DataFlowLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={linesRef}>
      {/* Grid lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`vertical-${i}`}
          position={[i * 2 - 20, 0, -5]}
          rotation={[0, 0, 0]}
        >
          <cylinderGeometry args={[0.01, 0.01, 40]} />
          <meshStandardMaterial color="#ffffff" opacity={0.1} transparent />
        </mesh>
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`horizontal-${i}`}
          position={[0, i * 2 - 20, -5]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.01, 0.01, 40]} />
          <meshStandardMaterial color="#ffffff" opacity={0.1} transparent />
        </mesh>
      ))}
    </group>
  );
};

const AIShapes = () => {
  return (
    <>
      <NeuralNetworkOrb position={[-3, 1, -2]} />
      <PredictionPrism position={[3, -1, -1]} />
      <BiasBloom position={[0, 2, -3]} />
      <AlgorithmTotem position={[-1, -2, 0]} />
      <DataFlowLines />
    </>
  );
};

export const ThreeScene = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <AIShapes />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
