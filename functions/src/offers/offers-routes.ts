import { Application } from "express";
import { all, create, remove, upd, get } from "./offers-controller";
import { isAuthorized } from "../middlewares/auth/authorized";
import { isAuthenticated } from "../middlewares/auth/authenticated";


/**********************************************************************************/
/*Function: routesConfig
Creador: Ruben Gonzalez
Fecha: 25/06/2020
Desc: Aquí, configuramos las rutas de las apis de offers*/
/*********************************************************************************/

export function offersRoutes(app: Application) {

// get all offers
app.get('/offers', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user']}),
    all
]);

app.post('/offers', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    create
]);

app.delete('/offers/:offerId', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    remove
]);

app.put('/offers/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    upd
]);

//get a single offer
app.get('/offers/:offerId', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user']}),
    get
]);


}
