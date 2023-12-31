import {useState} from "react";
import styles from "./pages.module.css";
import {EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import {userLogin, userLogout} from "../services/actions/login";
import { FormEventHandler } from "react";
import {useAppDispatch, useAppSelector} from "../services/hooks/hooks";
import {useForm} from "../services/hooks/useForm";


export function LoginPage() {
    const dispatch = useAppDispatch();
    const login = useAppSelector((state) => state.login.login);
    const [password, setPassword] = useState("");
    const {values, handleChange, setValues} = useForm({});
    const [email, setEmail] = useState("");


    const formLogin: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        const user = {
            password,
            email,
        };
        dispatch(userLogin(user));
    }

    const location = useLocation();
    const from = location.state?.from || '/';
    if (login) {
        return <Navigate to={ from }   />;
     }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className="text text_type_main-medium p-6">Вход</h1>
                <form className={styles.form} onSubmit={formLogin}>
                    <EmailInput
                        placeholder="E-mail"
                        value={email}
                        name={'email'}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <PasswordInput
                        placeholder="Пароль"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        name={'password'}
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Войти
                    </Button>
                    {/*{login ? <Navigate to="/profile" /> : <Navigate to="/login" />}*/}
                </form>
                <div className={`${styles.hint} pb-4`}>
                    <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
                    <Link to="/register" className={`${styles.link} text text_type_main-default text_color_inactive`}> Зарегистрироваться</Link>
                </div>
                <div className={`${styles.hint}`}>
                    <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
                    <Link to="/forgot-password" className={`${styles.link} text text_type_main-default text_color_inactive`}> Восстановить пароль</Link>
                </div>

            </div>
        </div>
    );
}