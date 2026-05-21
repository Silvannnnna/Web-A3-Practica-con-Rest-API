import User from '../models/users.model.js'
import {hash} from '../utils/hash.js'
import jwt from 'jsonwebtoken'

export const login = async (req,res) =>{
    const {username,password} = req.body
    const user = await User.findOne({username:username})
    if (!user) {
        return res.status(401).json({login:false, msg:"Usuario o contraseña incorrectos", user:{}, token:""})
    }
    const salt = user.password.substring(0, Number(process.env.SALT_SIZE))
    const hashed = hash(password, salt)
    if (user.password === hashed) {
        const token = jwt.sign({sub:user._id}, process.env.JWT, {expiresIn:"1h"})
        res.json({login:true, msg:"Ok", user:{_id:user._id, name:user.name, username:user.username}, token:token})
    } else {
        res.status(401).json({login:false, msg:"Usuario o contraseña incorrectos", user:{}, token:""})
    }
}

