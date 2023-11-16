import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./main.module.css";
import {getIngredients} from "../../services/actions/ingredients"; // Наш thunk для запроса данных с сервера
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


export function Main() {

    // const [isModalOpen, setIsModalOpen] = useState({visible: false});
    //
    // const [modalType, setModalType] = useState({ingredientModal: false});

    // Вытаскиваем селектором нужные данные из хранилища
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
        (state: any) => state.ingredients);

    // Получаем метод dispatch
    const dispatch = useDispatch();

    useEffect(
        () => {
            // Отправляем экшен-функцию
            if (!ingredients.length) dispatch(getIngredients());

        },
        [dispatch]
    );

    // Используем условный рендеринг для разных состояний хранилища
    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    }


    //Modal - s

    // const setIngredientModal = () => {
    //     setModalType({ingredientModal: true});
    // };
    //
    // const setOrderModal = () => {
    //     setModalType({ingredientModal: false});
    // }
    //
    // const handleOpenModal = () => {
    //     setIsModalOpen({visible: true})
    // };
    //
    // const handleCloseModal = () => {
    //     setIsModalOpen({visible: false})
    // };


    // const modal = (
    //     <Modal onClose={handleCloseModal} header={modalType.ingredientModal && "Детали ингредиента"}>
    //         {modalType.ingredientModal ? <IngredientDetails/> : <OrderDetails/>}
    //     </Modal>
    // );

    // Modal - e


    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor/>
                    {/*{isModalOpen.visible && modal}*/}
                </main>
            </DndProvider>
        </div>
    );
}