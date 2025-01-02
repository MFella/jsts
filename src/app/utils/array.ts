export const findIndexes = <T extends string | number>(
  array: Array<T>,
  predicate: (item: T, index: number) => boolean
): Array<number> => {
  return array
    .map((item, index) => (predicate(item, index) ? index : undefined))
    .filter(item => item !== undefined);
};
