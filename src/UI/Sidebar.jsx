import React from 'react'
import {
    Link,
    NavLink
  } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
             
             <div className="p-6">
                    <p className="text-white text-2xl tracking-wide text-center font-bold">Restaurant</p>
            
                    <p className="mt-3 text-gray-200">Administra tu Restaurant en las siguientes opciones:</p>


                    <nav className="mt-10">

                        <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-white" activeClassName="text-yellow-500" exact="true" to="/"> Ordenes </NavLink>
                        <NavLink  className="p-1 text-white block hover:bg-yellow-500 hover:text-white" activeClassName="text-yellow-500" exact to="/menu"> Menu </NavLink>

                    </nav>
             </div>

        </div>
    )
}

export default Sidebar
