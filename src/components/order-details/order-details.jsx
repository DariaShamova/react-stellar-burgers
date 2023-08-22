import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
export const OrderDetails = () => {
    return (
            <div className="mt-30 mb-30" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p className="text text_type_digits-large">034536</p>
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