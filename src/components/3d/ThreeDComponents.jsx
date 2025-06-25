// src/components/3d/ThreeDComponents.jsx
import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, MeshDistortMaterial, Sphere, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Floating Icon Component
export const FloatingIcon = ({ icon: IconComponent, position = [0, 0, 0], color = "#3b82f6" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  );
};

// 3D Skills Sphere
export const SkillsSphere = ({ skills = [] }) => {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const skillPositions = useMemo(() => {
    return skills.map((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 3;
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ];
    });
  }, [skills.length]);

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <Float key={skill.name} speed={1 + index * 0.1}>
          <mesh position={skillPositions[index]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={`hsl(${(index * 360) / skills.length}, 70%, 60%)`}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
          <Text
            position={[skillPositions[index][0], skillPositions[index][1] - 0.3, skillPositions[index][2]]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// 3D Project Card
export const ProjectCard3D = ({ project, isActive = false }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = isActive 
        ? Math.sin(state.clock.elapsedTime) * 0.2
        : Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef} scale={isActive ? 1.1 : 1}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial 
          color={isActive ? "#3b82f6" : "#64748b"}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project?.title || "Project"}
      </Text>
    </Float>
  );
};

// Enhanced 3D Scene Component
export const ThreeDScene = ({ children, camera = { position: [0, 0, 5] } }) => {
  return (
    <Canvas
      camera={camera}
      style={{ background: 'transparent' }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance" 
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {children}
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
};