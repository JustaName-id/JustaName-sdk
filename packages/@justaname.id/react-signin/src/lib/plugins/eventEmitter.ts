export class EventEmitter {
  private events: { [eventId: string]: Array<(data: any) => void> } = {};

  on(eventId: string, listener: (data: any) => void) {
    if (!this.events[eventId]) this.events[eventId] = [];
    this.events[eventId].push(listener);
  }

  emit(eventId: string, data: any) {
    if (this.events[eventId]) {
      this.events[eventId].forEach((listener) => listener(data));
    }
  }
}