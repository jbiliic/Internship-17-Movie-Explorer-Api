type Routes = {
    [key: string]: string
};

export const routes: Routes = {
    MAIN: '/',
    MOVIES: '/movies',
    LOG_IN: '/login',
    REGISTER: '/register',
    MOVIE_DETAILS: '/movies/:id',
    FAVOURITES: '/favourites',
    NO_PAGE_FOUND: '*'
}