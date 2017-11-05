import React, { Component } from 'react';


export default class File extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			done: false,
			progress: 0
		}
	}
	
	render() {
		return (
			<div className="File">
				<span className="File-name">Name: {this.props.file.name}</span>
				<span className="File-type">Type: {this.props.file.type}</span>
			</div>
		)
	}
}
