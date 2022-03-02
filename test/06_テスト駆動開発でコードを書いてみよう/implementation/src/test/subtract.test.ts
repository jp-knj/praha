import { describe, expect, it } from 'vitest';

import subtract from '../subtract';
import { EXCESS_NUMBER_OF_ARGUMENTS, NEGATIVE_NUMBER } from '../constant';

describe('subtract関数を実行した場合', () => {
    describe('2と1を渡した時', () => {
        it('1が返ってくる', () => {
            expect(subtract(2, 1)).toBe(1);
        });
    });

    describe('引数が30個未満の時', () => {
        it('合計の値が返ってくる', () => {
            const numbersOfValidArgment: number[] = [ 10000, ...Array(29).keys()];
            expect(subtract(...numbersOfValidArgment)).toBe(9594);
        });
    });

    describe('引数が31個の時', () => {
        it('合計の値ではなく、エラーを表示', () => {
            const numbersOfInvalidArgment: number[] = [...Array(EXCESS_NUMBER_OF_ARGUMENTS).keys()];
            expect(() => subtract(...numbersOfInvalidArgment)).toThrowError();
        });
    });

    describe('計算結果がマイナスの場合( 3, 10, 3)を渡したとき', () => {
        it('「negative big」の文字列を返すこと', () => {
            expect(subtract(3, 10, 3)).toBe(NEGATIVE_NUMBER);
        });
    });
});
