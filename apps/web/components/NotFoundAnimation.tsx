"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle3D {
    x: number;
    y: number;
    z: number;
    originX: number;
    originY: number;
    originZ: number;
    size: number;
    color: string;
    type: 'earth' | 'satellite' | 'text' | 'star';
    angle?: number; // For satellite orbit
}

export function NotFoundAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Mouse drag state for interactive rotation
    const isDragging = useRef(false);
    const previousMouse = useRef({ x: 0, y: 0 });
    const rotationOffset = useRef({ x: 0, y: 0 }); // Current rotation applied by user drag
    const autoRotation = useRef(0); // Continuous slow rotation

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        let particles: Particle3D[] = [];
        let animationFrameId: number;

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const centerX = width / 2;
        const centerY = height / 2;
        const earthRadius = Math.min(width, height) * 0.25;

        // --- Math Helpers ---
        // 3D Rotation Matrix applied to a point (x, y, z) around origin (0,0,0)
        const rotate3D = (x: number, y: number, z: number, angleX: number, angleY: number) => {
            // Rotate around X axis (Pitch - up/down drag)
            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const y1 = y * cosX - z * sinX;
            let z1 = y * sinX + z * cosX;

            // Rotate around Y axis (Yaw - left/right drag + auto spin)
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);
            const x2 = x * cosY + z1 * sinY;
            z1 = -x * sinY + z1 * cosY;

            return { x: x2, y: y1, z: z1 };
        };

        // --- Scene Generation ---
        const initScene = () => {
            particles = [];

            // 1. Generate Earth Sphere (Fibonacci sphere distribution for even spread)
            const numEarthParticles = 1200;
            const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

            for (let i = 0; i < numEarthParticles; i++) {
                const y = 1 - (i / (numEarthParticles - 1)) * 2; // y goes from 1 to -1
                const radiusAtY = Math.sqrt(1 - y * y); // radius at y
                const theta = phi * i; // golden angle increment

                const x = Math.cos(theta) * radiusAtY;
                const z = Math.sin(theta) * radiusAtY;

                // Color gradient based on latitude (y)
                // Let's make it a cool cyan/blue tech globe
                const r = 50 - y * 30; // 20 to 80
                const g = 180 - Math.abs(y) * 50; // 130 to 180
                const b = 255;

                particles.push({
                    x: x * earthRadius,
                    y: y * earthRadius,
                    z: z * earthRadius,
                    originX: x * earthRadius,
                    originY: y * earthRadius,
                    originZ: z * earthRadius,
                    size: Math.random() * 1.5 + 0.5,
                    color: `rgba(${r}, ${g}, ${b}, 0.8)`,
                    type: 'earth'
                });
            }

            // 2. Generate 404 Satellite Text (Using offscreen canvas)
            ctx.clearRect(0, 0, width, height);
            const fontSize404 = earthRadius * 0.4;
            ctx.font = `bold ${fontSize404}px Space Grotesk, Arial, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Draw text to extract pixels
            ctx.fillStyle = "white";
            ctx.fillText("404", centerX, centerY);

            const imageData1 = ctx.getImageData(0, 0, width, height);
            const data1 = imageData1?.data;
            if (!data1) return;
            const step = 4; // Text particle density

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    const index = (y * width + x) * 4;
                    if (data1[index + 3] > 128) {
                        // Recenter coordinates around 0,0,0 so they can be rotated identically
                        particles.push({
                            x: x - centerX,
                            y: y - centerY,
                            z: 0,
                            originX: x - centerX,
                            originY: y - centerY,
                            originZ: 0,
                            size: 2,
                            color: 'rgba(255, 100, 100, 0.9)', // Satellite red/orange color
                            type: 'satellite',
                            angle: 0 // Orbit angle
                        });
                    }
                }
            }

            // 3. Generate BAD REQUEST Satellite Text
            ctx.clearRect(0, 0, width, height);
            const fontSizeBR = earthRadius * 0.25;
            ctx.font = `bold ${fontSizeBR}px Space Grotesk, Arial, sans-serif`;
            ctx.fillText("ERROR", centerX, centerY);

            const imageData2 = ctx.getImageData(0, 0, width, height);
            const data2 = imageData2?.data;
            if (!data2) return;

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    const index = (y * width + x) * 4;
                    if (data2[index + 3] > 128) {
                        particles.push({
                            x: x - centerX,
                            y: y - centerY,
                            z: 0,
                            originX: x - centerX,
                            originY: y - centerY,
                            originZ: 0,
                            size: 1.5,
                            color: 'rgba(100, 200, 255, 0.9)', // Light blue color for distinction
                            type: 'satellite',
                            angle: Math.PI // Orbit exactly on the opposite side (180 degrees)
                        });
                    }
                }
            }
            ctx.clearRect(0, 0, width, height); // Clear extraction

            // 4. Generate Background Stars
            const numStars = 600;
            for (let i = 0; i < numStars; i++) {
                // Distribute in a huge sphere around the camera/earth
                const r = earthRadius * 3 + Math.random() * earthRadius * 6;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);

                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);

                particles.push({
                    x: x,
                    y: y,
                    z: z,
                    originX: x,
                    originY: y,
                    originZ: z,
                    size: Math.random() * 1.5 + 0.5,
                    color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
                    type: 'star'
                });
            }

            setIsLoaded(true);
        };

        initScene();

        // --- Animation Loop ---
        const animate = () => {
            // Dark background with slight trail effect (alpha 0.3 instead of clearRect)
            ctx.fillStyle = 'rgba(3, 0, 20, 0.3)';
            ctx.fillRect(0, 0, width, height);

            // Auto rotation logic
            if (!isDragging.current) {
                autoRotation.current += 0.002; // Slow continuous spin on Y axis
            }

            // Calculate total rotation to apply this frame
            const totalRotX = rotationOffset.current.y; // Dragging up/down rotates around X
            const totalRotY = rotationOffset.current.x + autoRotation.current; // Dragging left/right rotates around Y

            // Sort array by Z depth (Painters algorithm)
            // We must calculate the transformed Z for *all* particles first before sorting and drawing
            const transformedParticles = particles.map(p => {
                let tx = p.originX;
                let ty = p.originY;
                let tz = p.originZ;

                // Special logic for Satellite: calculate its orbital position *before* global rotation
                if (p.type === 'satellite') {
                    const satOrbitSpeed = 0.01;
                    p.angle = (p.angle || 0) + satOrbitSpeed;
                    const orbitDistance = earthRadius * 1.8;

                    // Orbit horizontally
                    const satOrbitX = Math.cos(p.angle) * orbitDistance;
                    const satOrbitZ = Math.sin(p.angle) * orbitDistance;

                    // Add particle's local origin offset to form the sphere
                    tx = satOrbitX + p.originX;
                    ty = 0 + p.originY; // flat orbit plane
                    tz = satOrbitZ + p.originZ;

                    // Optional: tilt the entire orbit plane slightly
                    const tilted = rotate3D(tx, ty, tz, 0.3, 0);
                    tx = tilted.x; ty = tilted.y; tz = tilted.z;
                }

                // Apply Global 3D Rotation (Earth, Text, and the entire Satellite orbit)
                const rotated = rotate3D(tx, ty, tz, totalRotX, totalRotY);

                return {
                    ...p,
                    rotX: rotated.x,
                    rotY: rotated.y,
                    rotZ: rotated.z
                };
            });

            // Sort back-to-front
            transformedParticles.sort((a, b) => b.rotZ - a.rotZ);

            // Draw Phase
            for (let i = 0; i < transformedParticles.length; i++) {
                const p = transformedParticles[i];
                if (!p || typeof p.rotZ !== 'number' || typeof p.rotX !== 'number' || typeof p.rotY !== 'number') continue;

                // 3D Perspective Projection
                const fov = 1000;
                // Prevent division by zero or negative perspective
                const perspective = fov / (fov - p.rotZ);

                if (perspective < 0) continue; // Behind camera

                const drawX = centerX + p.rotX * perspective;
                const drawY = centerY + p.rotY * perspective;
                const drawSize = Math.max(0.1, p.size * perspective);

                // Alpha shading based on depth (makes it look more spherical/holographic)
                // rotZ goes from roughly -earthRadius (front) to +earthRadius (back)
                let alpha = 1;
                if (p.type === 'earth') {
                    // Fade out particles on the back of the sphere
                    alpha = 1 - ((p.rotZ + earthRadius) / (earthRadius * 2));
                    // Ensure it doesn't completely vanish or overflow
                    alpha = Math.max(0.1, Math.min(0.8, alpha));
                }

                ctx.beginPath();
                if (p.type === 'text') {
                    // Make text glow slightly
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'white';
                } else if (p.type === 'star') {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = alpha; // Keep alpha normal for distant stars
                    ctx.shadowBlur = p.size > 1 ? 2 : 0; // Only bigger stars glow slightly
                    ctx.shadowColor = 'rgba(255,255,255,0.5)';
                } else {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = alpha;
                    ctx.shadowBlur = 0;
                }

                ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            animationFrameId = requestAnimationFrame(animate);
        };

        if (isLoaded) {
            animate();
        }

        // --- Interaction Handlers ---
        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            previousMouse.current = { x: e.clientX, y: e.clientY };
            canvas.style.cursor = 'grabbing';
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            canvas.style.cursor = 'grab';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - previousMouse.current.x;
            const deltaY = e.clientY - previousMouse.current.y;

            // Convert mouse movement to rotation angles
            rotationOffset.current.x += deltaX * 0.005;
            rotationOffset.current.y += deltaY * 0.005; // Note: Inverted Y drag feels more natural for pitch

            previousMouse.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            window.location.reload(); // Quick refresh to recalculate centers and radii
        }

        // Bind events
        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoaded]);

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030014] text-white">

            {/* 3D Particle Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 block pointer-events-auto cursor-grab active:cursor-grabbing"
            />

            {/* UI Overlay Layer (Clickable Buttons) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-16 z-20 flex flex-col items-center pointer-events-none"
            >
                <div className="flex gap-4 items-center pointer-events-auto">
                    <Link
                        href="/"
                        className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-slate-800 border border-slate-700 px-8 font-medium text-white transition-all duration-300 hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(19,55,236,0.3)] hover:shadow-[0_0_60px_-10px_rgba(19,55,236,0.5)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Return to Base

                        </span>
                    </Link>


                </div>
            </motion.div>
        </main>
    );
}
