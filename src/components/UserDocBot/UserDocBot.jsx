import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from '@chatscope/chat-ui-kit-react'

import { useState } from 'react'
import UserHeader from "../UserHeader/UserHeader"

const API_KEY ="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"

const UserDocBot = () => {
    const [typing,setTyping] =useState()
  const [messages,setMessages]=useState([{
     message:"Hello,I am Dr.Bot!",
     sender:'ChatGPT'
  }])

  const handleSend =async (message)=>{
     const newMessage ={
      message:message,
      sender:'user',
      direction:"outgoing"
     }

     const newMessages=[...messages,newMessage] 
     setMessages(newMessages);
     setTyping(true);
     await processMessageToChatGPT(newMessages)
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
        content: "Answer for medical or health related queries only!.answer should be short",
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
            message:data.choices[0].message.content,
            sender:"chatGPT"
          }])
        });
        setTyping(false);
    }
    

  return (
    <>
       <UserHeader/>
       <div className="Docbot" style={{ display: 'flex', justifyContent: "center", alignContent: "center", height:'100%',width:'100%',background:'url("https://img.freepik.com/premium-photo/hospital-hallway-with-blue-floor-plant-corner_937837-5.jpg?w=900")' }}>

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
