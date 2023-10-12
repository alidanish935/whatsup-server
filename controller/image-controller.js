import mongoose from "mongoose"
import grid from "gridfs-stream"

const url = 'http://localhost:8000'

let gridfsBucket,gfs;
const conn = mongoose.connection;
conn.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'||'photos'
    });
    gfs = grid(conn.db , mongoose.mongo);
    gfs.collection('fs')||gfs.collection('photos')
})

export const UploadImage = async(req,res)=>{
    console.log('image controller ---',req.file)
    
        if(!req.file){
            return res.status(404).json("File not found")
        }

            const imageUrl = `${url}/file/${req.file.filename}`;
            return res.status(200).json(imageUrl)
    
}

export const getImage = async(req,res)=>{
    console.log('req.params.filename--',req.params.filename)
    try{
        const file = await gfs.files.findOne({filename:req.params.filename})
        console.log('file in getImage controller - ',file)
        const readStream = gridfsBucket.openDownloadStream(file._id)
        readStream.pipe(res)
    }catch(error){
        console.log('error while getting image from getImage controller-',error.message)
        return res.status(500).json({ msg: error.message });
    }
}