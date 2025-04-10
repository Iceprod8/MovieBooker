import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  CssBaseline,
  Fade,
} from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { backend } from "../../services/apiService";

export default function Reservation() {
  const { user } = useUser();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchReservations() {
    try {
      setLoading(true);
      const data = await backend("reservation", {
        method: "GET",
        access_token: user.access_token,
      });
      const enriched = await Promise.all(
        data.map(async (res) => {
          try {
            const movieDetails = await backend(`movies/${res.movieId}`, {
              method: "GET",
              access_token: user.access_token,
            });
            return { ...res, movieDetails };
          } catch {
            return res;
          }
        })
      );
      setReservations(enriched);
    } catch (err) {
      console.error("Erreur fetchReservations:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ?");
    if (!confirm) return;
    try {
      await backend(`reservation/${id}`, {
        method: "DELETE",
        access_token: user.access_token,
      });
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erreur handleDelete:", err);
      alert("Impossible de supprimer la réservation.");
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, color: "white" }}>
        <Typography>Chargement des réservations...</Typography>
      </Container>
    );
  }

  const sorted = [...reservations].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const next = sorted.find((r) => new Date(r.date) > new Date());

  return (
    <Container
      sx={{
        mt: 4,
        color: "white",
        backgroundColor: "#121212",
        py: 4,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Fade in timeout={600}>
        <Box>
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "#FFD700" }}
          >
            Mes réservations
          </Typography>

          {next && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: "#ccc", mb: 1 }}>
                📅 Prochaine séance réservée :
              </Typography>
              <Card
                sx={{
                  display: "flex",
                  backgroundColor: "#1f1f1f",
                  color: "white",
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w300${next.movieDetails?.poster_path}`}
                  alt={next.movieDetails?.title}
                  sx={{ width: 150, height: 220, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#FFD700" }}
                  >
                    {next.movieDetails?.title}
                  </Typography>
                  <Typography>
                    {new Date(next.date).toLocaleString("fr-FR")}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}

          {reservations.length === 0 ? (
            <Typography>Aucune réservation.</Typography>
          ) : (
            <Grid container spacing={3}>
              {reservations.map((res) => {
                const dateString = new Date(res.date).toLocaleString("fr-FR");
                const movie = res.movieDetails;
                const title = movie?.title || `Film #${res.movieId}`;
                const poster = `https://image.tmdb.org/t/p/w300${
                  movie?.poster_path || ""
                }`;
                const overview = movie?.overview || "Aucune description";

                return (
                  <Fade key={res.id} in timeout={500}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          maxWidth: 345,
                          width: "100%",
                          borderRadius: 2,
                          boxShadow: 2,
                          display: "flex",
                          flexDirection: "column",
                          textDecoration: "none",
                          color: "inherit",
                          backgroundColor: "#1f1f1f",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: 4,
                          },
                        }}
                      >
                        {movie && movie.poster_path ? (
                          <CardMedia
                            component="img"
                            alt={title}
                            image={poster}
                            sx={{
                              width: "100%",
                              height: 345,
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: 345,
                              objectFit: "cover",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "grey.800",
                              color: "white",
                            }}
                          >
                            <Typography>Aucune image</Typography>
                          </Box>
                        )}
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#FFD700" }}
                          >
                            {title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 2, color: "#ccc" }}
                          >
                            {overview.length > 120
                              ? `${overview.slice(0, 120)}...`
                              : overview}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Date réservée :</strong> {dateString}
                          </Typography>
                          <Typography variant="body2">
                            <strong>ID de réservation :</strong> {res.id}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(res.id)}
                          >
                            Supprimer
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Fade>
                );
              })}
            </Grid>
          )}
        </Box>
      </Fade>
    </Container>
  );
}
