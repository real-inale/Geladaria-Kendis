"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Cloud, Trail } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, geometry, speed = 1 }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(t * speed) * 0.2;
        meshRef.current.rotation.y = Math.cos(t * speed * 0.5) * 0.2;
    });

    return (
        <Float speed={2 * speed} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry === 'sphere' && <sphereGeometry args={[0.4, 32, 32]} />}
                {geometry === 'torus' && <torusGeometry args={[0.3, 0.1, 16, 32]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[0.4]} />}
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.1}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

function InteractiveParticles() {
    const count = 200;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        // Mouse interaction smoothing
        const { mouse } = state;
        mousePosition.current.x += (mouse.x * 50 - mousePosition.current.x) * 0.1;
        mousePosition.current.y += (mouse.y * 50 - mousePosition.current.y) * 0.1;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Update position based on mouse proximity (repulsion effect)
            particle.mx += (mouse.x * 1000 - particle.mx) * 0.01;
            particle.my += (mouse.y * 1000 - particle.my) * 0.01;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshPhongMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={0.5} />
            </instancedMesh>
        </>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF4500" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Elementos Flutuantes Principais */}
                <FloatingShape position={[-4, 2, 0]} color="#FF4500" geometry="sphere" speed={0.8} />
                <FloatingShape position={[4, -3, -2]} color="#FFD700" geometry="torus" speed={1.2} />
                <FloatingShape position={[0, 4, -5]} color="#FF6347" geometry="octahedron" speed={1} />

                {/* Partículas de Fundo */}
                <InteractiveParticles />

                {/* Neblina Suave */}
                <fog attach="fog" args={['#1a1a1a', 10, 40]} />
            </Canvas>
        </div>
    );
}
