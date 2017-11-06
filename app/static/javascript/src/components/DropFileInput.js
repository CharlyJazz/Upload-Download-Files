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
		event.preventDefault();
		for(let i = 0; i < event.dataTransfer.files.length; i++) {
			this.setState({
				files: [...this.state.files, ...[event.dataTransfer.files[i]]]
			}, () => {console.log(this.state)} )
		}
	};

	toggleUpload = () => {
		this.setState({
			uploading: !this.state.uploading
		})
	};
	
	render() {
		
		let files = this.state.files.map((file, index) => {
			return <File file={file} key={index} chunk_size={this.state.chunk_size} uploading={this.state.uploading}/>
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
					<button onClick={this.toggleUpload}>
						{!this.state.uploading ? 'Upload File' : 'Uploading'}
					</button>
				</div>
			</div>
		)
	}
}