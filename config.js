export default {
    fileSystem: {
        path: './db'
    },
    mongodb: {
        cnxStr: 'srv+mongodb://xxxxxxxxxxxxxxxxxxx',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
    }
}