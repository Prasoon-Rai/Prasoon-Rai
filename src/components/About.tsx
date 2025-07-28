import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Helper to get viewport dimensions ---
// This will help us define the boundaries for our 3D shape
function useViewport() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}


// --- New 3D Floating Shape Component ---
const FloatingShape = () => {
  const meshRef = useRef();
  const [sides, setSides] = useState(3); // Start with a triangle

  // Refs to hold position and velocity to avoid re-renders on each frame
  const position = useRef([ (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 0]);
  const velocity = useRef([ (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, 0]);
  
  // Memoize the geometry so it only recalculates when 'sides' changes
  const geometry = useMemo(() => {
    // We use CircleGeometry to create n-sided polygons easily
    // The second argument is the number of vertices (sides)
    return new THREE.CircleGeometry(1.5, sides);
  }, [sides]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Get camera viewport dimensions to define boundaries
    const { viewport } = state;
    const bounds = {
      x: viewport.width / 2,
      y: viewport.height / 2,
    };

    // Update position based on velocity
    position.current[0] += velocity.current[0];
    position.current[1] += velocity.current[1];

    // Boundary collision detection
    let hasCollided = false;
    if (Math.abs(position.current[0]) > bounds.x - 1.5) {
      velocity.current[0] *= -1; // Reverse x-velocity
      hasCollided = true;
    }
    if (Math.abs(position.current[1]) > bounds.y - 1.5) {
      velocity.current[1] *= -1; // Reverse y-velocity
      hasCollided = true;
    }

    // If a collision occurred, increase the number of sides
    if (hasCollided) {
        // Cycle from triangle (3) to decagon (10) and back to triangle
        setSides(s => (s >= 10 ? 3 : s + 1));
    }
    
    // Apply the new position to the mesh
    meshRef.current.position.set(position.current[0], position.current[1], position.current[2]);
    
    // Add a slow rotation for more visual interest
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial 
        color="#00ffff" 
        wireframe 
        emissive="#00ffff" // Makes the color glow
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};


// --- The 3D Scene Container ---
const ThreeScene = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lighting to make the wireframe material visible */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <FloatingShape />

      </Canvas>
    </div>
  );
};


// --- The Main About Component ---
const App = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-20 min-h-screen bg-black text-white overflow-hidden">
      
      {/* 3D background is placed here, behind the content */}
      <ThreeScene />

      {/* Content container, positioned on top of the 3D scene */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-2xl text-center" // Centered text for better layout
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ABOUT <span className="text-[#00ffff]">ME</span>
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                I'm <span className="text-white font-bold">Prasoon Rai</span>,
                a 17-year-old AI/DL programmer from <span className="text-[#00ffff] font-bold">Noida, India</span>.
                I started coding at 10 and quickly developed a passion for Artificial Intelligence and Deep Learning.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                I'm proficient in <span className="text-[#00ffff] font-bold">TensorFlow, PyTorch, and Keras</span>, using these frameworks to build practical AI solutions.
                I love turning complex ideas into working applications.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                My goal is to study abroad and become a <span className="text-white font-bold">Computer Science Engineer</span>.
                I'm excited to innovate in the tech world and contribute to the future of AI.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center" // Centered skills
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['TENSORFLOW', 'PYTORCH', 'PYTHON', 'LLAMA', 'GIT', 'KERAS'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="border-2 border-[#00ffff] text-[#00ffff] px-4 py-2 font-mono font-bold text-sm tracking-widest hover:bg-[#00ffff] hover:text-black transition-all duration-300 cursor-default rounded-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px #00ffff' }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
};

export default App;
