declare global {
  interface Array<T> {
    findIndexes: (
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ) => Array<number>;
  }
}

if (!Array.prototype.findIndexes) {
  Array.prototype.findIndexes = (
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): Array<number> => {
    const array = Object(this);
    const length = array.length >>> 0; // Ensure length is a non-negative integer

    const resultArray = [];
    for (let i = 0; i < length; i++) {
      if (predicate.call(thisArg, array[i], i, array)) {
        resultArray.push(i); // Return the index of the first match
      }
    }
    return resultArray; // Return -1 if no match is found
  };
}

const x = [123, 32, 3];
x.findIndexes(a => a > 4);
