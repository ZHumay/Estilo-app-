import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { singUpValidations } from "./validations";
import { buttonSubmit, input, paperStyle } from "./AuthStyles";
import "../Auth/auth.scss";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckIcon from '@mui/icons-material/Check';
import Navbar from "../../components/Navbar/Navbar";
export const Register = () => {
  const navigate = useNavigate();

  const [labelColor, setLabelColor] = useState("gray");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setemailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: singUpValidations,
    onSubmit: async ({ username, email, password }, bag) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/webuser/register",
          {
            email,
            password,
            username,
          }
        );
        navigate("/verify", {
          state: email,
        });
      } catch (error) {
        bag.setErrors({ general: error.response.data.msg });
      }
    },
  });

  return (

    <>
    <Navbar/>
     <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid style={{ textAlign: 'center' }} marginBottom={3}>
          <Typography className="typography" variant="h5" fontWeight="bold">
            Register
          </Typography>
          <Typography variant="caption">
            Please fill this from to create an account!
          </Typography>
        </Grid>
        <Grid>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <form onSubmit={handleSubmit} style={{ width: "350px" }}>
          <TextField
            fullWidth
            name="username"
            label={<div className="label" ><PersonIcon style={{width:"25px",height:"20px"}} />Username</div>}
            sx={input}
            variant="standard"
            placeholder="Enter your username"
            onChange={handleChange}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            InputProps={{
              disableUnderline: true,
              style: { marginLeft: "10px",width:"280px" },
            }}
            InputLabelProps={{
              style: { marginLeft: "10px", color: usernameFocused ? "#6C3483" : labelColor },
            }}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
          />

          <TextField
            fullWidth
            name="email"
            label={<div className="label"><AlternateEmailIcon style={{width:"25px",height:"20px"}} />Email</div>}
            sx={input}
            variant="standard"
            placeholder="Enter you email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              disableUnderline: true,
              style: { marginLeft: "10px",width:"280px" },
            }}
            InputLabelProps={{
              style: { marginLeft: "10px", color: emailFocused ? "#6C3483" : labelColor },
            }}
            onFocus={() => setemailFocused(true)}
            onBlur={() => setemailFocused(false)}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label={<div className="label"><NoEncryptionIcon style={{width:"25px",height:"20px"}} /> Password</div>}
            sx={input}
            variant="standard"
            placeholder="Enter you password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              disableUnderline: true,
              style: { marginLeft: "10px",width:"250px" },
            }}
            InputLabelProps={{
              style: { marginLeft: "10px", color: passwordFocused ? "#6C3483" : labelColor },
            }}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TextField
            type="password"
            name="confirmPassword"
            fullWidth
            label={<div className="label"><CheckIcon style={{width:"25px",height:"20px"}} /> Confirm Password</div>}
            sx={input}
            variant="standard"
            placeholder="Enter you confirm password"
            onChange={handleChange}
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            InputProps={{
              disableUnderline: true,
              style: { marginLeft: "10px" ,width:"290px"},
            }}
            InputLabelProps={{
              style: { marginLeft: "10px", color: confirmFocused ? "#6C3483" : labelColor },
            }}
            onFocus={() => setConfirmFocused(true)}
            onBlur={() => setConfirmFocused(false)}
          />
          <Grid marginTop={3}>
            <Button
              fullWidth
              textAlign="center"
              type="submit"
              variant="contained"
              color="primary"
              sx={buttonSubmit}
            >
              Submit
            </Button>
          </Grid>
          <p class="signin">
            Already have an acount ?{" "}
            <a>
              <Link to="/signin">Signin</Link>
            </a>{" "}
          </p>
        </form>
      </Paper>
    </Grid>
    </>
   
  );
};
