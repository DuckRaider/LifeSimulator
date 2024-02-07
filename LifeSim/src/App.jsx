import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home"
import { Login } from "./components/Auth/Login"
import { Register } from "./components/Auth/Register";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/home" index element={<Home/>}/>
          {/* <Route path='/*' element={<NotFound/>}/> */}
          {/* <Route path='/trails' element={<TrailPage/>}/> */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
