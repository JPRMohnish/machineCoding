const puppeteer = require('puppeteer');
class Movies {

    constructor() {
        this.movies = [];
    }

    async find_movies(total) {
        return new Promise(async (resolve, reject) => {
            const browser = await puppeteer.launch({
                headless: false,
            })

            const page = await browser.newPage();

            for (let start = 1; start < parseInt(total); start += 50) {
                await page.goto(`https://www.imdb.com/search/title/?title_type=feature,tv_movie,tv_series,tv_episode,tv_special,tv_miniseries,documentary,video_game,short,video,tv_short&user_rating=5.0,10.0&start=${start.toString()}&ref_=adv_nxt`, { waitUntil: 'load', timeout: 0 });
                let movies = await page.$$eval(('.lister-item'), (movies) => {
                    return movies.map(movie => {
                        let movie_detail = {
                            title: '',
                            actors: [],
                            rating: 5.0
                        };
                        movie_detail.title = movie.querySelector('.lister-item-header').querySelector('a').innerText;
                        movie_detail.rating = parseFloat(movie.querySelector('.ratings-imdb-rating').innerText.toString());
                        let stars = movie.querySelectorAll('p')
                        stars = stars[2].querySelectorAll('a');
                        stars.forEach((star) => {
                            movie_detail.actors.push(star.innerText.toString());
                        })
                        return movie_detail;
                    })
                });
                Array.prototype.push.apply(this.movies, movies);
            }
            resolve(this.movies);
        });
    }
}

module.exports = Movies;