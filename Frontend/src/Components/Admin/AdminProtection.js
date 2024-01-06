import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminProtection = ({ component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el usuario tiene permisos de administrador
    const isAdmin = localStorage.getItem('isAdmin'); // Asegúrate de establecer esta bandera al iniciar sesión del administrador

    if (!isAdmin) {
      // Si no es un administrador, redirige a otra página (puedes ajustar según tus necesidades)
      navigate('/');
    }
  }, [navigate]);

  // Renderiza el componente si el usuario tiene permisos de administrador
  return <Component />;
};

export default AdminProtection;
