import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance, Environment } from '@react-three/drei'
import * as THREE from 'three'

const BLOCK_COUNT = 400

const ServerBlock = ({ random }) => {
    const ref = useRef()
    const { x, z, scale, speed, offset } = random

    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()
        // Breathing motion (up and down)
        const y = Math.sin(t * speed + offset) * 0.5
        ref.current.position.set(x, y, z)

        // Color Shift based on height
        const color = new THREE.Color()
        const intensity = (y + 0.5) // 0 to 1
        // Blue/Cyan Palette
        color.setHSL(0.6, 0.8, 0.2 + intensity * 0.5)
        ref.current.color.copy(color)
    })

    return <Instance ref={ref} scale={[scale, Math.random() * 2 + 1, scale]} />
}

const CityGrid = () => {
    const data = useMemo(() => {
        return new Array(BLOCK_COUNT).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 20,
            scale: 0.5 + Math.random() * 0.5,
            speed: 0.5 + Math.random(),
            offset: Math.random() * Math.PI
        }))
    }, [])

    return (
        <group rotation={[0.5, 0, 0]}>
            <Instances range={BLOCK_COUNT}>
                <boxGeometry args={[0.5, 1, 0.5]} />
                <meshStandardMaterial
                    color="#0088ff"
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#001133"
                />

                {data.map((d, i) => (
                    <ServerBlock key={i} random={d} />
                ))}
            </Instances>
        </group>
    )
}

const CloudArchitecture = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 5, 10], fov: 50 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 10]} intensity={2} color="#00ffff" />
                <fog attach="fog" args={['#000000', 5, 25]} />

                <CityGrid />

                {/* Moving Clouds/Fog environment */}
                {/* Could add simpler floating particles */}
            </Canvas>
        </div>
    )
}

export default CloudArchitecture
