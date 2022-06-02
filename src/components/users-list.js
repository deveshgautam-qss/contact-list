import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";

function UsersList(props){
    const [userList, setUserList] = useState(props.userList);
    var listPrevChar = "";

    function onAddContactButton(){
        props.onAddContactButton();
    }

    function onUserClick(id){
        props.onUserClick(id);
    }

    useEffect(()=>{
        setUserList(props.userList);
    }, [props.userList])

    function onSearchChange(e){
        let value = e.target.value.toLowerCase();
        value ? 
        setUserList(props.userList.filter((user) => user.firstname.toLowerCase().includes(value))) : 
        setUserList(props.userList);
    }

    return (
        <React.Fragment>
            <div id='search-box'>
                <input className='form-control' type="text" onChange={onSearchChange} placeholder="Search..." />
            </div>
            <div className='user-list mt-2 mb-2 border' style={{height: "450px"}}>
                <ul style={{padding: "0", margin: "0"}}>
                {                    
                    userList.length ? 
                    userList.sort((a,b) => (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0)).map(user => {
                        let listCharJsx = "";
                        if(user.firstname.split("")[0].toLowerCase() !== listPrevChar.toLowerCase()){
                            listPrevChar = user.firstname.split("")[0];
                            listCharJsx = <li key={(new Date()).getTime()} data-id={(new Date()).getTime()} className="not-selected"> {listPrevChar.toUpperCase()}</li>                            
                        }
                        
                        return [
                            listCharJsx,
                            <li 
                                className={user.id === props.selectedUser.id ? 'selected' : ''} 
                                data-id={user.id}
                                key={user.id} 
                                style={{
                                    listStyle: "none", 
                                    padding: "8px 15px", 
                                    color: "#707070", 
                                    textTransform: "capitalize"
                                }} 
                                onClick={() => onUserClick(user.id)}
                            >
                                {user.firstname + (user.middlename.split("")[0] ? " " + user.middlename.split("")[0].toUpperCase() + "." : "") + " " + user.lastname }
                            </li>
                        ]
                    }) : ""
                }
                </ul>
            </div>
            <Button className="btn btn-success btn-block" onClick={onAddContactButton}>Add Contact</Button>
        </React.Fragment>
    )
}

export default UsersList;