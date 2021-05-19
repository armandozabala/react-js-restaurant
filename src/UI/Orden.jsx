import React , { useContext, useState }from 'react'
import { FirebaseContext } from '../firebase'

const Orden = ({orden}) => {

    const { firebase } = useContext(FirebaseContext);

    const [tiempoEntrega, guardarTiempoEntrega] = useState(0);

    const definirTiempo = (id) => {

          try{
             firebase.db.collection('ordenes').doc(id).update({
                   tiempoentrega: tiempoEntrega
             })
          }catch(error){
              console.log(error);
          }

    }

    const completarOrden = (id) => {

        try{
            firebase.db.collection('ordenes').doc(id).update({
                completado: true
            })
        }catch(error){
            console.log(error);
        }

    }

    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
             <div className="p-3 shadow-md bg-white">
              
                {
                    orden.orden.map(platillos => (
                          <p className="text-gray-600">{platillos.cantidad} {platillos.nombre} </p>
                    ))
                }
                
                <p className="text-gray-700 font-bold">Total a Pagar: $ {orden.total}</p>

                { orden.tiempoentrega == 0 && (

                        <div className="mb-4">
                                <label className="block text-gray text-sm font-bold mb-2">
                                    Tiempo de Entrega
                                </label>

                                <input
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    min="1"
                                    max="20"
                                    placeholder="20"
                                    value={ tiempoEntrega}
                                    onChange={ e => guardarTiempoEntrega(parseInt(e.target.value))}
                                />

                                <button 
                                        type="submit"
                                        onClick={ () => definirTiempo(orden.id) }
                                        className="bg-gray-800 text-white hover:bg-gray-900 w-full mt-5 p-2 uppercase font-bold"
                                >
                                    Definir Tiempo
                                </button>
                        </div>
                )}

             {
                 !orden.tiempoentrega > 0 && (
                       <p className="text-gray-700">
                            Tiempo de Entrega:
                            <span className="font-bold">{orden.tiempoentrega} Minutos </span>
                       </p>
                 )
             }
             {
                 !orden.completado && orden.tiempoentrega > 0 && (
                        <button
                          type="button"
                          className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 uppercase font-bold text-white"
                          onClick={ () => completarOrden(orden.id) }
                         >
                          Marcar como lista
                      </button>
                 )
             }

             </div>
        </div>
    )
}

export default Orden
