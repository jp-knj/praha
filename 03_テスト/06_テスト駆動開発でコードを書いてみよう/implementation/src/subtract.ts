import PreconditionError from './precondition-error';
import { EXCESS_NUMBER_OF_ARGUMENTS, NEGATIVE_NUMBER} from './constant';

const subtract = (...numbers: number[]): number|string => {
    if (numbers.length >= EXCESS_NUMBER_OF_ARGUMENTS) throw new PreconditionError();
    const TotalValue  = numbers.reduce(
        (prev:number, curr:number) => prev - curr,
    );
    return TotalValue < 0 ? NEGATIVE_NUMBER : TotalValue;
};

export default subtract;
