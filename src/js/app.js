import GifsView from './views/gifsView';
import GifModel from './models/gifModel';
import GifController from './controllers/gifController';


const gifsView = new GifsView();
const gifModel = new GifModel();

const app = new GifController(gifsView, gifModel);

export default app;

