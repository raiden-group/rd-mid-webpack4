import React, { Component } from 'react';
import { observer, inject} from "mobx-react";
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import styles from './index.less';

@inject('homeStore')
@observer
export default class Home extends Component {
  get Store() {
    return this.props.homeStore;
  }
  render() {
    const { name } = this.Store;
    return <div className={styles['home-wrap']}>
      <Input value={name} onChange={(e) => {
        this.Store.setName(e.target.value)
      }}/>
      <Button type="primary">{name}</Button>
      <Link to="/home/my" >我的</Link>
    </div> 
  }
}