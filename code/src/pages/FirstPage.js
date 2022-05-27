import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Footer from '../components/Footer';
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const page = (theme) => ({
    icon: {
      width: "40px",
      height: "40px",
      color: "rgba(131,153,167,0.79)"
    },
  
    form: {
      margin: theme.spacing(1),
      marginRight: theme.spacing(15),
      marginLeft: theme.spacing(15),
  
    },
  
  });

function FirstPage(props) {
    const [open,setOpen]=useState(false);
    const[data,setData] = useState([]);
    const { classes } = props;
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

    useEffect(() => {
      if(localStorage.getItem("isLoggedin")==="true"){
        if(data.Nume==="" || data.Prenume===""  || data.Telefon===""  || data.Oras==="" || data.Tara===""){
            setOpen(true);
        }
      }
    },[data]);
  

   const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);

  };

  if (localStorage.getItem('isLoggedin') !== null) {
    console.log(localStorage.getItem('isLoggedin'));
  } else {
    localStorage.setItem('isLoggedin',"false");
  }


    return (
        <div className='page-container'>
            <Navbar />
            <Home />
            <Footer />
            <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContent

          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              Please fill in data in My Account!
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
        </div>
    )
}
export default withStyles(page)(FirstPage);