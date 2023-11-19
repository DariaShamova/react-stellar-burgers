import styles from "./app-header.module.css";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";

export function AppHeader() {
    return (
        <header className={`${styles.navigation} pt-4 pb-4`}>
            <nav className={styles.navigation__item}>
                <Link to="/" className={`${styles.navigation__link} p-5`}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">Конструктор</p>
                </Link>
                <Link to="/feed" className={`${styles.navigation__link} p-5`}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                </Link>
            </nav>
            <Logo />
            <div className={`${styles.navigation__link} p-5`}>
                <Link to="/profile" className={styles.navigation__link}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </Link>
            </div>
        </header>
    );
}


