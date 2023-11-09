import React, {useMemo, useRef, useEffect} from 'react';
import styles from "./burger-ingredients.module.css";
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {addDetails} from "../../services/actions/details-ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import {scrollTo, setTab} from "../../services/actions/tabs";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerIngredient = ({ingredient, onOpen, handleModalType}) => {

    // Вытаскиваем селектором нужные данные из хранилища
    const { fillings } = useSelector(
        state => state.fillings);
    const { buns } = useSelector(
        state => state.buns);

    // Получаем метод dispatch
    const dispatch = useDispatch();
    const handleClick = () => {
        onOpen();
        handleModalType();
        dispatch(addDetails(ingredient));
    }
    const [{ opacity }, ref] = useDrag({
        type: 'ingredient',
        item: {
            ingredient,
            id: ingredient._id,
            type: ingredient.type
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const counter = useMemo ( () =>
        buns.filter((item) => item._id === ingredient._id).length ||
        fillings.filter((item) => item._id === ingredient._id).length,
        [buns, fillings]
    );

    return (
        <li className={styles.ingredients__item} onClick={handleClick} style={{ opacity }} ref={ref}>
            <img className={styles.ingredient__image} src={ingredient.image} alt={ingredient.name}/>
            <p className={styles.ingredient__price}><span className="text text_type_digits-default">{ingredient.price}</span><CurrencyIcon type="primary" /></p>
            <p className={`${styles.ingredients__name} text text_type_main-default`}>{ingredient.name}</p>
            {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />}
        </li>
    );
}


export const BurgerIngredients = (props) => {

    const dispatch = useDispatch();

    const ingredients = useSelector(
        state => state.ingredients.ingredients);

    const handleModalType = props.handleModalType;

    const onOpen = props.onOpen;

    const buns = ingredients.filter((item) => {
        return item.type === "bun"
    });

    const sauces = ingredients.filter((item) => {
        return item.type === "sauce"
    });

    const mains = ingredients.filter((item) => {
        return item.type === "main"
    });

    const tabsScroll = useSelector((state) => state.tabs.next);

    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        if (tabsScroll === "buns") {
            bunRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (tabsScroll === "sauces") {
            sauceRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (tabsScroll === "mains") {
            mainRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [tabsScroll]);

    useEffect(() => {
        const currents = [bunRef.current, sauceRef.current, mainRef.current];
        const handleTabs = type => {
            dispatch(setTab(type));
        }
        const watcher = new IntersectionObserver(
            (currents) => {
                currents.forEach((h) => {
                    if (h.target === bunRef.current) {
                        handleTabs("buns");
                    }
                    if (h.target === sauceRef.current) {
                        handleTabs("sauces");
                    }
                    if (h.target === mainRef.current) {
                        handleTabs("mains");;
                    }
                });
            },
            {
                root: scrollRef.current,
                rootMargin: "0px 0px -70% 0px",
            }
        );
        currents.forEach((h) => {
            return watcher.observe(h);
        });
    }, [dispatch]);

    return (
        <section className={styles.ingredients__section}>

            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <SwitchTabs
                bunRef={bunRef}
                sauceRef={sauceRef}
                mainRef={mainRef}
            />
            <div className={`${styles.scrollwrapper} custom-scroll`} ref={scrollRef}>
                <div>
                    <h2 className="text text_type_main-medium pt-10 pb-6" ref={bunRef}>Булки</h2>
                    <ul className={styles.ingredients}>
                        {buns.map(ingredient => {
                            return (
                                <BurgerIngredient
                                    ingredient={ingredient}
                                    key={ingredient._id}
                                    onOpen={onOpen}
                                    handleModalType={handleModalType}
                                />
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2 className="text text_type_main-medium pt-10 pb-6" ref={sauceRef}>Соусы</h2>
                    <ul className={styles.ingredients}>
                        {sauces.map(ingredient => {
                            return (
                                <BurgerIngredient
                                    ingredient={ingredient}
                                    key={ingredient._id}
                                    onOpen={onOpen}
                                    handleModalType={handleModalType}
                                />
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2 className="text text_type_main-medium pt-10 pb-6" ref={mainRef}>Начинки</h2>
                    <ul className={styles.ingredients}>
                        {mains.map(ingredient => {
                            return (
                                <BurgerIngredient
                                    ingredient={ingredient}
                                    key={ingredient._id}
                                    id={ingredient._id}
                                    onOpen={onOpen}
                                    handleModalType={handleModalType}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>

        </section>
    );
}

const SwitchTabs = () => {
    const dispatch = useDispatch();
    const current = useSelector((state) => state.tabs.current);

    const setCurrent = (value) => {
        dispatch(setTab(value));
        dispatch(scrollTo(value));
    };
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
};

BurgerIngredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    handleModalType: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
}

BurgerIngredients.propTypes = {
    handleModalType: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};
