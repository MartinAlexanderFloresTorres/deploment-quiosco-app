import styles from "../styles/Preload.module.css";

const PreloadOrdenes = () => {
  return (
    <div className={`${styles.animacion} ${styles.ordenes}`}>
      <div className={styles.bg}></div>
      <div className={styles.bg}></div>
      <div className={styles.bg}></div>
    </div>
  );
};

export default PreloadOrdenes;
