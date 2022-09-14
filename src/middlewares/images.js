import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    }, 
    filename: function (req, file, cb) {
        const nombreFinal = file.fieldname + '-' + Date.now()
        cb(null, nombreFinal)
    }
})

const upload = multer({ storage })

export const extraerArchivo = upload.single('image')



