import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function NavBar() {
  const { user, logout } = useUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "1px" }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            My Movie App
          </Link>
        </Typography>

        {user.isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Bonjour, {user.username} !
            </Typography>
            <Button component={Link} to="/reservations" color="inherit">
              Mes réservations
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
