import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

const COUNT = 1200 // High density for cinematic look

const StreamParticle = ({ random }) => {
    const ref = useRef()
    const { speed, offset, radiusRatio, zStart } = random

    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()

        // Cinematic vortex physics
        // Position along the path (0 to 1)
        const cycle = 15 // seconds
        let progress = (t * speed * 0.5 + offset) % 1

        // Spiral path
        // Start wide and far, end tight and close
        const currentRadius = 8 * (1 - progress) * radiusRatio + 0.3
        const angle = progress * 20 + offset * 10

        const x = Math.cos(angle) * currentRadius
        const y = Math.sin(angle) * currentRadius
        const z = 5 - progress * 10 // Move from camera (+5) into screen (-5)

        ref.current.position.set(x, y, z)

        // Rotate to face travel direction
        ref.current.rotation.z = angle + Math.PI / 2
        ref.current.rotation.x = Math.PI / 2 // Flat planes facing "up" relative to path

        // Scale trail effect based on speed
        const len = 0.5 + speed * 2
        ref.current.scale.set(0.1, len, 1)

        // Pop effect
        ref.current.visible = progress < 0.95 // Hide when hitting singularity

        // Color Shift: Green -> White -> Cyan
        const c = new THREE.Color()
        if (progress > 0.8) {
            c.setHSL(0.5, 1, 0.8) // Cyan/White core
        } else {
            c.setHSL(0.35, 1, 0.5) // Matrix Green
        }
        ref.current.color.copy(c)
    })

    return <Instance ref={ref} />
}

const MatrixStorm = () => {
    const data = useMemo(() => {
        return new Array(COUNT).fill(0).map(() => ({
            speed: 0.5 + Math.random() * 1.5,
            offset: Math.random(),
            radiusRatio: 0.5 + Math.random(),
            zStart: Math.random() * 10
        }))
    }, [])

    return (
        <group>
            {/* The Code Stream */}
            <Instances range={COUNT}>
                {/* Use a Plane geometry that looks like a trail/beam */}
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#00ff00"
                    toneMapped={false}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />

                {data.map((d, i) => (
                    <StreamParticle key={i} random={d} />
                ))}
            </Instances>

            {/* Singularity Core */}
            <mesh position={[0, 0, -5]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <pointLight position={[0, 0, -5]} intensity={10} color="#00ff00" distance={20} />

            {/* Ambient "Digital Dust" */}
            <Instances range={100}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
                {Array.from({ length: 100 }).map((_, i) => (
                    <Instance key={i} position={[
                        (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10
                    ]} />
                ))}
            </Instances>
        </group>
    )
}

const DataVortex = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: false, toneMapping: THREE.NoToneMapping }}
            >
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 25]} />

                <MatrixStorm />

            </Canvas>
        </div>
    )
}

export default DataVortex
