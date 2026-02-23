# Valid Parentheses

## Problem Statement

Given a string consisting of the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

A string is considered valid if:

- Open brackets are closed by the same type of brackets.
- Open brackets are closed in the correct order.
- Every closing bracket has a corresponding opening bracket of the same type.

You need to implement a function that takes a string as input and returns a boolean value indicating whether the string is valid.

---

## Input

A single string:

s = input string containing only the characters '(', ')', '{', '}', '[' and ']'

---

## Output

Return `true` if the string is valid, otherwise return `false`.

---

## Example 1

Input:
s = "()"

Output:
true

---

## Example 2

Input:
s = "()[]{}"

Output:
true

---

## Example 3

Input:
s = "(]"

Output:
false

---

## Example 4

Input:
s = "([)]"

Output:
false

---

## Example 5

Input:
s = "{[]}"

Output:
true

---