import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Componente del Robot con animación
function Robot({ modelPath }) {
  const robotRef = useRef()
  const { scene } = useGLTF(modelPath)
  
  // Animación de rotación y flotación
  useFrame((state) => {
    if (robotRef.current) {
      // Rotación suave en Y
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      
      // Flotación suave
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 - 0.5
      
      // Inclinación sutil
      robotRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  useEffect(() => {
    if (scene) {
      // Configurar materiales con efecto metálico/brillante
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          // Mejorar materiales para look más premium
          if (child.material) {
            child.material.metalness = 0.8
            child.material.roughness = 0.2
            child.material.envMapIntensity = 1.5
          }
        }
      })
    }
  }, [scene])

  return (
    <primitive 
      ref={robotRef} 
      object={scene} 
      scale={0.8}
      position={[0, -0.5, 0]}
    />
  )
}

// Componente de carga
function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-purple-500/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Componente principal del Canvas 3D
const RobotModel = ({ className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`} style={{ willChange: 'transform' }}>
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: false
        }}
        style={{ 
          background: 'transparent',
          pointerEvents: 'auto'
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        {/* Cámara con FOV más amplio para ver todo el modelo */}
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={55} />
        
        {/* Luces */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[10, 5, -5]} intensity={0.5} color="#3b82f6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#ec4899"
        />

        {/* Modelo 3D con Suspense para carga */}
        <Suspense fallback={null}>
          <Robot modelPath="/models/nexbot_robot_character_concept.gltf" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      
      {/* Fallback de carga fuera del Canvas */}
      <Suspense fallback={<LoadingSpinner />}>
        <div />
      </Suspense>
    </div>
  )
}

export default RobotModel
