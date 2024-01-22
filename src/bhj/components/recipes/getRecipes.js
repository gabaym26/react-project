import axios from 'axios'
import { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Recipe from './displayRecipe';
import { useDispatch } from "react-redux";
import * as Actions from '../store/action';
import DisplayRecipe from './displayRecipe';

const GetRecipes = () => {

    const navig = useNavigate();

    const [recipes, setRecipes] = useState([])
    const [category, setCategory] = useState([])
    const [CurrentCategory, setCurrentCategory] = useState(0);
    const [Difficulty, setDifficulty] = useState([]);

    const dispatch = useDispatch();
    // const [userId, setUserId] = useState();
    const nav = (x) => {
        navig("/displayRecipe", { state: x })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/recipe')
            .then(x => {

                console.log(x);
                setRecipes(x.data)
                dispatch({ type: Actions.SET_RECIPE, payload: x.data })
            })
            .catch(err => console.error(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(x => {

                console.log(x);
                setCategory(x.data)
                dispatch({ type: Actions.SET_RECIPE, payload: x.data })
            })
            .catch(err => console.error(err))

    }, [])
    // const nav = (userId, name) => {
    //     navig("post", { state: { userId, name } })
    // }
    console.log("recipies", recipes);
    const selectkategory = (event) => {
        console.log(event)
        setCurrentCategory(event)
        console.log("----------------------", CurrentCategory)
    }
    const selectDifficulty = (event) => {
        console.log(event)
        setDifficulty(event)
        console.log("----------------------", CurrentCategory)
    }
    return (
        <div>
            <div class="select">
                <div class="s">
                    <select name="category" id="category" onChange={(e) => selectkategory(e.target.value)}>
                        <option value={0}>הכל</option>

                        {category.map(x => <option value={x.Id}>{x.Name}</option>)}

                    </select>
                    <label>בחר קטגוריה</label>
                </div>

                <div class="s">
                    <select name="Difficulty" id="Difficulty" onChange={(e) => selectDifficulty(e.target.value)}>
                        <option value={0}>Difficulty</option>
                        {/* <option  value={1}>{1}</option>
            <option  value={2}>{2}</option>
            <option  value={3}>{3}</option> */}
                        {recipes.map(x => <option value={x.Difficulty}>{x.Difficulty}</option>)}



                    </select>
                    <label>בחר רמה</label>
                </div>



                <ul>{recipes.map(x =>
                    (((CurrentCategory == 0) || (CurrentCategory == x.CategoryId)) &&
                        (Difficulty == 0 || Difficulty == x.Difficulty)) &&
                    <div>
                        {/* {alert("kjgju")} */}
                        {/* <img src={x.Img} /> */}
                        <h3>{x.Name}</h3>
                        <div><Recipe recipe={x} /></div>

                        {/* <button onClick={nav(x)}>פרטי מתכון</button> */}
                        {/* <DisplayRecipe recipe={x} /> */}
                        {/* <button onClick={<DisplayRecipe  />פרטי מתכון</button> */}

                        {/* <button onClick={Recipe.x }>פרטי מתכון</button> */}
                        {/* <div><Recipe recipe={x} /></div> */}
                    </div>)}
                </ul>
                <Outlet />
                <hr />
            </div>
        </div>

    )
}
export default GetRecipes;