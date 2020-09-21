import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';
import { offersRoutes } from './offers/offers-routes';
import { categoriesRoutes } from './categories/categories-routes';
import { paymentsRoutes } from './payments/payments-routes';
 
// const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp();

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://pvcarmezi.firebaseio.com"
// });

//referencia a nuestra bdd 
 //const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


    const app = express();
    app.use(bodyParser.json());
    app.use(cors({ origin: true }));
    routesConfig(app);
    offersRoutes(app);
    categoriesRoutes(app);
    paymentsRoutes(app);
    
    const swaggerJsDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const swaggerOption ={
      swaggerDefinition:{
        info:{
          title: "Pv Carmesi",
          description: "This is a sample server for a pet store.",
          termsOfService: "http://example.com/terms/",
          contact: {
            name: "API Support",
            url: "http://www.example.com/support",
            email: "support@example.com"
          },
          license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html"
          },
          servers : ["http://localhost:5000/pvcarmezi/us-central1/api"]
        }
      },
      apis :["categories-routes.js"] 
    };

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));


  //  app.get('/products', async(req, res)=>{

  //   const userRef = db.collection('products');
  //   const docsSnap = await userRef.get();

  //   const products: any[] = [];
  //   docsSnap.docs.map(doc => products.push(doc.data()));
  //   res.json(products);

  //  });

  //  export const api = functions.https.onRequest(app);

  //  //cambiar de valor el campo de stock de la bd en fb mediante un servicio post con postman

  //  app.post('/products/:id', async(req, res)=>{
  //    const id = req.params.id;
  //    const prodsRef = db.collection('products').doc(id);
  //    const prodsSnap = await prodsRef.get();

  //    if(!prodsSnap.exists){
  //      res.status(404).json({
  //        ok: false,
  //        mensaje:'No existe un producto con ese id' + id
  //      });
  //     }else{
  //       const antes = prodsSnap.data() || {stock:0};
  //       await prodsRef.update({
  //         stock: antes.stock + 1
  //       });

  //       res.json({
  //         ok: true,
  //         mensaje : `Se incremento el stock a ${antes.title}`
  //       }); 
  //     }
  //  })

  export const api = functions.https.onRequest(app);
  console.log('api', api);

