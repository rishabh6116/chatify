import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import '../App.css';
import { FaPaperPlane } from 'react-icons/fa';
import SocketIOClient from 'socket.io-client';
import ChatBG from '../assets/bg.jpg';

const ChatPage = () => {
  const { username } = useParams();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null); 
  const chatEndRef = useRef(null);

  const audioRef = useRef(null); 

  useEffect(() => {
    const newSocket = SocketIOClient('http://localhost:8000');
    setSocket(newSocket);

    newSocket.on('chat', (chatMessage) => {
      setChats((prevChats) => [...prevChats, chatMessage]);

      if (chatMessage.sender !== username) {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
      }
    });

    return () => {
      newSocket.close();
    };
  }, [setSocket, username]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat', { sender: username, message });
      setMessage('');
    }
  };

  return (
    <main 
      style={{
        backgroundImage: `url(${ChatBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Header />
      <Link to='/' className='logout-link'>LOGOUT</Link>

      <div className='chat-container'>
        {chats.map((chat, index) => (
          <div 
            key={index} 
            className={chat.sender === username ? 'my-chat' : 'notmy-chat'}
          >
            <p>
              <span className='user'>
                {chat.sender === username ? `You: ${username}` : `User: ${chat.sender}`}
              </span>
              <span className='msg'>{chat.message}</span>
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className='chatbox-container'>
        <div className='chatbox'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter a new message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit'>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      <audio ref={audioRef} src='/notification.mp3' preload='auto' />
    </main>
  );
};

export default ChatPage;
