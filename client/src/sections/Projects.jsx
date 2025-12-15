/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

import KEEPSAKE from "@/assets/images/keepsake.png"
import IPTFINAL from "@/assets/images/ipt-final.png"
import NUMSTHRIFT from "@/assets/images/numsthrift.png"
import SYSARCH from "@/assets/images/sysarch.png"

const Projects = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        let section = sectionRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (section) {
            observer.observe(section)
        }

        return () => {
            if (section) {
                observer.unobserve(section)
            }
        }
    }, [])

    const projects = [
        {
            title: "KEEPSAKE",
            description:
                "A digital platform to store, track, and share your baby's health records and milestones with ease. Built with modern web technologies for optimal performance and security.",
            image: KEEPSAKE,
            tech: [
                "React.js",
                "Python Flask",
                "Supabase",
                "Stripe",
                "Redis",
                "TailwindCSS",
                "Chart.js",
                "SMTP",
            ],
            demoUrl: "https://keepsake-pi.vercel.app",
            githubUrl: "https://github.com/Znarfieeee/KEEPSAKE-CAPSTONE",
        },
        {
            title: "IPT Final Project",
            description:
                "Employee and Inventory Management that handles all the employee requests.",
            image: IPTFINAL,
            tech: ["React.js", "TypeScript", "Node.js", "MySql"],
            demoUrl: "https://ipt-final-2025-espelita.onrender.com/login",
            githubUrl: "https://github.com/Znarfieeee/ipt-final-2025",
        },
        {
            title: "Numsthrift",
            description: "A quick thrift store E-commerce website.",
            image: NUMSTHRIFT,
            tech: ["React.js", "Python", "Tailwind CSS", "Supabase"],
            demoUrl: "https://numsthrift.vercel.app/",
            githubUrl: "https://github.com/Znarfieeee/Numsthrift",
        },
        {
            title: "CCS Sit-in Monitoring System",
            description:
                "Interactive sit-in monitoring system that manages comprehensive sit in with audits trails.",
            image: SYSARCH,
            tech: ["Python Flask", "Sqlite3", "Chart.js"],
            demoUrl: "#",
            githubUrl: "https://github.com/Znarfieeee/SYSARCH",
        },
    ]

    return (
        <section
            ref={sectionRef}
            id="works"
            className="min-h-screen bg-background py-20 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-mono tracking-tight">
                        FEATURED WORKS
                    </h2>
                    <div className="mt-4 h-1 w-20 bg-primary"></div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group bg-muted/5 border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: 0.2 + index * 0.1,
                                duration: 0.6,
                            }}>
                            {/* Project Image */}
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                    loading="lazy"
                                />

                                {/* Overlay with Links */}
                                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <Button
                                        size="sm"
                                        className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                                        onClick={() => {
                                            if (
                                                project.demoUrl &&
                                                project.demoUrl !== "#"
                                            ) {
                                                window.open(
                                                    project.demoUrl,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                )
                                            }
                                        }}>
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Demo
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full"
                                        onClick={() => {
                                            if (
                                                project.githubUrl &&
                                                project.githubUrl !== "#"
                                            ) {
                                                window.open(
                                                    project.githubUrl,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                )
                                            }
                                        }}>
                                        <Github className="w-4 h-4 mr-2" />
                                        Code
                                    </Button>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6 lg:p-8 space-y-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tech.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-muted/10 border border-border/50 rounded-full text-xs font-mono text-primary">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
