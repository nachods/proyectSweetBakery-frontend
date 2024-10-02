import React, { useState, useContext } from 'react';
import Background from '../../components/Background/Background';
import styles from './Admin.module.css';
import PasswordField from '../../components/PasswordField/PasswordField';
import UserContext from '../../context/UserContext';
import { loginFetch } from '../../api/loginFetch';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { setUser, login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { access } = await loginFetch(formData);
      login(access);
      localStorage.setItem('access', access);

      if (access) {
        setUser({
          firstname: 'Ignacio',
          lastname: 'De Simone',
          email: 'nacho@test.static.com',
        });
      }

      setError('');
      navigate('/panel');
    } catch (error) {
      console.log(error);
      setError(error.msg);
    }
  };

  return (
    <Background>
    <div className={styles.containerTotal}>
    <form className={styles.contform} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleInputChange}
        />
        <PasswordField
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="alert alert-danger">{error}</p>}
        <button type='submit' className={styles.contformButton}>Iniciar Sesión</button>
      </form>
    </div>
    </Background>
  )
}

export default AdminPage