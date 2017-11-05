import React, { Component } from 'react';
import './App.css';
import { Line } from 'rc-progress';
import DropFileInput from './components/DropFileInput'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0
        }
    }

    progressDown = () => {
        this.setState({
            progress: this.state.progress - 1
        })
    };

    progressUp = () => {
        this.setState({
            progress: this.state.progress + 1
        })
    };

    render() {
        return (
			<div className="App">

				<DropFileInput />

				<Line percent={this.state.progress}
					  strokeWidth="1"
					  strokeColor="#48bd96"
					  strokeLinecap='square'
					  trailColor="#2fb9e224"/>
				<button onClick={this.progressUp}>Up</button>
				<button onClick={this.progressDown}>Down</button>
			</div>
        );
    }
}

export default App;
