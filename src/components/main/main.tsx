import React, { useEffect, useState } from 'react';
import styles from "./main.module.css";
import {getIngredients} from "../../services/actions/ingredients"; // Наш thunk для запроса данных с сервера
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {LOGIN_ACTION} from "../../services/actions/login";

export function Main() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </div>
    );
}