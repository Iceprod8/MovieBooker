import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { backend } from "../services/apiService";

export default function HomePage() {
  const { user } = useUser();
  const [topMovies, setTopMovies] = useState([]);
  const [nextReservation, setNextReservation] = useState(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const movieData = await backend("movies", {
          access_token: user.access_token,
          params: { page: 1 },
        });
        setTopMovies(movieData.results.slice(0, 5));

        if (user.isLoggedIn) {
          const reservations = await backend("reservation", {
            access_token: user.access_token,
          });
          const upcoming = reservations
            .filter((r) => new Date(r.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

          if (upcoming) {
            const movieDetails = await backend(`movies/${upcoming.movieId}`, {
              access_token: user.access_token,
            });
            setNextReservation({ ...upcoming, movie: movieDetails });
          }
        }
      } catch (err) {
        console.error("Erreur HomePage:", err);
      }
    }
    fetchHomeData();
  }, [user]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          background: "linear-gradient(135deg, #000000 0%, #1f1f1f 100%)",
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
            color: "#FFD700",
            mb: 2,
            textShadow: "2px 2px 6px rgba(255,0,0,0.4)",
          }}
        >
          MovieBooker
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#ccc", textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
        >
          Retrouvez vos films favoris et vos prochaines séances !
        </Typography>
      </Box>

      <Container>
        {user.isLoggedIn && nextReservation && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Prochaine réservation
            </Typography>
            <Card sx={{ display: "flex", boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w300${nextReservation.movie.poster_path}`}
                alt={nextReservation.movie.title}
                sx={{ width: 150, height: 220, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {nextReservation.movie.title}
                </Typography>
                <Typography>
                  Date :{" "}
                  {new Date(nextReservation.date).toLocaleString("fr-FR")}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          À l'affiche
        </Typography>
        <Grid container spacing={3}>
          {topMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                component={Link}
                to={`/movies/${movie.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 5,
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 345, objectFit: "cover" }}
                  image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: 345,
                alignItems: "center",
              }}
            >
              <Button
                component={Link}
                to="/movies"
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  fontWeight: "bold",
                  px: 4,
                  py: 2,
                  height: "100%",
                  width: "100%",
                  borderRadius: 2,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#e6c200",
                  },
                }}
              >
                Voir tous les films
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
