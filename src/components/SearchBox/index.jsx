import { useState } from 'react';
import './index.less'
import { SearchOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Input, Button, Drawer, Form, Tooltip, DatePicker, InputNumber, Table, Space } from 'antd';
import { useRequest } from 'ahooks';
import { getScanerRecord } from '../../services/api';
import { useContext } from 'react';
import { MyContext } from '../../MyContext/index';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
function SearchBox() {

  const { scanerData, setScanerData } = useContext(MyContext);
  const { zoomLevel, setZoomLevel } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '扫描时间',
      dataIndex: 'scanTime',
    },
    {
      title: '箱码',
      dataIndex: 'barCode',
    },
    {
      title: '扫描器',
      dataIndex: 'scannerNo',
    },
    {
      title: '方向',
      dataIndex: 'roadCode',
    },
    {
      title: '扫描详情',
      dataIndex: 'description',
    },
  ];

  //改变页面大小 ctrl + 上下键
  // const handleChangeSize = (event) => {
  //   console.log('ArrowUp');
  //   if (event.ctrlKey && (event.key === 'ArrowUp')) {
  //     console.log('ArrowUp');
  //     handleZoomIn()
  //     event.preventDefault(); // 防止浏览器响应默认的放大/缩小动作
  //   } else if (event.ctrlKey && event.key === 'ArrowDown') {
  //     console.log('ArrowDown');
  //     handleZoomOut()
  //     event.preventDefault(); // 防止浏览器响应默认的放大/缩小动作
  //   }
  // }

  function handleZoomIn() {
    setZoomLevel(prev => prev + 0.03)
  }
  function handleZoomOut() {
    setZoomLevel(prev => prev - 0.03)
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    setShowPath(true)
  }, [selectedRowKeys])
  //设置显示路径

  const setShowPath = (show) => {
    // if (selectedRowKeys.length === 0) return

    let path = [...data]
    let newPath = []
    if (show) {
      newPath = path.filter((item) => selectedRowKeys.includes(item.uid))
      console.log("newPath1", newPath);
    } else {
      newPath = path.filter((item) => !selectedRowKeys.includes(item.uid))
      console.log("newPath2", newPath);
    }
    setScanerData(newPath)
  }

  const getRecord = async (p) => {
    let res = await getScanerRecord(p);
    if (res.status === 200) {
      if (res.status === 200) {
        // setScanerData(((res.data.infos.list != null && res.data.infos.list) || []))
        setData(((res.data.infos.list != null && res.data.infos.list) || []))
      }
    }
  }

  //查询货箱
  const { loading, run, params } = useRequest(getRecord, {
    manual: true,
  });

  const onFinish = (values) => {
    console.log(values);
    let p = {
      beginTime: values.time ? dayjs(values.time[0]).format('YYYY-MM-DD HH:mm:ss') : '',
      endTime: values.time ? dayjs(values.time[1]).format('YYYY-MM-DD HH:mm:ss') : '',
      barCode: values.barCode.trim(),
      pageNo: 1,
      pageSize: values.pageSize
    }
    run(p)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className='search_box'
    >

      <Space direction='vertical '>
        <Tooltip title="搜索">
          <Button type="primary" onClick={showDrawer} shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Tooltip title="放大">
          <Button type="primary" onClick={handleZoomIn} shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
        <Tooltip title="缩小">
          <Button type="primary" onClick={handleZoomOut} shape="circle" icon={<MinusOutlined />} />
        </Tooltip>
      </Space>

      <Drawer mask={false} maskClosable={false} title="查询项" placement="right" width={"40%"} onClose={onClose} open={open}>
        <div className='content'>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              pageSize: 5,
              time: [dayjs().startOf('day'), dayjs().endOf('day')]
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="时间"
              name="time"
              rules={[{ required: true, message: '请输入时间' }]}
            >
              <RangePicker
                showTime={{
                  format: 'HH:mm:ss',
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>

            <Form.Item
              label="箱码"
              name="barCode"
              rules={[{ required: true, message: '请输入箱码!' }]}
            >
              <Input style={{
                width: 150
              }} />
            </Form.Item>

            <Form.Item
              label="最后扫描次数"
              name="pageSize"
              rules={[{ required: true, message: '请输入次数!' }]}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>

          </Form>

          <Space>
            {/* <Button type="primary" onClick={() => { setShowPath(true) }} >显示</Button>
            <Button type="primary" danger onClick={() => { setShowPath(false) }} >不显示</Button> */}
          </Space>
          <Table loading={loading} size='small' rowSelection={rowSelection} pagination={false} rowKey={(record) => record.uid} columns={columns} dataSource={data} />
        </div>
      </Drawer>
    </div>
  );
}

export default SearchBox;
