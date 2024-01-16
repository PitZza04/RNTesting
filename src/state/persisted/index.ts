import EventEmitter from 'eventemitter3'
import * as store from '#/state/persisted/store'
import {Schema, defaults} from './schema'
import BroadcastChannel from '#/lib/broadcast'

export type {Schema, PersistedAccount} from '#/state/persisted/schema'
export {defaults} from '#/state/persisted/schema'

const broadcast = new BroadcastChannel('BSKY_BROADCAST_CHANNEL')
const UPDATE_EVENT = 'BSKY_UPDATE'
let _state: Schema = defaults
const _emitter = new EventEmitter()
export async function init() {
  console.log(`before call broadcast`, broadcast.onmessage)
  broadcast.onmessage = onBroadcastMessage

  try {
    const stored = await store.read()

    if (!stored) {
      console.info('persisted state: initializing default storage')
      await store.write(defaults) // opt: init new store
    }
    _state = stored || defaults // return new store
    console.log('persisted state: initialized', stored)
  } catch (e) {
    console.error('persisted state: failed to load root state from storage', {
      error: e,
    })
    // AsyncStorage failure, but we can still continue in memory
    return defaults
  }
}

export function get<K extends keyof Schema>(key: K): Schema[K] {
  return _state[key]
}

export async function write<K extends keyof Schema>(
  key: K,
  value: Schema[K],
): Promise<void> {
  try {
    _state[key] = value
    await store.write(_state)
    // must happen on next tick, otherwise the tab will read stale storage data
    setTimeout(() => broadcast.postMessage({event: UPDATE_EVENT}), 0)
    console.debug(`persisted state: wrote root state to storage`, {
      updatedKey: key,
    })
  } catch (e) {
    console.error(`persisted state: failed writing root state to storage`, {
      error: e,
    })
  }
}

export function onUpdate(cb: () => void): () => void {
  _emitter.addListener('update', cb)
  return () => _emitter.removeListener('update', cb)
}

async function onBroadcastMessage({data}: MessageEvent) {
  if (typeof data === 'object' && data.event === UPDATE_EVENT) {
    try {
      // read next state, possibly updated by another tab
      const next = await store.read()

      if (next) {
        console.debug(`persisted state: handling update from broadcast channel`)
        _state = next
        _emitter.emit('update')
      } else {
        console.error(
          `persisted state: handled update update from broadcast channel, but found no data`,
        )
      }
    } catch (e) {
      console.error(
        `persisted state: failed handling update from broadcast channel`,
        {
          error: e,
        },
      )
    }
  }
}
