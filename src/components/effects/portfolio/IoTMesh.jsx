import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const NODES_COUNT = 30
const CONNECTION_DISTANCE = 3.5

const Network = () => {
    // Generate random nodes
    const nodes = useMemo(() => {
        return new Array(NODES_COUNT).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            )
        }))
    }, [])

    const linesGeometry = useRef()

    useFrame(() => {
        // Update positions 
        nodes.forEach(node => {
            node.position.add(node.velocity)
            // Bounce bounds
            if (Math.abs(node.position.x) > 5) node.velocity.x *= -1
            if (Math.abs(node.position.y) > 5) node.velocity.y *= -1
            if (Math.abs(node.position.z) > 5) node.velocity.z *= -1
        })

        // Recompute connections every frame? 
        // For 30 nodes (30*30 checks) it's fine for CPU.
        // But drawing dynamic lines in R3F needs a trick.
        // We can use a single segment implementation that updates.
    })

    // For standard rendering, we need a custom component that updates geometry
    return (
        <group>
            {/* Draw Nodes */}
            {nodes.map((node, i) => (
                <NodeMesh key={i} node={node} />
            ))}

            {/* Dynamic Connections Manager */}
            <Connections nodes={nodes} />
        </group>
    )
}

const NodeMesh = ({ node }) => {
    const ref = useRef()
    useFrame(() => {
        if (ref.current) ref.current.position.copy(node.position)
    })
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#00ff00" />
            {/* Pulse aura */}
            <mesh scale={[2, 2, 2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
            </mesh>
        </mesh>
    )
}

const Connections = ({ nodes }) => {
    const ref = useRef()
    // Pre-allocate a buffer for maximum possible lines is tricky with R3F 'Line'.
    // Better to use THREE.BufferGeometry with 'LineSegments' directly

    const maxConnections = NODES_COUNT * NODES_COUNT // Overkill but safe
    const positions = useMemo(() => new Float32Array(maxConnections * 3 * 2), [])

    useFrame(() => {
        if (!ref.current) return

        let vertexIndex = 0

        for (let i = 0; i < NODES_COUNT; i++) {
            for (let j = i + 1; j < NODES_COUNT; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position)
                if (dist < CONNECTION_DISTANCE) {
                    positions[vertexIndex++] = nodes[i].position.x
                    positions[vertexIndex++] = nodes[i].position.y
                    positions[vertexIndex++] = nodes[i].position.z

                    positions[vertexIndex++] = nodes[j].position.x
                    positions[vertexIndex++] = nodes[j].position.y
                    positions[vertexIndex++] = nodes[j].position.z
                }
            }
        }

        ref.current.geometry.setDrawRange(0, vertexIndex / 3)
        ref.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <lineSegments ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={maxConnections * 2} // Max verts
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#004400" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </lineSegments>
    )
}

const IoTMesh = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
            >
                <color attach="background" args={['#000500']} />
                <group rotation={[0, 0.5, 0]}>
                    <Network />
                </group>
            </Canvas>
        </div>
    )
}

export default IoTMesh
