import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import React,{useEffect, useState} from 'react'
import './Chat.css'
import axios from '../../axios';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import Pusher from 'pusher-js';


function Chat({room}) {
    const [seed, setSeed] = useState('5484');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams();


    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },[])

    // Initial Fetch
  useEffect(() => {
    axios.get(`rooms/${roomId}/messages/sync`)
    .then(res => {
      console.log(res.data);
      setMessages(res.data);
    });
  }, [roomId])
  

  // // Initial Subscribe to backend
  useEffect(() => {
    
    const pusher = new Pusher('2ef8e42ac2a86cf936b0', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('update', function(data) {
      // alert(JSON.stringify(data));
      setMessages([...messages,data]);
    });
  
    return () => {
      channel.unbind_all();
     channel.unsubscribe();
    }
  }, [messages])

  // console.log(messages);

    const sendMessage = (e) => {
      e.preventDefault();
      console.log(input);

      // send Message
      axios.post(`/rooms/${room._id}/messages/new`,
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
            <h3>{room && room.name}</h3>
            <p>{messages.length > 0 ? `last seen at ${messages[messages.length - 1].timestamp}`: ''}</p>
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

        {room && messages.map(message => (
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