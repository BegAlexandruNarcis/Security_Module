import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import IconButton from "@material-ui/core/IconButton";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import { useNavigate } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import bcrypt from "bcryptjs";


const login = (theme) => ({

  paper: {
    // align: "center",
    // minHeight: "70vh",
    // minWidth: "70vw",
    position: "relative",
    marginTop: theme.spacing(15),
    marginRight: theme.spacing(60),
    marginLeft: theme.spacing(60),
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(169,198,217,1) 15%, rgba(242,167,75,1) 90%)",
    boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",

    "&:hover": {
      boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
    }
  },

  avatar: {
    marginTop: 20,
    position: "relative",
    background: "rgba(255,255,255,0.85)",
    width: "100px",
    height: "100px",
    boxShadow: "0px 0px 12px rgba(131,153,167,0.99)"
  },

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

  passwordEye: {
    color: "rgba(131,153,167,0.9)",
    opacity: 0.7
  }


});

function Login(props) {
  let navigate = useNavigate();
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const obj = {
      email: values.email,
    };

    axios.post('http://localhost/project/SelectUser.php', obj)
      .then(res => {
        if (res.data.length === 0) {
          setMessage("Email/Parola incorecte");
          setOpen(true);
        } else {
          let bol = bcrypt.compareSync(values.password, res.data[0].Passwd);
          console.log(bol);
          if (bol === true) {
            localStorage.setItem("userEmail", values.email);
            localStorage.setItem("userId", res.data[0].ID);
            localStorage.setItem('isLoggedin',"true");

            navigate("/");
          }
          else {
            setMessage("Email/Parola incorecte");
            setOpen(true);
          }
        }
      })
      .catch(err => console.log(err));

    


  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
               
                value={values.email}
                onChange={handleChange("email")}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button

              type="handlesubmit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}

            >
              Login
            </Button>

            <Button onClick={() => {
              navigate("/Register");
            }}
              style={{ marginTop: '.5rem' }}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}

            >
              Register
            </Button>
          </form>
        </Paper>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <SnackbarContent

          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {message}
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


    </React.Fragment>
  );
}


export default withStyles(login)(Login);