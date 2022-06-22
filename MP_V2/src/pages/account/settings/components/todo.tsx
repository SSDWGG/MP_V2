import { updateUser } from '@/services/user';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ProFormInstance, ProFormTextArea } from '@ant-design/pro-form';
import { Divider, Input, InputRef, message, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { TweenOneGroup } from 'rc-tween-one';
import { checkIllegalityStr } from '@/util/const';

const TodoSetting: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();

  const [todoclassify, settodoclassify] = useState<string[]>(
    !!initialState?.currentUser?.todoclassify
      ? (initialState?.currentUser?.todoclassify?.split('-') as string[])
      : [],
  );
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    settodoclassify(
      !!initialState?.currentUser?.todoclassify
        ? (initialState?.currentUser?.todoclassify?.split('-') as string[])
        : [],
    );
  }, [initialState]);

  const handleClose = (removedTag: string) => {
    const newtodoclassify = todoclassify.filter((tag) => tag !== removedTag);
    settodoclassify(newtodoclassify);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && todoclassify.indexOf(inputValue) === -1) {
      todoclassify.length >= 10
        ? message.warning('标签数量达到上限')
        : inputValue.length > 12
        ? message.warning('标签内容长度需小于12字符')
        : checkIllegalityStr(inputValue)
        ? message.warning('标签内容请使用中英文和数字')
        : settodoclassify([...todoclassify, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        color={'processing'}
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = !!todoclassify ? todoclassify.map(forMap) : [];

  const handleFinish = async () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
      const p = { ...values };
      p.userid = initialState?.currentUser?.userid;
      p.admin = initialState?.currentUser?.admin;
      delete p.province;
      delete p.city;

      // 这里使用-来分割   可以在输入的时候限定不能使用这个特殊字符
      p.todoclassify = todoclassify.join('-');

      await updateUser(p);
      await refresh();
      message.success('更新基本信息成功');
    });
  };
  return (
    <ProForm
      layout="vertical"
      onFinish={handleFinish}
      validateTrigger="onBlur"
      formRef={formRef}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          children: '更新基本信息',
        },
      }}
      initialValues={initialState?.currentUser}
      hideRequiredMark
    >
      <ProFormTextArea
        name="signature"
        label="头部格言"
        width="lg"
        rules={[
          {
            required: true,
            message: '请输入个人格言!',
          },
        ]}
        placeholder="个人格言"
      />
      <ProFormTextArea
        name="scrolltip"
        label="滚动格言"
        width="lg"
        rules={[
          {
            required: true,
            message: '请输入个人格言!',
          },
        ]}
        placeholder="个人格言"
      />
      <Divider dashed />

      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        // 分类被修改之后，原先任务的分类依然适用
        <Tag onClick={showInput} className="site-tag-plus" color={'processing'}>
          <PlusOutlined /> 添加分类标签
        </Tag>
      )}
      <Divider style={{ marginTop: 16 }} dashed />
    </ProForm>
  );
};

export default TodoSetting;
