import mongoose from "mongoose";

const Connect = async() =>{
    try{
      await mongoose.connect(process.env.MONGO_URL!);
      const connection = mongoose.connection;

      connection.on('connected', ()=>{
        console.log("MongoDB Connected Successfully!")
      })
      
      connection.on('error', (err)=>{
        console.log("MongoDB Connection Error, Please make sure MongoDB is running. " + err);
        process.exit();
      })
    }
    catch(error){
        console.log('Something went wrong!');
        console.log(error)
    }
}
export default Connect;
