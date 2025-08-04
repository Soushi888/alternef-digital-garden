# AI Prompt Library for Rust & Holochain Learning

*Lead Magnet: 50+ Curated Prompts for Accelerated Development*

This comprehensive prompt library has been refined through months of building production Holochain applications. Each prompt is designed to get maximum value from AI assistants while building deep understanding of distributed systems.

## How to Use This Library

### General Guidelines
- Replace `[placeholders]` with your specific content
- Provide context when possible (paste relevant code, documentation links)
- Ask follow-up questions to deepen understanding
- Always review AI-generated code before using it

### Prompt Categories
1. **Understanding & Architecture** - Grasp complex concepts
2. **Development & Implementation** - Build features effectively  
3. **Debugging & Problem Solving** - Fix issues systematically
4. **Code Review & Quality** - Improve code quality
5. **Learning & Progression** - Accelerate skill development

---

## 🏗️ Understanding & Architecture Prompts

### 1. Concept Connection
```
I understand [concept A] in Holochain. Now I want to learn [concept B]. 
Connect these concepts and show me how they work together with a practical 
example relevant to [your project type].
```

### 2. Architecture Pattern Analysis
```
I'm looking at this Holochain code: [paste code]

Walk me through the architecture pattern being used here and why it's 
structured this way. What are the benefits and potential drawbacks? 
How does this pattern scale in a distributed environment?
```

### 3. Design Review
```
I'm designing a [type of app]. Here's my data structure: [paste structs]

Can you review this design and suggest improvements for a Holochain context? 
Consider:
- Query performance and link structure
- Validation complexity and security
- Scalability across the DHT
- User privacy implications
```

### 4. Cross-Technology Translation
```
I know how to do [specific task] in [other technology]. How would I 
accomplish the same thing in Holochain? 

Show me the equivalent patterns and explain the key differences in approach, 
particularly around data distribution and validation.
```

### 5. DHT Data Flow Visualization
```
Can you explain how data flows through the DHT when [specific action occurs] 
in my [type of app]? 

Walk me through each step from user action to data storage and retrieval, 
including which agents are involved and how validation occurs.
```

---

## 🔨 Development & Implementation Prompts

### 6. Feature Implementation Planning
```
I want to implement [feature description] in my Holochain app. 

Break this down into:
1. Required data structures (Rust structs/enums)
2. Necessary validation rules
3. Link types for efficient querying
4. Zome functions needed
5. Potential edge cases to consider

Show me a step-by-step implementation plan.
```

### 7. Validation Logic Design
```
For my [type of entry] in a [domain] app, what validation rules should I 
implement? Consider:
- Data integrity constraints
- Business logic validation  
- Security implications
- Performance impact

Show me example Rust validation functions.
```

### 8. Link Strategy Optimization
```
I'm building [app description] and need to design links for efficient querying.

My main query patterns are:
- [query 1]
- [query 2]  
- [query 3]

What link types should I create? Show me the Rust enum definitions and 
explain the trade-offs of different linking strategies.
```

### 9. Error Handling Patterns
```
Show me comprehensive error handling patterns for Holochain zome functions. 

Include:
- Common error types in [my domain]
- Proper error propagation with the ? operator
- User-friendly error messages
- Error recovery strategies

Use [my specific use case] as an example.
```

### 10. Frontend Integration Strategy
```
I'm using [frontend framework] with my Holochain app. Show me:

1. How to structure the connection between frontend and conductor
2. Best practices for handling asynchronous operations
3. Error handling on the frontend
4. Real-time updates and subscription patterns

Include practical code examples.
```

---

## 🐛 Debugging & Problem Solving Prompts

### 11. Error Analysis Framework
```
I'm getting this Holochain error: [paste full error message]

Please:
1. Explain what's happening and why
2. Identify the root cause
3. Provide 2-3 different solutions with trade-offs
4. Show me how to prevent this error in the future
5. Suggest debugging techniques for similar issues
```

### 12. Performance Investigation
```
My Holochain app seems slow when [specific action]. 

Help me investigate:
- Common performance bottlenecks in this scenario
- How to profile and measure performance
- Specific optimizations for Holochain apps
- Tools and techniques for performance debugging

My app architecture: [brief description]
```

### 13. Validation Failure Diagnosis
```
My entry validation is failing with: [error message]

Here's my validation function: [paste code]
Here's the entry data: [paste data]

Help me debug this step by step and explain why the validation might be 
failing. What should I check and how can I improve the validation logic?
```

### 14. Network Behavior Analysis
```
I'm seeing inconsistent behavior across different agents in my network. 

Symptoms: [describe behavior]
App type: [description]
Network size: [number of agents]

Help me understand:
- Possible causes of network inconsistency
- How to debug multi-agent scenarios
- Best practices for network reliability
- Tools for monitoring network behavior
```

