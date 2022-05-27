import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react'
import { Button, Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function AccountSettings() {
  const tabs = ['Account Settings']
  const [data, setData] = useState({
    id:localStorage.getItem("userId"),
    firstName: "",
    lastName: "",
    email: localStorage.getItem("userEmail"),
    phone: "",
    city: "",
    country: ""
  });
  const getInfo = () => {
    const obj ={
      id: localStorage.getItem("userId"),
    };
    console.log(obj);
    axios.post('http://localhost/project/UserInfo.php',obj)
    .then(res=> {
      console.log(res.data);
      setData({...data,firstName: res.data[0].Prenume,lastName: res.data[0].Nume,phone: res.data[0].Telefon,city: res.data[0].Oras,country: res.data[0].Tara});
    })
    .catch(error => {
      console.log(error.response)
    });
    
  };
  useEffect(() => {
    getInfo();
  }, []);

  
 
  const handleInputName1 = (e) => { setData({ ...data, firstName: e.target.value }) }
  const handleInputName2 = (e) => { setData({ ...data, lastName: e.target.value }) }
  const handleInputEmail = (e) => { setData({ ...data, email: e.target.value }) }
  const handleInputPhone = (e) => { setData({ ...data, phone: e.target.value }) }
  const handleInputCity = (e) => { setData({ ...data, city: e.target.value }) }
  const handleInputCountry = (e) => { setData({ ...data, country: e.target.value }) }

  const handleOnClick = () => {
    localStorage.removeItem("userEmail");
    axios.post('http://localhost/project/updateUser.php', data)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("userEmail", data.email);
        window.location.reload();
        
        
      })
      .catch(error => {
        console.log(error.response)
      });
      
  }
  
  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="black"
      style={{ transform: 'translateY(-150px)' }}
    >
      <Tabs>
        <TabList px={5}>
          {
            <Tab
              key={tabs[0]}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: 'transparent' }}
              _selected={{ color: 'brand.dark', borderColor: 'brand.blue' }}
            >
              {tabs[0]}
            </Tab>
          }
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={6}
            >
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input focusBorderColor="brand.blue"
                  type="text"
                  value={data.firstName}
                  onChange={handleInputName1}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input focusBorderColor="brand.blue"
                  type="text"
                  value={data.lastName}
                  onChange={handleInputName2}
                />
              </FormControl>
              <FormControl id="phoneNumber">
                <FormLabel>Phone Number</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="tel"
                  value={data.phone}
                  onChange={handleInputPhone}
                />
              </FormControl>
              <FormControl id="emailAddress">
                <FormLabel>Email Address</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="email"
                  value={data.email}
                  onChange={handleInputEmail}
                />
              </FormControl>

              <FormControl id="city">
                <FormLabel>Oras</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  value={data.city}
                  onChange={handleInputCity}
                />
              </FormControl>

              <FormControl id="country">
                <FormLabel>Tara</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  value={data.country}
                  onChange={handleInputCountry}
                />
              </FormControl>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
        <Button onClick={handleOnClick} >Update</Button>
      </Box>
    </Box>




  )
}

export default AccountSettings
