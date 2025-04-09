import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Pagination,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { backend } from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";
import MoviesCard from "./MoviesCard";

export default function Movies() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchMovies(pageNumber = 1, query = "") {
    try {
      setLoading(true);
      const data = await backend("http://localhost:3000/movies", {
        access_token: user.access_token,
        params: { page: pageNumber, search: query },
      });
      setMovies(data.results);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Erreur lors de la récupération des films :", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleSearch() {
    fetchMovies(1, search);
  }

  function handlePageChange(_event, newPage) {
    setPage(newPage);
    fetchMovies(newPage, search);
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Découvrir des films
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Rechercher un film"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Rechercher
          </Button>
        </Box>

        {loading && (
          <Typography sx={{ mt: 2, fontStyle: "italic" }}>
            Chargement...
          </Typography>
        )}

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MoviesCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      </Container>
    </Box>
  );
}
