import React from 'react';

import './clock.css'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), light: true };
        // 为了在回调中使用 `this`，这个绑定是必不可少的
        // this.handleClick = this.handleClick.bind(this);
    }

    // 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器：
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    // 组件被删除的时候，应该清除计时器。这在 React 中被称为“卸载（unmount）”。
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    handleClick() {
        this.setState(state => ({
            light: !state.light
        }));
    }
    render() {
        return (
            <div className="clock-container">
                <h1 onClick={() => { this.handleClick() }}>Hello, {this.state.light ? "world" : "xiaoge"}!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
export default Clock;