import React, { useState } from 'react'
import Gallery from './Components/Gallery'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RecipeDetails from './Components/RecipeDetails'
import AddRecipe from './Components/AddRecipe'
import SupriseMe from './Components/SupriseMe'
import ProtectedRoute from './Components/ProtectedRoute'
import Login from './Components/Login'
import Register from './Components/Register'
import NotFound from './Components/NotFound'
import EditRecipe from './Components/EditRecipe'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}


function App() {
  const [recipes, setRecipes] = useState([]);
 

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='*' element= {<NotFound/>}/>
      <Route path='/' element= {<Home/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/logout' element= {<Logout/>}/>
      <Route path='/register' element= {<RegisterAndLogout/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/suprise' element={<ProtectedRoute><SupriseMe/></ProtectedRoute>}/>
      <Route path='/gallery'element={<ProtectedRoute><Gallery recipes={recipes} setRecipes={setRecipes}/></ProtectedRoute>}/>
      <Route path='/addRecipe'element={<ProtectedRoute><AddRecipe recipes={recipes} setRecipes={setRecipes}/></ProtectedRoute>}/>
      <Route path='/recipe/:id' element ={<ProtectedRoute><RecipeDetails/></ProtectedRoute>} />
      <Route path='/recipe/:id/edit' element= {<EditRecipe recipes={recipes} setRecipes={setRecipes}/>}/>  
    </Routes>

    </BrowserRouter>
  )
}

export default App