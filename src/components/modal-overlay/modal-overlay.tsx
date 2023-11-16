import React, {FC} from "react";
import styles from "./modal-overlay.module.css";

type TModalOverlay = {
    onClose: () => void;
};
export const ModalOverlay: FC<TModalOverlay> = ({onClose}) => {
    return <div className={styles.overlay} onClick={onClose}></div>
}