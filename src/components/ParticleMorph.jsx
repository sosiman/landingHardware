import React, { useEffect, useRef, useState, memo } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import gsap from 'gsap';
import './ParticleMorph.css';

const ParticleMorph = memo(() => {
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    // Refs for Three.js objects
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const particlesRef = useRef(null);
    const animationFrameRef = useRef(null);
    const currentStateRef = useRef('sphere');
    const count = 8000; // Reduced from 15000 for performance

    useEffect(() => {
        if (!containerRef.current) return;

        const init = () => {
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            const scene = new THREE.Scene();
            sceneRef.current = scene;

            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 40; // Moved back to accommodate larger sphere
            cameraRef.current = camera;

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
            renderer.setClearColor(0x000000, 0);
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            createParticles();
            animate();
        };

        const createParticles = () => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            function sphericalDistribution(i) {
                const phi = Math.acos(-1 + (2 * i) / count);
                const theta = Math.sqrt(count * Math.PI) * phi;

                // Increased radius from 8 to 16 for "double size"
                return {
                    x: 16 * Math.cos(theta) * Math.sin(phi),
                    y: 16 * Math.sin(theta) * Math.sin(phi),
                    z: 16 * Math.cos(phi)
                };
            }

            for (let i = 0; i < count; i++) {
                const point = sphericalDistribution(i);

                positions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
                positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
                positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

                const color = new THREE.Color();
                const depth = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) / 16;

                // Electric Colors Logic
                const hue = (0.5 + depth * 0.4) % 1;
                color.setHSL(hue, 1.0, 0.6);

                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.35, // Increased size slightly
                vertexColors: true,
                blending: THREE.NormalBlending, // Changed to NormalBlending to prevent washout
                transparent: true,
                opacity: 0.9,
                sizeAttenuation: true
            });

            if (particlesRef.current) sceneRef.current.remove(particlesRef.current);
            const particles = new THREE.Points(geometry, material);
            particlesRef.current = particles;
            sceneRef.current.add(particles);
        };

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (particlesRef.current && currentStateRef.current === 'sphere') {
                particlesRef.current.rotation.y += 0.02; // Increased speed
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        init();

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const createTextPoints = (text) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const fontSize = 150;
        const padding = 40;

        ctx.font = `bold ${fontSize}px Arial`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        canvas.width = textWidth + padding * 2;
        canvas.height = textHeight + padding * 2;

        ctx.fillStyle = 'white';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const points = [];
        const threshold = 128;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i] > threshold) {
                const x = (i / 4) % canvas.width;
                const y = Math.floor((i / 4) / canvas.width);

                if (Math.random() < 0.25) {
                    points.push({
                        x: (x - canvas.width / 2) / (fontSize / 20),
                        y: -(y - canvas.height / 2) / (fontSize / 20)
                    });
                }
            }
        }

        return points;
    };

    const morphToCircle = () => {
        currentStateRef.current = 'sphere';
        const particles = particlesRef.current;
        if (!particles) return;

        const positions = particles.geometry.attributes.position.array;
        const targetPositions = new Float32Array(count * 3);
        const colors = particles.geometry.attributes.color.array;

        function sphericalDistribution(i) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            return {
                x: 16 * Math.cos(theta) * Math.sin(phi),
                y: 16 * Math.sin(theta) * Math.sin(phi),
                z: 16 * Math.cos(phi)
            };
        }

        for (let i = 0; i < count; i++) {
            const point = sphericalDistribution(i);

            targetPositions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
            targetPositions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
            targetPositions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

            const depth = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) / 16;
            const color = new THREE.Color();
            const hue = (0.5 + depth * 0.4) % 1;
            color.setHSL(hue, 1.0, 0.6);

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        for (let i = 0; i < positions.length; i += 3) {
            gsap.to(particles.geometry.attributes.position.array, {
                [i]: targetPositions[i],
                [i + 1]: targetPositions[i + 1],
                [i + 2]: targetPositions[i + 2],
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (particles.geometry.attributes.position) {
                        particles.geometry.attributes.position.needsUpdate = true;
                    }
                }
            });
        }

        for (let i = 0; i < colors.length; i += 3) {
            gsap.to(particles.geometry.attributes.color.array, {
                [i]: colors[i],
                [i + 1]: colors[i + 1],
                [i + 2]: colors[i + 2],
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (particles.geometry.attributes.color) {
                        particles.geometry.attributes.color.needsUpdate = true;
                    }
                }
            });
        }
    };

    const morphToText = (text) => {
        currentStateRef.current = 'text';
        const particles = particlesRef.current;
        if (!particles) return;

        const textPoints = createTextPoints(text);
        const positions = particles.geometry.attributes.position.array;
        const targetPositions = new Float32Array(count * 3);

        gsap.to(particles.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5
        });

        for (let i = 0; i < count; i++) {
            if (i < textPoints.length) {
                targetPositions[i * 3] = textPoints[i].x;
                targetPositions[i * 3 + 1] = textPoints[i].y;
                targetPositions[i * 3 + 2] = 0;
            } else {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 30 + 20;
                targetPositions[i * 3] = Math.cos(angle) * radius;
                targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
                targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            }
        }

        for (let i = 0; i < positions.length; i += 3) {
            gsap.to(particles.geometry.attributes.position.array, {
                [i]: targetPositions[i],
                [i + 1]: targetPositions[i + 1],
                [i + 2]: targetPositions[i + 2],
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (particles.geometry.attributes.position) {
                        particles.geometry.attributes.position.needsUpdate = true;
                    }
                }
            });
        }

        setTimeout(() => {
            morphToCircle();
        }, 4000);
    };

    const handleCreate = () => {
        const text = inputValue.trim();
        if (text) {
            morphToText(text);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreate();
        }
    };

    return ReactDOM.createPortal(
        <div className="particle-wrapper">
            <div ref={containerRef} className="particle-canvas-container" />

            <div className="pm-input-container">
                <div className="pm-input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        className="pm-input"
                        placeholder="Type something..."
                        maxLength="20"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="pm-button" onClick={handleCreate}>
                        <span className="pm-button-content">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Create</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
});

export default ParticleMorph;
