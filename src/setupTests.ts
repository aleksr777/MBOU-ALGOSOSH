import '@testing-library/jest-dom';

type MockROCallback = ( entries: any[], observer: ResizeObserver ) => void

class MockResizeObserver {
  callback: MockROCallback

  constructor ( callback: MockROCallback ) {
    this.callback = callback
  }

  observe ( target: Element ) {
    // Имитация наблюдения за изменением размера элемента.
  }

  unobserve ( target: Element ) {
    // Имитация прекращения наблюдения за изменением размера элемента.
  }

  disconnect () {
    // Имитация прекращения всех наблюдений.
  }
}

global.ResizeObserver = MockResizeObserver

export { }
