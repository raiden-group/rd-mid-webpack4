import { observable, action } from "mobx";

class HomeStore {
    @observable name = "react-antd-mobx"
    @action
    setName = (text) => {
        this.name = text;
    }
}
export default new HomeStore();