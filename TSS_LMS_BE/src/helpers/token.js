import jwt from 'jsonwebtoken';

const secretKey='secret key'

export const generateToken=(payload)=>{
    
    const token=jwt.sign(payload,secretKey,{expiresIn:'2h'})
    return token;
}

export const verifyToken=(token)=>{
    try {
        return (jwt.verify(token,secretKey))
    } catch (error) {
        return null;
    }

}