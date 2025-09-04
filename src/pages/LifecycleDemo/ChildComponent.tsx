import { Card, Tag, Typography } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const { Text } = Typography;

interface ChildComponentProps {
  parentCount: number;
}

const ChildComponent: React.FC<ChildComponentProps> = ({ parentCount }) => {
  const [childState, setChildState] = useState(0);
  const renderCount = useRef(0);

  // 组件挂载时执行
  useEffect(() => {
    console.log('🟢 子组件: useEffect (挂载) - 组件已挂载');

    return () => {
      console.log('🔴 子组件: useEffect cleanup (卸载) - 组件即将卸载');
    };
  }, []);

  // 监听 parentCount 变化
  useEffect(() => {
    console.log('🟡 子组件: useEffect (更新) - parentCount 变化:', parentCount);
  }, [parentCount]);

  // 监听 childState 变化
  useEffect(() => {
    console.log('🟡 子组件: useEffect (更新) - childState 变化:', childState);
  }, [childState]);

  // 每次渲染都会执行
  renderCount.current += 1;
  console.log('🟦 子组件: render - 第', renderCount.current, '次渲染');

  // 使用 useMemo 优化计算
  const expensiveValue = useMemo(() => {
    console.log('🟠 子组件: useMemo 计算 - 重新计算 expensiveValue');
    return parentCount * 2;
  }, [parentCount]);

  // 使用 useCallback 优化函数
  const handleChildClick = useCallback(() => {
    console.log('🟣 子组件: 用户点击子组件按钮');
    setChildState((prev) => prev + 1);
  }, []);

  return (
    <Card title="子组件生命周期演示" size="small" style={{ margin: '10px 0' }}>
      <div style={{ marginBottom: '10px' }}>
        <Text>父组件计数: {parentCount}</Text>
        <br />
        <Text>子组件状态: {childState}</Text>
        <br />
        <Text>计算值 (parentCount * 2): {expensiveValue}</Text>
        <br />
        <Text>渲染次数: {renderCount.current}</Text>
      </div>

      <div>
        <button type="button" onClick={handleChildClick}>
          增加子组件状态
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <Tag color="blue">子组件已渲染</Tag>
        <Tag color="green">parentCount: {parentCount}</Tag>
        <Tag color="orange">childState: {childState}</Tag>
      </div>
    </Card>
  );
};

export default ChildComponent;
