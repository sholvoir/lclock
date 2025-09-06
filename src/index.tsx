import './index.css';
import { render } from 'solid-js/web';
import Root from './root';

const root = document.getElementById('root');
if (root) render(() => <Root />, root);
