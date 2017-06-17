import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import Main from "../components/Main";
import Search from "../components/Children/Search";
import Saved from "../components/Children/Saved";

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="search" component={Search} />
            <IndexRoute component={Saved} />
        </Route>
    </Router>
);

export default routes;
