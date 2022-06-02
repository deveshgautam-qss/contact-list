import React from "react";

function UserDetails(props){
    function onEditClick(){
        props.onEditClick();
    }

    function onDeleteClick(){
        props.onDeleteClick();
    }

    return (
        <div id="user-detail">
            <div className="user-info" style={{height: "504px"}}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="user-avatar" style={{
                            width:"150px", 
                            height: "150px", 
                            backgroundColor: "#dedede", 
                            borderRadius: "50%",
                            display: "flex",
                            fontSize: "60px",
                            color: "#ffffff",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto"
                            }}>
                            {props.selectedUser.firstname.split("")[0] + props.selectedUser.lastname.split("")[0]}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div style={{fontSize: "35px", lineHeight: "40px", fontWeight: "700", color: "#707070", textTransform: "capitalize"}}>
                            <div className="firstname">{props.selectedUser.firstname}</div>
                            <div className="middlename">{props.selectedUser.middlename}</div>
                            <div className="lastname">{props.selectedUser.lastname}</div>
                        </div>
                        <div style={{marginTop: "60px"}}>
                            <table>
                                <tbody style={{color: "#707070"}}>
                                    <tr>
                                        <td style={{width: "100px"}} className="pt-2 pb-2">
                                            <strong>Email</strong>
                                        </td>
                                        <td>{props.selectedUser.email}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Group</strong>
                                        </td>
                                        <td style={{textTransform: "capitalize"}}>{props.selectedUser.group}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-action">
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-light mr-2" style={{cursor: "not-allowed"}}>Share</button>
                        <button type="button" className="btn btn-warning" onClick={onEditClick}>Edit</button>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;