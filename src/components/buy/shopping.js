import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Shopping() {
    const user = useSelector((state) => state.user.user)


    const [listBuy, setListBuy] = useState([]);

    const getAllBuy = () => {
        axios.get(`http://localhost:8080/api/bay/${user.Id}`)
            .then(x => setListBuy(x.data)).catch(err=>console.log(err))
    }
    useEffect(() => {
        getAllBuy();
    }, [])
    const plus = (x) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: user.Id, Count: 1 })
            .then(getAllBuy())
            .catch(err=>console.log(err))
    }
    const minus = (x) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: user.Id, Count: -1 })
            .then(getAllBuy())
            .catch(err=>console.log(err))
    }
    const deleteP = (x) => {
        axios.post(`http://localhost:8080/api/bay/delete/${x.Id}`)
            .then(getAllBuy())
            .catch(err=>console.log(err))
    }
    return (<>
        {listBuy.map(x => <div class="buy">
            <button onClick={() => deleteP(x)}>pach</button>
            <button onClick={() => plus(x)}>+</button>
            <button onClick={() => minus(x)}>-</button>
            <div class="p">{x.Name}</div>
            <div class="p">{x.Count} </div>
        </div>
        )}
    </>
    );
}
export default Shopping;