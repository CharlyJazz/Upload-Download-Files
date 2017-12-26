import React, { Component } from 'react';
import File from './File';

export default class DropFileInput extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			chunk_size: 64 * 1024,
			files: [],
			uploading: false
		}
	}
	
	handlerOnDragOver = event => {
		event.preventDefault();
	};
	
	handlerOnDrop = event => {
		/*
		* Prevent and repeat files to state
		* Add Files to State
		*/
		event.preventDefault();
		
		const array_files = [];
		
		for (let i = 0; i < event.dataTransfer.files.length; i++) {
			let file = event.dataTransfer.files[i];
				if (!this.state.files.map((n) => n.name).includes(file.name)) {
					array_files.push(file);
				}
		}
		
		this.setState({
			files: [...this.state.files, ...array_files],
			uploading: false
		});
	};
	
	toggleUpload = () => {
		this.setState({uploading: !this.state.uploading})
	};
	
	removeFile = (index) => {
		this.setState({
			files: this.state.files.filter((_, i) => i !== index)
		});
	};
	
	render() {
		let files = this.state.files.map((file, index) => {
			return <File file={file}
									 key={file.name}
			             chunk_size={this.state.chunk_size}
			             uploading={this.state.uploading}
			             clickRemove={this.removeFile.bind(this, index)}
			/>
		});
		
		return (
			<div>
				<div className="Drop-input" onDragOver={this.handlerOnDragOver} onDrop={this.handlerOnDrop}>
					Drop files here!
				</div>
				<div className="Div-files">
					{files}
				</div>
				<div className="Div-Button">
					<button onClick={this.toggleUpload} disabled={!files.length && true}>
						{!this.state.uploading ? 'Upload File' : 'Cancel'}
					</button>
				</div>
			</div>
		)
	}
}