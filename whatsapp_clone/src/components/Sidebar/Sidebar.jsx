import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, {useState, useEffect} from "react";
import SidebarChat from "../SidebarChat/SidebarChat";
import "./Sidebar.css";

function Sidebar() {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
  
    return () => {
    }
  }, [])
  

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* ===================================================== */}
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      {/* =================================================== */}
      <div className="sidebar__chats">
          <SidebarChat addNewChat/>
        {rooms.map((room) => (<SidebarChat key={room.id} id={room.name} name={room.name}/>))}
      </div>
    </div>
  );
}

export default Sidebar;
