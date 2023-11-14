import {useState, useEffect, useCallback} from "react";
import styles from "./pages.module.css";
import {Input, EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {sendProfileInfo} from "../services/actions/profile";
import {userLogin, userLogout} from "../services/actions/login";

export function ProfilePage() {
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.profile.user.email);
    const userName  = useSelector((state) => state.profile.user.name);
    const [value, setValue] = useState({
        name: userName,
        email: userEmail,
        password: "",
    });

    useEffect(() => {
        setValue({
            name: userName,
            email: userEmail,
            password: "",
        });
    }, [userEmail, userName]);

    const saveProfile = (event) => {
        event.preventDefault();
        const { name, email, password } = value;
        dispatch(sendProfileInfo(name, email, password));
        setValue({
            name: userName,
            email: userEmail,
            password: "",
        });
    };

    const logoutProfile = useCallback(() => {
        dispatch(userLogout());
    }, [dispatch]);

    const removeInfo = () => {
        setValue({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.profile__container}>
                <NavLink to="/profile" activeClassName={styles.active} className={`${styles.profile__link} text text_type_main-medium text_color_inactive mt-4 mb-4`}>Профиль</NavLink>
                <NavLink to="/" activeClassName={styles.active} className={`${styles.profile__link} text text_type_main-medium text_color_inactive mt-4 mb-4`}>История заказов</NavLink>
                <NavLink to="/" activeClassName={styles.active} className={`${styles.profile__link} text text_type_main-medium text_color_inactive mb-20 mt-4`}>Выход</NavLink>
                <p className={`${styles.profile__link} text text_type_main-default text_color_inactive`}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <div>
                <form className={styles.form} onSubmit={saveProfile}>
                    <Input
                        placeholder="Имя"
                        onChange={(event) =>
                            setValue({ ...value, name: event.target.value })
                        }
                        value={value.name}
                        name="name"
                        icon={"EditIcon"}
                    />
                    <EmailInput
                        placeholder="Логин"
                        onChange={(event) =>
                            setValue({ ...value, email: event.target.value })
                        }
                        value={value.email}
                        name={'email'}
                        icon={"EditIcon"}
                    />
                    <PasswordInput
                        onChange={(event) =>
                            setValue({ ...value, password: event.target.value })
                        }
                        value={value.password}
                        name={'password'}
                        icon="EditIcon"
                        placeholder="Пароль"
                    />
                    <div className={styles.profile__buttons}>
                        <Button onClick={logoutProfile} extraClass={styles.profile__button} htmlType="button" type="primary" size="medium">
                            Отмена
                        </Button>
                        <Button extraClass={styles.profile__button} htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
