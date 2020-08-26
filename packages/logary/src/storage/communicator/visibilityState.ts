import { Observable } from "rxjs"

// NOTE: this module requires 'window' globally

/**
 * Let's you act with the Beacon API when the browser page is hidden
 * Docs: https://w3c.github.io/beacon/
 */
export default function visibilityState(): Observable<VisibilityState> {
  return new Observable(o => {
    try {
      // https://github.com/ReactiveX/rxjs/issues/5671
      o.next(window.document.visibilityState)

      const handle = () => o.next(window.document.visibilityState)

      window.addEventListener('visibilitychange', handle)
      return () => window.removeEventListener('visibilitychange', handle)
    } catch (e) {
      console.log('error from rxjs', e)
      return () => {}
    }
  })
}
