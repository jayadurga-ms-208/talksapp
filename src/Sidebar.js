import React, { useEffect,useState } from 'react'
import './Sidebar.css'
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import {collection, getDocs, } from 'firebase/firestore'
import db from './firebase'
import { useStateValue } from './StateProvider';


function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  const usersCollection = collection(db, 'rooms')
  
  // on mounted
  useEffect(() =>{ 
    getDocs(usersCollection).then((snap)=> {
      setRooms(
        snap.docs.map((doc) =>
        ({
          id:doc.id,
          data:doc.data()
        }))
      )
    })
  });

  return (
    <div className="sidebar">
        <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlinedIcon />
            <input placeholder="Search or start a new chat" text="text" />
          </div>
        </div>
        <div className="sidebar__chats">
            <SidebarChat addNewChat/>
            {rooms.map(room => (
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
        </div>
    </div>
  )
}

export default Sidebar