import {FormEvent, useCallback, useState} from "react";
import styles from "./pages.module.css";
import {Link, Navigate} from "react-router-dom";
import {restoreForgotPass} from "../services/actions/forgot-pass";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../services/hooks/hooks";

export function ForgotPasswordPage() {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const success = useAppSelector((state) => state.password.success);

    const getPass = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(restoreForgotPass());
        },
        [dispatch,]
    );

    if (success) {
        return <Navigate to={"/reset-password"} />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className="text text_type_main-medium p-6">Восстановление пароля</h1>
                <form className={styles.form} onSubmit={getPass}>
                    <EmailInput
                        onChange={(event) => setValue(event.target.value)}
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