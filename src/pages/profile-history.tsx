import styles from "./pages.module.css";
import { Cards } from "./feed";
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import {WS_START_PROFILE_ACTION, WS_STOP_PROFILE_ACTION} from "../services/actions/websocket";
import { getCookie } from "../utils/cookies";
import { useEffect, FC } from "react";

export const ProfileHistory: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const token = getCookie("access");
        dispatch(WS_START_PROFILE_ACTION(token));
        return () => {
            dispatch(WS_STOP_PROFILE_ACTION);
        };
    }, []);
    const profileOrders = useAppSelector((state) => {
        return state.wsprofile.orders;
    });
    return (
        profileOrders && (
            <div>
                <div className={styles.history__wrapper}>
                    <div className={styles.feed__scroll + " custom-scroll"}>
                        {profileOrders.map((card: any) => {
                            return <Cards card={card} key={card._id} />;
                        })}
                    </div>
                </div>
            </div>
        )
    );
};
