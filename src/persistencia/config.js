import mongoose from "mongoose";

const conectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.error(`Error: ${err.message}`.red);
        process.exit(1); //procees es una variable global de node para terminar el proceso y recibe un valor para indicar que ha ocurrido un error
    }
}

export default conectDB; 