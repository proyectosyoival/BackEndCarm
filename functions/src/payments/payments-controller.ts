import { Request, Response } from "express";
import * as admin from 'firebase-admin';

/**********************************************************************************/
/*Functions: all, create, remove, upd, get
Creador: Ruben Gonzalez
Fecha: 25/06/2020
Desc: Creacion de los controladores de las apis de payments*/
/*********************************************************************************/

interface Payment {
    namePayment: String,
    status: number,
}


 export async function all(req: Request, res:Response){
     try {

        const payments : any [] = [];
        const paymentsRef= admin.firestore().collection('payment');
        
        const docsSnap = await paymentsRef.get();
       
        docsSnap.docs.map(doc=>{payments.push({
            paymentId: doc.id,
            data:doc.data()
        });
        
        });
        // return res.status(200).send({ offers });
        return res.status(200).json(payments);
     } catch (err) {

        return handleError(res, err);
     }
 }

 export async function create(req: Request, res: Response){
     try {

        const pago: Payment = {
            namePayment: req.body['namePayment'],
            status: req.body['status']
        }

        const newPayment = await admin.firestore().collection('payment').add(pago);
        return res.status(200).send(`El Método de Pago se registró con éxito: ${newPayment.id}`); 
         
     } catch (error) {
        return res.status(400).send(`El metodo de pago debe contener namePayment y status!!!`)
    }
}

export async function remove(req: Request, res: Response){
    try {
        await admin.firestore().collection('payment').doc(req.params.id).delete();
        return res.status(200).send("Método de Pago ha sido Eliminado Correctamente!");
    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function upd(req: Request, res: Response){

    try {
        await admin.firestore().collection('payment').doc(req.params.id).set(req.body, {merge:true});
        return res.json({id:req.params.id});
    } catch (error) {
        return res.status(500).send(error);

    }
}

export async function get(req: Request, res: Response){
        const pagoId = req.params.id; 
        await admin.firestore().collection('payment').doc(pagoId).get()
        .then(pay =>{
            if(!pay.exists) throw new Error('Método de pago no encontrado');
            res.status(200).json({id:pay.id, data:pay.data()})})
        .catch(error => res.status(500).send(error));
        
}
    

  function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }
