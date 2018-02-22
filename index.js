import app from './src/js/app';
import style from './src/css/style.scss'
import { on } from './src/js/helpers/events';

on(window, 'load', () => app.init());

