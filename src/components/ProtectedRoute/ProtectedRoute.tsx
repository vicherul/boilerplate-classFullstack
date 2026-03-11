import { Navigate } from "react-router-dom"

interface Props {
  isAllowed: boolean;
  userRole?: string;
  requiredRole?: string;
  children: React.ReactNode; 
}

const ProtectedRoute = ({ isAllowed, userRole, requiredRole, children }: Props) => {
  if (!isAllowed) return <Navigate to="/login" />
  if (requiredRole && userRole !== requiredRole) return <Navigate to="/unauthorized" />

  return <div>{children}</div>
}


export default ProtectedRoute