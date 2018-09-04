import React, { Component } from 'react'
import { List, Icon, Button } from 'antd-mobile'
import { Header, Content } from 'Components'
import * as urls from 'Contants/urls'
import api from 'Util/api'
import style from 'Src/models/PushOrder/form.css'
import ownStyle from './style.css'

class CompanyAuthDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: {}
    }
  }
  getAptitudeDetail = async () => {
    const data = await api.Mine.companyAuth.aptitudeDetail({}) || false
    console.log(data)
    this.setState({
      dataSource: data
    })
  }
  handleRepeat = async () => {
    this.props.match.history.push(urls.COMPANYAUTH)
  }
  showStatus = (status, fialmsg = '') => {
    if (status === 0) {
      return <div className={ownStyle['going']}>
        <Icon color='#0467e0' size='lg' type='ellipsis' />
        <p>审核中</p>
      </div>
    } else if (status === 1) {
      return <div className={ownStyle['suced']}>
        <Icon color='#0ed904' size='lg' type='check-circle-o' />
        <p>审核通过</p>
      </div>
    } else if (status === 2) {
      return <div className={ownStyle['failed']}>
        <Icon color='#fb0404' size='lg' type='cross-circle' />
        <p>审核失败<em> {fialmsg}</em></p>
        <Button onClick={this.handleRepeat} type='ghost' size='small'>重新认证</Button>
      </div>
    }
  }
  componentDidMount() {
    this.getAptitudeDetail()
  }
  render() {
    let { dataSource } = this.state
    return (
      <div className='pageBox'>
        <Header
          title='企业认证详情'
          leftIcon={dataSource['status'] === 1 ? 'icon-back' : ''}
          leftTitle1={dataSource['status'] === 1 ? '返回' : ''}
          leftClick1={() => {
            this.props.match.history.push(urls.MINE)
          }}
        />
        <Content className={ownStyle['comp-content']}>
          <div className={`${style['show-order-box']} ${ownStyle['aptide-order-box']}`}>
            <List className={`${ownStyle['aptide']} ${dataSource['status'] === 2 ? ownStyle['aptfailed'] : ''}`}>
              {
                this.showStatus(dataSource['status'], dataSource['remark'])
              }
            </List>
            <List renderHeader={() => '企业名称'}>
              {dataSource['company_name']}
            </List>
            <List renderHeader={() => '法人'}>
              {dataSource['company_legal']}
            </List>
            <List renderHeader={() => '身份证号码'}>
              {dataSource['company_card_no']}
            </List>
            <List renderHeader={() => '统一社会信用代码'}>
              {dataSource['company_credit_code']}
            </List>
            <List renderHeader={() => '法人手机号'}>
              {dataSource['company_card_no']}
            </List>
            <List className={ownStyle['img-list']} renderHeader={() => '营业执照'}>
              <img src={dataSource['company_license']} />
            </List>
            <List className={ownStyle['img-list']} renderHeader={() => '身份证正面'}>
              <img src={dataSource['company_card_front']} />
            </List>
            <List className={ownStyle['img-list']} renderHeader={() => '身份证反面'}>
              <img src={dataSource['company_card_back']} />
            </List>
          </div>
        </Content>
      </div>
    )
  }
}

export default CompanyAuthDetail