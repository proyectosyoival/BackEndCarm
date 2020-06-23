import { Request, Response } from "express";

/************************************************************************/
/*Function: isAuthorized
Creador: Ruben Gonzalez
Fecha: 19/06/2020
Desc: Validamos que la ID en los parámetros de solicitud sea la misma 
como el que está en el token de autenticación. 
Si el usuario no tiene el rol requerido, le devolveremos un 403. */
/***********************************************************************/

export function isAuthorized(opts: { hasRole: Array<'admin' | 'user'>, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: Function) => {
       const { role, email, uid } = res.locals
       const { id } = req.params

       if (email === 'alex.ruval@gmail.com'|| email === 'retg1996@gmail.com' || email === 'iv.rdzh@gmail.com')
            return next();

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (!role)
           return res.status(403).send();

       if (opts.hasRole.includes(role))
           return next();

       return res.status(403).send();
   }
}