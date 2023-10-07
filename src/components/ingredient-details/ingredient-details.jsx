import styles from "../ingredient-details/ingredient-details.module.css";
import React from "react";
import { useSelector } from 'react-redux';

export function IngredientDetails() {
    // Вытаскиваем селектором нужные данные из хранилища
    const store = useSelector(
        state => state.details);

    const item = store.ingredientDetails;

    return (
        <div className={styles.wrapper + " mt-30 mb-30"}>
            <img src={item.image_large} alt={item.name} className="pb-4"/>
            <p className="text text_type_main-medium pb-8">{item.name}</p>
            <div className={styles.line + " text text_type_main-default text_color_inactive"}>
                <div className={styles.item}>
                    <span>Калории,ккал</span>
                    <span>{item.calories}</span>
                </div>
                <div className={styles.item}>
                    <span>Белки, г</span>
                    <span>{item.proteins}</span>
                </div>
                <div className={styles.item}>
                    <span>Жиры, г</span>
                    <span>{item.fat}</span>
                </div>
                <div className={styles.item}>
                    <span>Углеводы, г</span>
                    <span>{item.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}