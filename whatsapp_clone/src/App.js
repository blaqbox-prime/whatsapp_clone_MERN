import React, {useEffect, useState} from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App () {

  const [messages, setMessages] = useState([]);

  // Initial Fetch
  useEffect(() => {
    axios.get('/messages/sync')
    .then(res => {
      console.log(res.data);
      setMessages(res.data);
    });
  }, [])
  

  // Initial Subscribe to backend
  useEffect(() => {
    
    const pusher = new Pusher('2ef8e42ac2a86cf936b0', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('insert', function(data) {
      // alert(JSON.stringify(data));
      setMessages([...messages,data]);
    });
  
    return () => {
      channel.unbind_all();
     channel.unsubscribe();
    }
  }, [messages])

  console.log(messages);
  
  
    //BEM Convention 
    return (
      <div className="app">
          <div className="app__body">
            {/* Sidebar */}
            <Sidebar />
            {/* Chat  */}
            <Chat messages={messages}/>
          </div>
      </div>
    );
}

export default App;
