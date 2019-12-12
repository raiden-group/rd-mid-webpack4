import React from "react";
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import AsyncLoad from 'components/asyncLoad';

const Home = AsyncLoad(() => import(/* webpackChunkName: "home"*/ 'view/home'));
const Other = AsyncLoad(() => import( /* webpackChunkName: "other" */ 'view/other'));

// import Home  from 'view/home';
// import Other from 'view/other';

// const Home = require('view/home').default;
// const Other = require('view/other').default;
class Routers extends React.Component {
    render() {
      return <HashRouter>
            <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/other' component={Other}/>
                <Redirect from='*' to='/home'/>
            </Switch>
        </HashRouter>
    }
  }
  export default Routers;