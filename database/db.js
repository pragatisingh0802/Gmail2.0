import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const Connection = () =>{
    const DB_URI=`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-z93oc4s-shard-00-00.wx8sukl.mongodb.net:27017,ac-z93oc4s-shard-00-01.wx8sukl.mongodb.net:27017,ac-z93oc4s-shard-00-02.wx8sukl.mongodb.net:27017/?ssl=true&replicaSet=atlas-76rilr-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        mongoose.connect(DB_URI, {useNewUrlParser: true});
        console.log('database connected successfully');
    }
    catch(error){
        console.log('error while connecting with the database', error.message);
    }
}
export default Connection;