import axios from 'axios'
import { NameApiService} from '../nameApiService'
import type { Data } from '../nameApiService'

const mockResponse = (firstName: string): Data => ({
    data: {
        first_name: firstName,
    },
})

describe('NameApiServiceクラスをインスタンス化した場合に', () => {
    let nameApiService: NameApiService
    beforeEach(() => {
        nameApiService = new NameApiService()
    })

    describe('非同期が成功して', () => {
        describe('取得したデータの`first_name`が４文字以下だった場合、first_nameを返す', () =>{
            it('knj を取得したら、knjを返す', async () => {
                jest.spyOn(axios, "get").mockResolvedValue(mockResponse('knj'))
                await expect(nameApiService.getFirstName()).resolves.toBe("knj")
            })
        });

        describe('取得したデータの`first_name`が４文字以上だった場合、エラーを返す', () =>{
            it('kenji を取得したら、エラーでfirstName is too long!を返す', async () => {
                jest.spyOn(axios, "get").mockResolvedValue(mockResponse("kenji"))
                await expect(nameApiService.getFirstName()).rejects.toThrowError('firstName is too long!')
            })
        })

        it("取得したデータがnullの場合 エラーになる", async () => {
            jest.spyOn(axios, "get").mockResolvedValue({ data: null })
            await expect(nameApiService.getFirstName()).rejects.toThrowError()
        })
    })
    describe("APIからの取得に失敗した場合 エラーになる", () => {
        it("APIがエラーになった場合 エラーになる", async () => {
            jest.spyOn(axios, "get").mockImplementation(async () => {
                throw Error()
            })
            await expect(nameApiService.getFirstName()).rejects.toThrowError()
        })
    })
});