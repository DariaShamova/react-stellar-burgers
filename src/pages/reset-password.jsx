import { useState } from "react";
import styles from "./pages.module.css";
import {EmailInput, Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {resetPassword} from "../services/actions/reset-pass";

export function ResetPasswordPage() {
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        password: "",
        token: "",
    });
    const saveNewPass = (event) => {
        event.preventDefault();
        dispatch(resetPassword());
    };
    const onChange = e => {
        setValue(e.target.value)
    };
    const success = useSelector((state) => state.newPassword.success);
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className="text text_type_main-medium p-6">Восстановление пароля</h1>
                <form className={styles.form} onSubmit={saveNewPass}>
                    <PasswordInput
                        onChange={onChange}
                        value={value.password}
                        name={'password'}
                        placeholder="Введите новый пароль"
                    />
                    <Input
                        onChange={onChange}
                        name={"token"}
                        value={value.token}
                        placeholder="Введите код из письма"
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                    {success ? navigate("/login") : null}
                </form>
                <div className={`${styles.hint} pb-4`}>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
                    <Link to="/login" className={`${styles.link} text text_type_main-default text_color_inactive`}>Войти</Link>
                </div>
            </div>
        </div>
    );
}