### 15. Data Consistency Troubleshooting
```
I'm experiencing data consistency issues where [describe specific problem].

My link structure: [describe links]
My validation rules: [describe validation]

Help me:
1. Understand why this inconsistency might occur
2. Debug the issue systematically  
3. Implement proper consistency checks
4. Design patterns to prevent future issues
```

---

## 🔍 Code Review & Quality Prompts

### 16. Comprehensive Code Review
```
Please review this Holochain code for:
- Security vulnerabilities
- Performance optimizations
- Code quality and maintainability
- Holochain best practices
- Potential edge cases

Code: [paste code]
Context: [brief description of purpose]
```

### 17. Security Audit
```
Audit this code for security issues:

[paste code]

Focus on:
- Validation bypass possibilities
- Data integrity risks
- Access control weaknesses
- Common Holochain security pitfalls

Provide specific recommendations with examples.
```

### 18. Refactoring Guidance
```
This code works but feels messy: [paste code]

Help me refactor it to:
- Improve readability and maintainability
- Follow Rust and Holochain best practices
- Optimize performance where possible
- Make it more testable

Show me the refactored version with explanations.
```

### 19. Pattern Consistency Check
```
I've been using this pattern in my app: [paste example pattern]

Review my new code to ensure consistency: [paste new code]

Point out any inconsistencies and suggest improvements to maintain 
architectural coherence across the codebase.
```

### 20. Testing Strategy Development
```
For this functionality: [describe feature]
With this code: [paste code]

Help me design a comprehensive testing strategy:
- Unit tests for individual functions
- Integration tests for multi-agent scenarios
- Edge cases and error conditions
- Performance benchmarks

Show me example test code using Tryorama.
```

---

## 📚 Learning & Progression Prompts

### 21. Progressive Learning Path
```
I just mastered [current skill/concept]. What should I learn next to 
progress toward [goal]?

Create a learning path with:
- Next logical concepts to study
- Practical exercises to reinforce learning
- Resources and projects to explore
- Timeline and milestones

My current level: [describe your abilities]
```

### 22. Concept Deep Dive
```
I want to deeply understand [specific concept] in Holochain. 

Explain it at multiple levels:
1. High-level conceptual overview
2. Technical implementation details
3. Practical applications and use cases
4. Advanced considerations and edge cases
5. Common mistakes and how to avoid them

Use examples from [my domain/interest area].
```

### 23. Real-World Application Analysis
```
I'm studying this real-world Holochain project: [project name/link]

Help me understand:
- The overall architecture and design decisions
- Key patterns I should learn from
- How specific features are implemented
- What makes this a good (or poor) example
- How I could apply these patterns to my projects
```

### 24. Skill Gap Assessment
```
I want to build [describe your goal project]. 

Based on my current skills: [list what you know]

What skills am I missing? Create a learning plan that covers:
- Essential skills I need to develop
- Order of learning for maximum efficiency  
- Specific resources and exercises
- Projects to practice each skill
- How to measure progress
```

### 25. Advanced Challenge Design
```
I'm comfortable with [list current abilities]. Design a challenging 
project that will push my skills to the next level.

Requirements:
- Builds on what I know
- Introduces [specific new concepts I want to learn]
- Has practical value
- Can be completed in [timeframe]

Include a breakdown of implementation phases and learning objectives.
```

---

## 🔧 Technical Implementation Prompts

### 26. Data Structure Optimization
```
I need to represent [describe your data] in a Holochain app.

Design optimal Rust structures considering:
- Serialization efficiency
- Validation requirements
- Query patterns: [list your common queries]
- Future extensibility
- Memory usage

Show me the structs, enums, and any helper implementations.
```

### 27. Complex Validation Implementation
```
I need validation for [business rule] in my [domain] app.

The rule is: [describe complex business logic]

Show me how to implement this in Holochain with:
- Proper error handling
- Performance considerations
- Clear validation messages
- Testing approach

Include example valid and invalid cases.
```

### 28. Link Relationship Modeling
```
In my [type of app], I need to model these relationships:
- [relationship 1]
- [relationship 2]
- [relationship 3]

Design the link structure with:
- Efficient query patterns
- Proper link types enum
- Example link creation code
- Query functions for each relationship

Consider scalability and performance implications.
```

### 29. State Management Strategy
```
My [type of app] needs to handle state changes for [specific scenario].

Current state: [describe]
Possible transitions: [list state changes]
Business rules: [describe constraints]

Design a robust state management approach using Holochain patterns, 
including validation, error handling, and consistency guarantees.
```

### 30. Integration Architecture
```
I need to integrate my Holochain app with [external system/API].

Requirements: [list requirements]
Constraints: [list limitations]

Design the integration architecture including:
- Data flow between systems
- Error handling and resilience
- Security considerations
- Performance optimization

Show me the implementation approach with example code.
```

