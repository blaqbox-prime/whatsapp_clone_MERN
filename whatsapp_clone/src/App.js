import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  // const [user, setUser] = useState(null);
  const {user,
    isAuthenticated,
    loginWithRedirect,
    logout,} = useAuth0();

  // Get Rooms ------------------
  useEffect(() => {
    axios.get("/rooms/sync").then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }, []);

  // Initial Subscribe to backend ----------------
  useEffect(() => {
    const pusher = new Pusher("2ef8e42ac2a86cf936b0", {
      cluster: "mt1",
    });

    // var channel = pusher.subscribe("messages");
    // channel.bind("update", function (data) {
    //   // alert(JSON.stringify(data));
    //   setMessages([...messages, data]);
    // });

    var chatroomsChannel = pusher.subscribe("chatrooms");
    chatroomsChannel.bind("insert", function (data) {
      setRooms([...rooms,data]);
    })

    return () => {
      // channel.unbind_all();
      // channel.unsubscribe();
      chatroomsChannel.unbind_all()
      chatroomsChannel.unsubscribe();
    };
  }, [rooms]);

  console.log(user);

  //BEM Convention
  return !user ? (
    <Login />
  )
  : (
    <div className="app">
      <div className="app__body">
        <Router>
            {/* Sidebar */}
            <Sidebar rooms={rooms} onRoomClick={setSelectedRoom}/>
          <Routes>
            {/* Chat  */}
            <Route path="/rooms/:roomId"
              element={<Chat room={selectedRoom}/>}
            />
          </Routes>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
