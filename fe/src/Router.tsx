import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/mainPage/MainPage';
import { MoviePage } from './pages/moviePage/MoviePage';
import { MovieDetails } from './pages/movieDetails/MovieDetails';
import { FavsPage } from './pages/favsPage/FavsPage.tsx';
import { NotFoundPage } from './pages/404/404Page.tsx';
import { routes } from "./constants/routes";
import { LoginPage } from './pages/loginPage/LoginPage.tsx';
import { RegisterPage } from './pages/registerPage/RegisterPage.tsx';
import { ErrorPage } from './pages/errorPage/ErrorPage.tsx';
import { AdminPage } from './pages/adminPage/AdminPage.tsx';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.MAIN} element={<MainPage />} />
                <Route path={routes.MOVIES} element={<MoviePage />} />
                <Route path={routes.MOVIE_DETAILS} element={<MovieDetails />} />
                <Route path={routes.FAVOURITES} element={<FavsPage />} />
                <Route path={routes.LOG_IN} element={<LoginPage />} />
                <Route path={routes.REGISTER} element={<RegisterPage />} />
                <Route path={routes.ERROR} element={<ErrorPage />} />
                <Route path={routes.ADMIN} element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}