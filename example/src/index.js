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
        <Routers/>
      </Provider>
    )
  }
}
ReactDom.render(<App/>, document.getElementById('stage'));