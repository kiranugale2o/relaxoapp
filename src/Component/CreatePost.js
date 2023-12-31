import React, { useState ,useEffect} from "react";
 import Postpage from "../PostHandle/Postpage";
 import Profiledata from "../Relaxobackend/Profiledata";
 import PostData from '../Relaxobackend/PostData';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { initializeApp } from "firebase/app";
import './createpost.css';
import Picker from 'emoji-picker-react';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { StaticRouter } from "react-router-dom/cjs/react-router-dom";
import userEvent from "@testing-library/user-event";
//import Emoji from "./Emoji";
const firebaseConfig = {
  apiKey: "AIzaSyCNuaXI45NhX6jwb01xtfEDguKJiBkeWY4",
  authDomain: "relaxo-social.firebaseapp.com",
  projectId: "relaxo-social",
  storageBucket: "relaxo-social.appspot.com",
  messagingSenderId: "919379973745",
  appId: "1:919379973745:web:74c233ac9df6badf706dd0"
};
// Initialize Firebase
initializeApp(firebaseConfig)

// Create a root reference
const storage = getStorage();

let data=null;

export default function CreatePost(){


  //emoji 

  const[chosenEmoji, setChosenEmoji] = useState(null);
  
	const onEmojiClick = (event) => {
		setChosenEmoji(event);
     setEmoji(event.emoji);
  
     setShowemoji("none")
	};
  const[userVal,setVal]=useState(data);
 const[btndis,setBtnDis]=useState("none");
  const[vishow,setVishow]=useState("none");
   const[post,setPost]=useState(null);
   const[posttext,setposttext]=useState("");
   const[height,setHeight]=useState(0);
  const[showemoji,setShowemoji]=useState("none");
  const[page,setpage]=useState(true);
  const[myemoji,setEmoji]=useState("");
  const[myvideo,setVideo]=useState("");
  const img=document.createElement('img');
  const sendData=(event)=>{
    
    
  }
  const imgSender=(event)=>{
    const  iname=event.target.files[0];
   
    const mountainsRef = ref(storage,`postimg/${iname.name}` );

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, `postimg/${iname}`);
 uploadBytes(mountainsRef,iname).then(()=>{
  getDownloadURL(ref(storage, `postimg/${iname.name}`)).then((url)=>{
   setPost(url);
   
 
   
  })
  
 })
  }

  const postd=document.createElement('video');
console.log(post);
  const videoSender=(event)=>{
   
    
    const videof=event.target.files[0];
   
  const videoRef=ref(storage,`postvideo/${videof.name}`);
  const myvideoRef=ref(storage,`postvideo/${videof}`);
  uploadBytes(videoRef,videof).then(()=>{
    getDownloadURL(ref(storage,`postvideo/${videof.name}`)).then((url)=>{
      setPost(url);
      postd.src=url;
  postd.controls=true;
  postd.height=200;
  postd.width=400;
setVideo(url);
      //myvideo.play();
     setVishow("block");
    })
  })
  
  }
  
  const postSender=(event)=>{
    event.preventDefault();
  console.log((post===null))
    if((posttext==="")  && ( post==="") && (myvideo==="") && (myemoji==="") ){
       toast.error(` Sorry  First create post ! `);
      
    }else{
     
        PostData.unshift({
          id:`${Profiledata[0].username}`,
          name:`${Profiledata[0].name}`,
          username:`${Profiledata[0].username}`,
          userImage:"https://firebasestorage.googleapis.com/v0/b/relaxo-social.appspot.com/o/backend-images%2Fprofiledp.jpg?alt=media&token=caee54fe-39a8-49a0-8510-249e4ed3575a",
        post:posttext +""+myemoji,
          imageUrl:post,
          vishow:vishow,
        
          myvideo:myvideo,
          like:0,
        })
       
      setPost("");
      setVideo("");
        setposttext("");
      setEmoji("")
        setChosenEmoji(false);
        if(myvideo===null){
          setVishow("none");
        }
        //show page
        setpage(false);
        setVishow("none");
        
    }
      }
  
     
   
    return(
<>
<div id="main">
<form onSubmit={postSender}>
<div class="card w-100 mb-4" id="create-card">
  <div class="card-body" style={{height:"auto"}}>
    <div className="input-part" style={{display:"flex"}}>
  <div class="user-img" style={{width:"10%",height:"50px"}}>
    <img  style={{width:"100%",height:"100%",borderRadius:"50%"}}src="https://firebasestorage.googleapis.com/v0/b/relaxo-social.appspot.com/o/backend-images%2Fprofiledp.jpg?alt=media&token=caee54fe-39a8-49a0-8510-249e4ed3575a" alt="user"></img>
     </div>
    
<div className="post-data" style={{display:"flex",width:"100%"}}>
 
  <textarea  placeholder=" SHARE YOUR THINK !"class="form-control" value={posttext}  id="exampleFormControlTextarea1" onChange={(e)=>{setposttext(e.target.value)}} style={{borderStyle:"none",fontSize:"medium",width:"100%"}} rows="3"></textarea>
   {chosenEmoji?
   <span style={{width:"auto"}} >{chosenEmoji.emoji} </span>  :""
}   
   </div>
  
   </div>
   <div className="files-data" style={{width:"auto" ,display:"flex",margin:"0% 0px",height:"auto"}}>
      <img src={post}  style={{width:"50%"}}alt=""></img>
      <video className="video-container video-container-overlay" style={{display:`${vishow}`}}  controls data-reactid=".0.1.0.0">
<source type="video/mp4" data-reactid=".0.1.0.0.0" src={myvideo}></source>
</video>
   </div>
     <div className="send-data" style={{display:"flex",width:"30%"}}>
      <div className="img-with-icon" style={{display:"flex"}}><label htmlFor="inimg">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
</svg>
</label>

<input type="file" name="image" style={{display:"none"}} onChange={imgSender} id="inimg"></input>

</div>
<div className="video-with-icon" style={{display:"flex"}}>
  <label htmlFor="inv">
<svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>

</svg>
</label>
<input type="file" accept="video/*" style={{width:"0px"}} id="inv" onChange={videoSender}/> 
</div>
<div className="emoji-with-emoji">
  
  <label htmlFor="inem">
<svg  onClick={()=>{if(showemoji==="none"){setShowemoji("block")}else{setShowemoji("none")}}} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/>
</svg>
</label>
  <div className="" id="inem" style={{display:`${showemoji}`,width:"20%",height:"auto" ,position:"fixed",top:"10%",left:"40%"}}> 	<Picker style={{width:"20%",height:"100px"}} onEmojiClick={onEmojiClick} />   </div>
    </div></div>
    <button type="submit" className={`btn btn-primary `}  >Post</button>
    <ToastContainer />
     </div>
</div></form>
{PostData.map((d)=>{
          return <Postpage key={d.id} myvideo={d.myvideo} vishow={d.vishow} name={d.name} username={d.username} userImage={d.userImage} post={d.post} postImg={d.imageUrl} like={d.like} comment={d.comment} height={d.height}></Postpage>
          })}
          </div>
</>
    );
}