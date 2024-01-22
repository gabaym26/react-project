import { useSelector } from "react-redux";
import Menu from './menu';
import Start from './start';


function Header(){
 const user=useSelector((state)=>state.user.user)
      
return(
    <div class="h">
    <h1 class="helo">שלום</h1>
    <div class="head"> 
    {user&&<Menu/>}
    {!user&&<Start/>}
    </div>
    </div>
);
}
export default Header;
