import { Application } from "express";
import { all, create, remove, upd, get } from "./categories-controller";
import { isAuthorized } from "../middlewares/auth/authorized";
import { isAuthenticated } from "../middlewares/auth/authenticated";


/**********************************************************************************/
/*Function: routesConfig
Creador: Ruben Gonzalez
Fecha: 25/06/2020
Desc: Aquí, configuramos las rutas de las apis de categories*/
/*********************************************************************************/

export function categoriesRoutes(app: Application) {

    app.get('/categories', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'user']}),
        all
    ]);
    
    app.post('/categories', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin']}),
        create
    ]);

    app.delete('/categories/:catId', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin']}),
        remove
    ]);
    
    app.put('/categories/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin']}),
        upd
    ]);
    
    //get a single offer
    app.get('/categories/:catId', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'user']}),
        get
    ]);

}