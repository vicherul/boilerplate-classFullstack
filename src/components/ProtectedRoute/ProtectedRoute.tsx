import { Navigate } from "react-router-dom"

interface Props {
  isAllowed: boolean;
  children: React.ReactNode; // Representa el contenido que queremos proteger
}

const ProtectedRoute = ({isAllowed, children}:Props) => {
  //Si no esta permitido, lo enviamos al Login inmediatamente
  if(!isAllowed){
      return <Navigate to="/login"/> //Si la condición es falsa, el componente no renderiza nada del contenido protegido. En su lugar, utiliza `<Navigate />` de *react-router-dom* para forzar un cambio de URL hacia el login. Es una **redirección declarativa**.
  }
  return (
    <div>{children}</div>
  )
}
//Si isAllowed es verdadero, el código ignora el if y procede a mostrar los children. El div actúa como un contenedor para el contenido protegido.
export default ProtectedRoute
