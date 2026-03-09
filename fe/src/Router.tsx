import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { MainPage } from './pages/mainPage/MainPage';
import { MoviePage } from './pages/moviePage/MoviePage';
import { MovieDetails } from './pages/movieDetails/MovieDetails';
import { FavsPage } from './pages/favsPage/FavsPage.tsx';
import { NotFoundPage } from './pages/404/404Page.tsx';
export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/favourites" element={<FavsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}