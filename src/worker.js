import { env, pipeline } from "@xenova/transformers";

env.allowLocalModels = false
env.useBrowserCache = false

class ChatBotPipeline{
    static messageResponse 
    static modelPipeline = null
    static model= "Xenova/blenderbot-400M-distill"

    static loadBlenderBotPipeline = async() =>{
        if (this.modelPipeline) return this.modelPipeline
        try {
            this.modelPipeline = await pipeline("text2text-generation", this.model)
        } catch (error) {
          console.log({
            "error occured": error.message
          });  
        }  
        return this.modelPipeline
    }
    static generateMessageResponse = async (message) =>{
        const modelpipeline = await this.loadBlenderBotPipeline()
        if (!modelpipeline) return null
        try {
           this.messageResponse =  await modelpipeline(message) 
        } catch (error) {
            console.log({
                "error occured while generating text": error.message
            });
            return null
        }
        return this.messageResponse
    }


}

onmessage = async (event) =>{
    const {type, message} = event.data
    //message is a list object that is receiving and array of object in this format
    //[{user:"sender", content:"message content"    }]
    //here on the worker iam destructuring the message object so i want to pass the actuall message array not the object
    console.log("message list object  " + message[0].user);
    switch (type) {
        case "loadModel":
            const modelpipeline = await ChatBotPipeline.loadBlenderBotPipeline()
            break
        case "usermessage":
            const messageResponse = await ChatBotPipeline.generateMessageResponse(message)
            postMessage({ user: "ai", content: messageResponse })
            break
        default: 
            break;
    }
}