// import required packages
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected : ${connect.connection.host}`)
  } catch (error){
    console.log(`MongoDB connection error: ${error.message}`)
    process.exit(1) // 1 is failure, 0 is success
  }
}

// export the function
export default dbConnect
