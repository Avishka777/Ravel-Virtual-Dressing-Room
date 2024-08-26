import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth/authSlice";
import { API_REQUEST_STATUS } from "../../constants/api-request";
import { Box, Typography, TextField, Grid } from "@mui/material";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { Card, CardContent, IconButton, InputAdornment } from "@mui/material";
import Swal from "sweetalert2";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../../assets/main/logocolor.png";
import side from "../../assets/main/side.jpg";
import bgImage from "../../assets/main/background.jpg";
import UserService from "../../services/UserService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect to check if there are saved login details in local storage and set the state accordingly
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  // Event handlers for form input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle login process
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await UserService.signIn({ email, password });

      if (response.status === API_REQUEST_STATUS.SUCCESS && response.data) {
        const {
          name,
          email: userEmail,
          phone,
          accessToken,
          refreshToken,
        } = response.data;

        // Save user details in localStorage
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name,
            email: userEmail,
            phone,
            accessToken,
            refreshToken,
          })
        );

        // Update user details in Redux store
        dispatch(
          setUser({ name, email: userEmail, phone, accessToken, refreshToken })
        );

        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in!",
          confirmButtonText: "OK",
          confirmButtonColor: "#02075f",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response?.message || "An error occurred during login.",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF0000",
        });
        setErrorMessage(response?.message);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "An error occurred during login.",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF0000",
      });
      setErrorMessage(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: {
              xs: "none",
              md: "flex",
              lg: "flex",
            },
          }}
        >
          <Box>
            <Card
              sx={{
                minHeight: "600px",
                minWidth: "400px",
                maxHeight: "600px",
                maxWidth: "400px",
                borderRadius: "15px 0 0 15px",
                boxShadow: 20,
              }}
            >
              <Box
                sx={{
                  width: "400px",
                  height: "600px",
                  position: "relative",
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
              </Box>
            </Card>
          </Box>
        </Grid>

        <Grid item sm={12} md={6}>
          <Card
            sx={{
              height: "600px",
              width: {
                md: "400px",
                sm: "fullWidth",
              },
              borderRadius: {
                md: "0 15px 15px 0",
                xs: "15px",
              },
              bgcolor: "#f9f9f9",
              boxShadow: 20,
            }}
          >
            <CardContent>
              <img
                src={logo}
                alt="logo"
                style={{
                  height: "auto",
                  width: "18rem",
                  display: "block",
                  margin: "auto",
                  marginBottom: "1rem",
                }}
              />
              <Typography textAlign="center" variant="h5" color="#003366">
                FREEDOM OVER ANYTHING
              </Typography>
              <Typography textAlign="center" variant="h5" mt={2}>
                Login To Your Account
              </Typography>

              <Box sx={{ mt: 3 }}>
                <form>
                  <Typography variant="subtitle2" mt={2}>
                    Email
                  </Typography>
                  <TextField
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{
                      "& input": {
                        padding: "18px",
                        boxSizing: "border-box",
                      },
                      width: "100%",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="subtitle2" mt={1}>
                    Password
                  </Typography>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
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
                          <LockIcon sx={{ color: "gray" }} />
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
                  />

                  <Box
                    sx={{
                      display: "flex",
                      mt: 1,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox defaultChecked style={{ color: "#02075f" }} />
                      }
                      label={
                        <Typography variant="body1">Remember me</Typography>
                      }
                    />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                      background: "#003366",
                      width: "100%",
                      mt: 1,
                      fontSize: "14px",
                      "&:hover": {
                        background: "#000060",
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                      color: "#02075f",
                      background: "#ffffff",
                      width: "100%",
                      mt: 2,
                      fontSize: "14px",
                      "&:hover": {
                        background: "#f2f2f2",
                      },
                    }}
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    <span style={{ marginLeft: "1rem" }}>
                      Sign in with Google
                    </span>
                  </Button>
                </form>

                <Typography
                  variant="subtitle2"
                  mt={3}
                  color="#757575"
                  textAlign="center"
                >
                  Do not Have an account?
                  <span style={{ marginLeft: 0.5 }}>
                    <Link
                      to="/signup"
                      style={{
                        textDecoration: "none",
                        color: "#003366",
                        fontWeight: "bold",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    >
                      Sign Up
                    </Link>
                  </span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
