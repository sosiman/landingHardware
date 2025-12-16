import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Icosahedron, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Advanced Holographic Shield Shader
const ShieldMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00f2ff') },
        uRimColor: { value: new THREE.Color('#ffffff') },
        uInterference: { value: 0 },
        uOpacity: { value: 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        vPosition = position;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uRimColor;
      uniform float uInterference;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec3 vPosition;

      // HASH FUNCTIONS FOR NOISE
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
        i = mod289(i);
        vec4 p = permute( permute( permute( 
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                      dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        float noiseVal = snoise(vPosition * 3.0 + uTime * 0.5);
        
        // Scanlines
        float scanline = sin(vPosition.y * 20.0 - uTime * 5.0) * 0.5 + 0.5;
        scanline = smoothstep(0.4, 0.6, scanline);
        
        // Fresnel
        vec3 viewDir = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
        
        // Hexagon Pattern approximation (simplified with grid)
        float grid = max(
            smoothstep(0.95, 1.0, abs(sin(vPosition.x * 10.0))),
            smoothstep(0.95, 1.0, abs(sin(vPosition.y * 10.0 * 0.866)))
        );
        
        // Composition
        float alpha = fresnel * 0.8 + grid * 0.5 + noiseVal * 0.2;
        alpha *= (0.3 + scanline * 0.7);
        
        // Impact ripples (using interference uniform)
        float ripple = sin(length(vPosition) * 10.0 - uTime * 10.0);
        // alpha += ripple * uInterference; // If huge impact
        
        vec3 col = uColor * (1.0 + fresnel * 2.0);
        col += uRimColor * grid * 2.0;
        
        gl_FragColor = vec4(col, alpha * 0.8);
      }
    `,
    transparent: true,
    side: THREE.FrontSide, // Only front to look like a solid forcefield
    blending: THREE.AdditiveBlending,
    depthWrite: false
}

const HolographicShield = () => {
    const shieldRef = useRef()
    const shaderMat = useMemo(() => new THREE.ShaderMaterial(ShieldMaterial), [])

    useFrame(({ clock }) => {
        if (shieldRef.current) {
            shieldRef.current.rotation.y = clock.getElapsedTime() * 0.2
            shaderMat.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return (
        <group>
            {/* Core Shield */}
            <Sphere ref={shieldRef} args={[2.5, 64, 64]}>
                <primitive object={shaderMat} attach="material" />
            </Sphere>

            {/* Inner Stability Core */}
            <Icosahedron args={[1.5, 2]}>
                <meshStandardMaterial
                    color="#0066ff"
                    emissive="#0044aa"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Icosahedron>

            {/* Outer Orbitals */}
            <OrbitalRing radius={3.2} speed={1} color="#00f2ff" />
            <OrbitalRing radius={3.8} speed={-0.8} color="#0088ff" />
        </group>
    )
}

const OrbitalRing = ({ radius, speed, color }) => {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.z = clock.getElapsedTime() * speed * 0.5
            ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
        }
    })
    return (
        <group ref={ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.05, 16, 100]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[radius, 0, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial color="white" toneMapped={false} />
            </mesh>
        </group>
    )
}

const QuantumShield = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ powerPreference: 'high-performance', alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
                <HolographicShield />
            </Canvas>
        </div>
    )
}

export default QuantumShield
