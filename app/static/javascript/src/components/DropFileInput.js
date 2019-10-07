import React, { useState } from 'react';
import File from './File';

const  DropFileInput = props => {

	const chunk_Size =  64 * 1024;
			
	const [filesInput, setFiles] = useState([]);
	const [uploadingState, setUploading] = useState(false);
	
	handlerOnDragOver = event => {
		event.preventDefault();
	};
	
	handlerOnDrop = event => {
		/*
		* Prevent add repeat files to state
		* Add Files to State
		*/
		event.preventDefault();
		
		const array_files = [];
		
		for (let i = 0; i < event.dataTransfer.filesInput.length; i++) {
			let file = event.dataTransfer.filesInput[i];
				if (!filesInput.map((n) => n.name).includes(file.name)) {
					array_files.push(file);
				}
		}
		
		setFiles(array_files);
		setUploading(false);
	};
	
	toggleUpload = () => {
		setUploading(!uploadingState)
		// this.setState({uploading: !this.state.uploading})
	};
	
	removeFile = (index) => {
		let files = filesInput.filter((_, i) => i !== index);
		setFiles(files);
		
		// this.setState({
		// 	files: this.state.files.filter((_, i) => i !== index)
		// });
	};
	
		let files = filesInput.map((file, index) => {
			return <File file={file}
									 key={file.name}
			             chunk_size={chunk_Size}
			             uploading={uploadingState}
			             clickRemove={removeFile.bind(this, index)}
			/>
		});
		
		return (
			<div>
				<div className="Drop-input" onDragOver={handlerOnDragOver} onDrop={handlerOnDrop}>
					Drop files here!
				</div>
				<div className="Div-files">
					{files}
				</div>
				<div className="Div-Button">
					<button onClick={toggleUpload} disabled={!files.length && true}>
						{!uploadingState ? 'Upload File' : 'Cancel'}
					</button>
				</div>
			</div>
		)
	}

export default DropFileInput;