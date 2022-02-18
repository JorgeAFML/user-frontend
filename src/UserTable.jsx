import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import './UserTable.css'
import { Button, Modal, Stack } from "@mui/material";
import UserForm from "./UserForm";


const baseURL = "https://localhost:7255/api/User";

function UserTable(){
    const [users, setUsersData] = useState(new Array());
    const [isOpenModal, setModalStatus] = useState(false);
    const [userId, setUserId] = useState(0);
    const handleCloseModal = ()=> setModalStatus(false);
    const handleOpenModal = ()=> setModalStatus(true);
    const columns = [
        { field: 'userId', headerName: 'ID', width: 50, headerAlign:'center' },
        { field: 'firstName', headerName: 'First name', width: 100 },
        { field: 'lastName', headerName: 'Last name', width: 100 },
        { field: 'email',headerName: 'Email',width: 200 },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 200,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
          width:300,
          renderCell: (cellValues) => {
            return(
                <Stack direction="row" spacing={2} >
                <Button variant="outlined" 
                    onClick={handleOpenModal, setUserId(cellValues.row.userId)}>Edit</Button>
                <Button variant="outlined" color="error" >
                    {cellValues.row.isActive ? 'Deacivate' : 'Active'}
                </Button>
            </Stack>
            );

        }}
      ];
    const getAllUsers = async () =>{
        await axios
        .get(baseURL)
        .then( response  =>{
            setUsersData(response.data);
            //console.log(response.data);
        })
        .catch((error) =>{
            console.log(error)
        });
    }

    useEffect(async () =>{
        await getAllUsers();
    },[]);
    
return (
    
        <div className="UserTableDiv" style={{justifySelf:'center' ,alignItems:'center', width:'100%' }}>
            <Modal
                open={isOpenModal}
                onClose={handleCloseModal}
            >
                    <UserForm>

                    </UserForm>
            </Modal>
            <DataGrid
                rows={users}
                columns={columns} 
                className="tableUsers"
                getRowId ={(row) => row.userId}
                autoHeight {...users}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
        )
}

export default UserTable;