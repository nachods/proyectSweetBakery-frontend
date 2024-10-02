import React, {useContext} from 'react';
import styles from './footer.module.css';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/UserContext';

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirige a /panel si el usuario está autenticado, de lo contrario a /admin
    if (user) {
      navigate('/panel');
    } else {
      navigate('/admin');
    }
  };;

  return (
    <div className={styles.footer}>
        <p>Sitio web hecho por</p>
        <a href='https://www.instagram.com/nachodsimone/'>@nachodsimone</a>
        <button onClick={handleSubmit}>¿Eres administrador?</button>
    </div>
  )
}

export default Footer