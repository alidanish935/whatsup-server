import express from 'express'
import { addUser,getUser } from '../controller/user-controller.js';
import { setConversation,getConversation } from '../controller/conversation-controller.js';
import { addMessage,getMessage } from '../controller/message-controller.js';
import { UploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js'

const route = express.Router();

route.post('/add',addUser)
route.post('/conversation/add',setConversation)

route.get('/users',getUser)
route.post('/getconversation',getConversation)
route.post('/message/add',addMessage)
route.get('/message/get/:id',getMessage)

route.post('/file/upload', upload.single("file"), UploadImage)
route.get('/file/:filename',getImage)
export default route