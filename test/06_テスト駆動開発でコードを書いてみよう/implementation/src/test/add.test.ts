import { describe, expect, it } from 'vitest';
import { add } from '../add'


describe('add関数を実行した場合', () => {
    it('1と2を渡した時、3が返ってくる', () => {
        expect(add(1, 2)).toBe(3)
    })
})