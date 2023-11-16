import {Navigate, Route, RouteProps, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute: ({element, anonymous}: { element: any; anonymous?: any }) => (JSX.Element) = ({ element, anonymous = false }) => {
    const isLoggedIn = useSelector((store: any) => store.login.login);

    const location = useLocation();
    const from = location.state?.from || '/';
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLoggedIn) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isLoggedIn) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return element;
}