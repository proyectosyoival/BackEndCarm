import { Application } from "express";
import { create,all,get,patch, remove} from "./controller";
import { isAuthorized } from "../middlewares/auth/authorized";
import { isAuthenticated } from "../middlewares/auth/authenticated";

/**********************************************************************************/
/*Function: routesConfig
Creador: Ruben Gonzalez
Fecha: 19/06/2020
Desc: Aquí, configuramos las rutas de nuestras apis*/
/*********************************************************************************/
 
export function routesConfig(app: Application) {

  
    app.post('/users',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin']}),
        create
    );

// lists all users
  /**
     * @swagger
     * /users:
     * get:
     * description: hola
     * response:
     *          '200':
     *           description:njddj
     */
app.get('/users', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    all
]);

// get :id user
app.get('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    get
]);

// updates :id user
app.patch('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    patch
]);

// deletes :id user
app.delete('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    remove
]);
}