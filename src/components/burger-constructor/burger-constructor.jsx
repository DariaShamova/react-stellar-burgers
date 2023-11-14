import styles from "./burger-constructor.module.css";
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { ADD_FILLING, CHANGE_BUN, DELETE_INGREDIENT, dndIngredient  } from "../../services/actions/dnd";
import { nanoid } from 'nanoid';
import { postOrder } from "../../services/actions/order";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import {Link} from "react-router-dom";

const BurgerElement = ({ingredient, index, id}) => {

    const dispatch = useDispatch();
    const ref = useRef(null);
    //const ingredient = element.ingredient;
    const handleDelete = (ingredient) => {
        dispatch( {
            type: DELETE_INGREDIENT,
            payload: ingredient
        });
    };

    const changeCardPosition = (drag, drop) => {
        dispatch(dndIngredient(drag, drop));
    };
    const [, drop] = useDrop({
        accept: 'element',

        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragItemIndex = item.index;
            const hoverItemIndex = index;
            if (dragItemIndex === hoverItemIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragItemIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragItemIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            changeCardPosition(dragItemIndex, hoverItemIndex);
            item.index = hoverItemIndex;
        },
    });

    const [, drag] = useDrag({
        type: 'element',
        item: () => {
            return { id, index };
        },
    });
    drag(drop(ref));

    return (
        <div ref={ref} className={styles.constructor__element} >
            <DragIcon type="primary" />
            <ConstructorElement
                key={ingredient.id}
                ingredient={ingredient}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => handleDelete(ingredient)}
            />
        </div>
    )
}

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const addFilling = item => {
        item = {...item, id: nanoid()};
        item.ingredient = {...item.ingredient, id: nanoid()};
        dispatch({
            type: ADD_FILLING,
            payload: item.ingredient
        });
        console.log(item);
    };

    const changeBun = item => {
        item = {...item, id: nanoid()};
        item.ingredient = {...item.ingredient, id: nanoid()};
        dispatch( {
            type: CHANGE_BUN,
            payload: item.ingredient
        })
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            item.ingredient.type === 'bun' ? changeBun(item) : addFilling(item)
        },
    })


    // Вытаскиваем селектором нужные данные из хранилища
    const { fillings } = useSelector(
        state => state.fillings);

    const { buns } = useSelector(
        state => state.buns);

    const fillingsContent = useMemo(
        () => {
            return fillings.map ((item, index) => {
                return (
                    <BurgerElement ingredient={item} key={item.id} index={index} id={item.id} />
                );


            });

        },
        [fillings]
    )

    const bunsContentTop = useMemo(
        () => {
            return buns.map (ingredient => {
                return (
                    <ConstructorElement
                        key={ingredient.id}
                        type="top"
                        isLocked={true}
                        text={`${ingredient.name} (верх)`}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                    />
                )
            })
        },
        [buns]
    )

    const bunsContentBottom = useMemo(
        () => {
            return buns.map (ingredient => {
                return (
                    <ConstructorElement
                        key={ingredient.id}
                        type="bottom"
                        isLocked={true}
                        text={`${ingredient.name} (низ)`}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                    />
                )
            })
        },
        [buns]
    )

    const totalPrice = useMemo(
        () => {
            const bunsPrice = buns.reduce(
                function(sum, currentItem) {
                    return sum + currentItem.price
                }, 0
            );
            const fillingsPrice = fillings.reduce(
                function(sum, currentItem) {
                    return sum + currentItem.price
                }, 0
            );
            return bunsPrice * 2 + fillingsPrice

        },
        [buns, fillings]
    )

    const totalId = useMemo(
        () => {
            const bunsId =  buns.map(item => item._id);
            const fillingsId = fillings.map(item => item._id);
            return [...bunsId, ...fillingsId]
        },
        [buns, fillings]
    );

    const getOrderNumber = () => {
        dispatch(postOrder(totalId))
    }

    const orderClick = () => {
        if(buns.length > 0) {
            getOrderNumber()
        } else {
            console.log("Ошибка: добавьте булку")
        }
    }

    const [, dropConst] = useDrop(() => ({
        accept: 'ingredient',
        drop: (ingredient) => dndIngredient(ingredient),
    }));

    const login = useSelector((state) => state.login.login);

    return (
        <section  className={styles.constructor} ref={dropTarget}>
            <div className={styles.constructor__section}>
                <div className={styles.constructor__content}>
                    {bunsContentTop}
                    <div ref={dropConst} className={`${styles.constructor__fillings} custom-scroll`}>
                        {fillingsContent}
                    </div>
                    {bunsContentBottom}
                </div>
            </div>
            <div className={styles.order}>
                <p className='text text_type_digits-medium'>{totalPrice}<CurrencyIcon type="primary"/></p>
                {/*<Link*/}
                {/*    to={!login ? "/login" : "/order"}*/}
                {/*>*/}

                {buns.length > 0 ? (
                    <Link
                        to={"/order"}
                    >
                        <Button htmlType="button" type="primary" size="medium" onClick={orderClick} disabled={false}>
                            Оформить заказ
                        </Button>
                    </Link>
                ) : (
                    <Button disabled={true} htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                )}

                {/*    <Link*/}
                {/*        to={"/order"}*/}
                {/*    >*/}
                {/*    <Button htmlType="button" type="primary" size="medium" onClick={orderClick}>*/}
                {/*        Оформить заказ*/}
                {/*    </Button>*/}
                {/*</Link>*/}

            </div>
        </section>
    )
}

BurgerElement.propTypes = {
    ingredient: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};
