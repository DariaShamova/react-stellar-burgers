import {useState, useEffect, useCallback, FormEventHandler} from "react";
import styles from "./pages.module.css";
import {Input, EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {sendProfileInfo} from "../services/actions/profile";
import {userLogin, userLogout} from "../services/actions/login";
import {useAppDispatch, useAppSelector} from "../services/hooks/hooks";

export function ProfileForm() {
    const dispatch = useAppDispatch();
    const userEmail = useAppSelector((state) => state.profile.user.email);
    const userName  = useAppSelector((state) => state.profile.user.name);
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

    const saveProfile: FormEventHandler<HTMLFormElement> = (event) => {
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
                        <Button onClick={removeInfo} extraClass={styles.profile__button} htmlType="button" type="primary" size="medium">
                            Отмена
                        </Button>
                        <Button extraClass={styles.profile__button} htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
    )
}
