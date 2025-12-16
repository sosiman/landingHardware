import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Cylinder, MeshDistortMaterial, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

const LockMechanism = () => {
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (group.current) {
            // Rotate different rings at different speeds
            group.current.children[0].rotation.z = t * 0.2
            group.current.children[1].rotation.z = -t * 0.3
            group.current.children[2].rotation.z = t * 0.1
            group.current.children[3].rotation.z = -t * 0.4
        }
    })

    return (
        <group ref={group} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            {/* Ring 1 - Outer glold */}
            <mesh>
                <torusGeometry args={[2, 0.2, 16, 100]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={1}
                    roughness={0.1}
                    emissive="#aa4400"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Ring 2 - Glass */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.6, 0.3, 16, 100]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={1}
                    thickness={1}
                    roughness={0}
                    ior={1.5}
                />
            </mesh>

            {/* Ring 3 - Detail */}
            <mesh>
                <torusGeometry args={[1.2, 0.15, 16, 64]} />
                <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.2} />
            </mesh>

            {/* Core */}
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 4, 32]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color="#111" metalness={0.8} />
                <mesh scale={[1.01, 0.8, 1.01]}>
                    <cylinderGeometry args={[0.8, 0.8, 1, 8]} />
                    <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.1} />
                </mesh>
            </mesh>
        </group>
    )
}

const SecureVault = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
            >
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <LockMechanism />
                </Float>
            </Canvas>
        </div>
    )
}

export default SecureVault
