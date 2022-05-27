
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import '../css/app.css';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} style={{display: "flex" }}>
      {children}
      {onClose ? (
        <IconButton
        style={{ marginLeft: "auto" }}
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};



const BasicTable = ({ email }) => {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const obj = {
      email: email,
    };
    console.log(obj);
    axios.post('http://localhost/project/userRoles.php', obj)
      .then(res => {
        console.log(res.data);
        setRow(res.data[0]);

      })
      .catch(error => {
        console.log(error.response)
      });

  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Role ID</TableCell>
            <TableCell align="center">Role Name</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
          >
            <TableCell align="center" component="th" scope="row">
              {row.ROLES}
            </TableCell >
            <TableCell align="center">
              {row.RoleName}
            </TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function CustomizedDialogs({ details }) {
  const [open, setOpen] = useState(false);
  const [newrole, setNewRole] = useState('');
  const [roles, setRoles] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickChange = () => {
    if (newrole !== '') {
      const obj = {
        email: details.Email,
        role: newrole,
      };
      console.log(obj);
      axios.post('http://localhost/project/changeRole.php', obj)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error.response)
        });
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  function getRoles() {
    axios.post('http://localhost/project/SelectRoles.php')
      .then(res => {
        console.log(res.data);
        setRoles(res.data);
      })
      .catch(err => console.log(err));
    handleClose();
  }




  return (
    <div>
      <button className="btn btn-outline-dark"  onClick={handleClickOpen}>
        See Permissions
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {details?.Prenume} {details?.Nume}  | {details?.Email}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ flexGrow: 1 }}>
            <Autocomplete
              onChange={(event, value) => setNewRole(value.label)}
              style={{ marginTop: '.5rem' }}
              disablePortal
              id="combo-box"
              options={roles}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Role" />}
            />
          </Box>
          <BasicTable email={details?.Email} />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => { handleClickChange(); handleClose(); }}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );


}

export default CustomizedDialogs;





