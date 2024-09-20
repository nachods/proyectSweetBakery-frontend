import React from 'react';
import styles from './footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className={styles.footer}>
        <p>Sitio web hecho por</p>
        <a href='https://www.instagram.com/nachodsimone/'>@nachodsimone</a>
        <button onClick={handleSubmit}>¿Eres administrador?</button>
    </div>
  )
}

export default Footer