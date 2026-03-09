import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={() => navigate(routes.MAIN)}>To main page</button>
        </div>
    );
}
