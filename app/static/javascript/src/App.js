import React, { Component } from 'react';
import DropFileInput from './components/DropFileInput';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<DropFileInput />
			</div>
		);
	}
}

export default App;