---

## 🎯 Project-Specific Prompts

### 31. MVP Feature Prioritization
```
For my [app idea], I want to build an MVP. Here are potential features:
[list all features you're considering]

Help me prioritize these into:
1. Must-have for MVP
2. Nice-to-have for initial release
3. Future enhancements

Consider development complexity, user value, and Holochain-specific factors.
```

### 32. Scaling Strategy Planning
```
My [type of app] currently handles [current scale]. I need to scale to 
[target scale].

Current architecture: [brief description]
Performance bottlenecks: [known issues]

Design a scaling strategy addressing:
- DHT performance optimization
- Validation efficiency
- Network topology considerations
- Data distribution patterns
```

### 33. User Experience Design
```
For my [type of app], design the user experience considering Holochain's 
unique characteristics:

- Offline functionality
- Agent-centric data model  
- Peer-to-peer networking
- Data ownership implications

Show me UX patterns that work well with distributed architecture.
```

### 34. Migration Strategy
```
I need to migrate my app from [current system] to Holochain.

Current data model: [describe existing system]
Migration constraints: [list requirements and limitations]

Design a migration strategy including:
- Data transformation approach
- Gradual migration phases
- User transition plan
- Risk mitigation

Show me implementation steps and example code.
```

### 35. Community Features Design
```
I want to add community features to my [type of app]:
- [feature 1]
- [feature 2]  
- [feature 3]

Design these features using Holochain's agent-centric model:
- How to handle community governance
- Reputation and trust systems
- Moderation approaches
- Privacy and consent management

Include implementation patterns and example code.
```

---

## 🚀 Advanced Development Prompts

### 36. Custom Validation Patterns
```
I need to implement custom validation that [specific requirement].

Standard validation isn't sufficient because: [explain why]

Design a custom validation approach including:
- Validation logic implementation
- Performance optimization
- Error handling and reporting
- Testing strategy

Show me the complete implementation.
```

### 37. Multi-DNA Architecture
```
My complex app needs multiple DNAs for [reasons].

App components: [list major components]
Data relationships: [describe how data relates across components]

Design a multi-DNA architecture with:
- DNA responsibility boundaries
- Inter-DNA communication patterns
- Data consistency strategies
- Deployment and coordination approach
```

### 38. Real-Time Synchronization
```
I need real-time synchronization for [specific feature] in my [type of app].

Requirements: [list real-time requirements]
Performance targets: [specify latency/throughput needs]

Design a synchronization strategy using:
- Holochain's networking capabilities
- Efficient update propagation
- Conflict resolution mechanisms
- Offline/online transition handling
```

### 39. Advanced Query Optimization
```
I have complex query requirements: [describe complex queries]

Current performance: [describe current state]
Target performance: [specify goals]

Optimize my query strategy with:
- Link structure improvements
- Query pattern optimization
- Caching strategies
- Performance measurement approach

Show me the optimized implementation.
```

### 40. Production Deployment Strategy
```
I'm ready to deploy my [type of app] to production.

App characteristics: [describe app complexity, user base, etc.]
Infrastructure requirements: [list requirements]

Design a production deployment strategy covering:
- Conductor configuration
- Network bootstrapping
- Monitoring and observability
- Update and maintenance procedures
- User onboarding process
```

---

## 🎓 Meta-Learning Prompts

### 41. Learning Efficiency Analysis
```
I've been learning Holochain development for [timeframe] and feel like 
I'm [describe current state/frustrations].

Help me:
- Assess my learning approach effectiveness
- Identify knowledge gaps or misconceptions
- Suggest more efficient learning strategies
- Create a focused improvement plan

My background: [relevant experience]
My goals: [what you want to achieve]
```

### 42. Technology Comparison Framework
```
Compare Holochain with [other technology] for [specific use case].

Create a detailed comparison covering:
- Architecture differences
- Development complexity
- Performance characteristics
- Use case suitability
- Ecosystem maturity

Help me make an informed technology choice.
```

### 43. Career Development Guidance
```
I want to build a career around Holochain and distributed systems.

Current skills: [list your abilities]
Career goals: [describe aspirations]
Market context: [your location/industry focus]

Create a career development plan including:
- Skills to prioritize
- Portfolio projects to build
- Community involvement strategies
- Professional development opportunities
```

### 44. Teaching and Mentoring Preparation
```
I want to teach/mentor others in Holochain development. 

My experience level: [describe your background]
Target audience: [who you want to help]

Help me prepare by:
- Identifying key concepts to focus on
- Creating effective learning exercises
- Developing clear explanations
- Anticipating common questions and challenges
```

### 45. Ecosystem Contribution Strategy
```
I want to contribute meaningfully to the Holochain ecosystem.

My strengths: [list your skills and interests]
Available time: [how much time you can commit]

Suggest contribution opportunities:
- Open source projects to contribute to
- Documentation improvements needed
- Community initiatives to support
- Original projects that would add value

Include a plan for getting started and measuring impact.
```

