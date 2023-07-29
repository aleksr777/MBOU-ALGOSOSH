class Stack<T> {
  private elements: T[]

  constructor () {
    this.elements = []
  }

  push ( element: T ): void {
    this.elements.push( element )
  }

  pop (): T | undefined {
    return this.elements.pop()
  }
  
  clear (): void {
    this.elements = []
  }

  isEmpty (): boolean {
    return this.elements.length === 0
  }

  size (): number {
    return this.elements.length
  }

  getElements (): T[] {
    return [ ...this.elements ]
  }
}

export { Stack }
