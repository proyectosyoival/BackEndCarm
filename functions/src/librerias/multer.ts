// import multer from 'multer';
// import path from 'path';

import multer = require("multer");
import path = require("path");


// import {Multer} from 'multer';
// import {path} from 'path';


//modulo encargado de subir las imagenes al navegador
const storage = multer.diskStorage({
    destination: 'uploads',  //lugar donde se guardan los archivos
    filename: (req, file, cb) => {
        cb(null, path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    dest: path.join(__dirname, 'uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
      //comprobar tipo de archivo
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if ( mimetype && extname){
        return cb(null, true);
      }
       
    }
}).single('image') //como recibira la imagen con algun formulario ejemplo image



export default multer({storage});