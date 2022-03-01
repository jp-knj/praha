import { describe, expect, it } from 'vitest';
import add from '../add';

describe('add関数を実行した場合', () => {
  describe('1と2を渡した時', () => {
    it('3が返ってくる', () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  describe('引数が30個未満の時', () => {
    it('合計の値が返ってくる', () => {
      const numbersOfValidArgment: number[] = [...Array(30).keys()];
      expect(add(...numbersOfValidArgment)).toBe(435);
    });
  });

  describe('引数が31個の時', () => {
    it('合計の値ではなく、エラーを表示', () => {
      const numbersOfInvalidArgment: number[] = [...Array(31).keys()];
      expect(() => add(...numbersOfInvalidArgment)).toThrowError();
    });
  });
  describe('引数が数値以外を渡した時', () => {
    it('合計値ではなく、エラーを表示', () => {
      // TypeScriptで型ガードしているためコメントアウト
      // const charsOfInvalidArgment: string[] = ['A', 'B', 'C']
      // expect(() => add(...charsOfInvalidArgment)).toThrowError();
    });
  });
});
