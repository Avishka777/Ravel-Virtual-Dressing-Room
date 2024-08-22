import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/auth/authSlice";
import { Menu, Typography, Container } from "@mui/material";
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import { Avatar, Button, Tooltip, MenuItem } from "@mui/material";
import logowhite from "../assets/main/logowhite.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const pages = ["Home", "3D Model", "Customize"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const email = userData?.email;

  const settings = email
    ? ["Profile", "Account", "Dashboard", "Logout"]
    : ["Signup", "Login"];

  const handleRedirect = (page) => {
    switch (page.toLowerCase()) {
      case "home":
        navigate("/");
        break;
      case "customize":
        navigate("/clothes/customize");
        break;
      case "3D Model":
        navigate("/3d-model");
        break;
      case "login":
        navigate("/login");
        break;
      case "signup":
        navigate("/signup");
        break;
      default:
        break;
    }
  };

  // Function to handle the logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ background: "#003366" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img
              src={logowhite}
              alt="logo"
              style={{
                width: "10rem",
                objectFit: "fill",
                justifyContent: "center",
              }}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleRedirect(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <img
              src={logowhite}
              alt="logo"
              style={{
                width: "10rem",
                objectFit: "fill",
                justifyContent: "center",
              }}
            />
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 10 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleRedirect(page)}
                sx={{ my: 2, color: "white", display: "block", ml: 6 }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon sx={{ fontSize: "1.8rem", mr: 1 }} />
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                      handleLogout();
                    } else {
                      handleRedirect(setting);
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
