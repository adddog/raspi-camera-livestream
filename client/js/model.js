const postJSON = (url, json) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })

export default (state, emitter) => {

  emitter.on('set:streamkey', key => {
    state.streamkey = key
    emitter.emit('render')
  })

  emitter.on('controls:stream:start', key => {
    postJSON('/stream', { action: 'start', key: state.streamkey })
  })
  emitter.on('controls:stream:stop', key => {
    postJSON('/stream', { action: 'stop' })
  })

  emitter.emit('render')
}
