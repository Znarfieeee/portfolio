// src/components/chatbot/ChatWindow.jsx
import useChatStream from "../../hooks/useChatStream"

export default function ChatWindow() {
    // The logic is hidden inside this hook!
    const { messages, sendMessage, isLoading } = useChatStream()

    return (
        <div className="chat-window">
            {messages.map(msg => (
                <Bubble key={msg.id} text={msg.text} />
            ))}
            <Input onSend={sendMessage} />
        </div>
    )
}
