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
          background: "linear-gradient(135deg, #673AB7 0%, #3F51B5 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            mb: 2,
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          Bienvenue sur My Movie App
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#E0E0E0",
            textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          Découvrez, réservez et profitez de vos films préférés !
        </Typography>
      </Box>

      <Container sx={{ textAlign: "center" }}>
        {user.isLoggedIn ? (
          <>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Vous êtes connecté en tant que {user.username}.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                component={Link}
                to="/movies"
                variant="contained"
                sx={{ mr: 2 }}
              >
                Voir les films
              </Button>
              <Button
                component={Link}
                to="/my-reservations"
                variant="outlined"
                color="secondary"
              >
                Mes réservations
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Connectez-vous pour commencer !
            </Typography>
            <Box sx={{ mt: 3 }}>
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
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
