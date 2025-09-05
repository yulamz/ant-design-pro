import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Divider, Typography } from 'antd';
import React from 'react';
import RefsParentComponent from './RefsParentComponent';
import SimpleParent from './SimpleDemo';

const { Title, Paragraph, Text } = Typography;

const LifecycleDemo: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Title level={2}>React 父子组件生命周期调用顺序验证</Title>

        <Alert
          message="使用说明"
          description={
            <div>
              <p>1. 打开浏览器开发者工具的控制台 (F12)</p>
              <p>2. 观察控制台中的日志输出，了解生命周期调用顺序</p>
              <p>3. 点击按钮触发不同的操作，观察日志变化</p>
              <p>4. 注意日志中的颜色标识：</p>
              <ul>
                <li>🟢 绿色：组件挂载</li>
                <li>🔴 红色：组件卸载</li>
                <li>🟡 黄色：组件更新</li>
                <li>🟦 蓝色：组件渲染</li>
                <li>🟠 橙色：useMemo 计算</li>
                <li>🟣 紫色：用户交互</li>
              </ul>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />

        <Divider />

        <Title level={3}>生命周期调用顺序说明</Title>

        <Card size="small" style={{ marginBottom: 16 }}>
          <Title level={4}>1. 组件首次挂载时的顺序：</Title>
          <Paragraph>
            <Text code>
              父组件 render → 父组件 useEffect(挂载) → 子组件 render → 子组件
              useEffect(挂载)
            </Text>
          </Paragraph>
        </Card>

        <Card size="small" style={{ marginBottom: 16 }}>
          <Title level={4}>2. 父组件状态更新时的顺序：</Title>
          <Paragraph>
            <Text code>
              父组件 render → 父组件 useEffect(更新) → 子组件 render → 子组件
              useEffect(更新)
            </Text>
          </Paragraph>
        </Card>

        <Card size="small" style={{ marginBottom: 16 }}>
          <Title level={4}>3. 子组件卸载时的顺序：</Title>
          <Paragraph>
            <Text code>子组件 useEffect cleanup → 父组件 render</Text>
          </Paragraph>
        </Card>

        <Card size="small" style={{ marginBottom: 16 }}>
          <Title level={4}>4. 组件重新挂载时的顺序：</Title>
          <Paragraph>
            <Text code>
              父组件 render → 子组件 render → 子组件 useEffect(挂载)
            </Text>
          </Paragraph>
        </Card>

        <Divider />

        <Title level={3}>实际演示</Title>
        <SimpleParent />

        <Divider />

        <Title level={3}>Refs 调用子组件方法示例</Title>
        <RefsParentComponent />
      </Card>
    </PageContainer>
  );
};

export default LifecycleDemo;
