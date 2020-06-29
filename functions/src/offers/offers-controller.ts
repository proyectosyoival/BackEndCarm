import { Request, Response } from "express";
import * as admin from 'firebase-admin';

/**********************************************************************************/
/*Functions: all, create, remove, upd, get
Creador: Ruben Gonzalez
Fecha: 25/06/2020
Desc: Creacion de los controladores de las apis de offers*/
/*********************************************************************************/


interface Offer {
    description: String,
    offerId: String,
    status: number,
    title:String
}


 export async function all(req: Request, res:Response){
     try {

        const offers : any [] = [];
        const offersRef= admin.firestore().collection('offer');
        
        const docsSnap = await offersRef.get();
       
        docsSnap.docs.map(doc=>{offers.push({
            offerId: doc.id,
            data:doc.data()
        });
        
        });
        // return res.status(200).send({ offers });
        return res.status(200).json(offers);
     } catch (err) {

        return handleError(res, err);
     }
 }

 export async function create(req: Request, res: Response){
     try {

        const oferta: Offer = {
            description: req.body['description'],
            offerId: req.body['offerId'],
            status: req.body['status'],
            title:req.body['title']
        }

        const newOffer = await admin.firestore().collection('offer').add(oferta);
        return res.status(200).send(`La Oferta se creó con Exito: ${newOffer.id}`); 
         
     } catch (error) {
        return res.status(400).send(`La Oferta deberia contener date, description, offerId, status, y title!!!`)
    }
}

export async function remove(req: Request, res: Response){
    try {
        await admin.firestore().collection('offer').doc(req.params.offerId).delete();
        return res.status(200).send("Oferta Eliminada Correctamente!");
    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function upd(req: Request, res: Response){

    try {
        await admin.firestore().collection('offer').doc(req.params.offerId).set(req.body, {merge:true});
        return res.json({offerId:req.params.offerId});
    } catch (error) {
        return res.status(500).send(error);

    }
}

export async function get(req: Request, res: Response){
        const ofertaId = req.params.offerId; 
        await admin.firestore().collection('offer').doc(ofertaId).get()
        .then(ofert =>{
            if(!ofert.exists) throw new Error('Oferta no encontrada');
            res.status(200).json({offerId:ofert.id, data:ofert.data()})})
        .catch(error => res.status(500).send(error));
        
}
    



  function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }
