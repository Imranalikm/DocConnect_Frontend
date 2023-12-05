import { Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ChatList({ usersList, onlineUsers, lastMessage, setChatClicked, chatClicked }) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (usersList) {
      setUsers(usersList)
    }
  }, [usersList])
  const searchUsers = (e) => {
    try {
      let value = e.target.value
      let chats = usersList.filter((item, index) => {
        return item?.doctorId?.name?.match(new RegExp(value, 'i'))
      })
      setUsers(chats)
    } catch (err) {
      console.log(err)
    }

  }
  const defaultImg = "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png"
  return (
    <div className={`col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 chat-list ${chatClicked && 'hide-sec'}`}>
      <div className="">
        <div className="input-group srch rounded mb-3">
          <input type="search" onChange={searchUsers} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search" />
          </span>
        </div>
        <div data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: 400 }}>
          <ul className="list-unstyled mb-0">

            {
              users && users[0] &&
              users.map((chat, index) => {
                return (
                  <li className="p-2 border-bottom" key={index}>
                    <Link to={"/chat?id=" + chat?.doctorId?._id} onClick={() => setChatClicked(true)} className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div>
                          <img src={chat?.doctorId?.image?.url ? chat?.doctorId?.image?.url : defaultImg} alt="avatar" className="d-flex align-self-center me-3 chat-avatar" width={60} />
                          {
                            onlineUsers[chat?.doctorId?._id] &&
                            <span className="badge bg-success badge-dot" />
                          }
                        </div>
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{chat?.doctorId?.name}</p>
                          <p className="small text-muted">
                            {lastMessage[chat._id]}
                          </p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-muted mb-1">
                          {
                            onlineUsers[chat?.doctorId?._id] &&
                            <Chip label={"Active now"} color="primary" variant="outlined" />
                          }
                        </p>
                        {/* <span className="badge bg-danger rounded-pill float-end">2</span> */}
                      </div>
                    </Link>
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>
    </div>
  )
}

