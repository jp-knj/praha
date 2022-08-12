import PreconditionError from './precondition-error';
import { EXCESS_NUMBER_OF_ARGUMENTS, NUMBERS_ARE_NOT_DIVISIBLE} from './constant';

const devide = (...numbers: number[]): number|string => {
    if (numbers.length >= EXCESS_NUMBER_OF_ARGUMENTS) throw new PreconditionError();
    const TotalValue  = numbers.reduce(
        (prev:number, curr:number) => prev / curr,
    );

    return Number.isInteger(TotalValue) ? TotalValue : NUMBERS_ARE_NOT_DIVISIBLE;
};

export default devide;
