import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Upload, TreeSelect, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import resourceStructures from 'configs/resourceStructures';
import { v1 } from 'uuid'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default forwardRef(({
  className,
  initialValues
}, ref) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    form
  }))

  const _normFile = e => {
    if (Array.isArray(e)) {
      return e.map(file => {
        file.status = "success";
        return file
      });
    }
    return e && e.fileList.map(file => {
      file.status = "success";
      return file
    });
  };

  const convertToFileList = (source, type) => {
    if (source instanceof Array) {
      return source.map(item => ({
        uid: v1(),
        name: item.path && item.path.split("/").pop(),
        status: 'done',
        url: item.url,
        path: item.path,
        type
      }))
    }
    return []
  }

  const _getMultimedias = (dataSource) => {
    if (!dataSource || !dataSource.multimedias) {
      return []
    }
    return [
      ...convertToFileList(dataSource.multimedias.images, "image"),
      ...convertToFileList(dataSource.multimedias.audios, "audio"),
      ...convertToFileList(dataSource.multimedias.videos, "video")
    ]
  }

  return (
    <Form
      {...formItemLayout}
      initialValues={{
        ...initialValues,
        multimedias: _getMultimedias(initialValues)
      }}
      form={form}
      className={className}
    >
      <Form.Item
        name="category"
        label="Category"
        required
        rules={[{
          required: true
        }]}
      >
        <TreeSelect
          treeData={resourceStructures}
        />
      </Form.Item>
      <Form.Item
        name="identity"
        label="Identity"
        rules={[{
          required: true
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="enName"
        label="En Name"
        rules={[{
          required: true
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="viName"
        label="Vi Name"
        rules={[{
          required: true
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="keywords"
        label="Keywords"
        rules={[{
          required: true
        }]}
      >
        <Select
          mode="tags"
          dropdownStyle={{
            display: "none"
          }}
        />
      </Form.Item>
      <Form.Item
        name="multimedias"
        label="Multimedias"
        valuePropName="fileList"
        getValueFromEvent={_normFile}
        rules={[{
          required: true
        }]}
      >
        <Upload.Dragger

          listType="picture-card"
          accept={"image/*,audio/*,video/*"}
          name="multimedias"
          customRequest={() => { }}
          multiple
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
          <p className="ant-upload-hint">
            Upload images, videos, audios
          </p>
        </Upload.Dragger>
      </Form.Item>
    </Form>
  )
})