import styles from "./pages.module.css";
import { FC, useMemo } from "react";

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";

export const FeedProfileDetails: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );

    const data = useAppSelector((state: any) => state.wsprofile.orders);

    const { id } = useParams<{ id: string }>();

    const orderData = useMemo(() => {
        return data.find((el: any) => el._id === id);
    }, [data, id]);

    const detailArrs = () => {
        return ingredients.filter((el) => orderData?.ingredients.includes(el._id));
    };

    const detailArr = detailArrs();

    const ordPrice = orderData?.ingredients.map((el: any) => {
        return ingredients.find((elem) => elem._id === el);
    });

    const reducePrice = ordPrice?.reduce(
        (acc: any, item: any) => acc + item.price,
        0
    );

    return (
        ingredients && (
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
                                    <img className={styles.imgcard} src={el.image_mobile} />
                                    <div
                                        className={
                                            styles.detName + " text text_type_main-default ml-6"
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
                <FormattedDate date={new Date(orderData.createdAt)} />
                <div className={styles.card__center}>
                    <div className="text text_type_digits-default mr-2">
                        {reducePrice}
                    </div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    ));
};
