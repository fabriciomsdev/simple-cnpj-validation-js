const isCNPJ = require("../index");

describe("isCNPJ", () => {
  it("should fail when given an empty argument", () => {
    expect(isCNPJ()).toBe(false);
  });

  it("should fail when given an empty string", () => {
    expect(isCNPJ("")).toBe(false);
  });

  it("should fail when given an argument with invalid size", () => {
    expect(isCNPJ("3243243")).toBe(false);
  });

  it("should fail when given an invalid CNPJ", () => {
    const invalidsCNPJ = [
      "1".repeat(14),
      "343433434324234234",
      "3242343243(3434)",
      "fadslk;fdsajf"
    ];

    const results = invalidsCNPJ.map(notCNPJ => isCNPJ(notCNPJ));

    expect(results).not.toContain(true);
  });

  it("should pass when given a valid CNPJ", () => {
    const validsCNPJ = [
      "85.064.016/0001-10",
      "09646384000199",
      "43.146.965/0001-08",
      "43146.965000108"
    ];

    const results = validsCNPJ.map(cnpj => isCNPJ(cnpj));

    expect(results).not.toContain(false);
  });
});
