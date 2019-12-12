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
    return <div className={styles['other-wrap']}>
      <Button type="primary" onClick={() => {
        this.props.history.push('/home');
      }}>gohomer</Button>12
    </div> 
  }
}