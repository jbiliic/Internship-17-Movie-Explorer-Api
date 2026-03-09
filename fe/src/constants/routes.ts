type Routes={
    [key:string]:string
};

export const routes: Routes = {
    MAIN: '/',
    MOVIES: '/movies',
    MOVIE_DETAILS: '/movies/:id',
    FAVOURITES: '/favourites',
    NO_PAGE_FOUND: '*'
}