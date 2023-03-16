import { calculate } from './calculator/expression-calculator.js';
// import { calculate } from './calculator/mathjs.js';
import { checkSyntax } from './syntax-checker.js';

function algorithm(expression, args) {
  if (!checkSyntax(expression))
    throw new Error('Syntax Error')

  return calculate(expression, args);
}

export { algorithm as resolve };
