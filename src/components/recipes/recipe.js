import { useEffect, useState } from "react";
import axios from "axios";
import RecipeReviewCard from "./singleRecipe";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getRecipes } from "../service/recipe";
function Recipe() {
    const [category, setCategory] = useState([]);
    const [level, setLevel] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(0);
    
    const dispatch = useDispatch()


    const recipes = useSelector((state) => state.recipe.recipe)

    useEffect(() => {
        dispatch(getRecipes());

        axios.get("http://localhost:8080/api/category")
            .then(x => setCategory(x.data))
    }, [])



    function selectKategory(event) {
        setCurrentCategory(event.target.value);
    }

    function selectLevel(event) {
        setLevel(event.target.value);
    }

    function selectDuration(event) {
        setDuration(event.target.value);
    }

    return (
        <div>

            <div class="select">
                <div>
                    <label >בחר זמן הכנה:</label>
                    <input type="number" onChange={selectDuration} class="n"></input>
                </div>
                <div class="s">
                    <label >בחר קטגוריה</label>
                    <select name="category" id="category" onChange={selectKategory}>

                        {category.map(x => <option value={x.Id}>
                            {x.Name}</option>
                        )}
                        <option value="0">הכל</option>
                    </select>
                </div>



                <div class="s">
                    <label >:בחר רמה</label>
                    <select name="difficulty" id="difficulty" onChange={selectLevel}>
                        <option value="0">הכל</option>
                        <option value="1">קל</option>
                        <option value="2"> בינוני</option>
                        <option value="3"> קשה</option>
                    </select>
                </div>

            </div>
            <div class="flexColumn">
                {recipes.map(x =>
                    (currentCategory == 0 || currentCategory == x.CategoryId)
                        &&
                        (level == 0 || level == x.Difficulty)
                        && (duration == 0 || duration >= x.Duration) ?
                        <div class="middleRecipe"><RecipeReviewCard Name={x.Name} Img={x.Img} Description={x.Description} Ingrident={x.Ingrident} Instructions={x.Instructions} UserId={x.UserId}
                            CategoryId={x.CategoryId} /></div> : null)}</div>
        </div>);
}
export default Recipe;