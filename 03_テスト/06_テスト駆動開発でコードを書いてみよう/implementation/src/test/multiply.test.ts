import { describe, expect, it } from 'vitest';

import multiply from '../multiply';
import { EXCESS_NUMBER_OF_ARGUMENTS, BIG_BIG_NUMBER } from '../constant';

describe('multiply関数を実行した場合', () => {
    describe('3、10, 3を渡した時', () => {
        it('10が返ってくる', () => {
            expect(multiply(3, 10, 3)).toBe(90);
        });
    });

    describe('引数が30個未満の時', () => {
        it('合計の値が返ってくる', () => {
            const numbersOfValidArgment: number[] = [ ...Array(30).keys()];
            expect(multiply(...numbersOfValidArgment)).toBe(0);
        });
    });

    describe('引数が31個の時', () => {
        it('合計の値ではなく、エラーを表示', () => {
            const numbersOfInvalidArgment: number[] = [...Array(EXCESS_NUMBER_OF_ARGUMENTS).keys()];
            expect(() => multiply(...numbersOfInvalidArgment)).toThrowError();
        });
    });

    describe('計算結果が1000 超える値(251, 4)を渡したとき', () => {
        it(`${BIG_BIG_NUMBER} の文字列を返すこと`, () => {
            expect(multiply(251, 4)).toBe(BIG_BIG_NUMBER);
        });
    });
});
