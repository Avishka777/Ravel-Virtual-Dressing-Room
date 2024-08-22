import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_REQUEST_STATUS } from "../../constants/api-request";
import { TextField, CardContent, Typography } from "@mui/material";
import { Card, Button, Grid, InputAdornment, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import NearMeIcon from "@mui/icons-material/NearMe";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import bgImage from "../../assets/main/background.jpg";
import UserService from "../../services/UserService";
import side from "../../assets/main/side.jpg";
import Swal from "sweetalert2";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enable Next button only if agreement is checked and passwords match
  const isNextButtonDisabled = () => {
    const hasMinimumLength = password.length >= 8;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password === "" ||
      password !== confirmPassword ||
      !hasMinimumLength ||
      !hasSpecialCharacter
    );
  };

  // Function to Submit Button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formattedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.address,
        password: formData.password,
      };

      const response = await UserService.signUp(formattedData);

      if (response.status === API_REQUEST_STATUS.SUCCESS && response?.data) {
        Swal.fire({
          title: "Success!",
          text: "Registration confirmed successfully!",
          confirmButtonText: "OK",
          confirmButtonColor: "#02075f",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response?.message || "An error occurred during confirmation.",
          confirmButtonColor: "#FF0000",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "An error occurred.",
        confirmButtonColor: "#FF0000",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handlers for password visibility and form input changes
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handlers for confirm password visibility and form input changes
  const handleTogglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm((prevShowPassword) => !prevShowPassword);
  };

  // Handle Password Change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (confirmPassword && event.target.value !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  // Handle Confirm Password Change
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (password && event.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  // Function to check if password meets requirements dynamically
  const isPasswordValidSpecial = () => {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasSpecialCharacter;
  };

  // Function to check if password meets requirements dynamically
  const isPasswordValidLength = () => {
    const hasMinimumLength = password.length >= 8;
    return hasMinimumLength;
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          width: {
            md: "800px",
            sm: "70%",
            xs: "90%",
          },
        }}
      >
        {/* Left Side Section */}
        <Grid item sm={12} md={6}>
          <Card
            sx={{
              height: "600px",
              width: {
                md: "400px",
                sm: "fullWidth",
              },
              borderRadius: {
                lg: "15px 0 0 15px",
                xs: "15px",
              },
            }}
          >
            <CardContent>
              <Typography textAlign="center" variant="h5" mt={1}>
                CREATE YOUR ACCOUNT
              </Typography>

              <form onSubmit={handleSubmit}>
                <Typography variant="subtitle2" mt={1}>
                  Full Name
                </Typography>
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "18px",
                      boxSizing: "border-box",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="subtitle2" mt={1}>
                  Email
                </Typography>
                <TextField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "18px",
                      boxSizing: "border-box",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="subtitle2" mt={1}>
                  Mobile number
                </Typography>
                <TextField
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Enter your mobile number"
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "18px",
                      boxSizing: "border-box",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphoneIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="subtitle2" mt={1}>
                  Address
                </Typography>
                <TextField
                  type="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "18px",
                      boxSizing: "border-box",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NearMeIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="subtitle2" mt={1}>
                  Password
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={(e) => {
                    handleChange(e);
                    handlePasswordChange(e);
                  }}
                  onFocus={() => setPasswordClicked(true)} // Set passwordClicked to true when the password field is focused
                  onBlur={() => setPasswordClicked(false)} // Set passwordClicked to false when the password field loses focus
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "18px",
                      boxSizing: "border-box",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={
                    passwordClicked && (
                      <Grid>
                        <Typography
                          sx={{
                            color: isPasswordValidLength()
                              ? "#009327"
                              : "#626262",
                          }}
                        >
                          <CheckIcon
                            sx={{ fontSize: "small", marginRight: 1 }}
                          />
                          Minimum 8 characters
                        </Typography>

                        <Typography
                          sx={{
                            color: isPasswordValidSpecial()
                              ? "#009327"
                              : "#626262",
                          }}
                        >
                          <CheckIcon
                            sx={{ fontSize: "small", marginRight: 1 }}
                          />
                          At least 1 special character
                        </Typography>
                      </Grid>
                    )
                  }
                />
                <Typography variant="subtitle2" mt={1}>
                  Confirm Password
                </Typography>
                <TextField
                  type={showPasswordConfirm ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={passwordMatchError}
                  helperText={passwordMatchError && "Passwords don't match"}
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "18px",
                      boxSizing: "border-box",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "gray" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibilityConfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isNextButtonDisabled() || loading}
                  sx={{
                    background: "#02075f",
                    width: "100%",
                    mt: 2,
                    fontSize: "14px",
                    "&:hover": {
                      background: "#000060",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </form>
              <Typography
                variant="subtitle2"
                mt={2}
                color="#757575"
                textAlign="center"
              >
                Have an account?
                <span style={{ marginLeft: 0.5 }}>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "#02075f",
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginLeft: "3px",
                    }}
                  >
                    Sign In
                  </Link>
                </span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Right Side Section */}
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Card
            sx={{
              borderRadius: "0 15px 15px 0",
              width: "400px",
              height: "600px",
            }}
          >
            <img
              src={side}
              alt="image"
              style={{
                width: "100%",
                objectFit: "fill",
                justifyContent: "center",
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
