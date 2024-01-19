import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import { addDoc } from 'firebase/firestore';
import {collection } from 'firebase/firestore'
import db from './firebase'
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {

  const createChat = () =>
  {
    const roomName = prompt("Please enter your chat room name");
    if(roomName) {
      //Do some clever db stuff here
      const usersCollection = collection(db, 'rooms');
      addDoc(usersCollection,{
        name: roomName,
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat'>
        <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed`} alt="avatar" />
        <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>Last message...</p>
        </div>
    </div>
    </Link>
  ):(
    <div className='sidebarChat' onClick={createChat}>
     <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat