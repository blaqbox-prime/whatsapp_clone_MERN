import { Avatar } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import './SidebarChat.css'

function SidebarChat({addNewChat, name, id}) {

    const [seed, setSeed] = useState('5484');

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },[])

    const createChat = () => {
        const roomName = prompt("please enter a name for the chat");

        if(roomName){
            
        }
    }

  return !addNewChat ? (
    <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat__info">
            <h2>{name}</h2>
            <p>last message...</p>
        </div>
    </div>
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