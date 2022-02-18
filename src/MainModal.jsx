import { Modal } from "@mui/material";
import { useState } from "react";
import UserForm from "./UserForm";

function MainModal(props){
    console.log(props)
    return(
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
        >            
        </Modal>
    )
}

export default MainModal;