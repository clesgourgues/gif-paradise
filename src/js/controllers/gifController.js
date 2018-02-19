import gif from '../helpers/gifApi';
import storageAvailable from '../helpers/storageAvailable';
import GifsView from '../views/gifsView';
import GifModel from '../models/gifModel';


export default class GifController {

    constructor(GifsView) {
        this.gifsView = GifsView;
    };

    init() {
        this.gifsView.init();
    };

    getGifs(search) {
        gif.search(search).then(results => {
            console.log(results)
            let output = `<p class="small-text">We found ${results.length} gifs for you !</p><ul id="grid" class="card-container">`;
            results.forEach(gif => {
                output += `
            <li class="card">
                <img src="${gif.url}" alt="${gif.title}">
                <div class="card-body">
                    <p>${gif.title}</p>
                    <i class="far fa-heart"></i>
                </div>
            </li>
            `;
            });
            output += '</ul>';
            this.gifsView.render(output);
        });
    };

    saveGif(id) {
        if (storageAvailable('localStorage')) {
            model.save(id);
          }
          else {
            console.log('no storage !')
          }
    }
};
