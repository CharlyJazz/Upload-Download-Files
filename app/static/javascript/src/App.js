import React, { Component } from 'react';
import './App.css';
import { Line } from 'rc-progress';
import DropFileInput from './components/DropFileInput'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
			<div className="App">
				<DropFileInput />
			</div>
        );
    }
}

export default App;
