"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, ContactShadows } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function Blob({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
    const mesh = useRef<THREE.Mesh>(null)
    const offset = useMemo(() => Math.random() * 100, [])

    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.getElapsedTime()
            mesh.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.5
            mesh.current.rotation.x = Math.cos(t * 0.5 + offset) * 0.2
            mesh.current.rotation.y = Math.sin(t * 0.3 + offset) * 0.2
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={position}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.5} // Glass effect
                    thickness={2}
                    envMapIntensity={1.5}
                />
            </mesh>
        </Float>
    )
}

export function Hero3D() {
    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#c4b5fd" />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#a5b4fc" />

                <group position={[0, -1, 0]}>
                    <Blob position={[-2, 1, 0]} color="#a5b4fc" speed={0.5} />
                    <Blob position={[2, -1, -1]} color="#c4b5fd" speed={0.4} />
                    <Blob position={[0, 2, -2]} color="#e0e7ff" speed={0.3} />
                </group>

                {/* Removed Environment to avoid external fetch errors */}
                <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Canvas>
        </div>
    )
}
