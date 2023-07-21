import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    InputAdornment,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { buttonSubmit, input, loginStyle, paperStyle } from "./AuthStyles";
  import { singInValidations } from "./validations";
  import axios from "axios";
  import { useContext, useState } from "react";
  import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "../Auth/auth.scss";
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

  export const Login = () => {
    const navigate = useNavigate();
    const [labelColor, setLabelColor] = useState("gray");
    const [emailFocused, setemailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
  
    const { handlerLogInOut } = useContext(AuthContext);
    //use Formik
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: singInValidations,
      onSubmit: ({ email, password }, bag) => {
        const data = {
          email: email,
          password: password,
        };
  
        axios
          .post("http://localhost:8080/api/webuser/login", data)
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              const { token } = res.data;
              alert("you registered successful");
              handlerLogInOut(true, navigate("/"), token);
            } else if (res.status == 203) {
              navigate("/verify", {
                state: email,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
    return (
      <Grid>
        <Paper elevation={20} style={loginStyle}>
          <Grid textAlign="center" marginBottom={8}>
            <Typography className="typography" variant="h5" fontWeight="bold">
             Login
            </Typography>
            <Typography variant="caption">
              Please fill this from to create an account!
            </Typography>
          </Grid>
          <Grid>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
          </Grid>
          <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              disableUnderline: true,
              style: { marginLeft: "10px",width:"280px" },
            
            
            }}
            InputLabelProps={{
              style: { marginLeft: "10px", color: passwordFocused ? "#6C3483" : labelColor },
              
            }}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            
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
                Sign In
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  };