import { Request, Response } from "express";
import * as admin from 'firebase-admin';
import responseCodes from "../response/response-code";

/**********************************************************************************/
/*Functions: create,all,get,patch,remove
Creador: Ruben Gonzalez
Fecha: 19/06/2020
Desc: En estas operaciones, aprovechamos el SDK de administrador para 
interactuar con Firebase Authentication y realizar las operaciones respectivas.*/
/*********************************************************************************/


export async function create(req: Request, res: Response) {
   try {
       const { displayName, password, email, role } = req.body
       if (!displayName || !password || !email || !role) {
           return res.status(responseCodes.BAD_REQUEST).send({ message: 'Faltan Campos por Llenar' })
       }

       const { uid } = await admin.auth().createUser({
           displayName,
           password,
           email
       })
       await admin.auth().setCustomUserClaims(uid, { role })

       return res.status(responseCodes.CREATE).send({ 
           message: 'Usuario Creado Correctamente',
           displayName,
           email })
   } catch (err) {
       return handleError(res, err)
   }
}

export async function all(req: Request, res: Response) {
    try {
        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(user => {
            const customClaims = (user.customClaims || { role: '' }) as { role?: string }
            const role = customClaims.role ? customClaims.role : ''
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role,
                lastSignInTime: user.metadata.lastSignInTime,
                creationTime: user.metadata.creationTime,
               
            }
        })
 
        return res.status(responseCodes.SUCCESS).send({ users })
    } catch (err) {
        return handleError(res, err)
    }
 }
 
 export async function get(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = await admin.auth().getUser(id)
        return res.status(responseCodes.SUCCESS).send({ user })
    } catch (err) {
        return handleError(res, err)
    }
 }
 
 export async function patch(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { displayName, password, email, role } = req.body
 
        if (!id || !displayName || !password || !email || !role) {
            return res.status(responseCodes.BAD_REQUEST).send({ message: 'Faltan Campos por Actualizar' })
        }
 
        const user = await admin.auth().updateUser(id, { displayName, password, email });
        await admin.auth().setCustomUserClaims(id, { role })
        return res.status(responseCodes.SUCCESS).send({ 
            message: `Usuario Actualizado Correctamente`,
            displayName: user.displayName,
            email: user.email})
    } catch (err) {
        return handleError(res, err)
    }
 }
 
 export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params
        await admin.auth().deleteUser(id)
        return res.status(responseCodes.SUCCESS).send({
            message: `Usuario Eliminado con el id: ${id}`})
    } catch (err) {
        return handleError(res, err)
    }
 }

 

function handleError(res: Response, err: any) {
   return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({ message: `${err.code} - ${err.message}` });
}