interface Task {
  taskFn: () => Promise<any>;
  resolve: (result: any) => void;
  reject: (error: any) => void;
  priority: boolean;
}

class TaskQueue {
  concurrencyLimit: number;
  runningCount: number;
  queue: any[];
  constructor(concurrencyLimit: number) {
    this.concurrencyLimit = concurrencyLimit;
    this.runningCount = 0;
    this.queue = [];
  }

  enqueue<T>(taskFn: () => Promise<T>, priority = false): Promise<T> {
    return new Promise((resolve, reject) => {
      const task = { taskFn, resolve, reject, priority };
      if (this.runningCount < this.concurrencyLimit) {
        this.runTask(task);
      } else {
        if (priority) {
          this.queue.unshift(task);
        } else {
          this.queue.push(task);
        }
      }
    });
  }

  runTask(task: Task) {
    this.runningCount++;
    task
      .taskFn()
      .then((result) => {
        task.resolve(result);
      })
      .catch((error) => {
        task.reject(error);
      })
      .finally(() => {
        this.runningCount--;
        if (this.queue.length > 0) {
          const nextTask = this.queue.shift();
          this.runTask(nextTask);
        }
      });
  }
}

export default TaskQueue;
