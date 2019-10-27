import { io, CHUNK_SIZE } from "../constants";

// Starting uploading reading the file
export const readFileChunk = (ctx, offset) => {
  let end_offset = offset + CHUNK_SIZE;
  if (end_offset > ctx.props.file.size) {
    end_offset = ctx.props.file.size;
  }
  let r = new FileReader();
  r.onload = function(file, offset, length, event) {
    if (event.target.error != null) {
      onReadError(ctx, "Error in readFileChunk");
    } else {
      onReadSuccess(ctx, offset, length, event.target.result);
    }
  }.bind(r, ctx.props.file, offset, CHUNK_SIZE);
  r.readAsArrayBuffer(ctx.props.file.slice(offset, end_offset));
};

// Send chunk
export const onReadSuccess = (ctx, offset, length, data) => {
  if (ctx.state.done) return;
  io.emit(
    "write-chunk",
    ctx.state.server_filename,
    offset,
    data,
    function(offset, ack) {
      if (!ack) {
        onReadError(ctx, "Transfer aborted by server");
      }
    }.bind(this, offset)
  );

  const end_offset = offset + length;
  const porcentage = (end_offset / ctx.props.file.size) * 100;
  const width = porcentage < 100 ? porcentage : 100;

  ctx.setState(
    {
      progress: {
        ...ctx.state.progress,
        percent: width,
        color: "#48bd9666"
      }
    },
    () => {
      if (end_offset < ctx.props.file.size) {
        readFileChunk(ctx, end_offset, CHUNK_SIZE);
      } else {
        ctx.setState({ done: true });
      }
    }
  );
};

export const onReadError = (ctx, message) => {
  // Read error callback
  ctx.setState({
    progress: {
      ...ctx.state.progress,
      color: "#ff000073",
      percent: 100
    },
    invalid: true
  });
};
