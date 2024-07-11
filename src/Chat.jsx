import React from 'react'
import "./chat.css"
import { useState, useEffect } from 'react'
const Chat = () => {
    const [messageList, setMessageList] = useState([{
        user:"",
        content:""
    }])
    const [message, setmessage] = useState("")
    const [showSendBtn, setSendBtn] = useState(false)
    const worker = new Worker(new URL("./worker.js", import.meta.url),{
        type:"module"
    })
    worker.onmessage = (event) =>{
    const response =  event.data
    setMessageList((prevMessage)=>
        [...prevMessage, {user:response.user, response:response.content}]
    )
    }
    useEffect(()=>{
        const loadingModel = () =>{
            worker.postMessage({type:"loadModel"}) 
        }
        loadingModel()
    },[])
    const getMessageResponse = ()=>{
        setMessageList((prev)=>[...prev, {user:"sender",content:message }])
        setmessage("")
        worker.postMessage({
            type:"usermessage", 
            message:messageList
        })
    }
    
    const handleInputChange = (e) =>{
        const {value} = e.target
        setmessage(value)
        if(value.trim().length >= 2){
            setSendBtn(true)
        } else {
            setSendBtn(false)
        }
    }
    const handleFormSubmission = (e) =>{
        e.preventDefault()
        setSendBtn(false)
        getMessageResponse()
    }
  return (
    <div className='container'>
        <div>
        <h6>AI CHATBOT IN REACT USING TRANSFORMERS JS</h6>
            <div className='message-list'>
                <div className='sender'>
                            <span>
                             {messageList.filter((message)=>message.user === "ai").map((message, index)=>{
                                return (
                                    <div key={index}>
                                        <p className='message'>{message.content}</p>
                                    </div>
                                )
                             })}
                            </span>
                </div>
                <div className='receiver'>
                    <span>
                    {messageList.filter((message)=>message.user === "sender").map((message, index)=>{
                        return (
                            <div key={index}>
                                <p className='message'>{message.content}</p>
                            </div>
                        )
                        })}
                    </span>
                </div>
            </div>
            <form onSubmit={handleFormSubmission}>
                
                <input type="text" value={message} onChange={handleInputChange} />
             {showSendBtn &&   <input type="submit" name="sender" value="Send"  /> }   
            </form>
        </div>
    </div>
  )
}
export default Chat