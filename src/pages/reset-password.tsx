import {FormEventHandler, useEffect, useState} from "react";
import styles from "./pages.module.css";
import {EmailInput, Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {resetPassword} from "../services/actions/reset-pass";
import {RESTORE_FORGOT_PASS_ACTION} from "../services/actions/forgot-pass";
import {useAppDispatch, useAppSelector} from "../services/hooks/hooks";

export function ResetPasswordPage() {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState({
        password: "",
        token: "",
    });
    const saveNewPass: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        dispatch(resetPassword());
    };

    const success = useAppSelector((state) => state.newPassword.success);
    const successForgot = useAppSelector(
        (state) => state.password.success
    );
    const navigate = useNavigate();

    useEffect((): any => {
        return () => {
            dispatch(RESTORE_FORGOT_PASS_ACTION(false));
        };
    }, []);

    if (!success && !successForgot) {
        return <Navigate to={"/forgot-password"} />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className="text text_type_main-medium p-6">Восстановление пароля</h1>
                <form className={styles.form} onSubmit={saveNewPass}>
                    <PasswordInput
                        onChange={(event) =>
                            setValue({ ...value, password: event.target.value })
                        }
                        value={value.password}
                        name={'password'}
                        placeholder="Введите новый пароль"
                    />
                    <Input
                        onChange={(event) =>
                            setValue({ ...value, token: event.target.value })
                        }
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