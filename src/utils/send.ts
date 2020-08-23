import { from, Observable } from "rxjs"
import './BigInt-JSON-patch'

/**
 * A function that sends the body asynchronously to the specified url.
 */
export default function send(url: string, data: string | Blob | FormData | URLSearchParams | ReadableStream<Uint8Array>) {
  if (typeof window !== 'undefined' && window.navigator.sendBeacon != null) {
    window.navigator.sendBeacon(url, data)
    return from([])
  } else {
    // https://github.com/southpolesteve/node-abort-controller
    return new Observable<boolean>(o => {
      const AbortController = require('node-abort-controller')
      const controller = new AbortController()
      const signal = controller.signal
      const headers = {
        'content-type': 'application/json; charset=utf-8',
        'accept': 'application/json'
      }
      fetch(url, { method: 'POST', body: data, signal, headers })
        .then(res => res.json())
        .then(json => {
          o.next(json)
          o.complete()
        })
        .catch(e => {
          o.error(e)
        })
    })
  }
}