export function delay<T> ( ms: number, value: T, { signal }: { signal?: AbortSignal } = {} ): Promise<T> {
  return new Promise( ( resolve, reject ) => {
    const listener = () => {
      clearTimeout( timer )
      reject( new Error( 'Aborted' ) )
    }
    const timer = setTimeout( () => {
      signal?.removeEventListener( 'abort', listener )
      resolve( value )
    }, ms )
    if ( signal?.aborted ) {
      listener()
    }
    signal?.addEventListener( 'abort', listener )
  } )
}

/* import { AbortController } from 'abort-controller' (только для Node.js)
npm install abort-controller (только для Node.js)
... 

  const controller = new AbortController()
  const signal = controller.signal
  
  ...
  
  delay(5000, 'Прервано!', { signal })*/