---

## 🔄 Iterative Improvement Prompts

### 46. Code Evolution Planning
```
My [feature/module] has grown organically and now needs restructuring.

Current code: [paste relevant code or describe structure]
New requirements: [list additional needs]

Plan the evolution with:
- Refactoring phases
- Backwards compatibility considerations
- Risk mitigation strategies
- Testing approach for changes

Show me the step-by-step transformation plan.
```

### 47. Performance Profiling Strategy
```
I need to systematically improve performance of my [specific component].

Current metrics: [share performance data if available]
Performance goals: [specify targets]

Create a profiling and optimization plan:
- Measurement strategies
- Bottleneck identification approach
- Optimization priorities
- Validation methods

Include tools and techniques specific to Holochain.
```

### 48. Feature Enhancement Planning
```
I want to enhance [existing feature] with [new capabilities].

Current implementation: [describe current state]
User feedback: [share relevant feedback]
Technical constraints: [list limitations]

Design the enhancement approach:
- Backwards compatibility strategy
- Implementation phases
- User migration plan
- Risk assessment and mitigation
```

### 49. Technical Debt Assessment
```
Assess the technical debt in my codebase and create a remediation plan.

Codebase overview: [describe your app and current issues]
Maintenance challenges: [list pain points]
Future development goals: [describe planned features]

Provide:
- Technical debt inventory
- Impact assessment
- Prioritized remediation plan
- Prevention strategies for future development
```

### 50. Quality Improvement Roadmap
```
Create a comprehensive quality improvement roadmap for my [type of app].

Current quality metrics: [share any metrics you have]
Quality goals: [specify targets]
Development constraints: [time, resources, etc.]

Design an improvement plan covering:
- Code quality enhancements
- Testing strategy improvements
- Performance optimizations
- Security hardening
- Documentation improvements

Include measurable milestones and success criteria.
```

---

## 🎯 Bonus: Custom Prompt Templates

### Template 1: Feature Analysis
```
Analyze [feature] in the context of [your app type]:

1. **Technical Requirements**: What does this feature need technically?
2. **Holochain Considerations**: How does Holochain's architecture affect implementation?
3. **Implementation Options**: What are different ways to build this?
4. **Trade-offs**: What are the pros and cons of each approach?
5. **Recommendation**: What's the best approach for my specific case?

[Provide any relevant context about your app, constraints, or preferences]
```

### Template 2: Problem-Solving Framework
```
I'm facing this challenge: [describe your specific problem]

Help me work through it systematically:

1. **Problem Analysis**: Break down the core issues
2. **Root Cause**: What's really causing this problem?
3. **Solution Options**: What are my alternatives?
4. **Evaluation**: Pros and cons of each option
5. **Implementation**: Step-by-step plan for the best option
6. **Validation**: How do I know if it worked?

Context: [provide relevant background information]
```

### Template 3: Learning Deep Dive
```
I want to master [specific topic/skill] in Holochain development.

Create a comprehensive learning plan:

1. **Prerequisites**: What should I know first?
2. **Core Concepts**: Key ideas to understand
3. **Practical Exercises**: Hands-on activities to reinforce learning
4. **Real-World Applications**: How this applies to actual projects
5. **Advanced Topics**: What to explore after mastering basics
6. **Resources**: Best materials for learning this topic

My current level: [describe your background]
My goals: [what you want to achieve]
```

---

## 💡 Tips for Maximum Effectiveness

### Context is King
Always provide relevant context: your app type, current code, specific goals, and constraints. The more context you give, the more targeted and useful the AI's response will be.

### Iterate and Refine
Don't accept the first answer. Ask follow-up questions like:
- "Can you explain that differently?"
- "What are the trade-offs with this approach?"
- "How would this work in a real-world scenario?"

### Combine Prompts
Use multiple prompts together. Start with understanding, move to implementation, then ask for review and optimization.

### Save Your Variations
As you use these prompts, modify them to fit your specific needs and save the variations that work best for your learning style.

### Validate Everything
Always review AI-generated code and suggestions. Use them as starting points, not final solutions.

---

## 🚀 Getting Started

1. **Choose 3-5 prompts** that match your current learning needs
2. **Customize them** with your specific project details
3. **Use them consistently** to build patterns in your AI interactions
4. **Iterate and improve** based on the quality of responses you get
5. **Share your successes** with the community to help others learn

This prompt library is a living document. As you develop expertise, create your own specialized prompts and contribute back to the community.

**Happy building! The distributed future awaits your contributions.**

---

*This prompt library is based on real-world experience building production Holochain applications. For updates and community discussions, join the [Holochain development community](https://developer.holochain.org/) and follow my Substack series.*