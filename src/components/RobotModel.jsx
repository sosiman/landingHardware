import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Componente del Robot con animación
function Robot({ modelPath, onLoaded }) {
  const robotRef = useRef()
  const { scene } = useGLTF(modelPath)

  // Señalar que el modelo cargó
  useEffect(() => {
    if (scene) {
      onLoaded?.()
    }
  }, [scene, onLoaded])

  // Animación de rotación y flotación
  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 - 0.5
      robotRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
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

// Precargar modelo para que esté listo
try {
  useGLTF.preload('/models/nexbot_robot_character_concept.gltf')
} catch (e) {
  // Preload silencioso
}

// Componente de carga
function LoadingSpinner() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid rgba(139, 92, 246, 0.3)',
          borderTop: '4px solid #8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// Error boundary para capturar errores de Three.js
class Canvas3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.warn('RobotModel 3D error:', error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

// Detectar si WebGL está disponible
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// Componente principal del Canvas 3D
const RobotModel = ({ className = "" }) => {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)

  useEffect(() => {
    // Verificar WebGL
    if (!isWebGLAvailable()) {
      setHasWebGL(false)
      return
    }
    // Pequeño delay para dejar que el DOM se estabilice antes de montar el Canvas
    const timer = setTimeout(() => setShowCanvas(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleModelLoaded = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Si no hay WebGL, no renderizar nada (evita cuadro blanco)
  if (!hasWebGL) return null

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        willChange: 'transform',
        position: 'relative'
      }}
    >
      {/* Spinner mientras carga */}
      {!isLoaded && <LoadingSpinner />}

      {/* Canvas 3D */}
      {showCanvas && (
        <Canvas3DErrorBoundary fallback={null}>
          <div style={{
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in'
          }}>
            <Canvas
              frameloop="always"
              shadows
              dpr={[1, 1.5]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: false
              }}
              style={{
                background: 'transparent'
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0)
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.toneMappingExposure = 1.2
              }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={55} />

              {/* Luces */}
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
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

              {/* Modelo 3D */}
              <Suspense fallback={null}>
                <Robot
                  modelPath="/models/nexbot_robot_character_concept.gltf"
                  onLoaded={handleModelLoaded}
                />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
        </Canvas3DErrorBoundary>
      )}
    </div>
  )
}

export default RobotModel
