import React, { Component } from 'react'
import { List, Picker, Icon, Calendar } from 'antd-mobile'
import { Header, Content } from 'Components'
import * as urls from 'Contants/urls'
import history from 'Util/history'
import style from './style.css'

const now = new Date()
class EnginReality extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proSelect: false,
      proData: [
        {
          value: 1,
          label: '安徽铁建项目'
        },
        {
          value: 2,
          label: '河南公路项目'
        },
        {
          value: 3,
          label: '北京房建项目'
        }
      ],
      dateShow: false,
      startTime: null,
      endTime: null
    }
  }
  onProChange = () => {
    this.setState({
      proSelect: true
    })
  }

  hanleShowCalendar = () => {
    this.setState({
      dateShow: true
    })
  }
  handleDateCancel = () => {
    this.setState({
      dateShow: false,
      startTime: null,
      endTime: null,
    })
  }
  handleDateConfirm = (startTime, endTime) => {
    this.setState({
      dateShow: false,
      startTime,
      endTime,
    })
  }
  handleLeavesitu = () => {
    history.push(urls.LEAVESITU)
  }
  render() {
    let { proSelect, proData, dateShow, startTime, endTime } = this.state
    return (
      <div className='pageBox'>
        <Header
          title='工程实况'
          leftIcon='icon-back'
          leftTitle1='返回'
          leftClick1={() => {
            history.push(urls.MINE)
          }}
        />
        <Content>
          <div className={style['engin-reality']}>
            <List className={`${style['input-form-list']} ${proSelect ? style['selected-form-list'] : ''}`} renderHeader={() => '项目名称'}>
              <Picker extra='请选择' className='myPicker' onChange={this.onProChange} data={proData} cols={1}>
                <List.Item arrow='horizontal'></List.Item>
              </Picker>
            </List>
            <List className={`${style['input-form-list']} ${proSelect ? style['selected-form-list'] : ''}`} renderHeader={() => '工单名称'}>
              <Picker extra='请选择' className='myPicker' onChange={this.onProChange} data={proData} cols={1}>
                <List.Item arrow='horizontal'></List.Item>
              </Picker>
            </List>
            <div className={style['engin-user']}>
              <img src='https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png' />
              <span>刘德华</span>
              <a onClick={this.hanleShowCalendar}>{ startTime && endTime ? (new Date(startTime)).toLocaleDateString() + ' ~ ' + (new Date(endTime)).toLocaleDateString() : '请选择日期范围' } <Icon type='right' size='md' color=''/></a>
            </div>
            <ul className={style['attend']}>
              <li onClick={this.handleLeavesitu} className='my-bottom-border'><p>正常打卡</p><Icon type='right' size='md' color='#ccc'/><em>0</em></li>
              <li onClick={this.handleLeavesitu} className='my-bottom-border'><p>异常<span>迟到</span><span>早退</span><span>未打卡</span></p><Icon type='right' size='md' color='#ccc'/><em>0</em></li>
              <li onClick={this.handleLeavesitu} className='my-bottom-border'><p>外勤</p><Icon type='right' size='md' color='#ccc'/><em>0</em></li>
              <li onClick={this.handleLeavesitu} className='my-bottom-border'><p>加班</p><Icon type='right' size='md' color='#ccc'/><em>0</em></li>
            </ul>
          </div>
          <Calendar
            visible={dateShow}
            onCancel={this.handleDateCancel}
            onConfirm={this.handleDateConfirm}
            defaultDate={now}
          />
        </Content>
      </div>
    )
  }
}

export default EnginReality