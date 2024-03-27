import mongoose from "mongoose";

export async function connection (){
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('Mongo DB connected successfully')
        })
        connection.on('error',(error)=>{
            console.log('DB connection error',error);
            process.exit()
        })
    } catch (error) {
        console.log('DB config error',error)
    }
}