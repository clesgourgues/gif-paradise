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
            this.gifsView.listen();
        });
    };

    getfavouriteGifs() {
        const results = this.gifModel.getLocalStorage('gifs');
        this.gifsView.render(results);
    };

    saveGif(gif) {
        if (storageAvailable('localStorage')) {
            this.gifModel.insert(gif);
          }
          else {
            console.log('no storage available !')
          }
    }
};
