import React, { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Contact from "./sections/Contact"
import ChatWidget from "./components/chatbot/ChatWidget"

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showHamburger, setShowHamburger] = useState(false)
    const heroRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [effects, setEffects] = useState(() =>
        Array.from({ length: 9 }, () => ({
            rotate: 0,
            skewX: 0,
            skewY: 0,
            scale: 1,
        }))
    )
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Works", href: "#works" },
        // { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ]

    const handleHoverStart = () => {
        setEffects(
            Array.from({ length: 9 }, () => ({
                rotate: (Math.random() - 0.5) * 32,
                skewX: (Math.random() - 0.5) * 24,
                skewY: (Math.random() - 0.5) * 24,
                scale: 1 + Math.random() * 0.12,
            }))
        )
        setIsHovered(true)
    }
    const handleHoverEnd = () => setIsHovered(false)

    // Scroll detection for hamburger menu
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const heroHeight = heroRef.current.offsetHeight
                const scrollPosition = window.scrollY

                setShowHamburger(scrollPosition > heroHeight * 0.8)

                if (scrollPosition <= heroHeight * 0.8 && isMenuOpen) {
                    setIsMenuOpen(false)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [isMenuOpen])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMenuOpen])

    return (
        <>
            {/* Navigation */}
            <nav
                className={`z-50 bg-transparent transition-all duration-300 ${
                    showHamburger ? "fixed top-0 left-0 right-0" : "relative"
                }`}>
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                    <div
                        className={`flex ${
                            showHamburger ? "justify-end" : "justify-between"
                        } items-start py-4`}>
                        {/* Logo/Title - Hide when hamburger shows */}
                        {!showHamburger && (
                            <motion.div
                                className="text-muted-foreground font-mono text-lg tracking-wide select-none flex gap-px cursor-pointer opacity-100"
                                style={{ userSelect: "none" }}
                                onMouseEnter={handleHoverStart}
                                onMouseLeave={handleHoverEnd}>
                                {"Wabi Sabi".split("").map((char, idx) => (
                                    <motion.span
                                        key={idx}
                                        animate={
                                            isHovered
                                                ? effects[idx]
                                                : {
                                                      rotate: 0,
                                                      skewX: 0,
                                                      skewY: 0,
                                                      scale: 1,
                                                  }
                                        }
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                        whileTap={{ scale: 1.92 }}
                                        className="inline-block">
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}

                        <div className="flex items-end min-w-[180px] justify-end">
                            <AnimatePresence>
                                {!showHamburger && (
                                    <motion.div
                                        className="flex flex-col sm:flex-row items-end gap-2"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.1 }}>
                                        {navLinks.map(link => (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-mono text-sm tracking-wide uppercase">
                                                {link.name}
                                            </a>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Hamburger Menu Button - Show when in hamburger mode */}
                            <AnimatePresence>
                                {showHamburger && (
                                    <motion.button
                                        onClick={toggleMenu}
                                        className="flex justify-end p-2 text-foreground hover:text-primary transition-colors z-60 duration-400"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 3 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}>
                                        {isMenuOpen ? (
                                            <X className="w-6 h-6" />
                                        ) : (
                                            <Menu className="w-6 h-6" />
                                        )}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Full-Screen Hamburger Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && showHamburger && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {/* HOME Link */}
                            <motion.a
                                href="#home"
                                className="text-5xl md:text-7xl font-bold text-muted-foreground hover:text-foreground transition-colors duration-300 font-mono tracking-wider"
                                onClick={() => setIsMenuOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}>
                                HOME
                            </motion.a>

                            {/* Navigation Links */}
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="text-5xl md:text-7xl font-bold text-muted-foreground hover:text-foreground transition-colors duration-300 font-mono tracking-wider"
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 + (index + 1) * 0.1,
                                    }}>
                                    {link.name.toUpperCase()}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <Hero ref={heroRef} />
            <About />
            <Projects />
            <Contact />

            {/* AI Chatbot Widget */}
            <ChatWidget />
        </>
    )
}

export default App
