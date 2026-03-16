import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const moviesData = [
    { id: 1, name: "Inception", description: "Dream-sharing theft.", genre: "Sci-Fi", length: "2h 28m", rating: 8.8, year: 2010, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" },
    { id: 2, name: "The Dark Knight", description: "Batman vs Joker.", genre: "Action", length: "2h 32m", rating: 9.0, year: 2008, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg" },
    { id: 3, name: "Pulp Fiction", description: "Intertwining crime stories.", genre: "Crime", length: "2h 34m", rating: 8.9, year: 1994, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg" },
    { id: 4, name: "Interstellar", description: "Space travel to save humanity.", genre: "Sci-Fi", length: "2h 49m", rating: 8.7, year: 2014, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
    { id: 5, name: "The Matrix", description: "Reality is a simulation.", genre: "Sci-Fi", length: "2h 16m", rating: 8.7, year: 1999, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZnD3q9KN7hgzETLCrYrwu2NoysjuzRHrSW3XvrICkwlbkcGiqb1CFfrxxupb1ZxMzfLfAXb4i3NeNk-j44O_oONncr3XCZg2F0-lOCjp4cA&s=10" },
    { id: 6, name: "Gladiator", description: "General becomes a gladiator.", genre: "Action", length: "2h 35m", rating: 8.5, year: 2000, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png" },
    { id: 7, name: "The Godfather", description: "Mafia family saga.", genre: "Crime", length: "2h 55m", rating: 9.2, year: 1972, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg" },
    { id: 8, name: "Parasite", description: "Class struggle in Korea.", genre: "Drama", length: "2h 12m", rating: 8.5, year: 2019, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXqoPm9sLHU5NDWHTX6VC5MvgIqmEKHP0R17ppmdX5r3qofeQdHg4Biy-IW4lYROTc_h-fjTe5ndzv8GDcrxaVa1z21GtNUKlXF3ONn8C&s=10" },
    { id: 9, name: "The Lion King", description: "Lion prince finds his way.", genre: "Animation", length: "1h 28m", rating: 8.5, year: 1994, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg" },
    { id: 10, name: "Se7en", description: "Serial killer themed on sins.", genre: "Crime", length: "2h 7m", rating: 8.6, year: 1995, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/6/68/Seven_%28movie%29_poster.jpg" },
    { id: 11, name: "Fight Club", description: "Underground fight society.", genre: "Drama", length: "2h 19m", rating: 8.8, year: 1999, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg" },
    { id: 12, name: "Spirited Away", description: "Girl enters a spirit world.", genre: "Animation", length: "2h 5m", rating: 8.6, year: 2001, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png" },
    { id: 13, name: "Saving Private Ryan", description: "WWII rescue mission.", genre: "Drama", length: "2h 49m", rating: 8.6, year: 1998, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg" },
    { id: 14, name: "The Prestige", description: "Rival magicians in London.", genre: "Drama", length: "2h 10m", rating: 8.5, year: 2006, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg" },
    { id: 15, name: "The Departed", description: "Mole in the police force.", genre: "Crime", length: "2h 31m", rating: 8.5, year: 2006, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Departed_poster.jpg" },
    { id: 16, name: "Whiplash", description: "Ambitious jazz drummer.", genre: "Drama", length: "1h 46m", rating: 8.5, year: 2014, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg" },
    { id: 17, name: "The Green Mile", description: "Death row guards and a miracle.", genre: "Drama", length: "3h 9m", rating: 8.6, year: 1999, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxC87IDQzocA7evMZCchlxBnaD4AbUFU8pl0o1h5et7B0oZZJ8W30zY3uXCo-V0SmRr39N-tCK-CXfXDTfJ6e0IGShjD0vW3GKLmzQE6FwYg&s=10" },
    { id: 18, name: "Django Unchained", description: "Bounty hunter frees a slave.", genre: "Drama", length: "2h 45m", rating: 8.4, year: 2012, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZ_5_NG2Zsjm0X5_5YJDCnh6vmJB1jsE0Qv296mMTN-znJf4rjUEizb58LXYcQpR204dam36zQOOzPBbvzhKujD1IYNPSsbWxbRPJSw&s=10" },
    { id: 19, name: "Alien", description: "Deep space horror.", genre: "Horror", length: "1h 57m", rating: 8.5, year: 1979, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg" },
    { id: 20, name: "Toy Story", description: "Toys come to life.", genre: "Animation", length: "1h 21m", rating: 8.3, year: 1995, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg" },
    { id: 21, name: "The Shining", description: "Haunted hotel descent into madness.", genre: "Horror", length: "2h 26m", rating: 8.4, year: 1980, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/a/a2/The_Shining_%281980%29_U.K._theatrical_poster.jpg" },
    { id: 22, name: "Joker", description: "Origin story of the villain.", genre: "Crime", length: "2h 2m", rating: 8.4, year: 2019, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg" },
    { id: 23, name: "Back to the Future", description: "Time traveling teenager.", genre: "Adventure", length: "1h 56m", rating: 8.5, year: 1985, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg" },
    { id: 24, name: "The Wolf of Wall Street", description: "Rise and fall of a stockbroker.", genre: "Biography", length: "3h", rating: 8.2, year: 2013, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29.png" },
    { id: 25, name: "Goodfellas", description: "Life in the mob.", genre: "Biography", length: "2h 25m", rating: 8.7, year: 1990, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg" },
    { id: 26, name: "Braveheart", description: "Scottish independence warrior.", genre: "Biography", length: "2h 58m", rating: 8.3, year: 1995, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB7uw8seSMmkLdmvnY-3HLkUz17srBA4Ct3M2PL7111EEjyRFJ_0HSCySh-HhA7l4kpGxp67IbtGccGvZ6dC119Ps7QaCJrjkpUyjEI5XT&s=10" },
    { id: 27, name: "The Social Network", description: "The creation of Facebook.", genre: "Biography", length: "2h", rating: 7.8, year: 2010, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmBWibkAMkAtsOqwtNXybQ_YhjVwtLzRpdROroT0Nk0X1DseOvGbEiQeldlXTcqyfBgfxzacRTesaYTBt6cUM3argbakQHcU6eXAQsKoEq&s=10" },
    { id: 28, name: "A Clockwork Orange", description: "Dystopian crime and punishment.", genre: "Sci-Fi", length: "2h 16m", rating: 8.3, year: 1971, isFavourite: false, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yDYNrXwGEb9ca1yrgodVMFHJ9MTMtDX4JHGlg_UD1AlR5bXXlSksY-zS7BJ_v_fFG9c3LMkcfKDNFtVHTRC5ynTy-dj1PXmXr-KvmC-S7w&s=10" },
    { id: 29, name: "Oldboy", description: "Man seeks revenge after kidnap.", genre: "Action", length: "2h", rating: 8.4, year: 2003, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/6/67/Oldboy_2003_poster.jpg" },
    { id: 30, name: "Logan", description: "Wolverine's final journey.", genre: "Action", length: "2h 17m", rating: 8.1, year: 2017, isFavourite: false, imgURL: "https://upload.wikimedia.org/wikipedia/en/3/37/Logan_2017_poster.jpg" }
];

async function main() {
    console.log('--- Start Seeding ---');

    // 1. Kreiranje korisnika (Admin i Obični)
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@dump.hr' },
        update: {},
        create: {
            email: 'admin@dump.hr',
            name: 'Admin Korisnik',
            password: adminPassword,
            isAdmin: true,
        },
    });

    const regularUser = await prisma.user.upsert({
        where: { email: 'user@dump.hr' },
        update: {},
        create: {
            email: 'user@dump.hr',
            name: 'Obični Korisnik',
            password: userPassword,
            isAdmin: false,
        },
    });

    console.log('Users seeded.');

    // 2. Kreiranje filmova
    for (const movie of moviesData) {
        await prisma.movie.upsert({
            where: { id: movie.id },
            update: {},
            create: {
                id: movie.id,
                name: movie.name,
                description: movie.description,
                length: movie.length,
                rating: movie.rating,
                year: movie.year,
                imgURL: movie.imgURL,
                genres: {
                    connectOrCreate: [
                        {
                            where: { name: movie.genre },
                            create: { name: movie.genre },
                        },
                    ],
                },
                // Ako je isFavourite true, dodajemo ga adminu (primjerice)
                ...(movie.isFavourite && {
                    favorites: {
                        create: {
                            userId: adminUser.id
                        }
                    }
                })
            },
        });
    }

    console.log(`Seeding finished. Successfully processed ${moviesData.length} movies.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });