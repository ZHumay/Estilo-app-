import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { buttonSubmit, paperStyle } from "./AuthStyles";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";

export const Verify = () => {
  const { activeUser } = useActiveUserContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  //use Formik
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async ({ code }, bag) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/confirm",
          {
            code,
            email: state,
          }
        );
        const {token} =res.data
        alert("Successful")
        activeUser(true,navigate("/login"),token)
      } catch (error) {
        bag.setErrors({general:error.response.data.message})
      }
    },
  });

  return state ? (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid style={{ textAlign: 'center' }} marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Verify
          </Typography>
          <Typography variant="caption">
            Please enter the code from mail
          </Typography>
        </Grid>
        <Grid>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="text"
            name="code"
            label="Code"
            variant="standard"
            placeholder="Enter you code"
            onChange={handleChange}
            value={values.code}
            error={touched.code && Boolean(errors.code)}
            helperText={touched.code && errors.code}
          />
          <Grid marginTop={3}>
            <Button
              fullWidth
              textAlign="center"
              type="submit"
              variant="contained"
              sx={buttonSubmit}

            >
              Confirm
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  ) : (
    <Navigate to="/" />
  );
};