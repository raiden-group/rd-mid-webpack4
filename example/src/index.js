// import "react-hot-loader";
// import React from "react";
// import ReactDom from "react-dom";
// import { Provider } from "mobx-react";
// import { hot } from "react-hot-loader/root";
// import Routers from "./routers";
// import stores from "stores";
import "./index.less";

// class App extends React.Component {
//   async componentDidMount() {
//     const res = await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//     console.log(res);
//   }
//   state = { value: "111" };
//   render() {
//     return (
//       <Provider {...stores}>
//         APP
//         <input
//           value={this.state.value}
//           onChange={(e) => {
//             this.setState({ value: e.target.value });
//           }}
//         ></input>
//         <Routers basename="/app1.html" />
//       </Provider>
//     );
//   }
// }
// const H = hot(() => <App />);
// ReactDom.render(<H />, document.getElementById("stage"));
document.getElementById("stage").innerHTML = "www";
