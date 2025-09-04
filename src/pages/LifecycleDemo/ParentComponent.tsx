import { Button, Card, Space, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ChildComponent from './ChildComponent';

const { Title, Text } = Typography;

const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);
  const renderCount = useRef(0);

  // 组件挂载时执行
  useEffect(() => {
    console.log('🟢 父组件: useEffect (挂载) - 组件已挂载');

    return () => {
      console.log('🔴 父组件: useEffect cleanup (卸载) - 组件即将卸载');
    };
  }, []);

  // 组件更新时执行（监听 count 变化）
  useEffect(() => {
    console.log('🟡 父组件: useEffect (更新) - count 变化:', count);
  }, [count]);

  // 每次渲染都会执行
  renderCount.current += 1;
  console.log('🟦 父组件: render - 第', renderCount.current, '次渲染');

  const handleIncrement = () => {
    console.log('🟣 父组件: 用户点击增加按钮');
    setCount((prev) => prev + 1);
  };

  const handleToggleChild = () => {
    console.log('🟣 父组件: 用户点击切换子组件显示');
    setShowChild((prev) => !prev);
  };

  return (
    <Card title="父组件生命周期演示" style={{ margin: '20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>父组件状态</Title>
          <Text>计数: {count}</Text>
          <br />
          <Text>子组件显示: {showChild ? '是' : '否'}</Text>
          <br />
          <Text>渲染次数: {renderCount.current}</Text>
        </div>

        <Space>
          <Button type="primary" onClick={handleIncrement}>
            增加计数
          </Button>
          <Button onClick={handleToggleChild}>
            {showChild ? '隐藏' : '显示'} 子组件
          </Button>
        </Space>

        {showChild && (
          <ChildComponent
            parentCount={count}
            key={count} // 通过 key 强制重新挂载子组件
          />
        )}
      </Space>
    </Card>
  );
};

export default ParentComponent;
