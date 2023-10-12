import conversation from "../modal/Conversation.js"



export const setConversation =async(req,res)=>{
    const {senderId,recieverId}=req.body

    
    const exist = await conversation.findOne({members: {$all: [recieverId,senderId]}})
    if(exist){
        return res.status(200).json('conversation already exist')
    }
    const newConv = new conversation({members:[senderId,recieverId]})
    try{
        const savedConv = await newConv.save();
        return res.status(200).json(savedConv)
    }catch(error){
        console.log('error in setting conversation in db ',error.message)
        return res.status(500).json(error.message)
    }
}  

export const getConversation = async(req,res)=>{
    // console.log('req.body--',req.body)
    const {senderId,recieverId}=req.body

    try{
        const conversatn = await conversation.findOne({members:{$all : [senderId,recieverId]}})
        return res.status(200).json(conversatn)
    }catch(error){
        console.log('error while getting conversation from db',error.message)
        return res.status(500).json({error:error.message})
    }
}
