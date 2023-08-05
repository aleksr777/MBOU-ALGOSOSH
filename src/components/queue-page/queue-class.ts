class Queue<T> {

  private data: ( T | undefined )[]

  constructor ( size: number ) {
    this.data = Array( size ).fill( undefined )
  }

  public head: number = 0;
  public tail: number = 0;

  enqueue ( item: T ) {
    this.data[ this.tail ] = item
    this.tail = ( this.tail + 1 ) % this.data.length
  }

  dequeue (): T | undefined {
    if ( this.isEmpty ) {
      return undefined
    }
    const item = this.data[ this.head ]
    this.data[ this.head ] = undefined
    this.head = ( this.head + 1 ) % this.data.length
    return item
  }

  clear () {
    this.data.fill( undefined )
    this.head = 0
    this.tail = 0
  }

  get isEmpty (): boolean {
    return this.head === this.tail && this.data[ this.head ] === undefined
  }

  get elements (): ( T | undefined )[] {
    return this.data
  }

  clone (): Queue<T> {
    const newQueue = new Queue<T>( this.data.length )
    newQueue.data = [ ...this.data ]
    newQueue.head = this.head
    newQueue.tail = this.tail
    return newQueue
  }
}

export { Queue }
