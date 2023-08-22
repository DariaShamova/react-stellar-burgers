import styles from "./burger-constructor.module.css";
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

export const BurgerConstructor = ({onOpen, handleModalType}) => {
    const handleClick = () => {
        onOpen();
        handleModalType();
    }
    return (
        <section style={{ width: '50%', paddingTop: '100px',  }}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '40px' }} className='custom-scroll'>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
            </div>
            <div className={styles.order}>
                <p className="text text_type_digits-medium">234 <CurrencyIcon type="primary" style={{ width: '34px', height: '34px' }}/></p>
                <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
                    Оформить заказ
                </Button>

            </div>
        </section>
    )
}