import React, {FC, PropsWithChildren, ReactNode} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

type TModal = {
    onClose: () => void;
};
export const Modal: FC<PropsWithChildren<TModal>> = ({ children, onClose }) => {

    React.useEffect(() => {
        const onEscape = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', onEscape);
        return () => document.removeEventListener("keydown", onEscape);
    }, [])

    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                    {children}
                </div>
                <ModalOverlay onClose={onClose}/>
            </>
        ),
        modalRoot as HTMLDivElement
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
}