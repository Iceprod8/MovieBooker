import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function NavBar() {
  const { user, logout } = useUser();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000",
        boxShadow: "0 2px 8px rgba(255, 215, 0, 0.2)",
        mb: 2,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: "1px",
            color: "#FFD700",
          }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            MovieBooker
          </Link>
        </Typography>

        {user.isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2, color: "#fff" }}>
              Bonjour, {user.username} !
            </Typography>
            <Button
              component={Link}
              to="/reservations"
              sx={{ color: "#FFD700" }}
            >
              Mes réservations
            </Button>
            <Button sx={{ color: "#fff" }} onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button sx={{ color: "#fff" }}>Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
