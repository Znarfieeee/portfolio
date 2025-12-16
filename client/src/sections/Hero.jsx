/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import DecryptText from "@/components/DecryptText"
import TypewriterRoles from "@/components/TypewriterRoles"
import OrganicImage from "@/components/OrganicImage"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import HeroImg from "@/assets/images/Img3.jpg"

const Hero = React.forwardRef((props, ref) => {
    const [showPrefix, setShowPrefix] = useState(false)
    const [startTypewriter, setStartTypewriter] = useState(false)

    // Scroll animations for text content
    const { scrollYProgress } = useScroll()
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const roles = [
        "Video Editor",
        "Cinematographer",
        "web dev",
        "fullstack web developer",
    ]

    const handleNameComplete = () => {
        setShowPrefix(true)
    }

    const handlePrefixComplete = () => {
        setStartTypewriter(true)
    }

    return (
        <section
            className="flex min-h-100vh items-center bg-background pt-4"
            ref={ref}
            id="home">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-2">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="space-y-8 lg:space-y-10"
                        style={{ y: textY, opacity: textOpacity }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}>
                        {/* Name and Role */}
                        <div className="space-y-4 lg:space-y-6 mt-20 md:mt-5">
                            <DecryptText
                                text="Mari Franz Espelita"
                                className="text-4xl sm:text-6xl lg:text-6xl xl:text-6xl font-bold text-foreground leading-none tracking-tight"
                                delay={100}
                                onComplete={handleNameComplete}
                            />

                            <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl lg:text-3xl">
                                {showPrefix && (
                                    <DecryptText
                                        text="I'm a"
                                        className="text-muted-foreground font-mono"
                                        delay={0}
                                        onComplete={handlePrefixComplete}
                                        as="span"
                                    />
                                )}
                                <TypewriterRoles
                                    roles={roles}
                                    className="font-mono text-primary"
                                    startAnimation={startTypewriter}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        {startTypewriter && (
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}>
                                <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                                    Available for global opportunities,
                                    committed to crafting tailored full-stack
                                    web solutions that are both technically
                                    sound and user-focused.
                                </p>

                                {/* Contact Button */}
                                <a href="#contact">
                                    <Button
                                        size="lg"
                                        className="bg-foreground mx-auto text-background hover:bg-foreground/90 rounded-full px-8 group">
                                        CONTACT
                                        <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Button>
                                </a>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Content - Hero Image with Organic Shape */}
                    <OrganicImage
                        src={HeroImg}
                        alt="Mari Franz Espelita - Full Stack Web Developer"
                        className="aspect-3/4"
                    />
                </div>
            </div>
        </section>
    )
})

Hero.displayName = "Hero"

export default Hero
