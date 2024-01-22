import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import axios from "axios";
import {useDispatch}  from 'react-redux';
import {useNavigate}from "react-router-dom";
const schema = yup
.object({
  Id: yup.number(),
  Username: yup.string().required(),
  Password: yup.string().required().length(4,"The number of digits is incorrect"),
  Name: yup.string().required(),
  Phone: yup.string().length(10,"The number of digits is incorrect").required(),
  Email:yup.string().email().required(),
  Tz:yup.string().length(9,"The number of digits is incorrect").required(),
})
.required()
const Signing=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch();

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) =>{
    console.log(data);
    axios.post('http://localhost:8080/api/user/sighin',data)
    .then(x=>{
    dispatch({type:"SET_USER",data:x.data})
    navigate('../home')
  }).catch(err => console.log(err));
  
  };
return (
  <form onSubmit={handleSubmit(onSubmit)}>
    
    <input {...register("Username", { pattern: /^[A-Za-z]+$/i })} placeholder="שם משתמש" />
    <p>{errors.Username?.message}</p>

    <input {...register("Password")}placeholder="סיסמא" />
    <p>{errors.Password?.message}</p>

    <input {...register("Name", { pattern: /^[A-Za-z]+$/i })} placeholder="שם מלא" />
    <p>{errors.Name?.message}</p>

    <input {...register("Tz")}placeholder="תעודת זהות" />
    <p>{errors.Tz?.message}</p>

    <input {...register("Phone")}placeholder="פלאפון" />
    <p>{errors.Phone?.message}</p>

   <input {...register("Email")}placeholder="מייל" />
    <p>{errors.Email?.message}</p>

    <input type="submit"/>
   
  </form>

)
}
export default Signing;