import React, {FormEventHandler, useState} from "react";
import styles from "./pages.module.css";
import {EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {register} from "../services/actions/register";
import {useAppDispatch, useAppSelector} from "../services/hooks/hooks";

export function RegisterPage() {
    const [value, setValue] = useState({
        email: "",
        name: "",
        password: "",
    });
    const dispatch = useAppDispatch();
    const login = useAppSelector((state) => state.registration.success);
    const userRegister: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const user = {
            name: value.name,
            email: value.email,
            password: value.password,
        };
        dispatch(register(user));
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className="text text_type_main-medium p-6">Регистрация</h1>
                <form className={styles.form} onSubmit={userRegister}>
                    <Input
                        placeholder="Имя"
                        name={"name"}
                        onChange={(event) => setValue({ ...value, name: event.target.value })}
                        value={value.name}
                    />
                    <EmailInput
                        placeholder="E-mail"
                        onChange={(event) =>
                            setValue({ ...value, email: event.target.value })
                        }
                        value={value.email}
                        name={'email'}
                    />
                    <PasswordInput
                        onChange={(event) =>
                            setValue({ ...value, password: event.target.value })
                        }
                        value={value.password}
                        name={'password'}
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                    {login ? <Navigate to="/profile" /> : <Navigate to="/register" />}
                </form>
                <div className={`${styles.hint} pb-4`}>
                    <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</span>
                    <Link to="/login" className={`${styles.link} text text_type_main-default text_color_inactive`}>Войти</Link>
                </div>
            </div>
        </div>
    );
}