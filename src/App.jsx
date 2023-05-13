import jwtDecode from 'jwt-decode';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import All from './Components/All/All';
import GameDetails from './Components/GameDetails/GameDetails';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Platforms from './Components/Platforms/Platforms';
import Games from './Components/Games/Games';




function App(props) {


  function ProtectedRoute({children}){
    if (crrUser == null) {
      return <Navigate to='/login'/>
    }else{
      return <>
      {children}
      </>
    }
  }


  const [crrUser, setcrrUser] = useState(null);

  useEffect(function(){

    if( localStorage.getItem('tkn') != null && crrUser == null){

      getUserData();
    }
  }, [])

  
  

  function getUserData(){
    // decode use data

   const userData= jwtDecode(localStorage.getItem('tkn'));

   setcrrUser(userData);
   console.log(userData);

  }

  function clearUserData(){
    localStorage.removeItem('tkn')

    setcrrUser(null)

}

 const router = createBrowserRouter([
    {path: '', element: <Layout crrUser= {crrUser} clearUserData={clearUserData}/>, children: [

      {path: '', element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path: 'home', element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path: 'login', element: <Login getUserData ={getUserData} crrUser={crrUser} />},
      {path: 'register', element: <Register/>},
      {path: 'gamedetails/:id', element: <ProtectedRoute> <GameDetails/> </ProtectedRoute>},
      {path: 'game/:filter/:type', element: <ProtectedRoute> <Games/> </ProtectedRoute>},
      {path: 'game/all', element: <ProtectedRoute> <Games/> </ProtectedRoute>},


      {path: '*', element: <>
      <div className='vh-100 main-color pt-5'> 
      <h2 className='mt-5'>notfound works!</h2>
      </div>
      </>}


    ]}
  ])


  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;