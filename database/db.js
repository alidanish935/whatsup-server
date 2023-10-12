import mongoose from "mongoose";

const Connection = async()=>{
    const Url = process.env.MONGO_URL
    const url = 'mongodb://localhost:27017/whatsup'

    try{
        await mongoose.connect(Url,{ useUnifiedTopology: true, useNewUrlParser: true })
        console.log('database connected successfully')
    }catch(error){
        console.log('Error while connecting DataBase',error.message)
    }
}
export default Connection