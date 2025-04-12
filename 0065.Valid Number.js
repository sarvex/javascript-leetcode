/**
 * Regular Expression
 * @intuition The problem defines a complex set of rules for what constitutes a valid number. These rules involve patterns like optional signs, sequences of digits, optional decimal points (with specific placement rules), and optional exponents (also with signs and digits). Regular expressions are specifically designed to match such complex patterns in strings, making them a natural fit for this validation task.
 * @approach
 * Define a single regular expression that captures all the valid formats for a number according to the problem description.
 * The regex breaks down as follows:
 *   `^`: Matches the start of the string.
 *   `[+-]?`: Matches an optional plus or minus sign at the beginning.
 *   `(`: Starts a group for the main number part (either integer or decimal).
 *      `\d+(\.\d*)?`: Matches an integer part (`\d+`) followed by an optional decimal part (`\.` followed by zero or more digits `\d*`). This covers cases like "123", "123.", "123.45".
 *      `|`: OR
 *      `\.\d+`: Matches a decimal number starting with a dot followed by one or more digits. This covers cases like ".45".
 *   `)`: Ends the main number part group.
 *   `([eE][+-]?\d+)?`: Matches an optional exponent part:
 *      `[eE]`: Matches 'e' or 'E'.
 *      `[+-]?`: Matches an optional sign for the exponent.
 *      `\d+`: Matches one or more digits for the exponent value.
 *      `?`: Makes the entire exponent group optional.
 *   `$`: Matches the end of the string.
 * Use the `test()` method of the regex object to check if the input string `s` matches the pattern.
 * @complexity
 * Time: O(n), where n is the length of the string `s`. While regex matching can be complex, for patterns like this that avoid complex backreferences, the time complexity is typically linear with respect to the input string length in most modern regex engines.
 * Space: O(1) (or O(k) where k is the regex size, considered constant). The space used is primarily for storing the compiled regex, which is independent of the input string length.
 */
const isNumber = (s) => /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(s);
