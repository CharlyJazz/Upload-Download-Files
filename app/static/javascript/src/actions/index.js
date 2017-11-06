import io from '../helpers/io'


function readFileChunk (ctx, offset, length) {
    let end_offset = offset + length;
    if (end_offset > ctx.props.file.size)
        end_offset = ctx.props.file.size;
    let r = new FileReader();
    r.onload = function(file, offset, length, event) {
        if (event.target.error != null) {
            onReadError(ctx, 'Error in readFileChunk');
        }
        else {
            onReadSuccess(ctx, end_offset, length, event.target.result);
        }
    }.bind(r, ctx.props.file, offset, length);
    r.readAsArrayBuffer(ctx.props.file.slice(offset, end_offset));
}

const onReadSuccess = (ctx, offset, length, data) => {
    // Read success callback
    if (ctx.state.done) return;

    io.emit('write-chunk', ctx.state.server_filename, offset, data, function(offset, ack) {
        if (!ack) {
            onReadError(ctx, 'Transfer aborted by server');
        }
    }.bind(this, offset));

    let end_offset = offset + length,
        color = '#48bd9666',
        width = ((end_offset / ctx.props.file.size) * 100) < 100
            ? (end_offset / ctx.props.file.size) * 100
            : 100;

    ctx.setState({
        progress: {
            ...ctx.state.progress,
            percent: width,
            color: color
        }
    });

    if (end_offset < ctx.props.file.size) {
        readFileChunk(ctx, end_offset, ctx.props.chunk_size);
    }
    else {
        ctx.setState({done: true});
    }
};

function onReadError(ctx, message) {
    // Read error callback
    ctx.setState({
        progress: {
            ...ctx.state.progress,
            color: '#ff000073',
            percent: 100
        }
    });

    ctx.setState({done: true});
}


module.exports = {
    readFileChunk,
    onReadSuccess,
    onReadError
};