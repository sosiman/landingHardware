import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line, Html } from '@react-three/drei'
import * as THREE from 'three'

// Generate random points on sphere
const randomSpherePoint = (radius) => {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
    )
}

// Arc Curve used for transactions
const TransactionArc = ({ start, end, color }) => {
    const curve = useMemo(() => {
        // Bezier control points to lift the arc off the surface
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(start.length() * 1.5)
        return new THREE.QuadraticBezierCurve3(start, mid, end)
    }, [start, end])

    const points = useMemo(() => curve.getPoints(20), [curve])

    return (
        <Line
            points={points}
            color={color}
            lineWidth={2}
            transparent
            opacity={0.6}
        />
    )
}

const MovingPacket = ({ curve, speed, color }) => {
    const mesh = useRef()
    const offset = useMemo(() => Math.random(), [])

    useFrame(({ clock }) => {
        if (!mesh.current) return
        const t = (clock.getElapsedTime() * speed + offset) % 1
        const point = curve.getPoint(t)
        mesh.current.position.copy(point)
    })

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    )
}

const Globe = () => {
    // Globe Geometry
    const globeRadius = 2.5
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005
            // Tilt
            groupRef.current.rotation.x = 0.2
        }
    })

    // Generate Cities
    const cities = useMemo(() => {
        return new Array(15).fill(0).map(() => randomSpherePoint(globeRadius))
    }, [])

    // Generate Connections
    const connections = useMemo(() => {
        const conns = []
        cities.forEach((city, i) => {
            // Connect to 3 random other cities
            for (let j = 0; j < 3; j++) {
                const target = cities[Math.floor(Math.random() * cities.length)]
                if (target !== city) {
                    // Bezier curve for packet travel
                    const mid = city.clone().add(target).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.5)
                    const curve = new THREE.QuadraticBezierCurve3(city, mid, target)
                    conns.push({ start: city, end: target, curve })
                }
            }
        })
        return conns
    }, [cities])

    return (
        <group ref={groupRef}>
            {/* Wireframe Globe */}
            <mesh>
                <sphereGeometry args={[globeRadius, 32, 32]} />
                <meshBasicMaterial color="#001133" wireframe transparent opacity={0.1} />
            </mesh>
            <mesh>
                <sphereGeometry args={[globeRadius * 0.98, 32, 32]} />
                <meshBasicMaterial color="#1a237e" />
            </mesh>

            {/* Dots for Cities */}
            {cities.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#00ffcc" toneMapped={false} />
                </mesh>
            ))}

            {/* Arcs */}
            {connections.map((c, i) => (
                <group key={i}>
                    <TransactionArc start={c.start} end={c.end} color="#3366ff" />
                    <MovingPacket curve={c.curve} speed={0.5 + Math.random() * 0.5} color="#ffffff" />
                </group>
            ))}
        </group>
    )
}

const EcommerceGlobe = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <Globe />
            </Canvas>
        </div>
    )
}

export default EcommerceGlobe
