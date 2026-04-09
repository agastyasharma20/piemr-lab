import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DiskSimulation3DProps {
  currentTrack: number;
  diskSize: number;
}

const Platter = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <cylinderGeometry args={[5, 5, 0.2, 128]} />
      {/* High metallic silver look to simulate a real hard drive disk platter */}
      <meshPhysicalMaterial 
        color="#e2e8f0" 
        metalness={0.9} 
        roughness={0.1} 
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
      
      {/* Visual rings representing concentric tracks popping out clearly */}
      {[0.2, 0.4, 0.6, 0.8].map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.11, 0]}>
          <ringGeometry args={[radius * 5 - 0.03, radius * 5, 128]} />
          <meshBasicMaterial color="#94a3b8" side={THREE.DoubleSide} opacity={0.6} transparent />
        </mesh>
      ))}
      {/* Center spindle */}
      <mesh position={[0, 0.15, 0]}>
         <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
         <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.3} />
      </mesh>
    </mesh>
  );
};

const ReadWriteHead = ({ targetTrack, diskSize }: { targetTrack: number; diskSize: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  // Map track number (0 to diskSize) to a radius length. 
  const INNER_RADIUS = 0.8;
  const OUTER_RADIUS = 4.8;
  const radius = INNER_RADIUS + (targetTrack / (diskSize > 0 ? diskSize : 1)) * (OUTER_RADIUS - INNER_RADIUS);

  // Smoothly animate to target position
  useFrame((state, delta) => {
    if (headRef.current) {
      const targetX = radius;
      headRef.current.position.x = THREE.MathUtils.lerp(headRef.current.position.x, targetX, delta * 5);
      
      // Update arm scale/position based on head position
      if (groupRef.current) {
        const arm = groupRef.current.getObjectByName('actuatorArm');
        if (arm) {
           const armLength = headRef.current.position.x - 2.5;
           arm.scale.x = Math.max(0.1, armLength / 6);
           arm.position.x = 2.5 + (armLength / 2);
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Actuator base */}
      <mesh position={[2.5, 0.2, 0]}>
         <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
         <meshStandardMaterial color="#3b82f6" metalness={0.8} />
      </mesh>

      {/* Arm connecting from pivot to the head */}
      <mesh name="actuatorArm" position={[2.5, 0.5, 0]}>
        <boxGeometry args={[6, 0.15, 0.3]} />
        <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* The actual reading head */}
      <mesh ref={headRef} position={[radius, 0.2, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.5]} />
        <meshStandardMaterial color="#ef4444" metalness={0.3} roughness={0.2} emissive="#ef4444" emissiveIntensity={0.8} />
        <PointLight color="#ef4444" intensity={3} distance={4} />
      </mesh>
    </group>
  );
};

const PointLight = ({ ...props }) => {
  return <pointLight {...props} />;
}

const DiskSimulation3D: React.FC<DiskSimulation3DProps> = ({ currentTrack, diskSize }) => {
  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-tertiary)', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Transparent canvas to match panel styling */}
      <Canvas camera={{ position: [0, 6, 6], fov: 45 }} shadows gl={{ alpha: true }}>
        
        {/* Superior Ambient Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} castShadow />
        <spotLight position={[-10, 10, -10]} intensity={1.5} angle={0.5} penumbra={1} />
        
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={12} 
          maxPolarAngle={Math.PI / 2 - 0.1} 
        />
        
        <group position={[0, -0.5, 0]}>
          <Platter />
          <ReadWriteHead targetTrack={currentTrack} diskSize={diskSize} />
        </group>
        
        <Text
           position={[0, 4, -4]}
           fontSize={0.6}
           color="#2563eb"
           anchorX="center"
           anchorY="middle"
           outlineWidth={0.02}
           outlineColor="#ffffff"
        >
          SEEKING: TRACK {Math.round(currentTrack)}
        </Text>
      </Canvas>
    </div>
  );
};

export default DiskSimulation3D;
