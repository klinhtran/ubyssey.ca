import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Store } from './components/Store';
import { Catalogue, Product, Cart } from './components/Store'

$(function () {
    ReactDOM.render((
        <HashRouter>
            <Store />
        </HashRouter>
    ),document.getElementById('ubyssey-store'))
});
