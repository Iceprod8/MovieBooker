import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Pagination,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { backend } from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";
import MoviesCard from "./MoviesCard";
import { useSearchParams } from "react-router-dom";

export default function Movies() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  async function fetchMovies(pageNumber = 1, query = "", limit = 25) {
    try {
      setLoading(true);
      const data = await backend("movies", {
        access_token: user.access_token,
        params: { page: pageNumber, search: query, limit },
      });
      setMovies(data.results);
      setPage(data.page);
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (err) {
      console.error("Erreur lors de la récupération des films :", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(initialPage);
    fetchMovies(initialPage, search, perPage);
  }, []);

  function handleSearch() {
    setPage(1);
    setSearchParams({ page: "1" });
    fetchMovies(1, search, perPage);
  }

  function handlePageChange(_event, newPage) {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    fetchMovies(newPage, search, perPage);
  }

  function handlePerPageChange(e) {
    const newLimit = parseInt(e.target.value, 10);
    setPerPage(newLimit);
    setPage(1);
    setSearchParams({ page: "1" });
    fetchMovies(1, search, newLimit);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#FFD700" }}
        >
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
              style: { color: "white" },
            }}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="per-page-label" sx={{ color: "white" }}>
              Par page
            </InputLabel>
            <Select
              labelId="per-page-label"
              value={perPage}
              onChange={handlePerPageChange}
              label="Par page"
              sx={{ color: "white" }}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading && (
          <Typography sx={{ mt: 2, fontStyle: "italic" }}>
            Chargement...
          </Typography>
        )}

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MoviesCard movie={movie} page={page} />
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
