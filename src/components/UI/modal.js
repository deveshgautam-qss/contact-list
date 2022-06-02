import React from "react";
import "./modal.css"
import ReactDOM from "react-dom";

function Modal(props){

    function onModelClose(){
        props.onModelClose();
    }

    return (
        ReactDOM.createPortal(
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-header">
                        <div className="row">
                            <div className="col-md-6 title">{props.title}</div>
                        </div>
                        <div className="col-md-6 text-right">
                            <div className="cross" style={{display: "inline-block", cursor: "pointer"}} onClick={onModelClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
            , document.getElementById('modal-root')
        )
    )
}

export default Modal;