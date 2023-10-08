import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import styles from "../order-details/order-details.module.css";

export const OrderDetails = () => {
    const {postOrderFailed, orderNumber, postOrderRequest } = useSelector((state) => state.order);

    // Используем условный рендеринг для разных состояний хранилища
    if (postOrderFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (postOrderRequest) {
        return <p>Загрузка номера заказа...</p>
    } else {
        return (
            <div className={`${styles.order} mt-30 mb-30`}>
                <p className="text text_type_digits-large">{orderNumber}</p>
                <p className="text text_type_main-medium pt-8 pb-15">
                    идентификатор заказа
                </p>
                <CheckMarkIcon type="primary"/>
                <p className="text text_type_main-small pb-2 pt-15">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        )
    }
}