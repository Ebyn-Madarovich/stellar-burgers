// #region Imports
import styles from './modal-overlay.module.css';
// #endregion

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.overlay} onClick={onClick} />
);
