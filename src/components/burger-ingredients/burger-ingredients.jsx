import React from 'react';
import styles from "./burger-ingredients.module.css";
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const SwitchTabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
};

const BurgerIngredient = ({ingredient, onOpen, handleModalType}) => {
    const handleClick = () => {
        onOpen();
        handleModalType();
    }
    return (
        <li className={styles.ingredients__item} onClick={handleClick}>
            <img className={styles.ingredient__image} src={ingredient.image} alt={ingredient.name}/>
            <p className={styles.ingredient__price}><span className="text text_type_digits-default">{ingredient.price}</span><CurrencyIcon type="primary" /></p>
            <p className={`${styles.ingredients__name} text text_type_main-default`}>{ingredient.name}</p>
            <Counter count={1} size="default" extraClass="m-1" />
        </li>
    );
}


export const BurgerIngredients = (props) => {

    const handleModalType = props.handleModalType;

    const onOpen = props.onOpen;

    const buns = props.ingredients.filter((item) => {
        return item.type === "bun"
    });

    const sauces = props.ingredients.filter((item) => {
        return item.type === "sauce"
    });

    const mains = props.ingredients.filter((item) => {
        return item.type === "main"
    });

    return (
        <section style={{ width: '50%' }}>

            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <SwitchTabs/>
            <div className={`${styles.scrollwrapper} custom-scroll`}>
                <div>
                    <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
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
                    <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
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
                    <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
                    <ul className={styles.ingredients}>
                        {mains.map(ingredient => {
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
            </div>

        </section>
    );
}

