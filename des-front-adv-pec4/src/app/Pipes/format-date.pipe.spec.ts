import { FormatDatePipe } from "./format-date.pipe";

describe("FormatDatePipe", () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("data and argument 1 success", () => {
    const date = new Date(2024, 0, 31, 10, 0, 0);
    const expected = '31012024';

    const result = pipe.transform(date, 1);

    expect(result).toBe(expected);
  });

  it("data and argument 2 success", () => {
    const date = new Date(2024, 0, 31, 10, 0, 0);
    const expected = '31 / 01 / 2024';
    
    const result = pipe.transform(date, 2);

    expect(result).toBe(expected);
  });

  it("data and argument 3 success", () => {
    const date = new Date(2024, 0, 31, 10, 0, 0);
    const expected = '31/01/2024';
    
    const result = pipe.transform(date, 3);

    expect(result).toBe(expected);
  });

  it("data and argument 4 success", () => {
    const date = new Date(2024, 0, 31, 10, 0, 0);
    const expected = '2024-01-31';
    
    const result = pipe.transform(date, 4);

    expect(result).toBe(expected);
  });
});
