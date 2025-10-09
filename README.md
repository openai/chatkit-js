ChatKit is a batteries-included framework for building high-quality, AI-powered chat experiences. It’s designed for developers who want to add advanced conversational intelligence to their apps fast—with minimal setup and no reinventing the wheel. ChatKit delivers a complete, production-ready chat interface out of the box.

**Key features include:**

- **Deep UI customization** so that ChatKit feels like a first-class part of your app
- **Built-in response streaming** for interactive, natural conversations
- **Tool and workflow integration** for visualizing agentic actions and chain-of-thought reasoning
- **Rich interactive widgets** rendered directly inside the chat
- **Attachment handling** with support for file and image uploads
- **Thread and message management** for organizing complex conversations
- **Source annotations and entity tagging** for transparency and references

Simply drop the ChatKit component into your app, configure a few options, and you're good to go.

### What makes ChatKit different?

ChatKit is a framework-agnostic, drop-in chat solution.
You don’t need to build custom UIs, manage low-level chat state, or patch together various features yourself.
Just add the ChatKit component, give it a client token, and customize the chat experience as needed, no extra work needed.

## Quickstart

1. Generate a client token on your server.

   ```python
   from fastapi import FastAPI
   from pydantic import BaseModel
   from openai import OpenAI
   import os

   app = FastAPI()
   openai = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

   @app.post("/api/chatkit/session")
   def create_chatkit_session():
       session = openai.chatkit.sessions.create({
         # ...
       })
       return { client_secret: session.client_secret }
   ```

2. Install the React bindings

   ```bash
   npm install @openai/chatkit-react
   ```

3. Add the ChatKit JS script to your page

   ```html
   <script
     src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
     async
   ></script>
   ```

4. Render ChatKit

   ```tsx
   import { ChatKit, useChatKit } from '@openai/chatkit-react';

   export function MyChat() {
     const { control } = useChatKit({
       api: {
         async getClientSecret(existing) {
           if (existing) {
             // implement session refresh
           }

           const res = await fetch('/api/chatkit/session', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
           });
           const { client_secret } = await res.json();
           return client_secret;
         },
       },
     });

     return <ChatKit control={control} className="h-[600px] w-[320px]" />;
   }
   ```

## See working examples

- [Starter app](https://github.com/openai/openai-chatkit-starter-app) - Clone a repo to start with a fully working template
- [Samples](https://github.com/openai/openai-chatkit-advanced-samples) - See working examples of ChatKit and get inspired

## License

This project is licensed under the [Apache License 2.0](LICENSE).
