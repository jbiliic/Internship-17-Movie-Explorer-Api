import { useLocation, useNavigate } from "react-router-dom";
import styles from './ErrorPage.module.css'
import { routes } from "../../constants/routes";

export const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const errorMessage = location.state?.errorMessage || "An unexpected error occurred.";

    return (
        <div className={styles.container}>
            <div className={styles.backBtn}>
                <button onClick={() => navigate(routes.MAIN)}>Home Page</button>
            </div>
            <div className={styles.errorContent}>
                <p>{errorMessage}</p>
            </div>
        </div>
    );
}