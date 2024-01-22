import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';


import * as yup from 'yup';
import { useDispatch } from 'react-redux';


const schema = yup.object({
    // Password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'הסיסמא צריכה לכלול לפחות אות קטנה, אות גדולה, מספר, לפחות 4 תווים').required().min(4),
    Difficulty: yup.string().required().min(4),
    //הוראות
    Name: yup.string().required(),
    Duration: yup.string().required(),


}).required();

const AddRecipe = () => {

    const [recipes, setRecipes] = useState(useSelector(s => s.recipies));
    const dispatch = useDispatch();
    const [Difficulty, setDifficulty] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/api/recipe", data)
            .then(x => {
                console.log(x.data)
                alert("המתכון נוסף בהצלחה!")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.post('http://localhost:8080/api/recipe')
            .then(x => {

                console.log(x);
                setRecipes(x.data)

            })
            .catch(err => console.error(err))
            .finally()

    }, [])
    const selectDifficulty = (event) => {
        console.log(event)
        setDifficulty(event)
      //  console.log("----------------------", CurrentCategory)
    }
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <lable>Name</lable>
                <br />
                <input {...register("Name")} />
                <p>{errors.Name?.message}</p>


                {/* //  {/* הוראות הצורה של מערך */}


               <lable>Difficulty</lable>
                <br />
                <div class="s">
                    <select name="Difficulty" id="Difficulty" onChange={(e) => selectDifficulty(e.target.value)}>
                        {/* <option value={0}>Difficulty</option> */}
                        <option  value={1}>קל</option>
            <option  value={2}>בינוני</option>
            <option  value={3}>קשה</option>
                        {recipes.map(x => <option value={x.Difficulty}>{x.Difficulty}</option>)}



                    </select>
                    {/* <label>בחר רמה</label> */}
                </div>

                <input {...register("Difficulty")} />
                <p>{errors.Difficulty?.message}</p>

                <lable>Duration</lable>
                <br />
                <input {...register("Duration")} />
                <p>{errors.Duration?.message}</p>

                <lable>Description</lable>

                <br />
                <input {...register("Description")} />
                <p>{errors.Description?.message}</p>

                <lable>UserId</lable>
                <br />
                <input {...register("UserId")} />
                <p>{errors.UserId?.message}</p>

                <lable>CategoryId</lable>
                <br />
                <input {...register("CategoryId")} />
                <p>{errors.CategoryId?.message}</p>

                <lable>src img</lable>
                <br />
                <input {...register("Img")} />
                {/* מערך של אוביקט מתכון */}
                <p>{errors.Img?.message}</p>
                <input type="submit" />
            </form>
        </>
    )
}
export default AddRecipe;