# React 父子组件生命周期调用顺序验证

## 概述

这个演示项目展示了 React 父子组件生命周期的调用顺序，通过控制台日志可以清楚地观察到不同操作下组件的生命周期执行顺序。

## 生命周期钩子说明

### 函数组件中的生命周期钩子

在函数组件中，我们使用以下 Hooks 来模拟类组件的生命周期：

1. **useEffect** - 模拟 componentDidMount、componentDidUpdate、componentWillUnmount
2. **useState** - 管理组件状态
3. **useRef** - 跟踪渲染次数
4. **useMemo** - 优化计算性能
5. **useCallback** - 优化函数性能

## 调用顺序详解

### 1. 组件首次挂载

```
父组件 render (第1次)
父组件 useEffect (挂载)
子组件 render (第1次)
子组件 useEffect (挂载)
```

### 2. 父组件状态更新

```
父组件 render (第2次)
父组件 useEffect (更新)
子组件 render (第2次)
子组件 useEffect (更新)
```

### 3. 子组件状态更新

```
子组件 render (第3次)
子组件 useEffect (更新)
```

### 4. 子组件卸载

```
子组件 useEffect cleanup (卸载)
父组件 render (第4次)
```

### 5. 子组件重新挂载

```
父组件 render (第5次)
子组件 render (第1次)
子组件 useEffect (挂载)
```

## 关键观察点

### 1. 渲染顺序
- 父组件总是先于子组件渲染
- 子组件的渲染会触发父组件的重新渲染（如果父组件依赖子组件）

### 2. useEffect 执行时机
- 挂载时的 useEffect 在组件渲染完成后执行
- 更新时的 useEffect 在组件重新渲染完成后执行
- cleanup 函数在组件卸载前执行

### 3. 状态更新影响
- 父组件状态更新会触发子组件重新渲染
- 子组件状态更新不会影响父组件（除非父组件监听子组件状态）

### 4. 性能优化
- useMemo 只在依赖项变化时重新计算
- useCallback 只在依赖项变化时重新创建函数
- 这些优化可以避免不必要的子组件重新渲染

## 实际应用场景

### 1. 数据获取
```javascript
useEffect(() => {
  // 组件挂载时获取数据
  fetchData();
}, []);
```

### 2. 事件监听
```javascript
useEffect(() => {
  // 添加事件监听
  window.addEventListener('resize', handleResize);
  
  // 清理事件监听
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### 3. 定时器
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    // 定时任务
  }, 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);
```

## 最佳实践

1. **合理使用依赖数组**：确保 useEffect 的依赖数组包含所有使用的变量
2. **避免无限循环**：注意 useEffect 的依赖项，避免造成无限重新渲染
3. **及时清理资源**：在 cleanup 函数中清理定时器、事件监听器等
4. **性能优化**：使用 useMemo 和 useCallback 优化性能
5. **状态提升**：将共享状态提升到最近的公共父组件

## 调试技巧

1. **使用控制台日志**：在关键位置添加 console.log 来跟踪执行顺序
2. **使用 React DevTools**：安装 React DevTools 浏览器扩展来查看组件树和状态
3. **使用颜色标识**：在日志中使用不同颜色来区分不同类型的操作
4. **记录渲染次数**：使用 useRef 来跟踪组件的渲染次数

## 常见问题

### 1. 为什么子组件会重新渲染？
- 父组件状态更新
- 父组件重新渲染
- 子组件 props 变化
- 子组件自身状态更新

### 2. 如何避免不必要的重新渲染？
- 使用 React.memo 包装组件
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数
- 合理设计组件结构

### 3. useEffect 的依赖数组应该包含什么？
- 组件内部使用的所有变量
- props 中使用的变量
- state 中使用的变量
- 其他 useEffect 中使用的变量

通过这个演示，你可以更好地理解 React 组件的生命周期，并在实际开发中做出更好的架构决策。
