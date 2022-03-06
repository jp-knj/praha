import axios from "axios";

export type Data = {
    data:{
        first_name: string
    }
}

export class NameApiService {
  private MAX_LENGTH = 4;
  public constructor() {}

  public async getFirstName(): Promise<string> {
    const { data } = await axios.get(
      "https://random-data-api.com/api/name/random_name"
    ) as Data;
    const firstName = data.first_name;

    if (firstName.length > this.MAX_LENGTH) {
      throw new Error("firstName is too long!");
    }

    return firstName;
  }
}
