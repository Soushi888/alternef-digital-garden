---
title: Library Management Systems
description: Software platforms for managing library collections, circulation, acquisitions, and patron services
aliases:
  - LMS
  - Integrated Library System
  - ILS
tags: ["library", "library-management", "open-source", "tools", "information-management"]

---

An Integrated Library System (ILS), also called a Library Management System (LMS), is software that automates the core operational functions of a library. These platforms bring catalog management, circulation, acquisitions, and patron services into a single integrated environment, replacing paper-based or fragmented workflows.

## Key Modules

A full-featured ILS typically consists of several interconnected modules:

- **OPAC (Online Public Access Catalog)**: The public-facing interface where patrons search the collection. Modern OPACs support faceted search, availability status, and account management.
- **Circulation**: Manages checkouts, returns, renewals, holds, and fines. Circulation rules (loan periods, item limits) are configurable per patron type and item type.
- **Acquisitions**: Tracks purchasing workflows including selection, ordering, receiving, and invoicing. Integrates with vendor EDI feeds in many systems.
- **Serials management**: Handles subscription tracking, issue prediction, and claiming for journals, newspapers, and other periodicals.
- **Patron management**: Stores borrower records, loan history, contact information, and notification preferences. Subject to privacy regulations in most jurisdictions.
- **Cataloging**: Tools for creating and editing bibliographic and holdings records, typically in MARC 21 format, with Z39.50 search for importing records from external sources.

## Major Open-Source Systems

**Koha** is the most widely deployed open-source ILS in the world. First released in 2000 in New Zealand, it is now maintained by a global community of developers and vendors. Koha supports the full range of ILS modules and is used by public libraries, school libraries, and academic libraries across dozens of countries.

**Evergreen** was designed specifically for library consortia, where many libraries share a single system and catalog. Developed by the Georgia Public Library Service in 2006, Evergreen excels at union catalogs and shared circulation policies across member institutions.

## Major Proprietary Systems

- **Alma** (Ex Libris, now part of ProQuest/Clarivate): A cloud-based library services platform widely adopted by academic and research libraries. Alma integrates electronic resource management alongside print workflows.
- **Sierra** (Innovative Interfaces): A client-server ILS used by many academic and public libraries, known for its flexible reporting and customization capabilities.
- **Symphony** (SirsiDynix): One of the most commonly used proprietary systems in North American public libraries, offering a range of patron-facing and staff-facing tools.

## Open-Source vs Proprietary

| Factor | Open-Source (Koha, Evergreen) | Proprietary (Alma, Sierra) |
|--------|-------------------------------|---------------------------|
| Licensing cost | None (software is free) | Annual license fees |
| Customization | Full access to source code | Limited to vendor-provided options |
| Community support | Active global communities | Vendor support contracts |
| Implementation cost | Requires technical staff or a support vendor | Typically bundled with vendor services |
| Data ownership | Library retains full control | Depends on contract and hosting model |

Open-source systems eliminate licensing fees but shift costs toward implementation, training, and ongoing maintenance. Many libraries using Koha or Evergreen contract with commercial support vendors who contribute back to the community codebase.

## Standards

Library systems rely on a set of shared standards to enable interoperability:

- **MARC 21**: The dominant bibliographic record format, encoding metadata fields (title, author, subject, ISBN, etc.) in a structured tagged format.
- **Z39.50**: A client-server protocol for searching and retrieving bibliographic records across different systems. Used for copy cataloging from union catalogs like WorldCat.
- **FRBR (Functional Requirements for Bibliographic Records)**: A conceptual model separating the abstract work from its expressions, manifestations, and items. Influenced newer catalog designs.
- **BIBFRAME**: A linked data framework developed by the Library of Congress as a successor to MARC, enabling library data to participate in the broader web of linked open data.

## Related Topics

- [[content-management-systems|Content Management Systems]]
