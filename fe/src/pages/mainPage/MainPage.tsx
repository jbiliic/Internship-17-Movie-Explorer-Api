import { routes } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
export const MainPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1>Movie Explorer</h1>
            <h2>Discover your favorite movies</h2>
            <div className={styles.buttonGroup}>
                <button onClick={() => navigate(routes.MOVIES)} className={styles.btn}>Browse Movies</button>
                <button onClick={() => navigate(routes.FAVOURITES)} className={styles.btn}>View Favourites</button>
            </div>
        </div>
    )
}