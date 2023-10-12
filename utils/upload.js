import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'


dotenv.config()
//mongodb+srv://alidanish935:danish@cluster0.nrawtro.mongodb.net/WhatsApp
const Url = process.env.MONGO_URL
const storage = new GridFsStorage ({
    url:Url,
    options:{ useUnifiedTopology: true, useNewUrlParser: true },
    file:(req,file)=>{
        const match = ["image/png", "image/jpg"];
        if(match.indexOf(file.mimetype)  === -1){
            return `${Date.now()}-file-${file.originalname}`
        }

        return{
            bucketName:"photos",
            filename:`${Date.now()}-file-${file.originalname}`
        }
    }
})

export default multer({storage})