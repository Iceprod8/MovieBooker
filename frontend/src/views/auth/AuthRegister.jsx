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

export default function AuthRegister() {
  const { register } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await register(form);
    if (success) {
      alert("Inscription réussie");
      navigate("/login");
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
            Inscription
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Nom d'utilisateur"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

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
              S'inscrire
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
