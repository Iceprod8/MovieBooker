import { Container, Typography, Box, Button } from "@mui/material";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useUser();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          background:
            "linear-gradient(90deg, rgba(255,145,0,1) 0%, rgba(255,61,0,1) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Bienvenue sur My Movie App
        </Typography>
      </Box>

      <Container sx={{ textAlign: "center" }}>
        {user.isLoggedIn ? (
          <Typography variant="h5" gutterBottom>
            Vous êtes connecté en tant que <strong>{user.username}</strong>.
          </Typography>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Vous n'êtes pas connecté.
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Se connecter
            </Button>
            <Button component={Link} to="/register" variant="outlined">
              Créer un compte
            </Button>
          </>
        )}
      </Container>
    </>
  );
}
