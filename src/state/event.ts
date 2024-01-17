import EventEmitter from 'eventemitter3'

type UnlistenFn = () => void
const emitter = new EventEmitter()
export function emitSessionDropped() {
  emitter.emit('session-dropped')
}
export function listenSessionDropped(fn: () => void): UnlistenFn {
  emitter.on('session-dropped', fn)
  return () => emitter.off('session-dropped', fn)
}
