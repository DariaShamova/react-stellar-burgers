import {IngredientDetails} from "../components/ingredient-details/ingredient-details";
import styles from "./pages.module.css";

export function IngredientPage() {
    return (
        <div className={styles.wrapper}>
            <IngredientDetails />
        </div>
    );
}