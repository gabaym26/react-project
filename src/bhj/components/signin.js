
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

const schema = yup.object({
    Username: yup.string().required(),
    // Password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'הסיסמא צריכה לכלול לפחות אות קטנה, אות גדולה, מספר, לפחות 4 תווים').required().min(4),
     Password: yup.string().required().min(4),

    Name: yup.string().required(),
   Phone: yup.string().required().min(9).max(10),
   Email: yup.string().email().required(),
    Tz: yup.string().required().length(9),

}).required();

const Signin = () => {
    const navigate= useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {

   
       axios.post("http://localhost:8080/api/user/sighin", data)
            .then(x => {
                console.log(x.data)
                 navigate('/homepage')

            })
            .catch(err => console.log(err))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <lable>Username</lable>
            <br />
            <input {...register("Username")} />
            <p>{errors.Username?.message}</p>

            <lable>password</lable>
            <br />
            <input {...register("Password")} />
            <p>{errors.Password?.message}</p>

            <lable>name</lable>
            <br />
            <input {...register("Name")} />
            <p>{errors.Name?.message}</p>

            <lable>phone</lable>
            <br />
            <input {...register("Phone")} />
            <p>{errors.Phone?.message}</p>

            <lable>email</lable>
            <br />
            <input {...register("Email")} />
            <p>{errors.Email?.message}</p>

            <lable>tz</lable>
            <br />
            <input {...register("Tz")} />
            <p>{errors.Tz?.message}</p>
            <input type="submit" />
        </form>

    );
}
export default Signin;