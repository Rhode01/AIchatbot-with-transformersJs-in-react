import { env, pipeline } from "@xenova/transformers";

env.allowLocalModels = false


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
    console.log(message)
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