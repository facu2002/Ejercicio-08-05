import "mocha";
import { expect } from "chai";
import { hola } from "../src/index.js";


describe('Funcion hola()', () => {
  it("Test hola mundo", () => {
    expect(hola()).to.be.equal("Hola mundo");
  });
});