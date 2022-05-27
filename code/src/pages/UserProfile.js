import { Container } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import AccountSettings from '../components/AccountSettings'
import { useState,useEffect } from 'react'
import { Image } from '@chakra-ui/react'

import { ChakraProvider } from '@chakra-ui/react'
import { Avatar, Heading, Text, VStack} from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import axios from 'axios';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';

const theme = extendTheme({
  colors: {
    brand: {
      blue: '#4164e3',dark: '#243156',green: '#36c537',light: '#e9ebee',
    },
  },
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

function Cover() {
  const [coverImage] = useState(null)
  return (
    <Box h={60} overflow="hidden">
      <Image
        w="full"
        h="full"
        objectFit="cover"
        src={coverImage ? coverImage : '/img/cover.jpg'}
        alt="Cover"
      />
      
    </Box>
  )
}


function Sidebar(props) {
  const[role,setRole]=useState('');
  useEffect(() => {
    const obj ={
      email: localStorage.getItem("userEmail"),
    };
    console.log(obj);
    axios.post('http://localhost/project/userRoles.php', obj)
      .then(res => {

        setRole(res.data[0].RoleName);

      })
      .catch(error => {
        console.log(error.response)
      });

  }, []);

  return (
   
    <Box
      as="aside"
      flex={1}
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="black"
      style={{ transform: 'translateY(-150px)' }}
    >
      <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
        <Avatar
          size="2xl"
          name={props.name}
        />
        <VStack spacing={1}>
          <Heading  style={{ fontSize: 26 }} color="brand.dark">
            {props.name}
          </Heading >
          <Text color="brand.blue" style={{ fontSize: 20 }} >
            {role}
          </Text>
        </VStack>
      </VStack>
    </Box>
    
    
  )
}


export default function UserProfile() {
  const[data,setData] = useState([]);

    const getInfo = () => {
      
      const obj ={
        id: localStorage.getItem("userId"),
      };
      console.log(obj);
      axios.post('http://localhost/project/UserInfo.php',obj)
      .then(res=> {
        console.log(res.data);
        setData(res.data[0]);
      })
      .catch(error => {
        console.log(error.response)
      });
      
    };
  
    useEffect(() => {
      getInfo();
    }, []);
   console.log(data);


  return (
    <div className='page-container'>
    
      <ChakraProvider theme={theme}>
        <Navbar />
        <Cover />
       
        <Container  display={{ base: 'block', md: 'flex',  }} maxW="container.xl" marginBottom={'-100'}>
          
          <Sidebar name={data.Prenume+' '+data.Nume} />
          <AccountSettings />
        </Container>
        
      </ChakraProvider>
      
  
    <Footer />
    </div>
  
  )
}