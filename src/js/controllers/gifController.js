import storageAvailable from '../helpers/storageAvailable';
import GifsView from '../views/gifsView';
import GifModel from '../models/gifModel';


export default class GifController {

    constructor(GifsView, GifModel) {
        this.gifsView = GifsView;
        this.gifModel = GifModel;
    };

    init() {
        this.gifsView.init();
    };

    getGifs(search) {
        this.gifModel.search(search).then(results => {
            this.gifsView.render(results);
            this.gifsView.message(`<p>We found ${results.length} Gifs for you ! Click on their  <i class="fas fa-heart"></i>  to save your favorites ones.</p>`);
            this.gifsView.listen();
        });
    };

    getfavouriteGifs() {
        const results = this.gifModel.getLocalStorage('gifs');
        this.gifsView.render(results);
        this.gifsView.message(`<p>You have ${results.length} favourites gifs! Click on their  <i class="fas fa-heart favourite"></i>  if you changed your mind.</p>`)
        this.gifsView.listen();
    };

    saveGif(gif) {
        if (storageAvailable('localStorage')) {
            this.gifModel.insert(gif);
        }
        else {
            console.log('no storage available !')
        }
    }

    deleteGif(gif) {
        this.gifModel.remove(gif);
        this.getfavouriteGifs();
    }
};
