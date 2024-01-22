import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useEffect, useState } from "react";
const schema = yup.object({
    Name: yup.string().required()
  })
  .required()

  const AddCategory=()=>{
  const [category, setCategory] = useState([]);

  useEffect(() => {
     axios.get("http://localhost:8080/api/category")
        .then(x => setCategory(x.data))
},category, [])


const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
     axios.post("http://localhost:8080/api/category", data)
     .then(setCategory(category))
     .catch()
  }
return(
  <div>
  <label>הוסף קטגוריה</label>
  <form onSubmit={handleSubmit(onSubmit)}>
  
    <input {...register("Name")} placeholder="שם קטגוריה"/>
    <p>{errors.Name?.message}</p>

    <input type="submit"/>
  </form>
  
  <div>
    {category.map((x,i) =>
      <div class="white" key={i}> {x.Name} </div>)}
  </div>
  
  </div>
)
}
export default AddCategory;