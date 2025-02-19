---
aliases:
  - OOP
tags:
  - programmation/paradigme
---
Object-oriented programming (OOP) is a programming paradigm that uses "objects" to design software. These objects are instances of classes, which are essentially templates that define the data and the methods (functions) that can operate on that data. OOP organizes code around these objects and data rather than actions and logic, making it easier to manage complexity, especially in large software systems.

### Key Points to Consider

- **Objects and Classes**: At the heart of OOP are objects, which are instances of classes. A class acts as a blueprint for creating objects, defining what data they contain (attributes) and what operations can be performed on them (methods).
- **Principles of OOP**: The main principles of OOP include encapsulation (bundling data and methods together within objects), inheritance (allowing classes to inherit attributes and methods from other classes), polymorphism (enabling objects of different types to respond to the same message in their own way), and abstraction (hiding the internal details of how an object works).
- **Benefits of OOP**: OOP promotes code reusability, scalability, and efficiency. By organizing code around objects and their interactions, it becomes easier to manage large and complex software systems. Additionally, OOP facilitates collaborative development by allowing teams to work on different parts of a program independently.

### Code Examples

Consider a simple example in [[Python]] to illustrate these concepts:

```python
class Car:
    # Class attribute
    wheels = 4

    # Instance attributes
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    # Method
    def honk(self):
        print(f"The {self.brand} {self.model} says honk!")

# Creating an object of class Car
my_car = Car("Toyota", "Corolla")

# Accessing attributes
print(my_car.wheels)  # Output: 4
print(my_car.brand)   # Output: Toyota

# Calling a method
my_car.honk()         # Output: The Toyota Corolla says honk!
```

In this example, `Car` is a class that defines a blueprint for car objects. Each car object has attributes like `brand` and `model`, and a method `honk()` that represents an action the car can perform.

### Summary

Object-oriented programming is a paradigm that organizes code around objects and data rather than actions and logic. It is based on several core principles, including encapsulation, inheritance, polymorphism, and abstraction, which together facilitate the development of complex software systems. By promoting code reusability and scalability, OOP makes it easier to manage large projects and collaborate effectively within development teams.
