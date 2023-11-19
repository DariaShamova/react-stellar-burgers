import React from 'react';
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
    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NotFound404 />} />
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
                    <Modal onClose={closeModal}>
                        <FeedDetails />
                    </Modal>
                }/>
                <Route path="/profile/orders/:id" element={
                    <Modal onClose={closeModal}>
                        <FeedProfileDetails />
                    </Modal>
                }/>
            </Routes>
            {background && <Routes>
                <Route path="/ingredients/:id" element={
                    <Modal onClose={closePopup}>
                        <IngredientPage />
                    </Modal>
                }/>

            </Routes>}
        </div>
    );
}

export default App;




