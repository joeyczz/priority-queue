interface PriorityQueueOptions<T> {
  /**
   * 初始数据
   */
  initial?: T[];
  /**
   * 传入排序
   */
  priorityFn?: (a: T, b: T) => boolean;
}

/**
 * 默认排序
 * @param a
 * @param b
 */
const defaultPriorityFn = (a: any, b: any) => {
  if (typeof a !== typeof b) {
    throw `error data type with ${typeof a} ${typeof b}`;
  }
  if (typeof a !== "number" && typeof a !== "string") {
    throw `error data type with ${typeof a} ${typeof b}`;
  }
  return a < b;
};

/**
 * 返回父节点index
 * @param childIndex
 */
const getParentIndex = (childIndex: number) => Math.floor((childIndex - 1) / 2);

/**
 * 返回子节点index
 * @param parentIndex
 */
const getLeftChildIndex = (parentIndex: number) => 2 * parentIndex + 1;

/**
 * 优先队列
 */
class PriorityQueue<T> {
  /**
   * 数据集合
   */
  private vals: T[] = [];

  /**
   * 排序方法
   */
  private fn: (a: T, b: T) => boolean;

  /**
   * 构造函数
   */
  constructor(options?: PriorityQueueOptions<T>) {
    const { initial, priorityFn } = options ?? {};

    this.fn = priorityFn ?? defaultPriorityFn;

    if (initial) {
      // 初始队列
      this.vals.push(...initial);
      this.initQueue();
    }
  }

  /**
   * 初始队列
   */
  private initQueue() {
    // 构造 二叉堆 数据 从最后一个非叶子节点开始 依次下沉调整
    let i = getParentIndex(this.vals.length - 1);
    for (; i >= 0; i--) {
      this.downAdjust(i);
    }
  }

  /**
   * 上浮调整
   */
  private upAdjust() {
    /* istanbul ignore next */
    if (this.vals.length <= 0) return;
    let childIndex = this.vals.length - 1;
    let parentIndex = getParentIndex(childIndex);

    // temp 保存插入的叶子节点值 用于最后的赋值
    const temp = this.vals[childIndex];

    // 当前点优先于父节点
    while (childIndex > 0 && this.fn(temp, this.vals[parentIndex])) {
      // 替换子节点
      this.vals[childIndex] = this.vals[parentIndex];
      childIndex = parentIndex;
      parentIndex = getParentIndex(parentIndex);
    }
    this.vals[childIndex] = temp;
  }

  /**
   * 上浮调整
   */
  private downAdjust(parentNodeInde = 0) {
    if (this.vals.length <= 0) return;
    // temp保存父节点值，用于最后的赋值
    let parentIndex = parentNodeInde;
    let temp = this.vals[parentIndex];

    let childIndex = getLeftChildIndex(parentIndex);
    while (childIndex < this.vals.length) {
      // 如果有右孩子，且右孩子 优先于 左孩子，则定位到右孩子
      if (
        childIndex + 1 < this.vals.length &&
        this.fn(this.vals[childIndex + 1], this.vals[childIndex])
      ) {
        childIndex++;
      }

      // 如果父节点 优先于 相对优先的孩子 直接跳出
      if (!this.fn(this.vals[childIndex], temp)) break;

      // 替换父节点
      this.vals[parentIndex] = this.vals[childIndex];
      parentIndex = childIndex;
      childIndex = getLeftChildIndex(childIndex);
    }
    this.vals[parentIndex] = temp;
  }

  /**
   * 入队列
   * @param val
   */
  add(val: T) {
    this.vals.push(val);
    // 调整队列
    this.upAdjust();
  }

  /**
   * 出队列
   */
  pool() {
    if (this.vals.length <= 0) return null;
    // 取出当前head
    const head = this.vals[0];

    // 替换最后一个子节点到head
    this.vals[0] = this.vals[this.vals.length - 1];
    // 删除原来的节点
    this.vals.pop();
    // 调整队列
    this.downAdjust();
    return head;
  }

  /**
   * 检查是否空队列
   */
  isEmpty() {
    return this.vals.length <= 0;
  }
}

export default PriorityQueue;
