import { Box, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function UserForm(props){
    const [user, setUser]= useState([]);
    const baseUrl = `https://localhost:7255/api/User/${props.userId}`;
    
    const getUserById = async() => {
        axios
        .get(baseUrl)
        .then(response =>{
            setUser(response.data)   
        })
    };
    
    useEffect(async () =>  {
        await getUserById();
    },[]);

    return(
        <div>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            
            <Stack direction="column" spacing={2}>
                <TextField label="First Name" variant="outlined">{user.firstName}</TextField>
                <TextField label="Last Name" variant="outlined">{user.lastName}</TextField>
                <TextField label="Middle Name" variant="outlined">{user.middleName}</TextField>
                <TextField label="Email" variant="outlined">{user.email}</TextField>
            </Stack>

        </Box>
        </div>
    )
}

export default UserForm;