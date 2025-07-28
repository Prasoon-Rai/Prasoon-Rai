import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- Start of Three.js Components (Copied from your provided code) ---

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

// This is the main Three.js scene container
const ThreeScene = () => {
  return (
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
  );
};

// --- End of Three.js Components ---


export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 bg-black text-white noise-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2
              className="brutalist-heading text-5xl md:text-6xl text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ABOUT
              <br />
              <span className="text-neon">ME</span>
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                I'm <span className="text-white font-bold">Prasoon Rai</span>,
                a 17-year-old AI/DL programmer from <span className="text-neon font-bold">Noida, India </span>
                I started coding at 10 and quickly developed a passion for Artificial Intelligence and Deep Learning.
              </p>
              
              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                I'm proficient in <span className="text-neon font-bold">TensorFlow, PyTorch, and Keras </span>using these frameworks to build practical AI solutions.
                I love turning complex ideas into working applications.
              </p>

              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                My goal is to study abroad and become a <span className="text-white font-bold">Computer Science Engineer </span>
                I'm excited to innovate in the tech world and contribute to the future of AI.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['TENSORFLOW', 'PYTORCH', 'PYTHON', 'LLAMA', 'GIT', 'KERAS'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="border-2 border-electric text-electric px-4 py-2 font-jetbrains font-bold text-sm tracking-widest hover:bg-electric hover:text-black transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Visual element (Three.js Scene) */}
          <motion.div
            className="relative w-full h-96"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* The canvas container needs `absolute inset-0` to fill the parent `relative` div */}
            <div className="absolute inset-0 border-4 border-white transform rotate-3">
              <div className="w-full h-full bg-gradient-to-br from-electric/20 to-neon/20"></div>
            </div>

            <div className="absolute inset-0 border-4 border-neon transform -rotate-3 translate-x-4 translate-y-4">
              <div className="w-full h-full bg-gradient-to-tl from-neon/10 to-electric/10"></div>
            </div>
            
            {/* Integration of the Three.js scene */}
            <div className="absolute inset-0"> {/* This container holds the Canvas */}
              <ThreeScene />
            </div>

            {/* Decorative elements (still apply to the container) */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-neon"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 border-4 border-electric"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
