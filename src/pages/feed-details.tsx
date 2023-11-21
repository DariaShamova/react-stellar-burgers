import styles from "./pages.module.css";
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import {WS_START_ACTION, WS_STOP_ACTION} from "../services/actions/websocket";

export const FeedDetails: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(WS_START_ACTION());
        return () => {
            dispatch(WS_STOP_ACTION());
        };
    }, []);

    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );

    const data = useAppSelector((state) => state.websocket.orders);

    const { id } = useParams<{ id: string }>();

    const orderData = useMemo(() => {
        return data.find((el) => el._id === id);
    }, [data, id]);

    if (!orderData) {
        return null;
    }

    const detailArrs = () => {
        return ingredients.filter((el) => orderData?.ingredients.includes(el._id));
    };

    const detailArr = detailArrs();

    const ordPrice = orderData?.ingredients.map((el) => {
        return ingredients.find((elem) => elem._id === el);
    });

    const reducePrice = ordPrice?.reduce((acc, item: any) => acc + item.price, 0);

    if (!orderData) {
        return <p className={styles.text__center}>Загрузка данных...</p>
    }

    return (
        <div className={styles.details__wrapper}>
            <div className={styles.details__title}>
        <span className={styles.details__subtitle + " text_type_digits-default"}>
          {"# " + orderData?.number}
        </span>
                <span className="text text_type_main-medium mb-4">
          {orderData?.name}
        </span>
                <span className={styles.details__done + " text_type_main-default mb-4"}>
          {orderData?.status === "done" ? "Выполнен" : "Готовится"}
        </span>
            </div>
            <div className={styles.details__container}>
                <span className="text text_type_main-medium">Cостав:</span>
                <div className={styles.details__scroll + " custom-scroll"}>
                    {orderData &&
                        detailArr.map((el) => {
                            return (
                                <div key={el._id} className={styles.details__scrollwrapper}>
                                    <img className={styles.card__image} src={el.image_mobile} alt={""}/>
                                    <div
                                        className={
                                            styles.details__name + " text text_type_main-default ml-6"
                                        }
                                    >
                                        {el.name}
                                    </div>
                                    <div
                                        className={
                                            styles.details__grow + " text text_type_digits-default mr-2"
                                        }
                                    >
                                        {ordPrice?.filter((it: any) => it._id === el._id).length}x
                                        {el.price}
                                    </div>
                                    <CurrencyIcon type="primary" />
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className={styles.details__price + " mt-10"}>
                <FormattedDate date={new Date(orderData?.createdAt)} />
                <div className={styles.card__center}>
                    <div className="text text_type_digits-default mr-2">
                        {reducePrice}
                    </div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        );

};
