import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Octahedron, Float, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

const PrismaticObject = () => {
    const mesh = useRef()
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (mesh.current) {
            mesh.current.rotation.x = t * 0.2
            mesh.current.rotation.y = t * 0.25
        }
        if (group.current) {
            // Gentle floating handled by Float component, but we can add more complex drift
        }
    })

    return (
        <group ref={group}>
            {/* The Glass Diamond */}
            <Octahedron ref={mesh} args={[1.5, 0]}>
                <MeshTransmissionMaterial
                    backside
                    samples={16} // High quality
                    resolution={1024}
                    transmission={1}
                    roughness={0.05}
                    thickness={3.5}
                    ior={1.5}
                    chromaticAberration={1} // Maximal dispersion for rainbow effect
                    anisotropy={1}
                    distortion={1}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#eef"
                    background={new THREE.Color('#000000')}
                />
            </Octahedron>

            {/* Inner Geometry that gets distorted */}
            <mesh scale={[0.5, 0.5, 0.5]}>
                <boxGeometry />
                <meshBasicMaterial color="blue" wireframe />
            </mesh>
        </group>
    )
}

const GlassPrism = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
            >
                <color attach="background" args={['#050505']} />
                {/* High contrast environment for refraction */}
                <Environment preset="warehouse" />

                <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                    <PrismaticObject />
                </Float>

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} intensity={2} />
            </Canvas>
        </div>
    )
}

export default GlassPrism
