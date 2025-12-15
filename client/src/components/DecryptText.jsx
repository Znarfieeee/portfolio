import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*"

const DecryptText = ({
    text,
    className = "",
    delay = 0,
    onComplete,
    as = "div",
}) => {
    const [displayText, setDisplayText] = useState(text.split("").map(() => ""))
    const isCompleteRef = useRef(false)

    useEffect(() => {
        const chars = text.split("")
        let currentIndex = 0
        let iterations = 0
        const maxIterations = 8 // Number of random characters per position
        let interval

        const startAnimation = () => {
            interval = setInterval(() => {
                setDisplayText(prevText =>
                    prevText.map((char, index) => {
                        // If this is a space, always show non-breaking space
                        if (chars[index] === " ") return "\u00A0"

                        // If we're past this character, show the final character
                        if (index < currentIndex) {
                            return chars[index]
                        }

                        // If this is the current character being decrypted
                        if (index === currentIndex) {
                            // After enough iterations, reveal the actual character
                            if (iterations >= maxIterations) {
                                return chars[index]
                            }
                            // Show random character
                            return CHARSET[
                                Math.floor(Math.random() * CHARSET.length)
                            ]
                        }

                        // Characters not yet started
                        return ""
                    })
                )

                iterations++

                // Move to next character after max iterations
                if (iterations > maxIterations) {
                    currentIndex++
                    iterations = 0

                    // If we've completed all characters
                    if (currentIndex >= chars.length) {
                        clearInterval(interval)
                        if (!isCompleteRef.current && onComplete) {
                            isCompleteRef.current = true
                            onComplete()
                        }
                    }
                }
            }, 30) // 50ms between updates for smooth animation
        }

        const timeout = setTimeout(() => {
            startAnimation()
        }, delay)

        return () => {
            if (interval) clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [text, delay, onComplete])

    const Component = as

    return (
        <Component className={className}>
            {displayText.map((char, index) => (
                <motion.span
                    key={`${text}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: index * 0.02,
                        duration: 0.5,
                    }}
                    style={{
                        display: "inline-block",
                        willChange: "opacity",
                    }}>
                    {char || "\u00A0"}
                </motion.span>
            ))}
        </Component>
    )
}

export default DecryptText
