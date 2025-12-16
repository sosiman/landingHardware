import { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Instances, Instance, Environment, Float, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'

// 4D Math Helper
const rotate4D = (v, t) => {
    let { x, y, z, w } = v
    // Complex 4D tumbling
    const c1 = Math.cos(t), s1 = Math.sin(t)
    const c2 = Math.cos(t * 0.6), s2 = Math.sin(t * 0.6)

    // XW Rotation
    let tx = x * c1 - w * s1; w = x * s1 + w * c1; x = tx;
    // YZ Rotation
    let ty = y * c2 - z * s2; z = y * s2 + z * c2; y = ty;
    // ZW Rotation (Adding more dimensionality)
    const c3 = Math.cos(t * 0.3), s3 = Math.sin(t * 0.3)
    let tz = z * c3 - w * s3; w = z * s3 + w * c3; z = tz;

    // Stereographic Projection 4D -> 3D
    const dist = 3.5
    const factor = 1 / (dist - w)

    return new THREE.Vector3(x * factor, y * factor, z * factor)
}

const TesseractEdge = ({ start, end, color }) => {
    const ref = useRef()
    useFrame(() => {
        if (ref.current) {
            // Align cylinder between two points
            const direction = new THREE.Vector3().subVectors(end, start)
            const length = direction.length()
            const orientation = new THREE.Matrix4()
            orientation.lookAt(start, end, new THREE.Object3D().up)
            orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2))

            const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)

            ref.current.position.copy(position)
            ref.current.quaternion.setFromRotationMatrix(orientation)
            ref.current.scale.set(1, length, 1)
        }
    })

    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
            {/* Outer Glow Shell */}
            <mesh scale={[1.5, 1, 1.5]}>
                <cylinderGeometry args={[0.06, 0.06, 1, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
            </mesh>
        </mesh>
    )
}

const HyperStructure = () => {
    const group = useRef()

    // Vertices - Fixed logic relative to time
    // We calculate in render loop to get smooth 4D movement

    // Tesseract Topology (16 vertices, 32 edges)
    const topology = useMemo(() => {
        const verts = []
        for (let i = 0; i < 16; i++) {
            verts.push({
                x: (i & 1) ? 1 : -1,
                y: (i & 2) ? 1 : -1,
                z: (i & 4) ? 1 : -1,
                w: (i & 8) ? 1 : -1
            })
        }
        const edges = []
        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                let diff = 0
                if (verts[i].x !== verts[j].x) diff++
                if (verts[i].y !== verts[j].y) diff++
                if (verts[i].z !== verts[j].z) diff++
                if (verts[i].w !== verts[j].w) diff++
                if (diff === 1) edges.push([i, j])
            }
        }
        return { verts, edges }
    }, [])

    const animatedVertices = useRef(new Array(16).fill(new THREE.Vector3()))

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.4

        // Update all vertices
        topology.verts.forEach((v, i) => {
            const p3 = rotate4D(v, t)
            animatedVertices.current[i] = p3.multiplyScalar(2.0) // Scale up
        })

        // Rotate the whole group slightly
        if (group.current) {
            group.current.rotation.y = t * 0.1
            group.current.rotation.z = t * 0.05
        }
    })

    return (
        <group ref={group}>
            {/* Render Edges */}
            {topology.edges.map((edge, i) => (
                <FrameEdge
                    key={i}
                    p1Ref={animatedVertices}
                    idx1={edge[0]}
                    idx2={edge[1]}
                />
            ))}

            {/* Render Vertices as Glowing Orbs */}
            {topology.verts.map((_, i) => (
                <VertexOrb key={i} pRef={animatedVertices} idx={i} />
            ))}

            {/* Central Pure Energy Core */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#ff4400" toneMapped={false} />
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color="#ff8800" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
                </mesh>
            </mesh>
            <pointLight distance={5} intensity={5} color="#ff4400" />
        </group>
    )
}

// Optimized Edge Component
const FrameEdge = ({ p1Ref, idx1, idx2 }) => {
    const ref = useRef()

    useFrame(() => {
        if (!ref.current) return
        const start = p1Ref.current[idx1]
        const end = p1Ref.current[idx2]

        // Center position
        ref.current.position.set(
            (start.x + end.x) / 2,
            (start.y + end.y) / 2,
            (start.z + end.z) / 2
        )

        // Orientation
        ref.current.lookAt(end)
        ref.current.rotateX(Math.PI / 2) // Cylinder aligns Y axis

        // Scale (Length)
        const len = start.distanceTo(end)
        ref.current.scale.set(1, len, 1)

        // Dynamic Color based on stretch/length
        const stretch = Math.min(len / 3, 1)
        ref.current.material.color.setHSL(0.05 + stretch * 0.1, 1, 0.5) // Orange/Red/Yellow
    })

    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[0.03, 0.03, 1, 6]} />
            <meshBasicMaterial color="orange" toneMapped={false} />
        </mesh>
    )
}

const VertexOrb = ({ pRef, idx }) => {
    const ref = useRef()
    useFrame(() => {
        if (ref.current) {
            ref.current.position.copy(pRef.current[idx])
        }
    })
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="white" toneMapped={false} />
            <mesh scale={[2, 2, 2]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="orange" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </mesh>
    )
}

const HyperCube4D = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#050100']} />

                {/* Volumetric Fog emulation */}
                <fog attach="fog" args={['#050100', 5, 20]} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <HyperStructure />
                </Float>

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />

                {/* Cinematic Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="red" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="orange" />

            </Canvas>
        </div>
    )
}

export default HyperCube4D
