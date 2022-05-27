
import { Container, FormControl, FormLabel, Grid, Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            blue: '#4164e3',
            cadet: '#8998a8',
            dark: '#243156',
            gray: '#a0acb9',
            green: '#36c537',
            light: '#e9ebee',
            pure: '#fafafb',
            slate: '#77889a',
            white: '#fcfdfe',
            yellow: '#ed9b13',
        },
    },
    components: {
        Button: {
            variants: {
                solid: {
                    p: '6',
                    color: 'white',
                    bg: 'brand.blue',
                    _hover: { bg: 'brand.green' },
                    _active: { bg: 'brand.blue' },
                }
            },
        },
        Tabs: {
            baseStyle: {
                tab: {
                    _focus: {
                        boxShadow: 'none',
                    },
                },
            },
        },
    },
})


function Accountant() {
    const [tableData, setTableData] = useState([]);
    let sumbuy = 0;
    let sumsell = 0;
    let PackFee = 0;
    let Tax = 0;
    let i = 0;
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.post('http://localhost/project/SelectAccD.php')
            .then(res => {
                console.log(res.data);
                setTableData(res.data);
                console.log(tableData);
            })
            .catch(err => console.log(err));
    }
    for (i; i < tableData.length; i++) {

        sumbuy = sumbuy + (parseInt(tableData[i].BuyPrice) * parseInt(tableData[i].Qty));
        PackFee = PackFee - parseInt(tableData[i].PackingFees);
        Tax = Tax - parseInt(tableData[i].Taxes)
        sumsell = sumsell + (parseInt(tableData[i].SellPrice) * parseInt(tableData[i].Qty));
    }
    let total = (sumsell - sumbuy) + (PackFee + Tax);

    const handleInputID = (e) => { setData({ ...data, Item_ID: e.target.value }) }
    const handleInputName = (e) => { setData({ ...data, Item_Name: e.target.value }) }
    const handleInputBuyPrice = (e) => { setData({ ...data, BuyPrice: e.target.value }) }
    const handleInputSellPrice = (e) => { setData({ ...data, SellPrice: e.target.value }) }
    const handleInputQuantity = (e) => { setData({ ...data, Qty: e.target.value }) }
    const handleInputShippingCost = (e) => { setData({ ...data, ShippingCost: e.target.value }) }
    const handleInputPackingFees = (e) => { setData({ ...data, PackingFees: e.target.value }) }
    const handleInputTaxes = (e) => { setData({ ...data, Taxes: e.target.value }) }
    //'$Item_ID','$Item_Name','$BuyPrice','$SellPrice','$Qty','$ShippingCost','$PackingFees','$Taxes'

    const [data, setData] = useState({
        Item_ID: "",
        Item_Name: "",
        BuyPrice: "",
        SellPrice: "",
        Qty: "",
        ShippingCost: "",
        PackingFees: "",
        Taxes: ""
    });





    const handleOnClick = () => {
        axios.post('http://localhost/project/InsertAcc.php', data)
            .then(res =>
                console.log(res.data)
            )
            .catch(error => {
                console.log(error.response)
            });
        window.location.reload();
    }

    const columns = [
        { title: "Product ID", field: "Item_ID", align: "center" },
        { title: "Item Name", field: "ItemName", align: "center" },
        { title: "Buy Price", field: "BuyPrice", align: "center" },
        { title: "Sell Price", field: "SellPrice", align: "center" },
        { title: "Quantity", field: "Qty", align: "center" },
        { title: "ShippingCost", field: "ShippingCost", align: "center" },
        { title: "PackingFees", field: "PackingFees", align: "center" },
        { title: "Taxes", field: "Taxes", align: "center" },
    ]

    console.log(data);
    if (localStorage.getItem("isLoggedin") === "true" && localStorage.getItem("userRole") === "2" || localStorage.getItem("userRole") === "3") {
        return (
            <div className="page-container">
                <Navbar />
                <ChakraProvider theme={theme} >
                    <Container display={{ base: 'block', md: 'flex', }} maxW="container.xl" >
                        <Box
                            as="main"
                            flex={3}
                            d="flex"
                            flexDir="column"
                            justifyContent="space-between"
                            pt={5}
                            px={3}
                            mt={5}
                            bg="white"
                            rounded="md"
                            borderWidth={1}
                            borderColor="black"
                        >

                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                                gap={6}
                            >
                                <FormControl id="firstName">
                                    <FormLabel>Product ID</FormLabel>
                                    <Input
                                        type="text"
                                        value={data.ProductID}
                                        onChange={handleInputID}
                                        autoComplete="none"
                                    />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Product Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={data.ProductName}
                                        onChange={handleInputName}
                                        autoComplete="none"
                                    />
                                </FormControl>
                                <FormControl id="phoneNumber">
                                    <FormLabel>Buy Price</FormLabel>
                                    <Input
                                        type="tel"
                                        value={data.BuyPrice}
                                        onChange={handleInputBuyPrice}
                                        autoComplete="none"
                                    />
                                </FormControl>
                                <FormControl id="emailAddress">
                                    <FormLabel>Sell Price</FormLabel>
                                    <Input
                                        type="email"
                                        value={data.SellPrice}
                                        onChange={handleInputSellPrice}
                                        autoComplete="none"
                                    />
                                </FormControl>

                                <FormControl id="city">
                                    <FormLabel>Quantity</FormLabel>
                                    <Input
                                        type="text"
                                        value={data.Quantity}
                                        onChange={handleInputQuantity}
                                        autoComplete="none"
                                    />
                                </FormControl>

                                <FormControl id="country">
                                    <FormLabel>Shipping Cost</FormLabel>
                                    <Input
                                        type="text"
                                        value={data.ShippingCost}
                                        onChange={handleInputShippingCost}
                                        autoComplete="none"
                                    />
                                </FormControl>

                                <FormControl id="country">
                                    <FormLabel>Packing Fees</FormLabel>
                                    <Input
                                        type="text"
                                        value={data.PackingFees}
                                        onChange={handleInputPackingFees}
                                        autoComplete="none"
                                    />
                                </FormControl>

                                <FormControl id="country">
                                    <FormLabel>Taxes</FormLabel>
                                    <Input
                                        type="text"
                                        value={data.Taxes}
                                        onChange={handleInputTaxes}
                                        autoComplete="none"
                                    />
                                </FormControl>
                            </Grid>


                            <Box mt={5} py={5} px={8} borderTopWidth={1} >
                                <button className='btn btn-outline-dark' onClick={handleOnClick} >Insert</button>
                            </Box>
                        </Box>
                    </Container>
                    <Container display={{ base: 'block', md: 'flex', }} maxW="container.xl" >
                        <Box
                            as="main"
                            flex={3}
                            d="flex"
                            flexDir="column"
                            justifyContent="space-between"
                            pt={4}
                            pb={4}
                            px={3}
                            mt={5}
                            bg="white"
                            rounded="md"
                            borderWidth={1}
                            borderColor="black"
                        >
                            <p>Total Money Spend on Buying products: ${sumbuy}</p>
                            <p>Total Money Earned from Selling products: ${sumsell}</p>
                            <p>Total Money Spent on Packing Fees: ${-PackFee}</p>
                            <p>Total Money Spent on Taxes: ${-Tax}</p>
                            <p>Total Profit to be made: ${total}</p>
                        </Box>
                    </Container>
                </ChakraProvider>


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
                <Footer />
            </div>
        );

    } else {
        return (
            <div>
                <h1 align="center" className="title">You are not logged in or dont't have access</h1>
            </div>
        )
    }
}

export default Accountant;