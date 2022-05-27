import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import CustomizedDialogs from './Dialog';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/app.css';



function MainTable() {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.post('http://localhost/project/SelectTable.php')
      .then(res => {
        console.log(res.data);

        setTableData(res.data);
        console.log(tableData);
      })
      .catch(err => console.log(err));
  }


  const columns = [
    { title: "Name",render: (tableData) => tableData.Prenume + " " + tableData.Nume , align: "center", cellStyle: { background: "#D7E5F0" } },
    { title: "Email", field: "Email", align: "center" },
    { title: "Roles", field: "Role", align: "center", render: rowData => <CustomizedDialogs details={rowData} /> }
  ]

  if(localStorage.getItem("isLoggedin")==="true" && localStorage.getItem("userRole")==="2"){
  return (
    <div className='page-container'>
      <Navbar />
      <div className="App" style={{ maxWidth: "100%" }} >
        <h1 align="center" className="title">Users Permissions</h1>

        <MaterialTable onRowClick={(selectedRow) => <CustomizedDialogs details={selectedRow} />} columns={columns} data={tableData}
          editable={{
            onRowDelete: (selectedRow) => new Promise((resolve) => {
              const updatedData = [...tableData]
              updatedData.splice(selectedRow.tableData.id, 1)
              setTableData(updatedData)
              setTimeout(() => resolve(), 1000)

            })
          }}

          options={{

            sorting: true, search: true,
            searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
            paging: true, pageSizeOptions: [5, 10, 20, 25, 50, 100], pageSize: 5,
            paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both",
            addRowPosition: "first", actionsColumnIndex: -1,

            headerStyle: { background: "#ffb347" }

          }}
          

          title=" "
        />
      </div>
      <Footer />
    </div>

  )}else{
    return(
      <div>
        <h1 align="center" className="title">You are not logged in or dont't have access</h1>
      </div>
    )
  }
}


export default MainTable;
