
import { Container, FormControl, FormLabel, Grid, Input } from '@chakra-ui/react'
import { Button, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Stack, Radio, RadioGroup } from '@chakra-ui/react';



import '../css/app.css';
import { useNavigate } from 'react-router-dom';


const theme = extendTheme({
    colors: {light: '#e9ebee'}
    ,
    components: {
        Button: {
            variants: {
                solid: {
                    p: '6',
                    borderColor: 'black',
                    borderWidth: '1px',
                    color: 'black',
                    bg: 'white',
                    _hover: { bg: 'black',color: 'white' },
                    _active: { bg: 'black' },
                }
            },
        },
    },
})


function CartBuy() {
   


    const handleInputNume = (e) => { setData({ ...data, Nume: e.target.value }) }
    const handleInputPrenume = (e) => { setData({ ...data, Prenume: e.target.value }) }
    const handleInputStrada = (e) => { setData({ ...data, Strada: e.target.value }) }
    const handleInputNumar = (e) => { setData({ ...data, Numar: e.target.value }) }
    const handleInputCodPostal = (e) => { setData({ ...data, CodPostal: e.target.value }) }
    const handleInputOras = (e) => { setData({ ...data, Oras: e.target.value }) }
    const handleInputTara = (e) => { setData({ ...data, Tara: e.target.value }) }
    const handleInputJudet = (e) => { setData({ ...data, Judet: e.target.value }) }
    const handleInputBloc = (e) => { setData({ ...data, Bloc: e.target.value }) }
    const handleInputScara = (e) => { setData({ ...data,Scara: e.target.value }) }
    const handleInputPhone = (e) => { setData({ ...data, Phone: e.target.value }) }
    const handleInputEmail = (e) => { setData({ ...data,Email: e.target.value }) }
    //'$Item_ID','$Item_Name','$BuyPrice','$SellPrice','$Qty','$ShippingCost','$PackingFees','$Taxes'
    
    const [value, setValue] = useState(16);

    
    
    const [data, setData] = useState({
        Nume: "",
        Prenume: "",
        Strada: "",
        Numar: "",
        Oras: "",
        Tara: "",
        Judet: "",
        Bloc: "",
        Scara: "",
        CodPostal: "",
        Total: localStorage.getItem("Total"),
        Phone: "",
        Email: "",
        OrderNumber: "",
        OrderDate: new Date().toLocaleDateString(),
        
    });

   // (CustomerName,Email,OrderNumber,OrderDate,Oras,Judet
	//	,Strada,Numar,Bloc,Scara,CodPostal,Total)
   


    const navigate= useNavigate();
   useEffect(() => {
    let tt = parseFloat(localStorage.getItem("Total")) + parseFloat(value)
    console.log("useef")
    console.log(value)
    setData({ ...data,Total: tt })
    tt = 0;
   }, [value]);

    const InsertInDB = async () => {
        console.log(value)
        console.log(data.Total)
        axios.post('http://localhost/project/InsertOrder.php', data)
            .then(res =>
                {console.log(res.data)
                    
                }

                
            )
            .catch(error => {
                console.log(error.response)
            });
            alert("Comanda a fost inregistrata cu succes!")
            navigate('/Cart');
            window.location.reload();
            
       
    }
    
    
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
                    >
                        <div  >
                            <h1 className="display-6 fw-bolder">
                                Detalii comanda
                            </h1>
                            <hr />
                        </div>
                    </Box>
                </Container>

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

                        <h5 className="cart-subtitle mb-1" >
                            Modalitate livrare
                        </h5>
                        <hr className='mb-3' />

                        <RadioGroup onChange={setValue}  value={value} className="mb-3 ">
                            <Stack direction='row'>
                                <Radio value={16} >Fan Courier (16 RON)</Radio>
                                <Radio value={20}>SameDay (20 RON)</Radio>
                                <Radio value={10}>Posta Romana (10 RON)</Radio>
                            </Stack>
                        </RadioGroup>
                        
                        
                        
                    </Box>
                </Container>

                <Container display={{ base: 'block', md: 'flex', }} maxW="container.xl" >
                    <Box
                        as="main"
                        flex={3}
                        d="flex"
                        flexDir="column"
                        justifyContent="space-between"
                        pt={5}
                        px={3}
                        pb={5}
                        mt={5}
                        bg="white"
                        rounded="md"
                        borderWidth={1}
                        borderColor="black"
                    >
                        <h5 className="cart-subtitle mb-1" >
                            Date factura
                        </h5>
                        <hr className='mb-3' />

                        <Grid
                            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                            gap={6}
                        >
                            <FormControl id="firstName" isRequired>
                                <FormLabel>Nume</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Nume}
                                    onChange={handleInputNume}
                                    autoComplete="none"
                                    
                                />
                            </FormControl>
                            <FormControl id="lastName" isRequired>
                                <FormLabel>Prenume</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Prenume}
                                    onChange={handleInputPrenume}
                                    autoComplete="none"
                                    
                                />
                            </FormControl>
                            <FormControl id="phoneNumber" isRequired>
                                <FormLabel>Tara</FormLabel>
                                <Input
                                    type="tel"
                                    value={data.Tara}
                                    onChange={handleInputTara}
                                    autoComplete="none"
                                    
                                />
                            </FormControl>
                            <FormControl id="emailAddress" isRequired>
                                <FormLabel>Judet</FormLabel>
                                <Input
                                    type="email"
                                    value={data.Judet}
                                    onChange={handleInputJudet}
                                    autoComplete="none"
                                  
                                />
                            </FormControl>

                            <FormControl id="city" isRequired>
                                <FormLabel>Oras</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Oras}
                                    onChange={handleInputOras}
                                    autoComplete="none"
                                   
                                />
                            </FormControl>

                            <FormControl id="country" isRequired>
                                <FormLabel>Strada</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Strada}
                                    onChange={handleInputStrada}
                                    autoComplete="none"
                                    
                                />
                            </FormControl>
                            <FormControl id="country" isRequired>
                                <FormLabel>Numar</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Numar}
                                    onChange={handleInputNumar}
                                    autoComplete="none"
                                    
                                />
                            </FormControl>
                            <FormControl id="country" isRequired>
                                <FormLabel>Cod postal</FormLabel>
                                <Input
                                    type="text"
                                    value={data.CodPostal}
                                    onChange={handleInputCodPostal}
                                    autoComplete="none"
                                   
                                />
                            </FormControl>

                            <FormControl id="country" >
                                <FormLabel>Bloc</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Bloc}
                                    onChange={handleInputBloc}
                                  
                                    
                                />
                            </FormControl>

                            <FormControl id="country">
                                <FormLabel>Scara</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Scara}
                                    onChange={handleInputScara}
                                    
                                />
                            </FormControl>
                        </Grid>


                    </Box>
                </Container>

                <Container display={{ base: 'block', md: 'flex', }} maxW="container.xl" >
                    <Box
                        as="main"
                        flex={3}
                        d="flex"
                        flexDir="column"
                        justifyContent="space-between"
                        pt={5}
                        px={3}
                        pb={5}
                        mt={5}
                        bg="white"
                        rounded="md"
                        borderWidth={1}
                        borderColor="black"
                    >
                        <h5 className="cart-subtitle mb-1" >
                            Date contact
                        </h5>
                        <hr className='mb-3' />

                        <Grid
                            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                            gap={6}
                        >
                            <FormControl id="firstName" isRequired>
                                <FormLabel>Numar telefon</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Phone}
                                    onChange={handleInputPhone}
                                    autoComplete="none"
                                   
                                />
                            </FormControl>
                            <FormControl id="lastName" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="text"
                                    value={data.Email}
                                    onChange={handleInputEmail}
                                    autoComplete="none"
                                   
                                />
                            </FormControl>
                            
                        </Grid>


                    </Box>
                </Container>
                
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

                        <h5 className="cart-subtitle mb-1" >
                            Sumar
                        </h5>
                        <hr className='mb-3' />
                        <div>
                            <p>Produse: {localStorage.getItem("Total")}$</p>
                            <p>Transport: {value}$</p>
                            <p>Total: {data.Total} $</p>
                            <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
                                <Button onClick={InsertInDB} >Finalizare comanda</Button>
                            </Box>
                        </div>



                    </Box>
                </Container>
            </ChakraProvider>

            <Footer />
        </div>
    );
    
}
export default CartBuy;