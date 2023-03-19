type DebouncerOptions = { delay?: number };

class Debouncer {
  timeout: NodeJS.Timer | number;
  delay: number;

  constructor({ delay = 500 }: DebouncerOptions = { delay: 500 }) {
    this.delay = delay;
    this.timeout = 0;
  }

  exec(fn: () => void, delay = this.delay) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      fn();
    }, delay);
  }
}

export default Debouncer;
