import { Request, Response } from "express";
import * as admin from 'firebase-admin'

/************************************************************************/
/*Function: isAuthenticated
Creador: Ruben Gonzalez
Fecha: 19/06/2020
Desc: En esta función, validaremos la presencia del authorizationtoken 
portador en el encabezado de la solicitud.*/
/***********************************************************************/
export async function isAuthenticated(req: Request, res: Response, next: Function) {
    const { authorization } = req.headers
 
    if (!authorization)
        return res.status(401).send({ message: 'Acceso denegado, Introduza el Token' });
 
    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Acceso Denegado, debes de Agregar el Tipado Bearer' });
 
    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Error tienes espacios entre el Bearer y el Token' });
 
    const token = split[1]
 
    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        console.log("decodedToken", JSON.stringify(decodedToken))
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        console.log('token', decodedToken);
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Token Expirado' });
    }
 }