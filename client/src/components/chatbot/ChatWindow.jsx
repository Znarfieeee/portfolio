// src/components/chatbot/ChatWindow.jsx
import { useRef, useEffect } from "react"
import useChatStream from "../../hooks/useChatStream"
import { Send, Loader2 } from "lucide-react"

export default function ChatWindow({
    onClose,
    inputValue,
    setInputValue,
    isOpen,
}) {
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

    if (!isOpen) return null

    return (
        <div className="w-full h-full bg-card rounded-t-3xl sm:rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="bg-muted/50 backdrop-blur-sm p-3 sm:p-4 border-b border-border flex justify-between items-center shrink-0">
                <div className="fixed inset-0 z-50 sm:relative sm:inset-0 flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shrink-0" />
                    <span className="font-medium text-foreground font-mono text-xs sm:text-sm truncate">
                        AI Assistant
                    </span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                        ✕
                    </button>
                )}
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 space-y-2.5 sm:space-y-4 bg-background/95">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}>
                        <div
                            className={`max-w-[90%] sm:max-w-[85%] p-2 sm:p-3 rounded-xl text-xs sm:text-sm leading-normal ${
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-br-none font-mono wrap-break-word"
                                    : "bg-card border border-border text-foreground rounded-bl-none shadow-sm wrap-break-word"
                            }`}>
                            <div className="whitespace-pre-wrap wrap-break-word">
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading indicator with 3 bounce circles */}
                {isLoading &&
                    messages[messages.length - 1]?.role === "bot" &&
                    !messages[messages.length - 1]?.text && (
                        <div className="flex justify-start">
                            <div className="bg-card border border-border rounded-lg sm:rounded-xl rounded-bl-none p-3 sm:p-4">
                                <div className="flex gap-2 sm:gap-3 items-center justify-center h-8 sm:h-10">
                                    <div
                                        className="bounce-ball"
                                        style={{ animationDelay: "0s" }}
                                    />
                                    <div
                                        className="bounce-ball"
                                        style={{ animationDelay: "0.15s" }}
                                    />
                                    <div
                                        className="bounce-ball"
                                        style={{ animationDelay: "0.3s" }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                {/* Suggested Questions */}
                {showSuggestions && !isLoading && (
                    <div className="space-y-2 mt-2">
                        <p className="text-xs text-muted-foreground text-center font-mono px-1">
                            Try asking:
                        </p>
                        <div className="grid grid-cols-1 gap-1.5 sm:gap-2 px-0.5 sm:px-0">
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        handleSuggestedQuestion(question)
                                    }
                                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-muted/50 hover:bg-primary/20 border border-border hover:border-primary/50 rounded-lg text-xs text-foreground text-left transition-all hover:scale-[1.02] active:scale-[0.98] font-mono line-clamp-2">
                                    {question}
                                </button>
                            ))}
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
                className="p-2 sm:p-3 bg-muted/30 backdrop-blur-sm border-t border-border flex gap-2 shrink-0">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Ask..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-input border border-border rounded-full text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono min-w-0"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2 sm:p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shrink-0">
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        <Send size={20} />
                    )}
                </button>
            </form>
        </div>
    )
}
