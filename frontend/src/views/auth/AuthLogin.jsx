import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useUser } from "../../contexts/UserContext";

export default function AuthLogin() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(form);
    if (success) {
      alert("Connexion réussie !");
      navigate("/movies");
    } else {
      alert("Erreur de login");
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2, fontWeight: "bold" }}
            >
              Se connecter
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
