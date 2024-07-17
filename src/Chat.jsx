import React from 'react'
import "./chat.css"
import { useState, useEffect } from 'react'
const Chat = () => {
    const [messageList, setMessageList] = useState([{
        user:"",
        content:""
    }])
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState("")
    const [showSendBtn, setSendBtn] = useState(false)
    const worker = new Worker(new URL("./worker.js", import.meta.url),{
        type:"module"
    })
    worker.onmessage = (event) =>{
        setloading(false)
        const user =  event.data.user
        const response = event.data.content[0].generated_text
    setMessageList((prevMessage)=>
        [...prevMessage, {user:user, content:response}]
    )
    }
    const getMessageResponse = async ()=>{
        setloading(true)
        setMessageList((prev)=>[...prev, {user:"sender", content:message }])
        
        worker.postMessage({
            type:"usermessage", 
            messageList:messageList,
            message:message
        })
        setmessage("")
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
    const handleFormSubmission = async (e) =>{
        e.preventDefault()
        setSendBtn(false)
        await getMessageResponse();
    }
  return (
    <div className='container'>
        <div>
        <h6>AI CHATBOT IN REACT USING TRANSFORMERS JS</h6>
            <div className='message-list'>
                <div>
                            <span>
                             {messageList.length > 0  && messageList.map((message, index)=>{
                                return (
                                    <div key={index} className={message.user ==="ai" ? "sender" : "receiver"}>
                                        <p className='message'>{message.content}</p>
                                    </div>
                                )
                             })}
                            </span>
                </div>
            </div>
            <div className='formContainer'>
            <form onSubmit={handleFormSubmission}>
                
                <input type="text" value={message} onChange={handleInputChange} />
             {!loading && showSendBtn &&  <input type="submit" name="sender" value="Send"  /> }   
            </form>
            </div>
        </div>
    </div>
  )
}
export default Chat