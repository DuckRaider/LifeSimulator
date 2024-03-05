import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./components/Home/Home"
import { Login } from "./components/Auth/Login"
import { Register } from "./components/Auth/Register";
import { UserProvider } from "./context/UserContext";
import Routes from "./Routes/Routes";

function App() {
  return (
    <UserProvider>
      <Routes/>
    </UserProvider>
  )
}

export default App