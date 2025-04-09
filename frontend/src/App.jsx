import { UserProvider } from "./contexts/UserContext";
import Router from "./routes/Router";

export default function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}
