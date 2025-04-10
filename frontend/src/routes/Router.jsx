import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProtectedRoute from "./PrivateRoute";
import HomePage from "../views/HomePage";
import AuthRegister from "../views/auth/AuthRegister";
import AuthLogin from "../views/auth/AuthLogin";
import Movies from "../views/movies/Movies";
import MoviesDetails from "../views/movies/MoviesDetails";
import Reservation from "../views/profiles/Reservation";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MoviesDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
