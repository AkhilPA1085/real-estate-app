import jwt from "jsonwebtoken";

export const getUserDataFromToken = (request)=>{
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token,process.env.NEXT_PUBLIC_JWT_TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        return error
    }
}