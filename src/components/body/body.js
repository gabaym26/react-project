import { Route, Routes } from "react-router-dom"
import Login from "../header/login";
import Signing from "../header/Signing";
import Home from './home';
import Recipe from "../recipes/recipe";
import AddCategory from "../category/addCategory";
import AddRecipe from "../recipes/addRecipe";
import { useSelector } from "react-redux";
import Shopping from "../buy/shopping";
const Body = () => {

    const user=useSelector((state)=>state.user.user)
    return( <><Routes> 
    {!user&& <>
        <Route path="/login" element={<Login/>} />    
        <Route path="/sign in" element={<Signing/>}/>
        <Route path=""element={<Home/>}/></>}
    {user&&<>
         <Route path="/home"element={<Home/>}/>
         <Route path="/recipe"element={<Recipe/>}/>
         <Route path="/addCategory"element={<AddCategory/>}/>
         <Route path="/addRecipe"element={<AddRecipe/>}/>
         <Route path="/buy"element={<Shopping/>}/>
         <Route path="/login" element={<Login/>} />    
        <Route path="/sign in" element={<Signing/>}/>
    </>}</Routes>
    </>)
}

export default Body