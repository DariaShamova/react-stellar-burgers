import styles from "./pages.module.css";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getIngredients} from "../services/actions/ingredients";
import {TIngredient} from "../services/actions/dnd";
import {useAppDispatch, useAppSelector} from "../services/hooks/hooks";

export function IngredientPage() {
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const {ingredients, ingredientsRequest, ingredientsFailed} = useAppSelector(
        (state) => state.ingredients);

    // useEffect(
    //     () => {
    //         // Отправляем экшен-функцию
    //         dispatch(getIngredients());
    //     },
    //     [dispatch]
    // );
    //
    // //Используем условный рендеринг для разных состояний хранилища
    // if (ingredientsFailed) {
    //     return <p>Произошла ошибка при получении данных</p>
    // } else if (ingredientsRequest) {
    //     return <p>Загрузка...</p>
    // }
    //
    // console.log(id);
    // console.log(ingredients);

    const item = ingredients.find((item: TIngredient) => item._id === id);

    console.log(item);


    if (item) {
        return (
            <div className={styles.ing__wrapper + " mt-30 mb-30"}>
                <h1 className="text text_type_main-large">Детали ингредиента</h1>
                <img src={item.image_large} alt={item.name} className="pb-4"/>
                <p className="text text_type_main-medium pb-8">{item.name}</p>
                <div className={styles.ing__line + " text text_type_main-default text_color_inactive"}>
                    <div className={styles.ing__item}>
                        <span>Калории,ккал</span>
                        <span>{item.calories}</span>
                    </div>
                    <div className={styles.ing__item}>
                        <span>Белки, г</span>
                        <span>{item.proteins}</span>
                    </div>
                    <div className={styles.ing__item}>
                        <span>Жиры, г</span>
                        <span>{item.fat}</span>
                    </div>
                    <div className={styles.ing__item}>
                        <span>Углеводы, г</span>
                        <span>{item.carbohydrates}</span>
                    </div>
                </div>
            </div>
        );
    } else {
        return <p>Загрузка...</p>
    }
}
