
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedCube = ({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const AnimatedSphere = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
};

const GeometricShapes = () => {
  return (
    <>
      <AnimatedCube position={[-3, 2, -2]} color="#0080ff" size={0.8} />
      <AnimatedCube position={[3, -1, -1]} color="#00ff88" size={1.2} />
      <AnimatedCube position={[0, 3, -3]} color="#ffffff" size={0.6} />
      
      <AnimatedSphere position={[-2, -2, 0]} color="#0080ff" />
      <AnimatedSphere position={[2, 1, -1]} color="#00ff88" />
      
      <mesh position={[0, 0, -4]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <GeometricShapes />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
