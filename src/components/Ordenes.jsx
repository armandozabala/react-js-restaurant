import React, { useContext, useEffect, useState } from 'react'

import { FirebaseContext } from '../firebase';
import Orden from '../UI/Orden';

const Ordenes = () => {

    const { firebase } = useContext(FirebaseContext);

    const [ordenes, guardarOrdenes] = useState([]);

    useEffect(() => {

            const obtenerOrdenes = () => {
                  firebase.db.collection('ordenes').where('completado','==',false).onSnapshot(manejarSnapshot);
            }

            obtenerOrdenes();
        }
    ,[]);

    const manejarSnapshot = (snapshot) => {

        const orden = snapshot.docs.map(doc => {
              return {
                  id: doc.id,
                  ...doc.data()
              }
        });

        console.log(orden);

        guardarOrdenes(orden);

    }



    return (
        <>
             <h1 className="text-3xl font-light mb-4">Ordenes</h1>

            <div className="sm:flex sm:flex-wrap -mx-3"> 
             {
                 ordenes.map(orden => (
                       <Orden
                            key={orden.id}
                            orden={orden}
                       />
                 ))
             }
     
             </div>
        </>
    )
}

export default Ordenes
