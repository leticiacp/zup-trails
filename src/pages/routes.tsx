import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TrailsPage from './trails/trails';

function Routes() {
    return (
        <BrowserRouter>
        <Route path="/" exact component={TrailsPage}/>
        </BrowserRouter>
    );
}

export default Routes;