import { useState, useRef } from "react"
import { FLOWISE_CONFIG, FLOWISE_PREDICTION_ENDPOINT } from "../services/api"

export const useChatStream = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "bot",
            text: "Hi! I'm Marie—Franz's AI assistant. Ask me anything about his projects, skills, or experience!",
        },
    ])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Session management with localStorage persistence
    const [sessionId] = useState(() => {
        const stored = localStorage.getItem("flowise-session-id")
        if (stored) return stored
        const newId = `session-${Date.now()}`
        localStorage.setItem("flowise-session-id", newId)
        return newId
    })

    // Ref to abort the stream if the user cancels/leaves
    const abortControllerRef = useRef(null)

    const sendMessage = async userText => {
        if (!userText.trim()) return

        setIsLoading(true)
        setError(null)

        const userMessage = {
            id: Date.now(),
            role: "user",
            text: userText,
        }
        setMessages(prev => [...prev, userMessage])

        const botMessageId = Date.now() + 1

        try {
            abortControllerRef.current = new AbortController()

            console.log("=== Flowise API Call ===")
            console.log("Endpoint:", FLOWISE_PREDICTION_ENDPOINT)
            console.log("Has API Key:", !!FLOWISE_CONFIG.apiKey)
            console.log("Session ID:", sessionId)
            console.log("Question:", userText)

            const requestBody = {
                question: userText,
                overrideConfig: {
                    sessionId: sessionId,
                },
            }

            console.log("Request Body:", requestBody)

            const resp = await fetch(FLOWISE_PREDICTION_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${FLOWISE_CONFIG.apiKey}`,
                },
                body: JSON.stringify(requestBody),
                signal: abortControllerRef.current.signal,
            })

            console.log("=== Response Info ===")
            console.log("Status:", resp.status)
            console.log("OK:", resp.ok)
            console.log("Content-Type:", resp.headers.get("content-type"))

            if (!resp.ok) {
                const errorText = await resp.text()
                console.error("Error Response:", errorText)
                throw new Error(`API Error: ${resp.status}`)
            }

            // Get the full response as text first
            const responseText = await resp.text()
            console.log("=== Raw Response ===")
            console.log(responseText)

            // Try to parse as JSON
            let botResponse = ""
            try {
                const jsonData = JSON.parse(responseText)
                console.log("=== Parsed JSON ===")
                console.log(jsonData)

                // Try different possible field names that Flowise might use
                botResponse =
                    jsonData.text ||
                    jsonData.answer ||
                    jsonData.response ||
                    jsonData.output ||
                    jsonData.result ||
                    jsonData.message ||
                    (jsonData.data && jsonData.data.text) ||
                    responseText

                console.log("Extracted Bot Response:", botResponse)
            } catch {
                // If not JSON, use raw text
                console.log("Not JSON, using raw text")
                botResponse = responseText
            }

            // Add bot message with the response
            setMessages(prev => [
                ...prev,
                {
                    id: botMessageId,
                    role: "bot",
                    text: botResponse,
                },
            ])
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Request aborted by user")
            } else {
                console.error("=== Error ===", err)

                let errorMessage = "Something went wrong. Please try again."
                if (err.message.includes("Failed to fetch")) {
                    errorMessage =
                        "Unable to connect to AI service. Check your internet connection."
                } else if (
                    err.message.includes("401") ||
                    err.message.includes("403")
                ) {
                    errorMessage =
                        "Authentication failed. Please check API credentials."
                } else if (err.message.includes("429")) {
                    errorMessage = "Rate limit exceeded. Please wait a moment."
                }

                setError(errorMessage)
            }
        } finally {
            setIsLoading(false)
            abortControllerRef.current = null
        }
    }

    return {
        messages,
        sendMessage,
        isLoading,
        error,
    }
}

export default useChatStream
