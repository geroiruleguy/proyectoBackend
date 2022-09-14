import dotenv from 'dotenv'
import path from 'path'

console.log("NODE_ENV")
console.log(process.env.NODE_ENV)
dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'MONGO' 
}