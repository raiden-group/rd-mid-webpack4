import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from "mobx-react";

import  Routers from "./routers";
import  stores from "stores";
import './index.less';

class App extends React.Component {
  async componentDidMount() {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
    console.log(res);
  }
  render() {
    return (
      <Provider {...stores}>
        APP1
        <Routers basename='/app1.html' />
      </Provider>
    )
  }
}
ReactDom.render(<App/>, document.getElementById('stage'));