import {Navigate, Route} from "react-router-dom";
import {useSelector} from "react-redux";

export function ProtectedRoute({ element }) {
    const login = useSelector(state => state.login.login);
    return login ? element : <Navigate to="/login" replace/>;
}