// src/components/chatbot/ChatWidget.jsx
import { useState, useRef, useEffect } from "react"
import useChatStream from "../../hooks/useChatStream"
import { Send, X, MessageSquare, Loader2 } from "lucide-react"

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const { messages, sendMessage, isLoading, error } = useChatStream()

    const messagesEndRef = useRef(null)

    // Suggested questions to help users get started
    const suggestedQuestions = [
        "What are Franz's main skills?",
        "Tell me about Franz's projects",
        "What's Franz's work experience?",
        "How can I contact Franz?",
    ]

    // Show suggested questions only when there's just the initial greeting
    const showSuggestions = messages.length === 1

    // Auto-scroll logic
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSubmit = e => {
        e.preventDefault()
        if (!inputValue.trim() || isLoading) return
        sendMessage(inputValue)
        setInputValue("")
    }

    const handleSuggestedQuestion = question => {
        if (isLoading) return
        sendMessage(question)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[380px] h-[550px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden backdrop-blur-sm">
                    {/* Header */}
                    <div className="bg-muted/50 backdrop-blur-sm p-4 border-b border-border flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="font-medium text-foreground font-mono text-sm">
                                AI Assistant
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/95">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${
                                    msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}>
                                <div
                                    className={`max-w-[85%] p-3 rounded-xl text-sm ${
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-none font-mono"
                                            : "bg-card border border-border text-foreground rounded-bl-none shadow-sm"
                                    }`}>
                                    <div className="whitespace-pre-wrap wrap-break-word">
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading &&
                            messages[messages.length - 1]?.role === "bot" &&
                            !messages[messages.length - 1]?.text && (
                                <div className="flex justify-start">
                                    <div className="bg-card border border-border rounded-xl rounded-bl-none p-3">
                                        <div className="flex gap-1">
                                            <div
                                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0ms",
                                                }}></div>
                                            <div
                                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "150ms",
                                                }}></div>
                                            <div
                                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "300ms",
                                                }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Suggested Questions */}
                        {showSuggestions && !isLoading && (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground text-center font-mono">
                                    Try asking:
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                    {suggestedQuestions.map(
                                        (question, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    handleSuggestedQuestion(
                                                        question
                                                    )
                                                }
                                                className="px-3 py-2 bg-muted/50 hover:bg-primary/20 border border-border hover:border-primary/50 rounded-lg text-xs text-foreground text-left transition-all hover:scale-[1.02] active:scale-[0.98] font-mono">
                                                {question}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="text-destructive text-xs text-center p-2 bg-destructive/10 rounded border border-destructive/20">
                                {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-3 bg-muted/30 backdrop-blur-sm border-t border-border flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-2.5 bg-input border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95">
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Send size={18} />
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Button (FAB) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-primary/20">
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    )
}
