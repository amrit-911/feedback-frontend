 import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Main";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";

 function App() {
     return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/register" element={<RegisterPage/>}/> 
                <Route path="/login" element={<LoginPage/>}/> 
            </Routes>
        </BrowserRouter>
     )
    }

 export default App;