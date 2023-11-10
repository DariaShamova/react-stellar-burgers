import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

export default function Modal (props) {

    const { children, onClose, header } = props;

    React.useEffect(() => {
        const onEscape = (evt) => {
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
                        <h3 className="text text_type_main-large">{header}</h3>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                    {children}
                </div>
                <ModalOverlay onClose={onClose}/>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
}