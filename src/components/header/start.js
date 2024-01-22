import {Link}from 'react-router-dom';

function Start(){
    const handleClick = () => {
        console.log("Button clicked!");
      };
return(
    <>
    <Link to="/login" class="link">כניסה</Link>
    <Link to="/sign in" class="link">הרשמה</Link>
    <Link to="" class="link">דף הבית</Link>  
    </>
);
}
export default Start;