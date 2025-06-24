// src/components/3d/ThreeDComponents.jsx
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
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
        ? Math.sin(state.clock.elapsedTime) * 0.1 
        : 0;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial 
          color={isActive ? "#3b82f6" : "#64748b"}
          roughness={0.2}
          metalness={0.8}
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
        {project.title}
      </Text>
    </Float>
  );
};

// Animated Background Geometry
export const AnimatedBackground = () => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.1}
        />
      </Sphere>
    </mesh>
  );
};

// 3D Scene Container
export const Scene3D = ({ children, controls = true }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ height: '100%', width: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        {children}
        {controls && <OrbitControls enableZoom={false} enablePan={false} />}
      </Suspense>
    </Canvas>
  );
};

// Advanced Motion Components
export const ParallaxContainer = ({ children, speed = 0.5 }) => {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        transform: `translateY(${offsetY * speed}px)`
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Effect
export const MagneticButton = ({ children, className = "", ...props }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Particle System Component
export const ParticleSystem = ({ count = 50, colors = ["#3b82f6", "#10b981", "#f59e0b"] }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, [count, colors]);

  const [particlePositions, setParticlePositions] = useState(particles);

  useEffect(() => {
    const animateParticles = () => {
      setParticlePositions(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particlePositions.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Text Animation Components
export const TypewriterText = ({ text, delay = 100, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
};

export const AnimatedCounter = ({ end, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

// Scroll-triggered animations
export const ScrollReveal = ({ children, direction = "up", delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      scale: direction === 'scale' ? 0.8 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Interactive Hover Card
export const HoverCard3D = ({ children, intensity = 15, className = "" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = ((e.clientY - centerY) / rect.height) * intensity;
    const rotateY = ((e.clientX - centerX) / rect.width) * intensity;
    
    setRotateX(-rotateX);
    setRotateY(rotateY);
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.05 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        animate={{
          z: isHovering ? 50 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Morphing Shape Component
export const MorphingShape = ({ shapes, duration = 3, className = "" }) => {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShapeIndex((prev) => (prev + 1) % shapes.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [shapes.length, duration]);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        borderRadius: shapes[currentShapeIndex].borderRadius,
        backgroundColor: shapes[currentShapeIndex].color,
      }}
      transition={{
        duration: duration * 0.8,
        ease: "easeInOut"
      }}
      style={{
        width: shapes[currentShapeIndex].width,
        height: shapes[currentShapeIndex].height,
      }}
    />
  );
};

// Glitch Effect Component
export const GlitchText = ({ text, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <span className={`${isGlitching ? 'animate-pulse' : ''}`}>
        {text}
      </span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-red-500 opacity-80"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translateX(-2px)'
            }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 text-blue-500 opacity-80"
            style={{ 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translateX(2px)'
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

// Loading Animation Component
export const LoadingAnimation = ({ type = "spinner", size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    primary: "border-primary-600",
    accent: "border-accent-600",
    white: "border-white",
    gray: "border-gray-600"
  };

  if (type === "spinner") {
    return (
      <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`} />
    );
  }

  if (type === "dots") {
    return (
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[0]} bg-current rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-current rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }

  return null;
};