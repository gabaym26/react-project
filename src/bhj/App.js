// import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Signin from './components/signin';
import Login from './components/login';
import AddRecipe from './components/recipes/addRecipe';
import DeleteRecipe from './components/recipes/deleteRecipe';
import GetRecipes from './components/recipes/getRecipes';
import AddCategory from './components/recipes/addCategory';

function App() {
  return (
    <div className="App">
   <Header></Header>
     <Routes> 
         {/* <Route path="/" element={< />} /> */}
        <Route path="/signin" element={<Signin />} /> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/addRecipe" element={<AddRecipe/>}/>
        <Route path="/deleteRecipe" element={<DeleteRecipe/>}/>
        <Route path="/getRecipes" element={<GetRecipes/>}/>
        <Route path="/addCategory" element={<AddCategory/>}/>

        
       </Routes>
    </div>
  );
}

export default App;
