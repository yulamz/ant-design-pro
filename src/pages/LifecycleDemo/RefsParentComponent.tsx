import {
  Alert,
  Button,
  Card,
  Divider,
  InputNumber,
  Space,
  Typography,
} from 'antd';
import React, { useRef, useState } from 'react';
import RefsChildComponent, {
  type RefsChildComponentRef,
} from './RefsChildComponent';

const { Title, Text, Paragraph } = Typography;

const RefsParentComponent: React.FC = () => {
  const [customValue, setCustomValue] = useState(10);
  const [lastResult, setLastResult] = useState<number | null>(null);

  // 创建 ref 来引用子组件
  const childRef = useRef<RefsChildComponentRef>(null);

  // 调用子组件的 reset 方法
  const handleReset = () => {
    if (childRef.current) {
      childRef.current.reset();
      setLastResult(null);
      console.log('🟢 父组件: 调用子组件的 reset() 方法');
    }
  };

  // 调用子组件的 increment 方法
  const handleIncrement = () => {
    if (childRef.current) {
      childRef.current.increment();
      console.log('🟢 父组件: 调用子组件的 increment() 方法');
    }
  };

  // 调用子组件的 decrement 方法
  const handleDecrement = () => {
    if (childRef.current) {
      childRef.current.decrement();
      console.log('🟢 父组件: 调用子组件的 decrement() 方法');
    }
  };

  // 调用子组件的 getValue 方法
  const handleGetValue = () => {
    if (childRef.current) {
      const value = childRef.current.getValue();
      setLastResult(value);
      console.log('🟢 父组件: 调用子组件的 getValue() 方法，返回值:', value);
    }
  };

  // 调用子组件的 setValue 方法
  const handleSetValue = () => {
    if (childRef.current) {
      childRef.current.setValue(customValue);
      setLastResult(customValue);
      console.log(
        '🟢 父组件: 调用子组件的 setValue() 方法，设置值:',
        customValue,
      );
    }
  };

  // 调用子组件的 focus 方法
  const handleFocus = () => {
    if (childRef.current) {
      childRef.current.focus();
      console.log('🟢 父组件: 调用子组件的 focus() 方法');
    }
  };

  return (
    <Card title="父组件 (Refs 调用子组件方法示例)" style={{ margin: '20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Refs 使用说明"
          description={
            <div>
              <p>1. 父组件通过 useRef 创建对子组件的引用</p>
              <p>2. 子组件使用 forwardRef 和 useImperativeHandle 暴露方法</p>
              <p>3. 父组件可以直接调用子组件暴露的方法</p>
              <p>4. 打开控制台查看方法调用日志</p>
            </div>
          }
          type="info"
          showIcon
        />

        <div>
          <Title level={4}>父组件控制面板</Title>
          <Space wrap>
            <Button type="primary" onClick={handleIncrement}>
              增加计数
            </Button>
            <Button onClick={handleDecrement}>减少计数</Button>
            <Button danger onClick={handleReset}>
              重置计数
            </Button>
            <Button onClick={handleGetValue}>获取当前值</Button>
            <Button onClick={handleFocus}>聚焦输入框</Button>
          </Space>
        </div>

        <Divider />

        <div>
          <Title level={4}>设置自定义值</Title>
          <Space>
            <InputNumber
              value={customValue}
              onChange={(value) => setCustomValue(value || 0)}
              min={-100}
              max={100}
            />
            <Button type="primary" onClick={handleSetValue}>
              设置值
            </Button>
          </Space>
        </div>

        {lastResult !== null && (
          <div>
            <Title level={4}>最后获取的值</Title>
            <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
              {lastResult}
            </Text>
          </div>
        )}

        <Divider />

        <div>
          <Title level={4}>子组件</Title>
          <RefsChildComponent ref={childRef} />
        </div>

        <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
          <Title level={5}>代码示例</Title>
          <Paragraph>
            <Text code>
              {`// 子组件暴露方法
const childRef = useRef<RefsChildComponentRef>(null);

// 调用子组件方法
childRef.current?.increment();
childRef.current?.reset();
childRef.current?.getValue();`}
            </Text>
          </Paragraph>
        </Card>
      </Space>
    </Card>
  );
};

export default RefsParentComponent;
