import React, {useState,useEffect} from 'react';
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import {collection, getDoc,doc, orderBy,query,getDocs } from 'firebase/firestore'

function Chat() {
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const[roomName,setRoomName] = useState("");
    const[messages,setMessages] = useState([]);
    const usersCollection = collection(db, 'rooms');

    useEffect(() => {
        const fetchRoomName = async () => {
            if (roomId) {
                const roomRef = doc(db, 'rooms', roomId);
                const roomSnap = await getDoc(roomRef);
                if (roomSnap.exists()) {
                    setRoomName(roomSnap.data().name);
                }
    
                const messagesRef = collection(roomRef, 'messages');
                const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc')); // Use query method here
                const messagesSnap = await getDocs(messagesQuery);
                if (!messagesSnap.empty) {
                    setMessages(messagesSnap.docs.map(doc => doc.data()));
                }
            }
        };
    
        fetchRoomName();
    }, [roomId]);

    const sendMesssage= (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);
        setInput("");
    }

  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha`} alt="avatar" />
            <div className='chat__headerInfo'>
                <h3>{roomName}</h3>
                <p>last seen at...</p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlinedIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>

        </div>
        <div className='chat__body'>
            {messages.map(message => (
                 <p className={`chat__message ${true && "chat__receiver"}`}>
                 <span className='chat__name'>{message.name}</span>
                 {message.message}
                 <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                 </p>
            ))}
           
        </div>
        <div className='chat__footer'>
            <InsertEmoticonIcon/>
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder='Type a message'
                type="text" />
                <button onClick={sendMesssage} type="submit"> Send a message</button>  
            </form>
            <MicIcon/>
        </div>
    </div>
  )
}

export default Chat