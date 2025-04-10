import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function MoviesCard({ movie, page }) {
  return (
    <Card
      component={Link}
      to={`/movies/${movie.id}?returnPage=${page}`}
      sx={{
        maxWidth: 345,
        width: "100%",
        borderRadius: 2,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        alt={movie.title}
        image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}
