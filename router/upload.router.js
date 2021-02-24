import express from "express";
import multer from 'multer'
import path from 'path'
const uploadsRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

const upload = multer({
    storage
})

uploadsRouter.post('/', upload.single('image'), (req,res)=>{
    console.log(res.file)
    res.send(`${process.env.SERVER_NAME}${req.file.path}`)
})

export default uploadsRouter