import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import React,{useEffect, useState} from 'react'
import './Chat.css'
import axios from '../../axios';
import moment from 'moment';

function Chat({messages}) {
    const [seed, setSeed] = useState('5484');
    const [input, setInput] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },[])

    const sendMessage = (e) => {
      e.preventDefault();
      console.log(input);

      // send Message
      axios.post('/messages/new',
      {
        "message": input,
        "name": "Prime",
        "timestamp": moment().format('LT'), 
        "recieved": false
    });

      setInput('');

      
    }

  return (
    <div className='chat'>
        <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
            <h3>Room Name</h3>
            <p>last seen at ....</p>
        </div>
        <div className="chat__headerRight">
        <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        </div>
        {/*  */}
        <div className="chat__body">

        {messages.map(message => (
          <p className={`chat__message ${!message.recieved && 'chat__reciever'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>

        ))}
        </div>
        {/*  */}
        <div className="chat__footer">
          <IconButton>
            <InsertEmoticon />
          </IconButton>
          <form>
            <input type="text" placeholder='Type a message' value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={sendMessage} type="submit" >Send a message</button>
          </form>
          <IconButton><Mic /></IconButton>
        </div>
    </div>
  )
}

export default Chat