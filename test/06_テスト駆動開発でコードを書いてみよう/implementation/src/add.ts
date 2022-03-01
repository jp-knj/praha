import PreconditionError from './precondition-error';

const add = (...nums: number[]):number => {
  if (nums.length >= 31) throw new PreconditionError();
  return nums.reduce(
    (prev:number, curr:number) => prev + curr,
  );
};

export default add;
