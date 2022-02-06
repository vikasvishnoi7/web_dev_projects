import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom'
function Video(props) {
    // console.log("video", props.src)
    const handleClick=(e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted
    }
    const handleScroll =(e)=>{
        //reactDOM tree me se "e.target" es se current video aayegi ",parentElement" es se parentElement par pahuchege ".nextSibling" es se ham next video par pahuchege
        let next = ReactDOM.findDOMNode(e.target).parentElement.nextSibling
        if(next){
            next.scrollIntoView()
            e.target.muted = true
        }
    }
    return (
        <video src={props.src} onEnded={handleScroll} className='videos-styling' id={props.id} muted="muted" onClick={handleClick} ></video>
    );
}

export default Video
