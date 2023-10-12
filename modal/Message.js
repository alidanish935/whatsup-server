import mongoose from "mongoose";

const messageSchema =new mongoose.Schema({
    senderId:{type:String},
    recieverId:{type:String},
    conversationId:{type:String},
    text:{type:String},
    type:{type:String}
},
{
    timestamps:true
}
)

const message = mongoose.model('Message',messageSchema);

export default message