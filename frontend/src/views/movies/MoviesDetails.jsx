import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { backend } from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";

export default function MoviesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnPage = searchParams.get("returnPage") || "1";
  const { user } = useUser();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeslot, setTimeslot] = useState("");
  const timeslots = ["14:00", "16:00", "18:00", "20:00"];

  async function fetchMovie() {
    try {
      setLoading(true);
      const data = await backend(`http://localhost:3000/movies/${id}`, {
        access_token: user.access_token,
      });
      setMovie(data);
    } catch (err) {
      console.error("Erreur fetchMovie:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [id]);

  function handleBack() {
    navigate(`/movies?page=${returnPage}`);
  }

  async function handleReserve() {
    if (!timeslot) {
      alert("Sélectionnez un créneau horaire !");
      return;
    }
    try {
      const now = new Date();
      const [hours, mins] = timeslot.split(":");
      now.setHours(parseInt(hours, 10), parseInt(mins, 10), 0);
      const result = await backend("http://localhost:3000/reservation", {
        method: "POST",
        access_token: user.access_token,
        data: { movieId: parseInt(id, 10), date: now.getTime() },
      });
      alert("Réservation réussie ! " + JSON.stringify(result));
    } catch (err) {
      console.error("Erreur de réservation :", err);
      alert("Impossible de réserver !");
    }
  }

  if (loading) {
    return <Typography>Chargement des détails...</Typography>;
  }

  if (!movie) {
    return <Typography>Aucun film trouvé.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", p: 2 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
        &larr; Retour
      </Button>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {movie.title} ({movie.release_date?.substring(0, 4)})
      </Typography>

      <Card sx={{ display: "flex", mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 300, objectFit: "cover" }}
          image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </Card>

      <Typography sx={{ mb: 2 }}>
        <strong>Titre original :</strong> {movie.original_title}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Langue :</strong> {movie.original_language}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Date de sortie :</strong> {movie.release_date}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Note moyenne :</strong> {movie.vote_average} (sur{" "}
        {movie.vote_count} votes)
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Popularité :</strong> {movie.popularity}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Genres (IDs) :</strong> {movie.genre_ids?.join(", ")}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Adult :</strong> {movie.adult ? "Oui" : "Non"}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: "bold" }}>
        Synopsis
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {movie.overview}
      </Typography>

      {user.isLoggedIn ? (
        <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Réserver une séance
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="timeslot-label">Choisissez un horaire</InputLabel>
            <Select
              labelId="timeslot-label"
              value={timeslot}
              label="Choisissez un horaire"
              onChange={(e) => setTimeslot(e.target.value)}
            >
              {timeslots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleReserve}>
            Réserver
          </Button>
        </Box>
      ) : (
        <Typography>
          Vous devez être connecté pour réserver une séance.
        </Typography>
      )}
    </Box>
  );
}
