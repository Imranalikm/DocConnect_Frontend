import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from '@chatscope/chat-ui-kit-react'

import { useState } from 'react'
import UserHeader from "../UserHeader/UserHeader"
import docbot from "../../assets/images/docbt.jpg"

const API_KEY = "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"


const UserDocBot = () => {
   
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Dr.Bot!",
      sender: 'ChatGPT',
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    try {
      await processMessageToChatGPT(newMessages);
    } catch (error) {
      console.error('Error processing message to ChatGPT:', error);
    } finally {
      setTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Add a function to check if the message is health-related
    const isHealthRelated = (message) => {
      // You can customize this logic based on your requirements
      const healthKeywords = ["health", "medicine", "symptoms", "doctor", "medical"];
      return healthKeywords.some(keyword => message.toLowerCase().includes(keyword));
    };

    const userMessage = apiMessages.find(messageObject => messageObject.role === "user");
    
    if (userMessage && isHealthRelated(userMessage.content)) {
      const systemMessage = {
        role: "system",
        content: "Answer for medical or health-related queries only! The answer should be short. Don't answer other questions.",
      };

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...apiMessages],
      };

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        });

        const data = await response.json();
        console.log(data);

        if (data.choices && data.choices.length > 0) {
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          }]);
        }
      } catch (error) {
        console.error('Error processing API response:', error);
      }
    } else {
      // If the user's message is not health-related, provide a default response
      setMessages([...chatMessages, {
        message: "I'm sorry, I can only answer questions related to health and the medical field. Please ask a health-related question.",
        sender: "ChatGPT",
      }]);
    }
  }
    

  return (
    <>
       <UserHeader/>
       <div className="Docbot" style={{ display: 'flex', justifyContent: "center", alignContent: "center", height:'100%',width:'100%',background:`url(${docbot})`,backgroundSize:'contain' }}>

        <div style={{position:'relative',height:'550px',width:"600px",marginTop:"25px",borderRadius:'10px',marginBottom:'15px'}}>
                <MainContainer style={{borderRadius:'15px'}} >
                  <ChatContainer >
                    <MessageList typingIndicator={typing ? <TypingIndicator content="Dr.BOT is typing.." />:null} color='black'>
                           {
                            messages.map((message,i)=>{
                              return <Message  key={i} model={message}/>
                            })
                           }
                    </MessageList>
                    <MessageInput placeholder='Type Message Here' onSend={handleSend}/>
                  </ChatContainer>
                </MainContainer>
        </div>
      </div>
       
    </>
  )
}

export default UserDocBot;
