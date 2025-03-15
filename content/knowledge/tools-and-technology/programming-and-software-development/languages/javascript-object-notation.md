---
title: JavaScript Object Notation
description: A lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.
aliases:
  - JSON
  - json
  - .json
tags:
  - web
  - javascript
  - data-structure
---
[[javascript|JavaScript]] Object Notation (JSON) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.

### Key Characteristics of  JSON:

- **Textual Data Format**: JSON is purely textual, making it easy to read and write for humans and straightforward for machines to parse and generate.
- **Language Independence**: Although derived from JavaScript, JSON is language-independent. It can be used across various programming languages, making it highly versatile for data exchange between systems written in different languages.
- **Data Structure Support**: JSON supports basic types such as numbers, strings, booleans, arrays, and objects, allowing for complex data structures to be represented.
- **Standardized Format**: Being standardized, JSON ensures consistency in how data is structured and exchanged, reducing the likelihood of errors and misunderstandings.

### JSON Syntax:

JSON syntax is designed to be concise and readable. A JSON text is composed of scalar values, ordered lists of values, and collections of name/value pairs. Here's a brief overview of the syntax:

- **Objects**: An unordered collection of zero or more name/value pairs. An object begins with `{` (left brace) and ends with `}` (right brace). Each name is followed by `:` (colon) and the associated value.
  
  Example:
  ```json
  {
      "name": "John Doe",
      "age": 30,
      "isEmployed": true
  }
  ```

- **Arrays**: An ordered sequence of zero or more values. An array begins with `[` (left bracket) and ends with `]` (right bracket).
  
  Example:
  ```json
  [
      {"name": "John Doe", "age": 30},
      {"name": "Jane Doe", "age": 28}
  ]
  ```

- **Values**: A value can be a string, number, boolean (`true` or `false`), null, another JSON object, or an array. Strings are enclosed in double quotes.

### Uses of JSON:

- **Web Applications**: JSON is widely used for transmitting data between a server and a web application, serving as an alternative to XML.
- **Configuration Files**: Many applications use JSON files for configuration settings due to their readability and ease of editing.
- **APIs**: APIs often use JSON for request and response bodies because of its lightweight nature and ease of parsing.
- **Data Storage and Exchange**: JSON is used in databases and file formats for storing and exchanging data.

### Conclusion:

JavaScript Object Notation (JSON) has become one of the most popular data interchange formats due to its simplicity, flexibility, and wide-ranging support across programming languages and platforms. Its ability to represent complex data structures in a human-readable format makes it an invaluable tool for developers working on web applications, APIs, and beyond.

Citations:
