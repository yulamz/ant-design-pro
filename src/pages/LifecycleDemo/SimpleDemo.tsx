import { Button, Card, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;

// 简单的子组件
const SimpleChild: React.FC<{ count: number }> = ({ count }) => {
  useEffect(() => {
    console.log('🟢 子组件: 挂载');
    return () => {
      console.log('🔴 子组件: 卸载');
    };
  }, []);

  useEffect(() => {
    console.log('🟡 子组件: count 更新为', count);
  }, [count]);

  console.log('🟦 子组件: 渲染, count =', count);

  return (
    <Card size="small" title="子组件">
      <Text>父组件传递的 count: {count}</Text>
    </Card>
  );
};

// 简单的父组件
const SimpleParent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);

  useEffect(() => {
    console.log('🟢 父组件: 挂载');
    return () => {
      console.log('🔴 父组件: 卸载');
    };
  }, []);

  useEffect(() => {
    console.log('🟡 父组件: count 更新为', count);
  }, [count]);

  console.log('🟦 父组件: 渲染, count =', count, 'showChild =', showChild);

  return (
    <Card title="React 生命周期演示">
      <Space direction="vertical" size="large">
        <div>
          <Title level={4}>父组件状态</Title>
          <Text>count: {count}</Text>
          <br />
          <Text>子组件显示: {showChild ? '是' : '否'}</Text>
        </div>

        <Space>
          <Button onClick={() => setCount((c) => c + 1)}>增加 count</Button>
          <Button onClick={() => setShowChild((s) => !s)}>
            {showChild ? '隐藏' : '显示'} 子组件
          </Button>
        </Space>

        {showChild && <SimpleChild count={count} />}
      </Space>
    </Card>
  );
};

export default SimpleParent;
