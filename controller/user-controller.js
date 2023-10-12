import User from "../modal/User.js"

export const addUser= async(req,res)=>{
    const Sub =req.body.sub
    console.log('sub in usercontroler - ',Sub)
    try{
        let exist = await User.findOne({sub:req.body.sub})
        if(exist) {
            return res.status(200).json({message:'User already exist'})
        }
        const user = req.body;
        const newUser = new User(user);
        // console.log('newuser in usersignup --- ',newUser)
        await newUser.save();
        return res.status(201).json({data:newUser})
    }catch(error){
        console.log('error while adding user in db-',error.message)
        return res.status(500).json({message:error.message})
    }
}

export const getUser = async(req,res)=>{
    try{
        const user = await User.find({});
        // console.log('users in user controller - ',user)
        return res.status(200).json(user)

    }catch(error){
        console.log('error while getting user from db ',error.message)
        return error.message
    }
}