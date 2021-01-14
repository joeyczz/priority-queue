import PriorityQueue from "../src";

// [3, 9, 6, 5, 10, 2, 7, 1]
test("priorityQueue num initial null", () => {
  const priorityQueue = new PriorityQueue<number>({});

  const _top = priorityQueue.pool();
  expect(_top).toBe(null);

  priorityQueue.add(5);
  priorityQueue.add(1);
  priorityQueue.add(3);
  const _top2 = priorityQueue.pool();
  expect(_top2).toBe(1);
});

test("priorityQueue num > ", () => {
  const priorityQueue = new PriorityQueue<number>({
    initial: [3, 10, 2, 7, 1],
    priorityFn: (a, b) => a > b,
  });

  const _top = priorityQueue.pool();
  expect(_top).toBe(10);

  priorityQueue.add(6);
  priorityQueue.add(11);
  priorityQueue.add(8);
  const _top2 = priorityQueue.pool();
  expect(_top2).toBe(11);
});

test("priorityQueue class no fn throws error", () => {
  class Num {
    val: number;
    constructor(v: number) {
      this.val = v;
    }
  }

  expect(
    () =>
      new PriorityQueue<Num>({
        initial: [new Num(3), new Num(10), new Num(2), new Num(7), new Num(1)],
        // priorityFn: (a, b) => a > b,
      })
  ).toThrowError();
});

test("priorityQueue isEmpty fn", () => {
  const priorityQueue = new PriorityQueue<number>();

  priorityQueue.add(9);

  const noEmpty = priorityQueue.isEmpty();

  expect(noEmpty).toBe(false);

  priorityQueue.pool();

  const empty = priorityQueue.isEmpty();

  expect(empty).toBe(true);
});
