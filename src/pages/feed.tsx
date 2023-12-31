import { FC } from "react";
import styles from "./pages.module.css";
import { TOrderComponents } from "../services/types/types";
import { Link, useLocation } from "react-router-dom";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import {
    WS_START_ACTION,
    WS_START_PROFILE_ACTION,
    WS_STOP_ACTION,
} from "../services/actions/websocket";

import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import { nanoid } from "nanoid";

export const FeedPage: FC = () => {
    const dispatch = useAppDispatch();
    const order = useAppSelector((state) => state.websocket.orders);
    const total = useAppSelector((state) => state.websocket.total);
    const totalToday = useAppSelector((state) => state.websocket.totalToday);
    useEffect(() => {
        dispatch(WS_START_ACTION());
        return () => {
            dispatch(WS_STOP_ACTION());
        };
    }, [dispatch]);

    return (
        order && (
            <div className={styles.feed + " mt-9"}>
                <div>
                    <span className="text text_type_main-large">Лента заказов</span>
                    <div className={styles.feed__scroll + " custom-scroll"}>
                        {order.map((card) => {
                            return <Cards card={card} key={card._id} />;
                        })}
                    </div>
                </div>
                <div className={styles.done}>
                    <div className={styles.done__grid}>
                        <span className="text text_type_main-medium">Готовы:</span>
                        <span className="text text_type_main-medium">В работе:</span>
                        <div className={styles.done__scroll + " custom-scroll"}>
                            {order.map((it, index) => {
                                if (it.status === "done" && index < 20)
                                    return (
                                        <div
                                            key={it._id}
                                            className={styles.done__span + " text_type_digits-default"}
                                        >
                                            <div>{it.number}</div>
                                        </div>
                                    );
                            })}
                        </div>
                        <div className={styles.grid__orders}>
                            {order.map((el) => {
                                if (el.status === "pending")
                                    return (
                                        <span className={styles.done__span} key={el._id}>
                      {el.number}
                    </span>
                                    );
                            })}
                        </div>
                    </div>
                    <div className={styles.feed__column}>
            <span className="text text_type_main-default">
              Выполнено за все время:
            </span>
                        <span className="text text_type_digits-large">{total}</span>
                    </div>
                    <div className={styles.feed__column}>
            <span className="text text_type_main-default">
              Выполнено за сегодня:
            </span>
                        <span className="text text_type_digits-large">{totalToday}</span>
                    </div>
                </div>
            </div>
        )
    );
};

type TCards = {
    card: TOrderComponents;
};

export const Cards: FC<TCards> = ({ card }) => {
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );
    const location = useLocation();
    const card__item = card.ingredients;
    const reduceCard = () => {
        return card__item
            .map((el) => {
                return ingredients.filter((item) => {
                    return item._id === el;
                });
            })
            .reduce((acc, item) => {
                return acc.concat(item);
            });
    };

    const ingResult = reduceCard();

    const cardPrice = () => {
        return ingResult.reduce((acc, item) => acc + item.price, 0);
    };


    return (
        <div>
            <Link to={location.pathname === "/profile/orders"
                    ? `/profile/orders/${card._id}`
                    : `/feed/${card._id}`} state={{ background: location }} className={styles.card}>

                {/*<Link to={`/feed/${card._id}`} state={{ background: location }} className={styles.card}>*/}

                <div className={styles.card__title}>
                    <span className="text text_type_main-default">
                    {"# " + card.number}
                    </span>
                    <span className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(card.createdAt)} />
                    </span>
                </div>
                <span className="text text_type_main-medium">{card.name}</span>
                <div className={styles.card__center}>
                    <div className={styles.card__item}>
                        {ingResult.slice(0, 5).map((el, index) => (
                            <div key={index} className={styles.card__wrapper}>
                                <img className={styles.card__image} src={el.image_mobile} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.card__center + " text text_type_main-medium"}>
                        <div className="mr-2">{cardPrice()}</div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </div>
    );
};
