import { Application } from "express";
import { all, create, remove, upd, get } from "./payments-controller";
import { isAuthorized } from "../middlewares/auth/authorized";
import { isAuthenticated } from "../middlewares/auth/authenticated";

/**********************************************************************************/
/*Function: routesConfig
Creador: Ruben Gonzalez
Fecha: 25/06/2020
Desc: Aquí, configuramos las rutas de las apis de payments*/
/*********************************************************************************/

export function paymentsRoutes(app: Application) {

// get all offers
app.get('/payments', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user']}),
    all
]);

app.post('/payments', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    create
]);

app.delete('/payments/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    remove
]);

app.put('/payments/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin']}),
    upd
]);

//get a single offer
app.get('/payments/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user']}),
    get
]);


}
