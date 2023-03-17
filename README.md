# String Expression Calculator

A basic proof-of-concept (POC) project in order to analyze a solution for stringified math expressions with support to helper functions for complex operations.

## ⚒️ Configuring the Project

After cloning this repository, run the following command in a terminal, to install external packages the project depends on:

```bash
$ npm install
```

## ⚙️ Supported Functions

- **IF** - based on a boolean condition test, use an expression or another:
  ```
  IF(
    condition: boolean,
    then: number | Expression,
    otherwise: number | Expression,
  )
  ```
  
- **SWITCH** - cumulative sum the output of various expressions after the first condition met:
  ```
  SWITCH(
    condition1: boolean,
    then1: number | Expression,
    ...[
      conditionN: boolean, 
      thenN: number | Expression,
    ],
    default?: number,
  )
  ```

## 🚀 Execute the Program

This POC was implemented as a CLI application, although the core functionality is isolated in other modules. In the root directory, you'll need to provide an expression and, if there are any variables to be ejected, state afterwards using the notation `var_name=var_value`:

```bash
$ node . expression [va1=value1 [va2=value2 [...]]]
```

## Use Cases & Examples

### Fixed Values

This is the simplest expression possible, assuming you have an expression yhat only depends on a constant:

```bash
$ node . "12500"
# ----------------------
# output: 12500
```

### Fixed Calculation

For some reason, you may want to break down a constant into the calculation that result it, so you may write arithmetic expressions using `+`, `-`, `/`, `*` and `()`, naturally following the precedence rules:

```bash
$ node . "60 * 24 * ((3 + 5) / 0.5)"
# ----------------------
# output: 23040
```

### Factor-Based Calculation

On any expression, you may want to reference variables that will dynamically be injected in the expression in runtime:

```bash
$ node . "var1 * 800" var1=6.5
# ----------------------
# output: 5200
```

### Range Calculation

Heading to more complex scenarios, we have the _range calculation_, which could be represented more graphically like this:

| Range | Value |
| :-: | - |
| Up to 10 | 800 |
| From 100to 20 | 1000 |
| From 20 to 30 | 1150 |
| Above 30 | 1250 |

If we had to write this in a Excel spreadsheet, we would think of using nested `IF()` functions covering all these ranges. Similarly, the program supports a `IF()` function that follows the same syntax of Excel's:

```bash
$ node . "IF(var1 <= 10, 800, IF(var1 <= 20, 1000, IF(var1 <= 30, 1150, 1250)))" var1=15
# ----------------------
# output: 1000
```

...and by running the same expression, but only updating thevalue of `var1`:

```bash
$ node . "IF(var1 <= 10, 800, IF(var1 <= 20, 1000, IF(var1 <= 30, 1150, 1250)))" var1=28
# ----------------------
# output: 1150
```

### Cumulative Range Calculations

As a matter of trying additional and advanced calculations, this POC also implemented another function that will cumulative sum the next conditions values. We could graphically represent it like this:

| # | Range | Value |
| - | :-: | - |
| A | Up to 10 | 800 |
| B | From 100to 20 | 100 + A |
| C | From 20 to 30 | 80 + A + B |
| D | Above 30 | 50 + A + B + C |

Abstracting this logic to a single expression,we can use a function that I called here `SWITCH()` (as its logic is similar to `switch-case` of some programming languages, where the first match, the execution may fall through the below code without testing the condition):

```bash
$ node . "SWITCH(
>           var1 > 30, 50,
>           var1 > 20, 80,
>           var1 > 10, 100,
>           800
>         )" var1=21
# ----------------------
# output: 980
```

## 📑 Pros & Cons

- 🟩 One single backend logic/structure;
- 🟩 One single value to store (a plain string);
- 🟩 Different input logics (tariff types) will be restricted only to UI;
- 🟩 Providing a custom universal way to write a formula/calculation will unlock users "forever";
- 🟩 Scaling in backend would be restrict to writing utility formulas for the algorithm;
- 🟥 Copling to an external library;
- 🟥 Using `math.js`, each compilation and calculation takes 15 to 20 milliseconds;
  - Can we store compiled algorithms?
  - Can we use compiled expressions during multiple calculations use case?
- 🟥 It will require a huge UI component for code input, providing autocomplete for variables and functions, code highlight and syntax checking;

