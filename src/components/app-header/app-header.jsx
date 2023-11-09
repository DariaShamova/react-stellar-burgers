import styles from "./app-header.module.css";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function AppHeader() {
    return (
        <header className={`${styles.navigation} pt-4 pb-4`}>
            <nav className={styles.navigation__item}>
                <div className={`${styles.navigation__link} p-5`}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">Конструктор</p>
                </div>
                <div className={`${styles.navigation__link} p-5`}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                </div>
            </nav>
            <Logo />
            <div className={`${styles.navigation__link} p-5`}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </div>
        </header>
    );
}


