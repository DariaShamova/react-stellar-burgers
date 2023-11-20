import React, {useCallback, FC} from "react";
import styles from "./pages.module.css";
import {Link, Outlet} from "react-router-dom";
import {userLogout} from "../services/actions/login";
import {useAppDispatch} from "../services/hooks/hooks";

export const ProfilePage: FC = () => {
    const dispatch = useAppDispatch();

    const logoutProfile = useCallback(() => {
        dispatch(userLogout());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.profile__container}>
                <Link to="/profile" className={`${styles.profile__link} text text_type_main-medium text_color_inactive mt-4 mb-4`}>Профиль</Link>

                <Link to="/profile/orders" className={`${styles.profile__link} text text_type_main-medium text_color_inactive mt-4 mb-4`}>История заказов</Link>

                <Link to="/" className={`${styles.profile__link} text text_type_main-medium text_color_inactive mb-20 mt-4`}><span onClick={logoutProfile}>Выход</span></Link>

                <p className={`${styles.profile__link} text text_type_main-default text_color_inactive`}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <Outlet />
        </div>
    )
}
