import {useState} from "react";
import { useDispatch } from "react-redux";
import styles from "./pages.module.css";
import {EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import {userLogin, userLogout} from "../services/actions/login";

export function LoginPage() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const login = useSelector((state) => state.login.login);

    const formLogin = event => {
        event.preventDefault();
        const user = {
            password,
            email,
        };
        dispatch(userLogin(user));
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