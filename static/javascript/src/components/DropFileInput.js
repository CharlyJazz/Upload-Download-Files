import React, { Component } from 'react';
import File from './File';
import { readFileChunk, onReadSuccess, onReadError } from '../actions'


export default class DropFileInput extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			chunk_size: 64 * 1024,
			files: []
		}
	}
	
	handlerOnDragOver = event => {
		event.preventDefault();
	};
	
	handlerOnDrop = event => {
		event.preventDefault();
		for(let i = 0; i < event.dataTransfer.files.length; i++) {
			this.setState({
				files: [...this.state.files, ...[event.dataTransfer.files[i]]]
			}, () => {console.log(this.state)} )
		}
	};
	
	render() {
		
		let files = this.state.files.map((file, index) => {
			return <File file={file} key={index}/>
		});
		
		return (
			<div>
				<div className="Drop-input"
				     onDragOver={this.handlerOnDragOver}
				     onDrop={this.handlerOnDrop}>
					Drop files here!
				</div>
				<div className="Div-files">
					{files}
				</div>
				<div className="Div-Button">
					<button>
						Upload File{this.state.files.length > 1 && "s"}
					</button>
				</div>
			</div>
		)
	}
}