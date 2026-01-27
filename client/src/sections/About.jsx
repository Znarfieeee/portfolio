/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"

const About = () => {
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
            { threshold: 0.1 },
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

    const skills = {
        Frontend: ["React.js", "Tailwind CSS", "Framer Motion", "Motion.dev"],
        Backend: [
            "Node.js",
            "Express",
            "MySQL",
            "Supabase",
            "REST APIs",
            "Flask",
            "FASTApi",
        ],
        Tools: [
            "Git",
            "Docker",
            "Figma",
            "VS Code",
            "Vite",
            "ClickUp",
            "Discord",
            "Claude Code",
            "Google Gemini",
            "Linear",
            "Notion",
        ],
        "Soft Skills": [
            "Problem Solving",
            "Team Collaboration",
            "UI/UX Design",
            "Project Management",
        ],
    }

    const experience = [
        {
            year: "2026",
            title: "Project Manager",
            company: "Symph, Inc.",
            description:
                "Leading cross-functional teams to deliver scalable web solutions. Coordinating development, design, and QA efforts while ensuring timely project delivery, stakeholder communication, and client satisfaction.",
        },
        {
            year: "2025",
            title: "Fullstack Web Developer",
            company: "Freelance",
            description:
                "Building modern web applications with React, Node.js, and cloud technologies. Focused on creating responsive, user-friendly interfaces.",
        },
        {
            year: "2023",
            title: "Frontend Developer",
            company: "Personal Projects",
            description:
                "Developed portfolio websites and interactive web experiences using React, TypeScript, and animation libraries.",
        },
        {
            year: "2022",
            title: "Learning & Growth",
            company: "College Life",
            description:
                "Mastered web development fundamentals, modern frameworks, and best practices through online courses and hands-on projects.",
        },
    ]

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen bg-background py-20 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-mono tracking-tight">
                        ABOUT ME
                    </h2>
                    <div className="mt-4 h-1 w-20 bg-primary"></div>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}>
                    {/* Text */}
                    <div className="space-y-6">
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Hi, I'm Mari Franz Espelita, a bespoke fullstack web
                            developer with a keen eye for design and a love for
                            creating seamless digital experiences. I specialize
                            in building modern, responsive web applications that
                            are both beautiful and functional.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            With expertise in React.js, python, and modern web
                            technologies, I bring ideas to life through clean
                            code and thoughtful design. I'm constantly learning
                            and exploring new tools to stay at the forefront of
                            web development.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                            When I'm not coding, you'll find me exploring
                            photography, video editing, and cinematography -
                            creative pursuits that complement my technical
                            skills and enhance my approach to web design.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&auto=format&fit=crop"
                                alt="About"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    className="mb-20 lg:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-mono mb-8 lg:mb-12">
                        SKILLS & EXPERTISE
                    </h3>

                    {/* Mobile Accordion View */}
                    <div className="lg:hidden">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-3">
                            {Object.entries(skills).map(
                                ([category, items], index) => (
                                    <AccordionItem
                                        key={category}
                                        value={`skill-${index}`}
                                        className="border border-border/50 rounded-lg overflow-hidden data-[state=open]:border-primary/50">
                                        <AccordionTrigger className="bg-muted/5 hover:bg-muted/10 px-4 py-4 text-primary/80 font-mono uppercase text-lg">
                                            {category}
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-background px-4 py-4 border-t border-border/50">
                                            <ul className="space-y-2">
                                                {items.map(skill => (
                                                    <li
                                                        key={skill}
                                                        className="text-muted-foreground text-sm">
                                                        • {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ),
                            )}
                        </Accordion>
                    </div>

                    {/* Desktop Grid View */}
                    <div className="hidden lg:grid grid-cols-4 gap-8">
                        {Object.entries(skills).map(
                            ([category, items], index) => (
                                <motion.div
                                    key={category}
                                    className="bg-muted/5 border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-colors duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={
                                        isVisible ? { opacity: 1, y: 0 } : {}
                                    }
                                    transition={{
                                        delay: 0.5 + index * 0.1,
                                        duration: 0.6,
                                    }}>
                                    <h4 className="text-lg font-bold text-primary font-mono mb-4 uppercase">
                                        {category}
                                    </h4>
                                    <ul className="space-y-2">
                                        {items.map(skill => (
                                            <li
                                                key={skill}
                                                className="text-muted-foreground text-sm">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ),
                        )}
                    </div>
                </motion.div>

                {/* Experience Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-mono mb-8 lg:mb-12">
                        EXPERIENCE
                    </h3>

                    {/* Mobile Accordion View
                    <div className="lg:hidden">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-3">
                            {experience.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`exp-${index}`}
                                    className="border border-border/50 rounded-lg overflow-hidden data-[state=open]:border-primary/50">
                                    <AccordionTrigger className="bg-muted/5 hover:bg-muted/10 px-4 py-4">
                                        <div className="text-left">
                                            <div className="text-sm font-mono text-primary">
                                                {item.year}
                                            </div>
                                            <div className="text-base font-bold text-foreground">
                                                {item.title}
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-background px-4 py-4 border-t border-border/50">
                                        <div className="text-sm font-mono text-muted-foreground uppercase tracking-wide mb-2">
                                            {item.company}
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div> */}

                    {/* Desktop Timeline View */}
                    <div className="space-y-8 lg:space-y-12">
                        {experience.map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative pl-8 border-l-2 border-border/50"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    delay: 0.7 + index * 0.1,
                                    duration: 0.6,
                                }}>
                                {/* Timeline dot */}
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                                <div className="space-y-2">
                                    <div className="text-sm font-mono text-primary">
                                        {item.year}
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-foreground">
                                        {item.title}
                                    </h4>
                                    <div className="text-sm font-mono text-muted-foreground uppercase tracking-wide">
                                        {item.company}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed pt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
