# Flowise AI Chatbot Integration

## Overview
This portfolio includes an AI-powered chatbot using Flowise AI. The chatbot provides real-time answers about Franz's experience, projects, and skills.

## Features
- ✨ Real-time streaming responses
- 🎨 Dark theme matching portfolio design
- 💾 Session persistence across page refreshes
- 🔒 Secure API key handling
- 📱 Responsive design

## Configuration

### Environment Variables
The chatbot requires the following environment variables in `client/.env`:

```env
VITE_FLOWISE_API_URL=https://cloud.flowiseai.com
VITE_FLOWISE_CHATFLOW_ID=your-chatflow-id
VITE_FLOWISE_API_KEY=your-api-key
```

### Getting Flowise Credentials

1. **Sign up** at [cloud.flowiseai.com](https://cloud.flowiseai.com)
2. **Create a chatflow** with your portfolio/resume information
3. **Get Chatflow ID**: Found in the chatflow URL or settings
4. **Get API Key**: Navigate to Settings → API Keys → Create New Key

## Local Development

```bash
cd client
npm install
npm run dev
```

The chatbot will appear as a floating button in the bottom-right corner.

## Production Deployment

### Option 1: Environment Variables (Recommended for Platforms like Vercel, Netlify)

Set environment variables in your hosting platform:
- `VITE_FLOWISE_API_URL`
- `VITE_FLOWISE_CHATFLOW_ID`
- `VITE_FLOWISE_API_KEY`

### Option 2: Build-time Configuration

For static hosting, ensure `.env` is configured before build:

```bash
npm run build
```

**⚠️ Security Note**: API keys will be included in the frontend bundle. For a public portfolio chatbot, this is acceptable if you:
- Enable rate limiting in Flowise chatflow settings
- Monitor usage in Flowise dashboard
- Set spending limits if applicable

## Customization

### Styling
The chatbot uses your portfolio's theme colors defined in `src/index.css`:
- Primary color (orange): `--primary: #e78a53`
- Background: `--background: #121113`
- Borders: `--border: #222222`

To customize, edit `src/components/chatbot/ChatWidget.jsx`.

### Initial Message
Edit the initial bot message in `src/hooks/useChatStream.js` (lines 5-11).

### Session Management
Sessions are stored in `localStorage` with key `flowise-session-id`. To clear:
```javascript
localStorage.removeItem('flowise-session-id')
```

## Troubleshooting

### Chatbot Not Responding
1. Check browser console for errors (F12)
2. Verify environment variables are loaded:
   ```javascript
   console.log(import.meta.env.VITE_FLOWISE_API_KEY)
   ```
3. Test Flowise API directly using curl or Postman
4. Check Flowise dashboard for errors or rate limits

### CORS Errors
- Flowise Cloud should have CORS enabled by default
- If using self-hosted Flowise, enable CORS in settings

### Streaming Issues
- Ensure `streaming: true` in request payload
- Check network tab to see SSE events
- Verify Flowise chatflow supports streaming

## Architecture

```
User Input → ChatWidget → useChatStream Hook → Flowise API → SSE Stream → UI Update
                                    ↓
                              localStorage (session)
```

## API Reference

**Endpoint**: `POST https://cloud.flowiseai.com/api/v1/prediction/{chatflowId}`

**Request**:
```json
{
  "question": "User's message",
  "streaming": true,
  "overrideConfig": {
    "sessionId": "unique-session-id"
  }
}
```

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {API_KEY}
```

**Response**: Server-Sent Events (SSE) stream with event types:
- `event: start` - Stream begins
- `event: token` + `data: <text>` - Text chunks
- `event: metadata` - Chat metadata
- `event: end` - Stream completes

## Files Structure

```
client/src/
├── components/chatbot/
│   └── ChatWidget.jsx          # UI component
├── hooks/
│   └── useChatStream.js        # Flowise integration logic
├── services/
│   └── api.js                  # API configuration
└── App.jsx                     # ChatWidget integration
```

## Support

For Flowise-specific issues:
- [Flowise Documentation](https://docs.flowiseai.com)
- [Flowise GitHub](https://github.com/FlowiseAI/Flowise)

For portfolio integration issues:
- Check browser console
- Review error messages in chat widget
- Verify API credentials
