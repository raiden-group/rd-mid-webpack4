import React from "react";
import { Route, HashRouter, Redirect, Switch, BrowserRouter, Link } from 'react-router-dom';
import AsyncLoad from 'components/asyncLoad';

const Home = AsyncLoad(() => import(/* webpackChunkName: "home" */ 'view/home'));
const My = AsyncLoad(() => import(/* webpackChunkName: "home/my" */ 'view/home/my'));
class Routers extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return <BrowserRouter basename={this.props.basename}>
            <Switch>
                <Route exact  path='/' component={() => {
                    return <div>
                        <Link to='/home' >home</Link>
                        <div>
                            <Link to='/home/my' >home/my</Link>
                        </div>
                    </div>
                }}/>
                <Route exact  path='/home' component={Home}/>
                <Route exact path='/home/my' component={My} />
                <Redirect from='/' to='/home' />
            </Switch>
        </BrowserRouter>
    }
  }
  export default Routers;