import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// --- Componentes de UI Reutilizables ---
const Card = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 transition-all hover:shadow-md">
    <h1 className="text-2xl font-bold text-slate-800 mb-4">{title}</h1>
    <div className="text-slate-600">{children}</div>
  </div>
);

const Navbar = ({ user, loginAdmin, loginUser, logout }: {
  user: { id: number; name: string; role: "admin" | "user" } | null;
  loginAdmin: () => void;
  loginUser: () => void;
  logout: () => void;
}) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-tight text-slate-700">MODERN_APP</span>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink to="/" className={({isActive}) => isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-500 transition"}>Inicio</NavLink>
          <NavLink to="/perfil" className={({isActive}) => isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-500 transition"}>Perfil</NavLink>
          <NavLink to="/admin" className={({isActive}) => isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-500 transition"}>Admin VIP</NavLink>
        </div>
      </div>
      <SessionControls user={user} loginAdmin={loginAdmin} loginUser={loginUser} logout={logout} />
    </div>
  </nav>
);

const SessionControls = ({ user, loginAdmin, loginUser, logout }: {
  user: { id: number; name: string; role: "admin" | "user" } | null;
  loginAdmin: () => void;
  loginUser: () => void;
  logout: () => void;
}) => (
  <div className="flex items-center gap-3">
    <div className="mr-2 text-right hidden sm:block">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Estado</p>
      <p className="text-sm font-bold text-slate-700">
        {user ? `${user.name} • ` : "Invitado"}
        <span className={`text-[10px] px-1.5 py-0.5 rounded ml-1 ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
          {user?.role || 'Offline'}
        </span>
      </p>
    </div>
    {!user ? (
      <>
        <button onClick={loginUser} className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition">User</button>
        <button onClick={loginAdmin} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-xl transition">Admin</button>
      </>
    ) : (
      <button onClick={logout} className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition border border-red-100">Salir</button>
    )}
  </div>
);

// --- Páginas Refactorizadas ---
const Home = () => (
  <Card title="🏠 Inicio">
    <p>Bienvenido a la plataforma pública. Explora nuestras funciones generales.</p>
  </Card>
);

const AdminPanel = () => (
  <Card title="🔐 Panel de Administración">
    <p className="text-indigo-600 font-medium">Acceso exclusivo para administradores. Aquí puedes gestionar el sistema.</p>
  </Card>
);

const LoginMsg = () => (
  <Card title="🔑 Iniciar Sesión">
    <p className="text-amber-600">Por favor, identifícate para acceder a esta sección.</p>
  </Card>
);

const Denegado = () => (
  <Card title="🚫 Acceso Denegado">
    <p className="text-red-500">No tienes los permisos suficientes para ver este contenido.</p>
  </Card>
);

const Perfil = () => (
  <Card title="👤 Mi Perfil">
    <p className="text-emerald-600">Datos privados del usuario logueado correctamente.</p>
  </Card>
);

function App() {
  const [user, setUser] = useState<{ id: number; name: string; role: "admin" | "user" } | null>(null);
  const loginAdmin = () => setUser({ id: 1, name: "Ana", role: "admin" });
  const loginUser = () => setUser({ id: 2, name: "Víctor", role: "user" });
  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar user={user} loginAdmin={loginAdmin} loginUser={loginUser} logout={logout} />
        <main className="max-w-5xl mx-auto p-6 mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginMsg />} />
            <Route path="/denegado" element={<Denegado />} />
            <Route path="/perfil" element={
              <ProtectedRoute user={user}>
                <Perfil />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;