/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Copy,
    Check,
    Github,
    Linkedin,
    Facebook,
    Instagram,
    Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [copied, setCopied] = useState(false)
    const sectionRef = useRef(null)
    const email = "marifranzespelita@gmail.com"

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

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy email:", err)
        }
    }

    const socials = [
        {
            name: "GitHub",
            icon: Github,
            url: "https://github.com/Znarfieeee",
            color: "hover:text-foreground",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: "https://linkedin.com/marifranzespelita",
            color: "hover:text-[#12a7cc]",
        },
        {
            name: "Facebook",
            icon: Facebook,
            url: "https://twitter.com/prnsssdagreat",
            color: "hover:text-[#1DA1F2]",
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://instagram.com/ambotoykapoy",
            color: "hover:text-[#cc128b]",
        },
    ]

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="min-h-screen bg-background py-20 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-mono tracking-tight">
                        LET'S CONNECT
                    </h2>
                    <div className="mt-4 h-1 w-20 bg-primary"></div>
                </motion.div>

                {/* Contact Content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Message */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}>
                        <div className="space-y-6">
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                I'm always interested in hearing about new
                                projects and opportunities. Whether you have a
                                question or just want to say hi, feel free to
                                reach out!
                            </p>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                Currently available for freelance work and
                                full-time positions worldwide. Let's build
                                something amazing together.
                            </p>
                        </div>

                        {/* Availability Indicator */}
                        <div className="flex items-center gap-3 pt-4">
                            <div className="relative flex items-center">
                                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <span className="text-sm font-mono text-muted-foreground">
                                Available for new opportunities
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Contact Info */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}>
                        {/* Email */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-mono text-primary uppercase tracking-wide">
                                Email
                            </h3>
                            <div className="flex items-center gap-3 p-4 bg-muted/5 border border-border/50 rounded-lg">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a
                                    href={`mailto:${email}`}
                                    className="text-foreground hover:text-primary transition-colors flex-1 truncate">
                                    {email}
                                </a>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleCopyEmail}
                                    className="shrink-0">
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-mono text-primary uppercase tracking-wide">
                                Social
                            </h3>
                            <div className="flex gap-4">
                                {socials.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 bg-muted/5 border border-border/50 rounded-lg text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={
                                            isVisible
                                                ? { opacity: 1, y: 0 }
                                                : {}
                                        }
                                        transition={{
                                            delay: 0.5 + index * 0.1,
                                            duration: 0.6,
                                        }}
                                        whileHover={{ y: -5 }}>
                                        <social.icon className="w-6 h-6" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer
                    className="mt-32 pt-12 border-t border-border/50"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="text-sm text-muted-foreground">
                            © 2025 Mari Franz Espelita. All rights reserved.
                        </div>
                        <div className="text-sm font-mono text-muted-foreground">
                            Built with React + Vite + Tailwind CSS + Flowise
                        </div>
                    </div>
                </motion.footer>
            </div>
        </section>
    )
}

export default Contact
