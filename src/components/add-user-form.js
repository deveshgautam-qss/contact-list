import React, {useState} from "react";
import { FormSelect } from "react-bootstrap";

function AddUserForm(props){
    let userDetails = Object.getOwnPropertyNames(props.selectedUser).length ? props.selectedUser : {
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        group: "default",
        notificationCheck: false
    };

    const [formObj, setFormObj] = useState(userDetails);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isSaveClicked, setIsSaveClicked] = useState(false);


    function onModelClose(){
        props.onModelClose();
    }

    function onFirstnameChange(e){
        let value = e.target.value;
        if(value || formObj) setFormObj({...formObj, firstname: value})
    }

    function onMiddlenameChange(e){
        let value = e.target.value;
        if(value || formObj) setFormObj({...formObj, middlename: value})
    }

    function onLastnameChange(e){
        let value = e.target.value;
        if(value || formObj) setFormObj({...formObj, lastname: value})        
    }

    function onEmailChange(e){
        let value = e.target.value;
        if(value || formObj){
            setFormObj({...formObj, email: value})

            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            regex.test(value) ?
            setIsValidEmail(true) :
            setIsValidEmail(false)            
        }

        if(!value) setIsValidEmail(true);
    }

    function onNotificationCheckboxChange(){
        setFormObj({...formObj, notificationCheck: !formObj.notificationCheck})
    }

    function onSelectChange(e){
        let value = e.target.value;
        if(value) setFormObj({...formObj, group: value})        
    }

    function checkValidation(){
        let isValid = true;

        if(!formObj.firstname || !formObj.lastname || !formObj.email || formObj.group === "default"){
            isValid = false;
        }
        return isValid;
    }

    function onContactSave(){        
        setIsSaveClicked(true);
        if(!checkValidation()) return;
        
        setIsSaveClicked(false);
        props.onContactSave(formObj);
    }

    return (
        <div className="form-container">
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
                        {
                            (formObj.firstname && formObj.lastname) ? 
                            (formObj.firstname.split("")[0] + formObj.lastname.split("")[0]).toUpperCase() : 
                            ""
                        }
                    </div>
                </div>
                <div className="col-md-8">
                    <form style={{color: "#7e7e7e"}}>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control form-control-sm" id="firstname" value={formObj.firstname} onChange={onFirstnameChange}/>
                            {(isSaveClicked && !formObj.firstname) ? <small id="first-name-err" className="form-text text-danger">First Name is required.</small> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="middlename">Middle Name</label>
                            <input type="text" className="form-control form-control-sm" id="middlename" value={formObj.middlename} onChange={onMiddlenameChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control form-control-sm" id="lastname" value={formObj.lastname} onChange={onLastnameChange}/>
                            {(isSaveClicked && !formObj.lastname) ? <small id="last-name-err" className="form-text text-danger">Last Name is required.</small> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control form-control-sm" id="email" value={formObj.email} onChange={onEmailChange}/>
                            {(isSaveClicked && !formObj.email) ? <small id="email-err" className="form-text text-danger">Email is required.</small> : ""}
                            {!isValidEmail ? <small id="email-err" className="form-text text-danger">Please enter valid email.</small> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="group">Group</label>
                            <FormSelect className="form-select form-control form-control-sm" id="group" value={formObj.group} onChange={onSelectChange}>
                                <option value="default">Please Select Group</option>
                                <option value="family">Family</option>
                                <option value="friend">Friend</option>
                                <option value="school">School</option>
                                <option value="work">Work</option>
                            </FormSelect>
                            {(isSaveClicked && formObj.group == "default") ? <small id="group-err" className="form-text text-danger">Please select group.</small>: ""}
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked={formObj.notificationCheck} onChange={onNotificationCheckboxChange} id="notification-check" />
                            <label className="form-check-label" htmlFor="notification-check">
                                Hide notifications from this contact
                            </label>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <button type="button" className="btn btn-danger" onClick={onModelClose}>Cancel</button>
                            </div>
                            <div className="col-md-6 text-right">
                                <button type="button" className="btn btn-primary" onClick={onContactSave}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUserForm;