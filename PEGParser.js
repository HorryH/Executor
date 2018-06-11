import * as primitive from "./PrimitiveGrammar";
const peg = require("pegjs");

export function parsePrimitive (code) {
  return primitive.parse(code);
}

export function generateAndParse (grammar, code) {
  const parser = peg.generate(grammar);
  return parser.parse(code);
}