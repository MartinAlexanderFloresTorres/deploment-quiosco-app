import styles from "../styles/Preload.module.css";

const Preload = () => {
  return (
    <div className={styles.animacion}>
      <div className={`${styles.bg} ${styles.height}`}></div>
      <div className={styles.bg}></div>
      <div className={styles.bg}></div>
      <div className={styles.bg}></div>
    </div>
  );
};

export default Preload;
