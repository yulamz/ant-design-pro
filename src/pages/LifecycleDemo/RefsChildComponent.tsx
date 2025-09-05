import { Button, Card, Space, Tag, Typography } from 'antd';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const { Text } = Typography;

interface RefsChildComponentProps {
  title?: string;
}

// 定义子组件暴露给父组件的方法接口
export interface RefsChildComponentRef {
  reset: () => void;
  increment: () => void;
  decrement: () => void;
  getValue: () => number;
  setValue: (value: number) => void;
  focus: () => void;
}

const RefsChildComponent = forwardRef<
  RefsChildComponentRef,
  RefsChildComponentProps
>(({ title = '子组件 (Refs 示例)' }, ref) => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('等待父组件调用...');
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);

  // 每次渲染都会执行
  renderCount.current += 1;

  // 使用 useImperativeHandle 暴露方法给父组件
  useImperativeHandle(
    ref,
    () => ({
      // 重置计数器
      reset: () => {
        setCount(0);
        setMessage('计数器已重置');
        console.log('🟣 子组件: reset() 被父组件调用');
      },

      // 增加计数
      increment: () => {
        setCount((prev) => prev + 1);
        setMessage('计数器已增加');
        console.log('🟣 子组件: increment() 被父组件调用');
      },

      // 减少计数
      decrement: () => {
        setCount((prev) => prev - 1);
        setMessage('计数器已减少');
        console.log('🟣 子组件: decrement() 被父组件调用');
      },

      // 获取当前值
      getValue: () => {
        setMessage(`当前值: ${count}`);
        console.log('🟣 子组件: getValue() 被父组件调用，返回值:', count);
        return count;
      },

      // 设置值
      setValue: (value: number) => {
        setCount(value);
        setMessage(`值已设置为: ${value}`);
        console.log('🟣 子组件: setValue() 被父组件调用，新值:', value);
      },

      // 聚焦到输入框
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
          setMessage('输入框已聚焦');
          console.log('🟣 子组件: focus() 被父组件调用');
        }
      },
    }),
    [count],
  );

  const handleInternalClick = () => {
    setCount((prev) => prev + 1);
    setMessage('子组件内部按钮点击');
    console.log('🟣 子组件: 内部按钮被点击');
  };

  return (
    <Card title={title} size="small" style={{ margin: '10px 0' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text>
            当前计数:{' '}
            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
              {count}
            </Text>
          </Text>
          <br />
          <Text>状态消息: {message}</Text>
          <br />
          <Text>渲染次数: {renderCount.current}</Text>
        </div>

        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="这是一个输入框，父组件可以聚焦它"
            style={{
              padding: '4px 8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              width: '300px',
            }}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleInternalClick}>
            子组件内部按钮
          </Button>
        </div>

        <div>
          <Tag color="blue">子组件已渲染</Tag>
          <Tag color="green">计数: {count}</Tag>
          <Tag color="orange">渲染次数: {renderCount.current}</Tag>
        </div>
      </Space>
    </Card>
  );
});

RefsChildComponent.displayName = 'RefsChildComponent';

export default RefsChildComponent;
