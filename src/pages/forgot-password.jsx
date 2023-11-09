import {useCallback, useState} from "react";
import styles from "./pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {restoreForgotPass} from "../services/actions/forgot-pass";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPasswordPage() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const success = useSelector(state => state.password.success);
    const navigate = useNavigate();

    const getPass = useCallback(
        (event) => {
            event.preventDefault();
            dispatch(restoreForgotPass());
            console.log('Hi');
            success
            ? navigate("/reset-password")
            : navigate("/forgot-password");
        },
        [dispatch, navigate, success]
    );

    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className="text text_type_main-medium p-6">Восстановление пароля</h1>
                <form className={styles.form} onSubmit={getPass}>
                    <EmailInput
                        onChange={onChange}
                        value={value}
                        name={'email'}
                        isIcon={false}
                        placeholder="Укажите e-mail"
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </form>
                <div className={`${styles.hint} pb-4`}>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
                    <Link to="/login" className={`${styles.link} text text_type_main-default text_color_inactive`}>Войти</Link>
                </div>
            </div>
        </div>
    );
}