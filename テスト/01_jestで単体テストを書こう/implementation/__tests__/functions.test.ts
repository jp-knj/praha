import {
    sumOfArray,
    asyncSumOfArray,
    asyncSumOfArraySometimesZero,
    getFirstNameThrowIfLong,
} from '../functions';
import { NameApiService } from "../nameApiService"
import { DatabaseMock } from "../util"

describe('sumOfArray関数を実行した場合で', () => {
    describe('数値の配列を渡した時', () => {
        it('numberの合計値を返すこと', () => {
            expect(sumOfArray([1, 2, 3])).toBe(6);
        });
    });

    describe('空の配列を渡した時', () => {
        it('エラーでReduce of empty array with no initial value が発生すること', () => {
            expect(() => sumOfArray([])).toThrow(
                'Reduce of empty array with no initial value'
            );
        });
    });

    describe('文字型の配列を渡した時', () => {
        it('テストで担保しないこと', () => {
            /**
             * 型エラーを検出されるため、単体テストを不要と判断する
             * 読み出す前に事前条件で例外処理を投げる
             */
        })
    })
 });

describe("asyncSumOfArray関数を非同期で実行した場合で", () => {
    describe('数値の配列を渡した時', () => {
        it('数値の合計値を返すこと', async () => {
            await expect(asyncSumOfArray([1, 2, 3])).resolves.toBe(6);
        });
    });

    describe('空の配列を渡した時', () => {
        it('エラーでReduce of empty array with no initial value が発生すること', async () => {
            await expect(() => asyncSumOfArray([])).rejects.toThrow(
                'Reduce of empty array with no initial value'
            );
        });
    });
});

describe('asyncSumOfArraySometimeZero関数を実行した場合で', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('numberの配列を渡した時', () => {
        const databaseMockSpy = { save: jest.fn() };

        it('numberの合計値を返すこと', () => {
            asyncSumOfArraySometimesZero([1, 2], databaseMockSpy).then(
                async (data) => {
                    await Promise.all(
                        [
                            expect(data).toBe(3),
                            expect(databaseMockSpy.save).toBeCalledTimes(1)
                        ]
                    )
                }
            );
        });

        describe('numberの配列を渡した時', () => {
            const databaseMockSpy = { save: jest.fn() };
            it('numberの合計値を返すこと', () => {
                return asyncSumOfArraySometimesZero([1, 2, 3], databaseMockSpy).then(
                    (data) => {
                        expect(data).toBe(6);
                        expect(databaseMockSpy.save).toBeCalledTimes(1);
                    }
                );
            });
        });

        describe('sumOfArrayでエラーが発生した時', () => {
            const databaseMockSpy = { save: jest.fn() };
            it('0を返すこと', () => {
                return asyncSumOfArraySometimesZero([], databaseMockSpy).then((data) => {
                    expect(data).toBe(0);
                    expect(databaseMockSpy.save).toBeCalledTimes(1);
                });
            });
        });
    });
});

describe("getFirstNameThrowIfLong() は NameApiService から firstName を取得する", () => {
    let mockGetFirstNameA: NameApiService["getFirstName"]
    beforeEach(() => {
        mockGetFirstNameA = jest.fn(async () => "A")
    })

    describe("firstName.length <= maxNameLength の場合 firstNameを返す", () => {
        it(`maxNameLength = 1, firstName = "A" の場合 "A" を返す`, async () => {
            await expect(getFirstNameThrowIfLong(1, mockGetFirstNameA)).resolves.toBe(
                "A"
            )
        })
    })

    describe("maxNameLength < firstName.length の場合 エラーになる", () => {
        it(`maxNameLength = 0, firstName = "A" の場合 エラーになる`, async () => {
            await expect(
                getFirstNameThrowIfLong(0, mockGetFirstNameA)
            ).rejects.toThrowError()
        })
    })

    it("NameApiServiceからの取得に失敗した場合 エラーになる", async () => {
        const mockGetFirstNameAlwaysThrowError = jest.fn(async () => {
            throw new Error()
        })
        await expect(
            getFirstNameThrowIfLong(1, mockGetFirstNameAlwaysThrowError)
        ).rejects.toThrowError()
    })
})
