import PreconditionError from './precondition-error';
import { EXCESS_SUM_OF_NUMBERS, EXCESS_NUMBER_OF_ARGUMENTS, TOO_BIG } from './constant';

const add = (...numbers: number[]): number|string => {
  if (numbers.length >= EXCESS_NUMBER_OF_ARGUMENTS) throw new PreconditionError();
  const TotalValue  = numbers.reduce(
    (prev:number, curr:number) => prev + curr,
  );
  return TotalValue >= EXCESS_SUM_OF_NUMBERS ? TOO_BIG : TotalValue;
};

export default add;
