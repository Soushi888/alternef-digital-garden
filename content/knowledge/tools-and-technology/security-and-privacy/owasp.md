---
title: "OWASP"
date: 2026-05-02
description: "Open Worldwide Application Security Project: a non-profit community providing open standards, tools, and guidance for web application security."
tags: ["programming", "security", "web-dev", "open-source", "software-development"]
draft: false
---

The Open Worldwide Application Security Project (OWASP) is a 501(c)(3) non-profit foundation and global volunteer community dedicated to improving software security. Its mission is to make software security visible so that individuals and organizations worldwide can make informed decisions about application security risks. All OWASP resources are freely available under open licenses (Creative Commons Attribution-ShareAlike 4.0), and the foundation remains vendor-neutral across all its projects.

## Key Projects

OWASP maintains over 100 active open-source projects. The most widely adopted fall into two categories.

**Standards and Frameworks:**
- **OWASP Top 10**: The reference standard for the most critical web application security risks, updated periodically based on real-world vulnerability data.
- **Application Security Verification Standard (ASVS)**: A framework of security requirements for designing, developing, and testing web applications (v5.0 released May 2025).
- **Software Assurance Maturity Model (SAMM)**: A roadmap for organizations to analyze and improve their security posture over time.
- **Web Security Testing Guide (WSTG)**: The premier reference for web application security testing methodology.
- **CycloneDX**: A full-stack Bill of Materials (BOM) standard for software supply chain risk management, now an ECMA-424 standard.
- **Cheat Sheet Series**: Concise, developer-focused guides for implementing secure coding practices.

**Tools:**
- **OWASP ZAP (Zed Attack Proxy)**: A leading open-source dynamic application security testing (DAST) tool designed for integration into DevOps pipelines.
- **Dependency-Check / Dependency-Track**: Software Composition Analysis (SCA) tools that identify known vulnerabilities in project dependencies and supply chains.
- **Juice Shop**: A deliberately insecure modern web application used for security training and Capture The Flag competitions.
- **DefectDojo**: An application vulnerability management platform built for DevSecOps workflows.

## OWASP Top 10 (2025)

The 2025 edition reflects current threat data, repositioning supply chain risk and introducing exception handling as a new category.

1. **A01 - Broken Access Control**: The most prevalent risk; applications fail to enforce what authenticated users are allowed to do.
2. **A02 - Security Misconfiguration**: Improperly configured systems, frameworks, or cloud services expose unnecessary attack surface.
3. **A03 - Software Supply Chain Failures** *(repositioned)*: Risks introduced through vulnerable third-party libraries, dependencies, and CI/CD pipelines.
4. **A04 - Cryptographic Failures**: Sensitive data exposed through weak or absent cryptography in transit and at rest.
5. **A05 - Injection**: SQL, OS command, and other injection flaws where untrusted data is interpreted as commands or queries.
6. **A06 - Insecure Design**: Architectural and design-level flaws where security controls were never built in from the start.
7. **A07 - Authentication Failures**: Weaknesses in authentication and session management that allow attackers to compromise credentials or sessions.
8. **A08 - Software or Data Integrity Failures**: Missing integrity verification for software updates, CI/CD pipelines, or deserialized data.
9. **A09 - Logging & Alerting Failures**: Insufficient logging and alerting that prevents timely detection of and response to breaches.
10. **A10 - Mishandling of Exceptional Conditions** *(new)*: Improper error handling that leaks sensitive information or creates exploitable failure states.

## Application Security Verification Standard (ASVS)

ASVS provides a structured set of security requirements for testing and verifying web application security. Requirements are identified in a hierarchical format: `<chapter>.<section>.<requirement>` (for example, `1.2.3` refers to chapter 1, section 2, requirement 3).

**Verification Levels:**
- **Level 1 (Opportunistic)**: Basic security requirements suitable for low-risk applications; verifiable through penetration testing.
- **Level 2 (Standard)**: The baseline for most applications; requires security controls across all major domains.
- **Level 3 (Advanced)**: For high-value applications requiring comprehensive defense, formal verification, and deep architectural review.

ASVS v5.0 (released May 2025) is a significant modernization of the v4.0 series (2019), reflecting advances in authentication, supply chain security, and modern web architecture.

## Using OWASP in Practice

**Security Audits and Compliance**: The OWASP Top 10 is widely cited in regulatory frameworks and compliance programs as the baseline for evaluating web application risk. ASVS provides auditors with measurable, verifiable security criteria.

**DevSecOps Integration**: ZAP and Dependency-Check integrate directly into CI/CD pipelines to automate security scanning on every build. DefectDojo centralizes and tracks findings across tools and teams.

**Developer Training**: Juice Shop provides a safe, realistic environment for developers to learn attack techniques hands-on. The Cheat Sheet Series gives concise guidance for secure implementation of common features (authentication, input validation, cryptography, etc.).

**Threat Modeling and Design Review**: OWASP Cornucopia and pytm support threat identification during the design phase, before code is written, aligning with the A06 (Insecure Design) risk category.

## Related Topics

- [[knowledge/tools-and-technology/security-and-privacy/authentication/index|Authentication]]
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/index|Cryptography]]
- [[knowledge/tools-and-technology/security-and-privacy/index|Security and Privacy]]

## References

- [OWASP Foundation](https://owasp.org/)
- [OWASP Projects](https://owasp.org/projects/)
- [OWASP Top 10 2025](https://owasp.org/Top10/2025/)
- [OWASP ASVS on GitHub](https://github.com/OWASP/ASVS/)
