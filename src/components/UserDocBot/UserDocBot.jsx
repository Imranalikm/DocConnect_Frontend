import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from '@chatscope/chat-ui-kit-react'

import { useState } from 'react'
import UserHeader from "../UserHeader/UserHeader"
import docbot from "../../assets/images/docbt.jpg"
const API_KEY ="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 "

const UserDocBot = () => {
    const [typing,setTyping] =useState()
  const [messages,setMessages]=useState([{
     message:"Hello,I am Dr.Bot!",
     sender:'ChatGPT'
  }])

  const handleSend =async (message)=>{
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
  }

     async function processMessageToChatGPT(chatMessages) {
      let apiMessages = chatMessages.map((messageObject) => {
        let role = "";
        if (messageObject.sender === "chatGPT") {
          role = "assistant";
        } else {
          role = "user";
        }
        return { role: role, content: messageObject.message };
      });
    
      const systemMessage = {
        role: "system",
        content: "Answer for medical or health related queries only!.answer should be short.Dont answer for other questions",
      };
    
      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...apiMessages],
      };
    
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY, // Fixed the typo in "Authorization"
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.choices[0].message.content);
          setMessages([...chatMessages,{
            message:data?.choices[0]?.message?.content,
            sender:"chatGPT"
          }])
        });
        setTyping(false);
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
