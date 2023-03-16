import * as math from 'mathjs';

export function calculate(expression, args) {
  const parser = math.parser();

  parser.set('IF', ifFunction);
  parser.set('SWITCH', switchFunction);
  Object.entries(args).forEach(([key, value]) => parser.set(key, value));

  const output = parser.evaluate(expression);

  return output;
}

/**
 * @param {condition} boolean
 * @param {then} number
 * @param {otherwise} number
 */
function ifFunction(condition, then, otherwise) {
  return condition ? then : otherwise;
}

/**
 * @param {condition1}  boolean
 * @param {then1}  number
 * @param {rest} array
 */
function switchFunction(...args) {
  let metCondition = false;
  let [result] = args.length > 2 && args.length % 2 === 1
    ? args.splice(-1)
    : 0;

  while (args.length) {
    const [condition, then] = args.splice(0,2);

    if (metCondition || condition) {
      metCondition = true;
      result += then;
    }
  }

  return result;
}
