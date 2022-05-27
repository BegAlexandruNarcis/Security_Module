import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import axios from "axios";

const register = (theme) => ({


  paper: {
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


function Registration(props) {
  let navigate = useNavigate();
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  var hash = bcrypt.hashSync(values.password, 10);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      setOpen(true);
    } else {
      console.log(values.email, values.password);
      const obj = {
        email: values.email,
        password: hash,
      };

      axios.post('http://localhost/project/checkUser.php', obj)
        .then(res1 => {
          
          if (res1.data.length === 0 || res1.data=== null) {
            console.log(res1.data)
            console.log(obj)
            axios.post('http://localhost/project/Insert.php', obj)
              .then(res => console.log(res.data))
              .catch(error => {
                console.log(error.response)
              });
            setMessage("Registration Successful");
            setOpen(true);
            setTimeout(() => {
              navigate("/Login");
            }, 2500);

          } else {
            setMessage("Email already exists");
            setOpen(true);
            
          }
        })
        .catch(error => {
          console.log(error.response)
        });


    }
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

                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}

                    >
                      {values.showPassword ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>



            <Button

              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >

              Sign Up
            </Button>
            <Button onClick={() => {
              navigate("/");

            }}

              style={{ marginTop: '.5rem' }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Back
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


export default withStyles(register)(Registration);