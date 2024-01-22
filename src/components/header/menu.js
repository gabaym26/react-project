import {Link} from 'react-router-dom'
function Menu(){
return(
    <>
    <div class="menu">
    <Link to="/recipe" class="link">מתכונים</Link>
    <Link to="/addCategory" class="link">הוסף קטגוריה</Link>
    <Link to="/addRecipe" class="link">הוסף מתכון</Link>
    <Link to="/home" class="link">דף הבית</Link>
    <Link to="/buy" class="link">רשימת הקניות</Link>
    <Link to="/login" class="link">החלף משתמש</Link>
    <Link to="/sign in" class="link"> הכנס משתמש חדש</Link>

    </div></>
);
}
export default Menu;