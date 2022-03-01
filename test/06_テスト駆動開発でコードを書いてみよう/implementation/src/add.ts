import PreconditionError from './precondition-error';

const add = (...nums: number[]): number|string => {
  if (nums.length >= 31) throw new PreconditionError();
  const sumOfnums = nums.reduce(
    (prev:number, curr:number) => prev + curr
  );
  return sumOfnums >= 1000 ? 'too big' : sumOfnums;
};

export default add;
