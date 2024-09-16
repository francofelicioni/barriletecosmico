import multer from 'multer';
import fs from 'fs';
import path from 'path';
import customErrors from '../errors/customErrors.js';
import userController from '../controllers/user.controller.js';
import userRepository from '../persistence/mongo/repositories/user.repository.js';

const ensureDir = () => {
    const directories = [ './src/persistence/files/profiles', './src/persistence/files/products', './src/persistence/files/documents' ];

    directories.forEach(directory => {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    })
}

ensureDir();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       if (file.fieldname === 'profiles') {
            cb(null, './src/persistence/files/profiles')
       } else if (file.fieldname === 'products') {
            cb(null, './src/persistence/files/products')
       } else if (file.fieldname === 'documents') {
            cb(null, './src/persistence/files/documents')
       } else {
            cb(customErrors.badRequest('Invalid field name'), null)
       }
    },
    filename: async (req, file, cb) => {
        const userId = req.user._id;


        const { originalname } = file;
        const extension = path.extname(originalname);
        const filenameWithoutExtension = path.parse(originalname).name;
        const finalFileName = `${userId}-${filenameWithoutExtension}${extension}`

        cb(null, finalFileName);
    },
})

export const uploader = multer({ storage })