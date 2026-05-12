import User from '../models/users.model.js';
import {hash} from '../utils/hash.js'

export const login = async (req,res) =>{
    const {username,password} = req.body
    const user = await User.findOne({username:username})
    const salt = user.password.substring(0, process.env.SALT_SIZE)
    const hashed = hash(password, salt)
    if (user.password === hashed) {
        res.json({login:true, msg:"Login successful", user:user})
    }else {
        res.status(404).json({login:false, msg:"Login failed", user:{}})
    }
}

