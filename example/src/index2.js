import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from "mobx-react";

import  Routers from "./routers";
import  stores from "stores";
import './index.less';
class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <div>app2</div>
        <Routers basename='/app2.html' />
      </Provider>
    )
  }
}
ReactDom.render(<App/>, document.getElementById('stage'));