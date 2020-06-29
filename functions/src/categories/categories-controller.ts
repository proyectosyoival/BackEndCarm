import { Request, Response } from "express";
import * as admin from 'firebase-admin';

/**********************************************************************************/
/*Functions: all, create, remove, upd, get
Creador: Ruben Gonzalez
Fecha: 25/06/2020
Desc: Creacion de los controladores de las apis de categories*/
/*********************************************************************************/

// const todayDate = new Date();
// const dateToday =(todayDate.getDate() + '-' + ((todayDate.getMonth() + 1)) +  '-' +todayDate.getFullYear()+ ' ' +todayDate.getHours() + ':' + todayDate.getMinutes()+ ':' + todayDate.getSeconds());


interface Cat {
    karat: String,
    title: String,
    catId: String
}

export async function all(req: Request, res:Response){
    try {

       const categories : any [] = [];
       const categoriesRef= admin.firestore().collection('category');
       
       const docsSnap = await categoriesRef.get();
      
       docsSnap.docs.map(doc=>{categories.push({
           categoryId: doc.id,
           data:doc.data()
       });
       
       });
       // return res.status(200).send({ offers });
       return res.status(200).json(categories);
    } catch (err) {

       return handleError(res, err);
    }
}

export async function create(req: Request, res: Response){
    try {


       const categoria: Cat = {
           title: req.body['title'],
           karat: req.body['karat'],
           catId: req.body['catId']
       }

    //    const dateTime = await admin.firestore.FieldValue.serverTimestamp();
       const newCategory = await admin.firestore().collection('category').add(categoria);

       return res.status(200).send(`La Categoria se creó con Exito: ${newCategory.id}`); 
        
    } catch (error) {
       return res.status(400).send(`La Categoria deberia contener titulo, quilate!!!`);
   }
}

export async function remove(req: Request, res: Response){
    try {
        await admin.firestore().collection('category').doc(req.params.catId).delete();
        return res.status(200).send("Categoria Eliminada Correctamente!");
    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function upd(req: Request, res: Response){

    try {
        await admin.firestore().collection('category').doc(req.params.catId).set(req.body, {merge:true});
        return res.json({catId:req.params.catId});
    } catch (error) {
        return res.status(500).send(error);

    }
}

export async function get(req: Request, res: Response){
    const categoriaId = req.params.catId; 
    await admin.firestore().collection('category').doc(categoriaId).get()
    .then(cate =>{
        if(!cate.exists) throw new Error('Categoria no encontrada');
        res.status(200).json({catId:cate.id, data:cate.data()})})
    .catch(error => res.status(500).send(error));
    
}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }