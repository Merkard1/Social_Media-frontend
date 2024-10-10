import { StateSchema } from "1_app/providers/StoreProvider";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { Age } from "5_entities/Age";
import { getProfileForm } from "./getProfileForm";

describe("getProfileForm.test", () => {
  test("should return error", () => {
    const data = {
      username: "admin",
      age: Age.Age18,
      country: Country.AF,
      lastname: "ulbi tv",
      first: "asd",
      city: "asf",
      currency: Currency.USD,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});