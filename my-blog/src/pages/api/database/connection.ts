import mongoose from "mongoose";

const dbConnect=async()=>{
    try{
        await mongoose.connect(`${process.env.CONNECTIONURL}`,{

        });
        console.log("MongoDb connected");
    }catch(error){
        console.error("MongoDb connection error: ",error);
    }
};

export default dbConnect;