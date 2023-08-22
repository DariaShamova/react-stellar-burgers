import React from 'react';
import styles from "./app.module.css";
import {ingredientPropType} from "../../utils/prop-types";

import { AppHeader } from '../app-header/app-header.jsx';
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {OrderDetails} from "../order-details/order-details";


function App() {
    const[ingredientsData, setIngredientsData] = React.useState({
        isLoading: false,
        hasError: false,
        ingredients: []
    });

    const [isModalOpen, setIsModalOpen] = React.useState({visible: false});

    const [modalType, setModalType] = React.useState({ingredientModal: false});

    const setIngredientModal = () => {
        setModalType({ingredientModal: true});
    };

    const setOrderModal = () => {
        setModalType({ingredientModal: false});
    }

    const handleOpenModal = () => {
        setIsModalOpen({visible: true})
    };

    const handleCloseModal = () => {
        setIsModalOpen({visible: false})
    };

    const getIngredients = () => {
        setIngredientsData({...ingredientsData, isLoading: true, hasError: false});
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(ingredients => setIngredientsData({ ...ingredientsData, ingredients: ingredients.data, isLoading: false }))
            .catch(e => {
                setIngredientsData({ ...ingredientsData, hasError: true, isLoading: false });
            });
    };

    React.useEffect(() => {
        getIngredients();
    }, []);

    const { ingredients, isLoading, hasError } = ingredientsData;

    const modal = (
        <Modal onClose={handleCloseModal} header={modalType.ingredientModal && "Детали ингредиента"}>
            {modalType.ingredientModal ? <IngredientDetails item={ingredients[1]}/> : <OrderDetails/>}
        </Modal>
    );

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients ingredients={ingredients} onOpen={handleOpenModal} handleModalType={setIngredientModal} />
                <BurgerConstructor onOpen={handleOpenModal} handleModalType={setOrderModal}/>
                <div style={{overflow: 'hidden'}}>
                    {isModalOpen.visible && modal}
                </div>
            </main>
        </div>
    );
}

export default App;
