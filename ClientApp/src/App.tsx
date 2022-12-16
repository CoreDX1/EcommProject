import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home/Home'
import { Login } from './Pages/Login/Login'
import { Navbar } from './Components/Navbar/NavBar'
import { Quote } from './Components/Quote/quote'
import { NotFound } from './Pages/NotFound'
import { Register } from './Pages/Login/Register'
import { Admin } from './Admin/Admin'
import { SoloProduts } from './Components/SoloProduts/SoloProduts'
import { LoginUsuario } from './Components/Navigate/LoginUsuario'

function App(): JSX.Element {
    return (
        <>
            <Quote />
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<SoloProduts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginUsuario" element={<LoginUsuario />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
