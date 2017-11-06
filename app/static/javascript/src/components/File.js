import React, { Component } from 'react'
import { Line } from 'rc-progress'
import { readFileChunk, onReadSuccess, onReadError } from '../actions'
import io from '../helpers/io'


export default class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: props.uploading,
            done: false,
            server_filename: '',
            progress: {
                percent: 0
            }
        };

        this.uploadFile = () => readFileChunk(this, 0, props.chunk_size);
        this.onReadError = () => onReadError(this, 'Upload rejected by server');
    }

    componentWillReceiveProps(nextProps) {
        const that = this;
        if (nextProps.uploading && !this.state.done) {
            io.emit('start-transfer', this.props.file.name, this.props.file.size, function(filename) {
                if (!filename) {
                    // The server rejected the transfer
                    that.onReadError();
                }
                else {
                    that.setState({server_filename: filename}, () => {
                        that.uploadFile();
                    });
                }
            }.bind(this.props.file));
        }
    }

    render() {
        return (
            <div className="File">
                <span className="File-name">Name: {this.props.file.name}</span>
                <span className="File-type">Type: {this.props.file.type || 'unknown'}</span>
                <span className="File-type">Size: {this.props.file.size}</span>

                { this.props.uploading &&
                <Line percent={this.state.progress.percent}
                      strokeColor={this.state.progress.color}
                      strokeWidth="1"
                      strokeLinecap='square'
                      trailColor="#2fb9e224"/>
                }
                { this.state.done && "Done"}
            </div>
        )
    }
}
