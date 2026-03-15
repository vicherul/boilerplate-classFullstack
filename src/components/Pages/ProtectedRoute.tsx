import { Navigate } from "react-router-dom"

// Definimos como es nuestro usuario
interface User {
    id: number;
    name: string;
    role: 'admin' | 'user'; //Tipado estricto para evitar errores de tipeo
}

interface Props {
    user: User | null; //El usuario puede ser nulo si no ha iniciado sesión
    requiredRole?: 'admin' | 'user';
    children: React.ReactNode; //Los componentes hijos que se renderizarán si el usuario tiene acceso 
}

const ProtectedRoute = ({user, requiredRole, children}:Props) => {
    //Si no esta permitido, lo enviamos al Login inmediatamente
    if (!user) {
      // Usamos replacepara que no pueda usar el botón de "Atrás" del navegador y volver a la ruta prohibida
        return <Navigate to="/login" replace />
    }
    if (requiredRole && user.role !== requiredRole) {
      // Si el usuario no tiene el rol requerido, lo redirigimos a una página de "Acceso Denegado" o al inicio
        return <Navigate to="/denegado" replace />
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute