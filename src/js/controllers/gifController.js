import gif from '../helpers/gifApi';
import GifsView from '../views/gifsView';


export default class GifController {

    constructor(GifsView) {
        this.gifsView = GifsView;
    };

    init() {
        this.gifsView.init();
    };

    getGifs(search) {
        gif.search(search).then(results => {
            let output = `<h2 class="small-text">We found ${results.length} gifs for you !</h2><div class="card-columns">`;
            results.forEach(gif => {
                output += `
            <div class="card mb-2">
            <img class="card-img-top" src="${gif.url}" alt="Card image cap">
            <div class="card-body">
         <h5 class="small-text">${gif.title}</h5>
         <i class="far fa-heart"></i>
        </div>
      </div>
            `;
            });
            output += '</div>';
            this.gifsView.render(output);
        });
    };
};
