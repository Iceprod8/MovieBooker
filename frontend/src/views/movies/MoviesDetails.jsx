import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { backend } from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";

export default function MoviesDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Typography>Chargement des détails...</Typography>;
  }

  if (!movie) {
    return <Typography>Aucun film trouvé.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", p: 2 }}>
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

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Synopsis
      </Typography>
      <Typography variant="body1">{movie.overview}</Typography>
    </Box>
  );
}
