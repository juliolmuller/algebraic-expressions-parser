
/**
 * @param {expression} string
 */
function syntaxChecker(expression) {
  const openParenCount = expression.split('(').length - 1;
  const closeParenCount = expression.split('(').length - 1;

  const hasOperatorBetweenNumbers = !expression.match(/\d\s+\d/);
  const hasOperatorBetweenNumberAndOpnParen = !expression.match(/\d\s*\(/);
  const hasOperatorBetweenClsParenAndNumber = !expression.match(/\)\s*\d/);
  const hasNoOperatorBetweenOpnParenAndNumber = !expression.match(/\(\s*[/*]/);
  const hasNoOperatorBetweenNumberAndClsParen = !expression.match(/[/*+\-]\s*\)/);

  return openParenCount === closeParenCount
    && hasOperatorBetweenNumbers
    && hasOperatorBetweenNumberAndOpnParen
    && hasOperatorBetweenClsParenAndNumber
    && hasNoOperatorBetweenOpnParenAndNumber
    && hasNoOperatorBetweenNumberAndClsParen
}

export { syntaxChecker as checkSyntax };
