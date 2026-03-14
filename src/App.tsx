import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Denegado from "./components/Denegado/Denegado"
//Paginas protegidas
import Perfil from "./components/Perfil/Perfil"
import DashboardAdmin from "./components/Dashboard/Dashboard"
import { dateToday } from "./components/utils/functions"

function App() {
  const [user, setUser] = useState<{id: number, name: string, role: 'admin' | 'user'} | null>(null)

  // Funciones Simuladoras
  const handleLoginAdmin = () => setUser({id: 1, name: "Víctor", role: "admin"});
  const handleLoginUser = () => setUser({id: 2, name: "Vicher", role: "user"});
  const handleLogout = () => setUser(null)
  
  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col">
    <nav className="p-4 bg-slate-800 text-white flex justify-between">

      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/perfil">Mi perfil</Link>
        <Link to="/admin">Admin (VIP)</Link>
      </div>
    {/* Panel de Control */}
    <div className="flex gap-2 items-center">
      <span className="mr-4 text-sm text-gray-300">
        {user ? `Hola, ${user.name} (${user.role})`: 'Desconectado'}
      </span>
      <button onClick={handleLoginUser} className="px-3 py-1 bg-green-600 rounded text-sm">Entrar como user</button>
      <button onClick={handleLoginAdmin} className="px-3 py-1 bg-purple-600 rounded text-sm">Admin</button>
      <button onClick={handleLogout} className="px-3 py-1">Salir</button>

    </div>
    
    </nav>
    <main className="flex-1 p-10">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/denegado" element={<Denegado />}/>
      {/* Rutas protegidas */}
      <Route path="/perfil" element={<ProtectedRoute user={user}>
        <Perfil></Perfil>
      </ProtectedRoute>}>
      </Route>
      <Route path="/admin" element={<ProtectedRoute user={user} requiredRole="admin">
        <DashboardAdmin></DashboardAdmin>
      </ProtectedRoute>} />
      
    </Routes>
    </main>
    <footer className="mt-auto py-4 text-center text-slate-200 bg-slate-900 border-t border-slate-700">
      &copy; 2026 Mi Aplicación. Todos los derechos reservados. {dateToday()} 
    </footer>
    </div>
    </BrowserRouter>
  )
}

export default App
