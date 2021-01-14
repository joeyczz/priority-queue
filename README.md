# priority-queue
[![codecov](https://codecov.io/gh/joeyczz/priority-queue/branch/main/graph/badge.svg?token=25AFW589LG)](https://codecov.io/gh/joeyczz/priority-queue)


# ts 优先队列 实现

```
import PriorityQueue from 'priority-queue';

const priorityQueue = new PriorityQueue<number>({
  initial: [3, 9, 6, 5, 10, 2, 7, 1],
  priorityFn: (a, b) => a < b,
});

priorityQueue.add(8);

console.log("出队元素：" + priorityQueue.pool());

console.log("出队元素：" + priorityQueue.pool());

```
