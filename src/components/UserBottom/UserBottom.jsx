import React from 'react'
import { RiArchiveDrawerLine,RiQuestionAnswerFill, RiFileList3Fill, RiFileList3Line, RiFileListFill, RiHome2Fill, RiUser3Fill, RiMessageFill, RiSearch2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../../assets/css/bottomNav.css'
import { BsChatLeftText } from 'react-icons/bs';
function UserBottom({page}) {
    
  return (
    <div className="bottom-nav position-fixed fixed-bottom">
        <div className="bottom-nav-container">
            <div className={`bottom-nav-item ${page==='home' && 'active'}`}>
                <Link to="/">
                <RiHome2Fill className='icon'/>
                <span>Home</span>
                </Link>
            </div>
            <div className={`bottom-nav-item ${page==='search' && 'active'}`}>
                <Link to="/search">
                <RiSearch2Fill className='icon'/>
                <span>Search</span>
                </Link>
            </div>
            <div className={`bottom-nav-item ${page==='chat' && 'active'}`}>
                <Link to="/chat">
                <RiMessageFill className='icon'/>
                <span>Chat</span>
                </Link>
            </div>
            <div className={`bottom-nav-item ${page==='profile' && 'active'}`}>
                <Link to="/profile">
                <RiUser3Fill className='icon' />
                <span>Profile</span>

                </Link>
            </div>

        </div>
    </div>
  )
}

export default UserBottom