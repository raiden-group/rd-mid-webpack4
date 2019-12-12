import React, { Component } from 'react';
import { observer, inject} from "mobx-react";
import { Button, Input } from 'antd';
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
      1111111
      <Button type="primary">{name}</Button>
      <Button type="primary" onClick={() => {
        this.props.history.push('/other');
      }}>goother</Button>
    </div> 
  }
}