
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FirebaseContext } from '../firebase';
import { useHistory } from "react-router-dom";
import FileUploder from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {

    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState('');

    //context con las operaciones
    const { firebase } = useContext(FirebaseContext);

    //Hook para redireccionar
    const navigate = useHistory();


    const formik = useFormik({
         initialValues:{
               nombre: '',
               precio: '',
               categoria: '',
               imagen: '',
               descripcion: '',
        },
        validationSchema: Yup.object({
             nombre: Yup.string().min(3, 'Los Platillos deben tener al menos 3 caracteres')
                     .required('El nombre del platillo es obligatorio'),
            precio: Yup.number()
                    .min(1, 'Debes agregar el precio')
                    .required('El Precio debe ser obligatorio'),
            categoria: Yup.string()
                       .required('La categoria es obligatoria'),
            descripcion: Yup.string()
                         .min(10, 'La descripcion debe ser mas larga')
                         .required('La descripcion es obligatoria')   
        }),
        onSubmit: plato => {
            try{
                plato.imagen = urlimagen;
                plato.existencia = true;
                firebase.db.collection('productos').add(plato);

                //redireccionar
                navigate.push({ pathname: "/menu" });
            }catch(error){
                console.log(error)
            }
        }
    })

    //Todo sobre las imagenes
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);


    }

    const handleUploadError = ( error ) => {
        guardarSubiendo(false);
        console.log(error)

    }

    const handleUploadSuccess =  async ( nombre ) => {

        guardarProgreso(100);
        guardarSubiendo(false);

        //Almacenar la URL de destino
        const url = await firebase.storage.ref('productos').child(nombre).getDownloadURL();
        guardarUrlimagen(url);
    }

    const handleProgress = (progreso) => {
        guardarProgreso(progreso);


    }
 

    return (
        <>
           <h1 className="text-3xl font-light mb-4">Nuevo Platillo</h1>  

           <div className="flex justify-center mt-10">
                <div className="w-full  max-w-3xl">
                     <form onSubmit={formik.handleSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 id="nombre"
                                 type="text"
                                 placeholder="Nombre del Platillo"
                                 value={formik.values.nombre}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                            />
                          </div>

                          { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-500 text-red-700 p-4 mb-5" role="alert">
                                     <p className="font-bold">Hubo error:</p>
                                     <p>{formik.errors.nombre}</p>
                                </div>
                          ) : null }

                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                            <input
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 id="precio"
                                 type="number"
                                 placeholder="$"
                                 min="0"
                                 value={formik.values.precio}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                            />
                          </div>

                          { formik.touched.precio && formik.errors.precio ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-500 text-red-700 p-4 mb-5" role="alert">
                                     <p className="font-bold">Hubo error:</p>
                                     <p>{formik.errors.precio}</p>
                                </div>
                          ) : null }


                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Categoria</label>
                            <select 
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 id="precio"
                                 name="categoria"
                                 value={formik.values.categoria}
                                 onChange={formik.handleChange}
                            >
                                 <option value=""> -- Seleccione -- </option>
                                 <option value="desayuno"> Desayuno </option>
                                 <option value="comida"> Comida </option>
                                 <option value="cena"> Cena </option>
                                 <option value="bebida"> Bebida </option>
                                 <option value="postre"> Postre </option>
                                 <option value="ensalada"> Ensalada </option>

                            </select>
                          </div>

                          { formik.touched.categoria && formik.errors.categoria ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-500 text-red-700 p-4 mb-5" role="alert">
                                     <p className="font-bold">Hubo error:</p>
                                     <p>{formik.errors.categoria}</p>
                                </div>
                          ) : null }

                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                     

                            <FileUploder
                                     accept="image/*"
                                     id="imagen"
                                     name="imagen"
                                     randomizeFilename
                                     storageRef={firebase.storage.ref("productos")}
                                     onUploadStart={handleUploadStart}
                                     onUploadError={handleUploadError}
                                     onUploadSuccess={handleUploadSuccess}
                                     onProgress={handleProgress}
                            />
                          </div>
                          
                          { subiendo && (
                              <div className="h-12 relative w-full border">
                                    <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{ width: `${progreso}%` }}>
                                        { progreso }
                                    </div>
                              </div>    
                          )}

                          {
                              urlimagen && (
                                   <p className="bg-green-500 text-white p-3 text-center my-5">
                                        La imagen se subio correctamente
                                   </p>
                              )
                          }

                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Descripcion</label>
                            <textarea
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                 id="descripcion"
                                 type="text"
                                 placeholder="Descripcion del Platillo"
                                 value={formik.values.descripcion}
                                 onChange={formik.handleChange}
                            >
                            </textarea>
                          </div>

                          { formik.touched.descripcion && formik.errors.descripcion ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-500 text-red-700 p-4 mb-5" role="alert">
                                     <p className="font-bold">Hubo error:</p>
                                     <p>{formik.errors.descripcion}</p>
                                </div>
                          ) : null }

                          <input
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                value="Agregar Platillo"
                          />

                     </form>
                </div>
           </div>
        </>
    )
}

export default NuevoPlatillo
