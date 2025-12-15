import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TypewriterRoles = ({
    roles,
    className = "",
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 1500,
    startAnimation = false,
}) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (!startAnimation || roles.length === 0) return

        const currentRole = roles[currentRoleIndex]

        const handleTyping = () => {
            if (isPaused) {
                // Wait during pause
                setIsPaused(false)
                setIsDeleting(true)
                return
            }

            if (!isDeleting && currentText !== currentRole) {
                // Typing forward
                setCurrentText(currentRole.slice(0, currentText.length + 1))
            } else if (!isDeleting && currentText === currentRole) {
                // Pause when complete
                setIsPaused(true)
                return
            } else if (isDeleting && currentText !== "") {
                // Deleting
                setCurrentText(currentText.slice(0, -1))
            } else if (isDeleting && currentText === "") {
                // Switch to next role
                setIsDeleting(false)
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
            }
        }

        const getDelay = () => {
            if (isPaused) return pauseDuration
            if (isDeleting) return deletingSpeed
            return typingSpeed
        }

        const timeout = setTimeout(handleTyping, getDelay())

        return () => clearTimeout(timeout)
    }, [
        currentText,
        isDeleting,
        isPaused,
        currentRoleIndex,
        roles,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        startAnimation,
    ])

    return (
        <div className={`inline-flex items-center ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    {currentText}
                </motion.span>
            </AnimatePresence>
            {(startAnimation && currentText.length > 0) && (
                <motion.span
                    className="inline-block w-0.5 h-5 sm:h-6 md:h-7 lg:h-8 ml-1 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ willChange: "opacity" }}
                />
            )}
        </div>
    )
}

export default TypewriterRoles
