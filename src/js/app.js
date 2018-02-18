import GifsView from './views/gifsView';
import GifController from './controllers/gifController';


const gifsView = new GifsView();

const app = new GifController(gifsView);

export default app;

