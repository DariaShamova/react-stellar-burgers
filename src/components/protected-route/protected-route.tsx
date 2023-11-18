import {Navigate, Route, RouteProps, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {FC} from "react";
import {useAppSelector} from "../../services/hooks/hooks";
type TRProtectedRoute = RouteProps;

// export const ProtectedRoute: FC<TRProtectedRoute> = ({ children }) => {
//     const login = useSelector((state: any) => {
//         return state.login.login;
//     });
//     const location = useLocation();
//     return (
//         <Route>
//             {login
//                 ? children
//                 : (
//                 <Navigate to={{ pathname: "/login", state: { from: location } }} />
//             ) || <Navigate to={{ pathname: "/", state: { from: location } }} />}
//         </Route>
//     );
// };

// export const ProtectedRoute: FC = ({ children, anonymous:string }) => {
//     const isLoggedIn = useSelector((store: any) => store.login.login);
//
//     const location = useLocation();
//     const from = location.state?.from || '/';
//     // Если разрешен неавторизованный доступ, а пользователь авторизован...
//     if (anonymous && isLoggedIn) {
//         // ...то отправляем его на предыдущую страницу
//         return <Navigate to={ from } />;
//     }
//
//     // Если требуется авторизация, а пользователь не авторизован...
//     if (!anonymous && !isLoggedIn) {
//         // ...то отправляем его на страницу логин
//         return <Navigate to="/login" state={{ from: location}}/>;
//     }
//
//     // Если все ок, то рендерим внутреннее содержимое
//     return element;
// }

export const ProtectedRoute: ({element, anonymous}: { element: any; anonymous?: any }) => (JSX.Element) = ({ element, anonymous = false }) => {
    const isLoggedIn = useAppSelector((state) => state.login.login);

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