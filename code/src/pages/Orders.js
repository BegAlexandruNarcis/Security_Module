import React from 'react';
import Navbar from '../components/Navbar';
import  { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import '../css/app.css';
import Footer from '../components/Footer';


const Orders = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        getOrders();
      }, []);
    
      function getOrders() {
        axios.post('http://localhost/project/SelectOrders.php')
          .then(res => {
            setTableData(res.data);
            console.log(tableData);
          })
          .catch(err => console.log(err));
      }

    const columns = [
        { title: "Customer Name", field: "CustomerName", align: "center", cellStyle: { background: "#D7E5F0" } },
        { title: "Email", field: "Email", align: "center" },
        { title: "Order Date", field: "OrderDate", align: "center" },
        { title: "Oras", field: "Oras", align: "center" },
        { title: "Judet", field: "Judet", align: "center" },
        { title: "Strada", field: "Strada", align: "center" },
        { title: "Numar", field: "Numar", align: "center" },
        { title: "Bloc", field: "Bloc", align: "center" },
        { title: "Scara", field: "Scara", align: "center" },
        { title: "CodPostal", field: "CodPostal", align: "center" },
        { title: "Total", field: "Total", align: "center" },
      ]
      if (localStorage.getItem("isLoggedin") === "true" && localStorage.getItem("userRole") === "2" || localStorage.getItem("userRole") === "4") {
    return (
        
            <div className="page-container">
            <Navbar />
            <div className="App" >
                <h1 align="center" className="title">Orders</h1>

                <MaterialTable columns={columns} data={tableData}
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
        
    );
                  }
                  else {
                    return (
                      <div>
                        <h1 align="center" className="title">You are not logged in or dont't have access</h1>
                      </div>
                    )
                  }
}

export default Orders