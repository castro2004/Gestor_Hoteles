import { useState } from 'react';
import './login.css'; 
import git from './img/git.png';
import google from './img/gogle.png';
import x from './img/x.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3010/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
  
        // Ajustar la redirección según el rol del usuario
        const userRole = response.data.rol;
        if (userRole === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
  
        console.log(response.data);
      } else {
        console.log('Error de inicio de sesión:', response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div id="container" style={{ marginTop: -1350 }}>
      <div className="top">
        <h1>Inicio de sesión</h1>
      </div>
      <form style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login_option">
          <a href="#" className="account">
            <i className="fa-brands fa-google" style={{ color: '#000000' }}>
              <img src={git} width={25} alt="Google" />
            </i>
          </a>
          <a href="#" className="account">
            <i className="fa-brands fa-github" style={{ color: '#000000' }}>
              <img src={google} width={25} alt="GitHub" />
            </i>
          </a>
          <a href="#" className="account">
            <i className="fa-brands fa-twitter" style={{ color: '#000000' }}>
              <img src={x} width={25} alt="Twitter" />
            </i>
          </a>
        </div>
        <button type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <a href="#" className="signup" onClick={() => {}} style={{ marginTop: 10 }}>
          ¿Aún no tienes una cuenta?
        </a>
      </form>
    </div>
  );
};

export default Login;
