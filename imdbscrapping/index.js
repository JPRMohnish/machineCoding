// Getting all the movie entitites from IMDB website using webscrapping.
const Movies = require('./data_collector');
const Queries = require('./queries');

const collectAndQuery = async () => {
    const movie = new Movies();
    await movie.find_movies(process.env.totalMovies || 50);
    movie.movies.sort((movie1, movie2) => movie2.rating - movie1.rating);
    console.log(movie.movies);

    const q = new Queries(movie.movies);
    for (let curr = 0; curr < 2; curr++) {
        const top_movies = await q.ask();
        console.log(top_movies);
    }

    return movie.movies;
}

collectAndQuery();


// design is like this.
// data collection country wise or wood wise for movies based on certain parameters.
