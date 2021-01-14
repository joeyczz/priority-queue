import PriorityQueue from "../src";

const priorityQueue = new PriorityQueue<number>({
  initial: [3, 9, 6, 5, 10, 2, 7, 1],
  // priorityFn: (a, b) => a < b,
});
// priorityQueue.add(3);

// priorityQueue.add(5);

// priorityQueue.add(10);

// priorityQueue.add(2);

// priorityQueue.add(7);

console.log("出队元素：" + priorityQueue.pool());

console.log("出队元素：" + priorityQueue.pool());
