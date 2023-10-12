
import conversation from "../modal/Conversation.js";
import message from "../modal/Message.js";

export const addMessage = async(req,res)=>{
    // console.log('req in addMessage ',req.body)
    
    try{
        const newmsg = new message(req.body)
        await newmsg.save()
        await conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.text})
        // return res.status(200).json(newmsg)
        res.status(200).json("Message has been sent successfully");

    }catch(error){
        console.log('error in adding message from controller - ',error.message)
        return res.status(500).json({error:error.message})
    }
}

export const getMessage = async(req,res)=>{
    const id = req.params.id;
    // console.log('id--',id)
    try{
        const msg = await message.find({conversationId:id})
        // console.log('msg in getmsg - ',msg)
        return res.status(200).json(msg)
    }catch(error){
        console.log('error in getting message from controller - ',error.message)
        return res.status(500).json({error:error.message})
    }
}