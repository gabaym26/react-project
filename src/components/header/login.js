import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios";
import {useDispatch}  from 'react-redux';
import {useNavigate}from "react-router-dom";

   
const schema = yup
.object({
  Username: yup.string().required(),
  Password: yup.string().length(4).required(),
})
.required()

const Login=()=>{
   const navigate=useNavigate();
  const dispatch=useDispatch();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/api/user/login", data)
    .then(x => {
      console.log(x.data);
      dispatch({type:"SET_USER",data:x.data})
      navigate('../home');
    }).catch(err=> navigate('/sign in'));
    
  }
return(
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("Username")} placeholder="שם משתמש"/>
    <p>{errors.Username?.message}</p>

    <input {...register("Password")}placeholder="סיסמא" />
    <p>{errors.Password?.message}</p>
    <input type="submit"/>
  </form>
)
}
export default Login;