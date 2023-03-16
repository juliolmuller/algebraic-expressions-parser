import ExpressionCalculator from 'expression-calculator';

function calculate(expression, args) {
  const calculator = new ExpressionCalculator();
  const output = calculator.compile(expression).calc(args);

  return output;
}

export { calculate };
