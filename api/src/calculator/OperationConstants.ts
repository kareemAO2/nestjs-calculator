export const operations: Record<string, string> = {
  ADD: '+',
  SUBTRACT: '-',
  DIVIDE: '/',
  MULTIPLY: '*',
} as const;

export type OperationFunction = {
  readonly [k in keyof typeof operations]: (
    num1: number,
    num2: number,
  ) => number;
};

export const operationFunctions: OperationFunction = {
  ADD: (num1, num2) => {
    return num1 + num2;
  },
  SUBTRACT: (num1, num2) => {
    return num1 - num2;
  },
  DIVIDE: (num1, num2) => {
    return num1 / num2;
  },
  MULTIPLY: (num1, num2) => {
    return num1 * num2;
  },
};
