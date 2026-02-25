import { BrowserRouter} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RouterPage from "../src/route";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouterPage/>
      </BrowserRouter>
    </AuthProvider>
  );
}