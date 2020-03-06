import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppWrap from './components/App';
import './fonts/FontsFree-Net-HelveticaNeueBold.ttf';
import './fonts/HelveticaNeue Light.ttf';

ReactDOM.render(<Router><AppWrap /></Router>, document.getElementById('root'));
