import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect,useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './css/chat.css';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useParams, withRouter } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase/compat/app';
import { useStateValue } from './StateProvider';
//import { withRouter } from 'react-router-dom';

function Chat() {

    let {roomId} = useParams();
    const[roomName, setRoomName] = useState("");
    const[messages,setMessages] = useState([]);
    const[{user},dispatch] = useStateValue();

    const[input,setInput] =useState("");

    useEffect(() =>{
        console.log(roomId)
        if(roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection("rooms").doc(roomId).collection("message").orderBy
            ("timestamp","asc").onSnapshot(snapshot =>{
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    },[roomId])

    const sendMessage =(e)=>{
        e.preventDefault();
        if(input==="")
        {
            return alert("Please enter your message...")
        }
        db.collection("rooms").doc(roomId).collection("message").add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");

    }    

        
  return (
    <div className="chat">
        <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>
                    {
                        new Date(messages[messages.length-1]?.timestamp?.seconds*1000)
                        .toLocaleTimeString()
                    }
                </p>
            </div>
            <div className="header__right">
                <IconButton><SearchIcon /></IconButton>
                <IconButton><AttachFileIcon /></IconButton>
                <IconButton><MoreVertIcon /></IconButton>
            </div>
        </div>

        <div className="chat__body">
        {
            messages.map(message =>(
            <p className={`chat__message ${user.displayName==message.name && "chat__reciever"}`}>
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__time">
                    {
                        new Date(message.timestamp?.seconds*1000)
                        .toLocaleTimeString()
                        
                    }
                </span>
            </p>

            ))
        }
            

            {/* <p className="chat__message chat__reciever">
                <span className="chat__name">Akshu</span>
                This is a message....
                <span className="chat__time">11.15am</span>
            </p>

            <p className="chat__message chat__reciever">
                <span className="chat__name">Akshu</span>
                This is a message....
                <span className="chat__time">11.15am</span>
            </p>

            <p className="chat__message ">
                <span className="chat__name">Akshu</span>
                This is a message....
                <span className="chat__time">11.15am</span>
            </p> */}
        </div>

        <div className="chat__footer">
            <EmojiEmotionsIcon />
            <AttachFileIcon />

            <form onSubmit={sendMessage}>
                <input type="text" value={input} placeholder='Type your message...' 
                onChange={e => setInput(e.target.value)}/>
                <input type="submit" />
            </form>

            <MicIcon />

        </div>
      
    </div>
  )
}


export default withRouter(Chat)
