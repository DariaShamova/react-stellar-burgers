import React from 'react';
import styles from "./app.module.css";
import { AppHeader } from '../app-header/app-header.jsx';
import { Main } from "../main/main";
import {Routes, Route, useLocation} from 'react-router-dom';
import { NotFound404 } from "../../pages/404";
import { Home } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ProfilePage} from "../../pages/profile";
import {ProtectedRoute} from "../protected-route/protected-route";
import {IngredientPage} from "../../pages/ingredient";
import Modal from "../modal/modal";

function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NotFound404 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />}/>} />
                <Route path="/ingredients/:id" element={<IngredientPage />}/>
            </Routes>
            {background && (
                <Routes location={background || location}>
                    <Route path="/ingredients/:id" element={
                        <Modal>
                            <IngredientPage />
                        </Modal>
                    }/>
                </Routes>
            )

            }
        </div>
    );
}

export default App;




