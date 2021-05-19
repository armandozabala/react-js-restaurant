import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from "./components/Menu";
import NuevoPlatillo from "./components/NuevoPlatillo";
import Ordenes from "./components/Ordenes";
import Sidebar from "./UI/Sidebar";

import firebase, { FirebaseContext } from './firebase';

function App() {
  return (
    <FirebaseContext.Provider
         value={{firebase}}
    > 
     <div className="md:flex min-h-screen">
      

       <Sidebar/>

       <div className="md:w-3/5 xl:w-4/5 p-6">

        <Switch>
              {/* Rutas */}
              <Route path="/menu">
                  <Menu/>
              </Route>
              <Route path="/nuevo-platillo">
                  <NuevoPlatillo/>
              </Route>
              <Route path="/" exact>
                  <Ordenes/>
              </Route>
          </Switch>
       </div>
  
    </div>
    </FirebaseContext.Provider>
    
  );
}

export default App;
