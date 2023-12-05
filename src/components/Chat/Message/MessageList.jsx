import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { AiFillCloseCircle } from 'react-icons/ai'
import { addMessage, getMessages } from '../../../api/messageRequestApi';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { format } from 'timeago.js';
import { BounceLoader, PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export default function MessageList({ currentChat, chatClicked, setSendMessage, receivedMessage }) {
  const [showEmoji, setShowEmoji] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [sendLoading, setSendLoading] = useState(false)
  const navigate= useNavigate()
  const user = useSelector((state) => state.user.details)
  

  const sentMessage = async (e) => {
    e.preventDefault()
    
    if(message.trim()===""){
      return;
    }
    setSendLoading(true)
    try {
      const { data } = await addMessage({
        chatId: currentChat._id,
        senderId: user._id,
        text: message
      })
      const tempMessage={
        text:message,
        createdAt:new Date(),
        senderId:user._id,
        receiverId:currentChat?.doctorId?._id
      }

      setMessages([...messages, tempMessage])
      setSendMessage(tempMessage)
      setMessage("")

    } catch (err) {
      console.log(err)
    }
    setSendLoading(false)
  }

  useEffect(() => {
    try {
      (async function () {
        const { data } = await getMessages(currentChat._id)
        if (!data.err)
          setMessages(data.result)
      })()

    } catch (err) {
      console.log(err)
    }
  }, [currentChat])

 

  useEffect(()=>{
    if(receivedMessage && currentChat?.doctorId?._id==receivedMessage?.senderId){
      setMessages([...messages, receivedMessage])
    }
  },[receivedMessage])


  return (
    <div className={`col-md-6 col-lg-7 col-xl-8 ${!chatClicked && 'hide-sec'} `}>
      {
        currentChat ?

          <>
            <div className="row ps-2 d-flex align-items-center message-head" style={{ height: "45px" }}>
              <div className='d-flex align-items-center' style={{ gap: "10px" }} >
                <i className="fa-sharp fa-solid fa-arrow-left-long" onClick={()=>navigate("/chat")}  />
                <Avatar alt="Remy Sharp" sx={{ width: 32, height: 32 }} src={currentChat.doctorId.image && currentChat.doctorId.image.url} />
                <b className="ps-1">{currentChat.doctorId.name}</b>
              </div>
            </div>
            <div className=" message-box pt-2" data-mdb-perfect-scrollbar="true" style={{ position: 'relative'}}>
              
              {/* <div className="d-flex flex-row single-chat-container">
                <div className='sg-chat'>
                  <p className="small p-2 mb-1 rounded-3 single-chat">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                  </p>
                  <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                    12:00 PM | Aug 13
                  </p>
                </div>
              </div> */}
              
              {
                messages[0] &&
                messages.map((item, index) => {
                  return (
                    <div className={`d-flex flex-row single-chat-container ${user._id === item.senderId ? 'me' : ''}`}  key={index}>
                      <div className={`sg-chat ${user._id === item.senderId ? 'me' : ''}`}>
                        <p className={`small p-2 mb-1 rounded-3 single-chat ${user._id === item.senderId ? 'me' : ''}`}>
                          {item.text}
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          {format(item.createdAt)} | {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <form onSubmit={sentMessage} className={`text-muted chat-input-box d-flex justify-content-start align-items-center pe-3 pt-3 mt-2  ${!chatClicked && 'hide-sec'} `}>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control form-control-lg" id="exampleFormControlInput2" placeholder="Type message" />
              {/* <span className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip" /></span> */}
              <a className="ms-3 text-muted" onClick={() => setShowEmoji(true)}>
                <i className="fas fa-smile" />
              </a>
              <span className="ms-3" onClick={sentMessage}>
                {
                  sendLoading ?
                    <BounceLoader size={20} speedMultiplier={1.2} />
                    :
                    <i className="fas fa-paper-plane" />
                }
              </span>
            </form>
            {showEmoji &&
              <div className="emoji-container">
                <div className="emoji-box">
                  <AiFillCloseCircle className="icon" onClick={() => setShowEmoji(false)} />
                  <EmojiPicker onEmojiClick={(data) => setMessage(prev => prev + data.emoji)} />
                </div>
              </div>
            }
          </>
          :
          <div className="tap-on-chat-main">
            <div className="tap-container">
              <h4>
                Tap on a chat to start conversation...
              </h4>
            </div>
          </div>
      }
    </div>
  )
}
