import { React, useState } from 'react';
import Background from '../../components/Background/Background';
import styles from './Admin.module.css';
import PasswordField from '../../components/PasswordField/PasswordField';

const AdminPage = () => {
  const [error, setError] = useState(null);

  return (
    <Background>
    <div className={styles.containerTotal}>
      <div className={styles.con}>

      </div>
    <form className={styles.contform}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          //value={formData.email}
          //onChange={asdasd}
        />
        <PasswordField
          name="password"
          placeholder="Contraseña"
          //value={formData.password}
          //onChange={handleInputChange}
        />
        {error && <p className="alert alert-danger">{error}</p>}
        <button type='submit' className={styles.contformButton}>Iniciar Sesión</button>
      </form>
    </div>
    </Background>
  )
}

export default AdminPage