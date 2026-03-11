import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"


//Paginas de Ejemplo
const Home = () => <h1 className="text-xl">Pagina Publica Home</h1>
const Admin = () => <h1 className="text-xl text-indigo-600 font-bold">Zona VIP: Panel de Administracion</h1>
const Login = () => <h1 className="text-xl text-red-500">Desdes Iniciar Sesion</h1>
const Denegado = () => <h1 className="text-xl text-red-500">Acceso Denegado</h1>

// Paginas Protegidas
const Perfil = () => <h1 className="text-xl text-green-500">Mi Perfil de Usuario</h1>
const DashboardAdmin = () => <h1 className="text-xl text-green-500">Dashboard de Administracion (Solo para Admins)</h1>

function App() {
  const [user, setUser] = useState<{id: number, name: string, role: 'admin' | 'user'} | null>(null)

  // Funciones Simuladoras
  const loginAdmin = () => setUser({id: 1, name: "Ana", role: "admin"});
  const loginUser = () => setUser({id: 2, name: "Victor", role: "user"});
  const logout = () => setUser(null)
  
  return (
    <BrowserRouter>
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
      <button onClick={loginUser} className="px-3 py-1 bg-green-600 rounded text-sm">Entrar como user</button>
      <button onClick={loginAdmin} className="px-3 py-1 bg-purple-600 rounded text-sm">Admin</button>
      <button onClick={logout} className="px-3 py-1">Salir</button>

    </div>
    
    </nav>
    <div className="p-10">
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
    </div>
    </BrowserRouter>
  )
}

export default App