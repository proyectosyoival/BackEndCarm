import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pvcarmezi.firebaseio.com"
});
//referencia a nuestra bdd 
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.json({
     mensaje: "Otra cosa!"
    });
});


export const getUsers = functions.https.onRequest((request, response) => {
    const nombre = 'Ruben';
     response.json({
         nombre
     })
   });

   const app = express();
   app.use(cors({origin: true}));

   //api getuser
   app.get('/user', async(req,res)=>{
     const userRef = db.collection('users');
     const docsSnap = await userRef.get();

     const usuarios : any [] = [];
     
     docsSnap.docs.map(doc=>usuarios.push(doc.data()));
     res.json(usuarios);


   });

   app.get('/products', async(req, res)=>{

    const userRef = db.collection('products');
    const docsSnap = await userRef.get();

    const products: any[] = [];
    docsSnap.docs.map(doc => products.push(doc.data()));
    res.json(products);

   });

   export const api = functions.https.onRequest(app);

   //cambiar de valor el campo de stock de la bd en fb mediante un servicio post con postman

   app.post('/products/:id', async(req, res)=>{
     const id = req.params.id;
     const prodsRef = db.collection('products').doc(id);
     const prodsSnap = await prodsRef.get();

     if(!prodsSnap.exists){
       res.status(404).json({
         ok: false,
         mensaje:'No existe un producto con ese id' + id
       });
      }else{
        const antes = prodsSnap.data() || {stock:0};
        await prodsRef.update({
          stock: antes.stock + 1
        });

        res.json({
          ok: true,
          mensaje : `Se incremento el stock a ${antes.title}`
        }); 
      }
   })

