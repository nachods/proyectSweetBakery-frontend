import React from "react";
import styles from "./oneCard.module.css";

const SubMenu = (props) => {
  const { title, picture, desc, price } = props;

  return (
    <div className={styles.Menu}>
      <img className={styles.MenuImg} src={picture} alt="picture.png" />
      <div className={styles.subMenu}>
        <h4 className={styles.MenuTitle}>{title}</h4>
        <p className={styles.MenuDesc}>{desc}</p>
      </div>
    </div>
  );
};

export default SubMenu;
