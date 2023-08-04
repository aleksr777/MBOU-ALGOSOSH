class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null

  constructor ( value: T ) {
    this.value = value
    this.next = null
  }
}

class LinkedList<T> {
  head: LinkedListNode<T> | null
  tail: LinkedListNode<T> | null

  constructor () {
    this.head = null
    this.tail = null
  }

  prepend ( value: T ) {
    const newNode = new LinkedListNode( value )
    if ( !this.head ) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
  }

  append ( value: T ) {
    const newNode = new LinkedListNode( value )
    if ( !this.tail ) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
  }

  addByIndex ( value: T, index: number ) {
    if ( index === 0 ) {
      this.prepend( value )
      return
    }

    const newNode = new LinkedListNode( value )
    let currentNode = this.head
    let i = 0

    while ( currentNode ) {
      if ( i === index - 1 ) {
        newNode.next = currentNode.next
        currentNode.next = newNode
        if ( newNode.next === null ) {
          this.tail = newNode
        }
        return
      }
      currentNode = currentNode.next
      i++
    }

    throw new Error( 'Index out of bounds' )
  }

  deleteByIndex ( index: number ) {
    if ( index === 0 && this.head ) {
      this.head = this.head.next
      if ( this.head === null ) {
        this.tail = null
      }
      return
    }

    let currentNode = this.head
    let i = 0

    while ( currentNode ) {
      if ( i === index - 1 && currentNode.next ) {
        currentNode.next = currentNode.next.next
        if ( currentNode.next === null ) {
          this.tail = currentNode
        }
        return
      }
      currentNode = currentNode.next
      i++
    }

    throw new Error( 'Index out of bounds' )
  }

  deleteHead () {
    if ( !this.head ) return
    this.head = this.head.next
    if ( !this.head ) {
      this.tail = null
    }
  }

  deleteTail () {
    if ( !this.head ) return
    let currentNode = this.head
    while ( currentNode.next && currentNode.next !== this.tail ) {
      currentNode = currentNode.next
    }
    currentNode.next = null
    this.tail = currentNode
  }

  updateByIndex ( index: number, newValue: T ) {
    let currentNode = this.head
    let i = 0

    while ( currentNode ) {
      if ( i === index ) {
        currentNode.value = newValue
        return
      }
      currentNode = currentNode.next
      i++
    }

    throw new Error( 'Index out of bounds' )
  }

  getByIndex ( index: number ): T | null {
    if ( index < 0 ) {
      return null
    }

    let currentNode = this.head
    let i = 0

    while ( currentNode ) {
      if ( i === index ) {
        return currentNode.value
      }
      currentNode = currentNode.next
      i++
    }

    return null
  }

  toArray (): T[] {
    const result = []
    let currentNode = this.head
    while ( currentNode ) {
      result.push( currentNode.value )
      currentNode = currentNode.next
    }
    return result
  }

  clone () {
    const newList = new LinkedList<T>()
    let currentNode = this.head

    while ( currentNode ) {
      newList.append( currentNode.value )
      currentNode = currentNode.next
    }

    return newList
  }
}

export default LinkedList
