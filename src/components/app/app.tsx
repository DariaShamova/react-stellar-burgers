import React, {useEffect} from 'react';
import styles from "./app.module.css";
import {AppHeader} from "../app-header/app-header";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { NotFound404 } from "../../pages/404";
import { Home } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ProfilePage} from "../../pages/profile";
import {ProtectedRoute} from "../protected-route/protected-route";
import {IngredientPage} from "../../pages/ingredient";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import {FeedPage} from "../../pages/feed";
import {FeedDetails} from "../../pages/feed-details";
import {ProfileHistory} from "../../pages/profile-history";
import {ProfileForm} from "../../pages/profile-form";
import {FeedProfileDetails} from "../../pages/feed-profile-details";
import {getIngredients} from "../../services/actions/ingredients";
import {LOGIN_ACTION} from "../../services/actions/login";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const background = location.state && location.state.background;
    const closePopup = () => {
        navigate(background.pathname || '/', {replace: true});
    }
    const closeModal = () => {
        navigate(-1);
    }

    // Вытаскиваем селектором нужные данные из хранилища
    const { ingredients, ingredientsRequest, ingredientsFailed } = useAppSelector(
        (state) => state.ingredients);

    // Получаем метод dispatch
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            // Отправляем экшен-функцию
            if (!ingredients.length) dispatch(getIngredients());
            const loginData = JSON.parse(sessionStorage.getItem("login-data") || "{}");
            if (loginData.success) dispatch(LOGIN_ACTION(loginData.success));
        },
        [dispatch]
    );

    // Используем условный рендеринг для разных состояний хранилища
    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    }

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound404 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile/*" element={<ProtectedRoute element={<ProfilePage />}/>} >
                    <Route path="" element={<ProfileForm />}/>
                    <Route path="orders" element={<ProfileHistory/>}/>
                </Route>
                <Route path="/ingredients/:id" element={<IngredientPage />}/>
                <Route path="/order" element={
                           <Modal onClose={closeModal}>
                               <OrderDetails />
                           </Modal>
                }/>
                <Route path="/feed" element={<FeedPage />}/>
                <Route path="/feed/:id" element={
                        <FeedDetails />
                }/>
                <Route path="/profile/orders/:id" element={
                        <FeedProfileDetails />
                }/>
            </Routes>
            {background && <Routes>
                <Route path="/ingredients/:id" element={
                    <Modal onClose={closePopup}>
                        <IngredientPage />
                    </Modal>
                }/>
                <Route path="/feed/:id" element={
                    <Modal onClose={closeModal}>
                        <FeedDetails />
                    </Modal>
                }/>
                <Route path="/profile/orders/:id" element={
                    <Modal onClose={closeModal}>
                        <FeedProfileDetails />
                    </Modal>
                }/>

            </Routes>}
        </div>
    );
}

export default App;




