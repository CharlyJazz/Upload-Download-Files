import React, { PureComponent } from 'react';
import { Line } from 'rc-progress';
import { readFileChunk, onReadError } from '../actions/index.js';
import io from '../helpers/io';

export default class File extends PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			done: false,
			invalid: false,
			server_filename: '',
			progress: {
				percent: 0
			}
		};
		
		this.uploadFile = () => readFileChunk(this, 0, props.chunk_size);
		this.onReadError = () => onReadError(this, 'Upload rejected by server');
	}
	
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.uploading && !this.state.done && !this.state.invalid) {
			io.emit('start-transfer', this.props.file.name, this.props.file.size, ((filename) => {
				if (!filename) {
					this.onReadError(); // The server rejected the transfer
				}
				else {
					this.setState({server_filename: filename}, () => {
						this.uploadFile();
					});
				}
			}).bind(this.props.file));
		}
	}
	
	render() {
		return (
      <div className="File">
        <span className="File-name">Name: {this.props.file.name}</span>
        <span className="File-type">Type: {this.props.file.type || 'unknown'}</span>
        <span className="File-type">Size: {this.props.file.size}</span>
	      { !this.state.done &&
	      (<button className="File-button-remove" onClick={this.props.clickRemove}>Remove File</button>)
	      }
				{ this.props.uploading &&
        <Line percent={this.state.progress.percent}
              strokeColor={this.state.progress.color}
              strokeWidth="1"
              strokeLinecap='square'
              trailColor="#2fb9e224"/>
				}
				{ this.state.done && "Done" }
	      { this.state.invalid && "Invalid" }
      </div>
		)
	}
}