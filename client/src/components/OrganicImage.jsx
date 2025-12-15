import React, { useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const OrganicImage = ({ src, alt, className = "" }) => {
    // Generate organic blob path using simplified noise algorithm
    const generateBlobPath = (points = 8, randomness = 0.15) => {
        const angleStep = (Math.PI * 2) / points
        const radius = 50 // Base radius as percentage
        let path = "M "

        for (let i = 0; i <= points; i++) {
            const angle = angleStep * i
            // Add randomness to radius for organic shape
            const randomOffset = (Math.random() - 0.5) * randomness * radius
            const r = radius + randomOffset

            const x = 50 + r * Math.cos(angle)
            const y = 50 + r * Math.sin(angle)

            if (i === 0) {
                path += `${x} ${y}`
            } else {
                // Use quadratic curves for smooth transitions
                const prevAngle = angleStep * (i - 1)
                const prevR = radius + (Math.random() - 0.5) * randomness * radius
                const cpx = 50 + (r + prevR) / 2 * Math.cos((angle + prevAngle) / 2)
                const cpy = 50 + (r + prevR) / 2 * Math.sin((angle + prevAngle) / 2)
                path += ` Q ${cpx} ${cpy} ${x} ${y}`
            }
        }
        path += " Z"
        return path
    }

    // Generate stable blob path on mount
    const blobPath = useMemo(() => generateBlobPath(12, 0.12), [])

    // Scroll animations
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
    const y = useTransform(scrollYProgress, [0, 0.3], [0, 50])

    // Unique ID for clip-path
    const clipId = useMemo(() => `organic-clip-${Math.random().toString(36).substr(2, 9)}`, [])

    return (
        <motion.div
            className={`relative ${className}`}
            style={{ scale, opacity, y }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}>
            {/* SVG Definition for organic clip-path */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path
                            d={blobPath}
                            transform="scale(0.01 0.01)"
                        />
                    </clipPath>

                    {/* Radial gradient for smooth edge fade */}
                    <mask id={`${clipId}-mask`}>
                        <rect width="100%" height="100%" fill="white" />
                        {/* Inner white for clear image */}
                        <ellipse cx="50%" cy="50%" rx="48%" ry="48%" fill="white" />
                        {/* Gradient fade at edges */}
                        <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#fadeGradient)" />
                    </mask>

                    <radialGradient id="fadeGradient">
                        <stop offset="85%" stopColor="white" stopOpacity="1" />
                        <stop offset="95%" stopColor="white" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>

            {/* Image Container */}
            <div className="relative w-full h-full">
                {/* Decorative background blobs */}
                <div className="absolute -inset-10 -z-10">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }}></div>
                </div>

                {/* Main Image with organic clip-path and mask */}
                <div
                    className="relative w-full h-full"
                    style={{
                        clipPath: `url(#${clipId})`,
                        WebkitClipPath: `url(#${clipId})`,
                    }}>
                    {/* Image with gradient overlay for smooth background blend */}
                    <div className="relative w-full h-full">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />

                        {/* Gradient overlay for smooth transition to background */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `
                                    radial-gradient(ellipse at center,
                                        transparent 0%,
                                        transparent 75%,
                                        rgba(0, 0, 0, 0.1) 85%,
                                        rgba(0, 0, 0, 0.3) 95%,
                                        rgba(0, 0, 0, 0.5) 100%
                                    )
                                `,
                            }}></div>
                    </div>
                </div>

                {/* Subtle glow effect */}
                <div
                    className="absolute inset-0 -z-10 blur-2xl opacity-30"
                    style={{
                        clipPath: `url(#${clipId})`,
                        WebkitClipPath: `url(#${clipId})`,
                        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                    }}></div>
            </div>
        </motion.div>
    )
}

export default OrganicImage
