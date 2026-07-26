import { Navigate } from 'react-router-dom';

const checkToken = () => {
  const adminToken = localStorage.getItem('adminToken');
  return !!adminToken; // Returns true if the token is present, false otherwise
};

const ProtectedRoute = ({ children }) => {
  return checkToken() ? (
     children
  ) : (
    <Navigate to="/" replace />
  );
}
export default ProtectedRoute;