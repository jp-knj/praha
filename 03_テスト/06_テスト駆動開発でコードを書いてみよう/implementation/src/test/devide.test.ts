import { describe, expect, it } from 'vitest';

import devide from '../devide';
import { EXCESS_NUMBER_OF_ARGUMENTS, NUMBERS_ARE_NOT_DIVISIBLE } from '../constant';

describe('devide関数を実行した場合', () => {
    describe('100と10を渡した時', () => {
        it('10が返ってくる', () => {
            expect(devide(100, 10)).toBe(10);
        });
    });

    describe('引数が31個の時', () => {
        it('合計の値ではなく、エラーを表示', () => {
            const numbersOfInvalidArgment: number[] = [...Array(EXCESS_NUMBER_OF_ARGUMENTS).keys()];
            expect(() => devide(...numbersOfInvalidArgment)).toThrowError();
        });
    });

    describe('計算結果がマイナスの場合( 3, 10, 3)を渡したとき', () => {
        it(`${NUMBERS_ARE_NOT_DIVISIBLE}の文字列を返すこと`, () => {
            expect(devide(3, 10, 3)).toBe(NUMBERS_ARE_NOT_DIVISIBLE);
        });
    });
});
