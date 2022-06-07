import { Avatar } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import axios from '../../axios';
import {Link} from 'react-router-dom';

function SidebarChat({addNewChat, name, id, onClick}) {

    const [seed, setSeed] = useState('5484');

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },[])

    const createChat = () => {
        const roomName = prompt("please enter a name for the chat");

        if(roomName){
            axios.post('/rooms/new',{
              "name": roomName,
              "messages": []
            });
        }
    }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}> 
    <div className="sidebarchat" onClick={() => onClick()}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat__info">
            <h2>{name}</h2>
            <p></p>
        </div>
    </div>
    </Link>
  ) :
  (
    <div className="sidebarchat"
    onClick={() => createChat()}
    >
        <h2>Add new chat</h2>
    
</div>
  )
}

export default SidebarChat