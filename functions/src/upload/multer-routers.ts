import { Router } from 'express';
const router = Router();

import {createPhoto, getPhotos} from './image-controller';

import multer from '../librerias/multer';


router.route('/photos')
    .post(multer.single('image'),createPhoto)
    .get(getPhotos)
 

export default router;