# Tag Vocabulary

Canonical tag reference for the Alternef Digital Garden. All tags must come from this vocabulary unless explicitly added here first. Tags are lowercase kebab-case, stored as YAML arrays in frontmatter.

## Format Rules

- **Case**: Always lowercase
- **Separator**: Hyphens only (kebab-case) — no underscores, no spaces, no camelCase
- **Frontmatter format**: YAML array `tags: ["tag1", "tag2"]`
- **Order**: Domain tag first, then topic tags from specific to general
- **Count**: 3-7 tags per note (more obscures; fewer loses discoverability)

## Aliases (Do Not Use)

Use the canonical form on the right instead of the alias on the left.

| Do NOT use | Use instead |
|------------|-------------|
| `ai` | `artificial-intelligence` |
| `ml` | `machine-learning` |
| `p2p` | `peer-to-peer` |
| `defi` | `decentralized-finance` |
| `decentralized-web` | `decentralization` (for the concept) or `web3` (for the ecosystem) |
| `blockchain-tech` | `blockchain` |
| `web-development` | `web-dev` |
| `software-dev` | `software-development` |
| `dev` | `software-development` |
| `software` | `software-development` |
| `software-engineering` | `software-development` |
| `crypto` | `cryptocurrency` |
| `ux` | `user-experience` |
| `open source` | `open-source` |
| `holo` | `holochain` |
| `hrea` | `rea` |
| `value-flows` | `valueflows` |
| `sociocracy` | `sociocracy-3` (unless referring to generic sociocracy) |
| `qa` | `qi-gong` |
| `permaculture-design` | `permaculture` |
| `env` | `ecology` |
| `green` | `sustainability` |
| `nlp` | `natural-language-processing` |
| `llm` | `large-language-models` |
| `programming-paradigm` | `programming-paradigms` |
| `libraries` | `library` |
| `protocol` | `protocols` |
| `decentralized` | `decentralization` |
| `distributed-computing` | `distributed-systems` |
| `open-value-network` | `open-value-networks` |
| `effect` | `effect-ts` |
| `classical-education` | `liberal-arts` |
| `decentralized-coordination` | `coordination-infrastructure` |
| `internet-protocols` | `protocols` |
| `cognitive-approaches` | `cognitive-science` |
| `ai-development` | `artificial-intelligence` |
| `digital-assistant` | `artificial-intelligence` |
| `personal-knowledge-management` | `knowledge-management` |
| `second-brain` | `knowledge-management` |
| `note-taking` | `knowledge-management` |
| `tools-and-technology` | remove (path segment — not a tag) |

## Domain 1: Land and Nature Stewardship

**Domain index tag**: `ecology`

**Path**: `content/knowledge/land-and-nature-stewardship/`

| Tag | When to use |
|-----|-------------|
| `ecology` | Any note in this domain; ecological science and systems |
| `permaculture` | Permaculture design principles and practice |
| `regenerative-design` | Regenerative agriculture, land restoration, design for life |
| `sustainability` | Sustainable practices (cross-domain but common here) |
| `biodiversity` | Species diversity, ecosystem health, conservation |
| `agriculture` | Farming systems, crop production, food growing |
| `conservation` | Wildlife conservation, protected areas, rewilding |
| `climate` | Climate change, carbon, atmospheric systems |
| `mycology` | Fungi, mycelium, mycorrhizal networks |
| `bioregionalism` | Bioregional economics, place-based identity |
| `land-management` | Land stewardship, commons, resource management |
| `circular-economy` | Closed-loop resource flows, zero-waste systems |

---

## Domain 2: Built Environment

**Domain index tag**: `architecture`

**Path**: `content/knowledge/built-environment/`

| Tag | When to use |
|-----|-------------|
| `architecture` | Any note in this domain; built form and design |
| `urban-planning` | City planning, zoning, public space |
| `sustainable-design` | Green building, passive house, net-zero |
| `infrastructure` | Roads, utilities, networks serving communities |
| `housing` | Residential design, affordability, alternative housing |
| `geodesic` | Geodesic and dome structures |
| `bioceramic` | Bioceramic materials and construction |
| `organic-architecture` | Nature-inspired, living-building approaches |
| `community-spaces` | Shared, collaborative, civic spaces |
| `transportation` | Mobility, transit, active transport |
| `place-based` | Rooted-in-place design, bioregional architecture |

---

## Domain 3: Tools and Technology

**Domain index tag**: `programming`

**Path**: `content/knowledge/tools-and-technology/`

| Tag | When to use |
|-----|-------------|
| `programming` | General programming notes (domain index) |
| `software-development` | Software engineering practice and process |
| `artificial-intelligence` | AI systems, LLMs, neural networks |
| `machine-learning` | ML algorithms, training, model development |
| `blockchain` | Blockchain protocols, chains, consensus |
| `holochain` | Holochain architecture, hApps, zomes |
| `distributed-systems` | Distributed computing, consensus, CAP theorem |
| `decentralization` | Decentralized system design and philosophy |
| `cryptography` | Cryptographic primitives, ZKP, hash functions |
| `security` | Security practices, threat modeling, authentication |
| `networking` | Network protocols, TCP/IP, P2P networking |
| `peer-to-peer` | P2P architectures, gossip protocols |
| `rust` | Rust language notes |
| `javascript` | JavaScript / TypeScript / Node ecosystem |
| `typescript` | TypeScript-specific notes |
| `python` | Python language notes |
| `functional-programming` | FP concepts, monads, immutability |
| `web-dev` | Web development, HTML, CSS, browsers |
| `devops` | CI/CD, containers, deployment, infrastructure-as-code |
| `linux` | Linux OS, shell, system administration |
| `open-source` | Open-source licenses, community, governance |
| `frontend` | UI development, components, design systems |
| `api` | APIs, REST, GraphQL, protocol design |
| `databases` | Storage systems, SQL, NoSQL |
| `nixos` | NixOS, Nix package manager |
| `version-control` | Git, branching strategies, VCS |
| `software-architecture` | Patterns, CQRS, event sourcing, microservices |
| `web3` | Web3 ecosystem, dApps, token standards |
| `smart-contracts` | Smart contract development, EVM, Rust contracts |
| `svelte` | Svelte/SvelteKit framework and ecosystem |
| `operating-systems` | OS concepts, kernels, system administration |
| `local-first` | Local-first software philosophy and architecture |
| `hdk` | Holochain Development Kit — zomes, HDI, HDK APIs |
| `library` | Software libraries and reusable packages |
| `backend` | Server-side development, APIs, services |
| `programming-paradigms` | OOP, FP, reactive, declarative, and other paradigms |
| `protocols` | Network and application-layer protocols |
| `semantic-web` | Linked data, RDF, ontologies, knowledge graphs |
| `wireless` | Wireless networking, LoRa, mesh radio, WiFi |
| `desktop-environment` | Desktop environments: GNOME, KDE, Xfce, etc. |
| `webassembly` | WebAssembly runtime, WASM modules, WASI |
| `privacy` | Privacy-by-design, encryption, data sovereignty |
| `authentication` | Authentication mechanisms, OAuth, JWT, session management |
| `encryption` | Encryption algorithms, TLS, end-to-end encryption, key management |
| `fault-tolerance` | Error recovery, circuit breakers, resilience patterns, retry logic |
| `knowledge-graphs` | Graph databases, knowledge representation, ontology graphs |
| `data-structures` | Arrays, trees, graphs, hash maps, fundamental CS data structures |
| `user-interface` | UI design, component systems, interaction design, accessibility |
| `concurrency` | Concurrent programming, threads, async patterns, parallelism |
| `automation` | Task automation, CI/CD scripts, build automation, scripting |
| `effect-ts` | Effect TypeScript library for typed functional programming |
| `natural-language-processing` | NLP, text processing, parsing, language models |
| `large-language-models` | LLMs, GPT, Claude, transformer architectures |

---

## Domain 4: Culture and Education

**Domain index tag**: `education`

**Path**: `content/knowledge/culture-and-education/`

| Tag | When to use |
|-----|-------------|
| `education` | Any note in this domain; learning and teaching systems |
| `philosophy` | Philosophical inquiry, metaphysics, epistemology |
| `learning` | Learning theory, pedagogy, skill acquisition |
| `liberal-arts` | Trivium, quadrivium, classical education |
| `critical-thinking` | Logic, reasoning, argumentation |
| `metacognition` | Thinking about thinking, self-awareness in learning |
| `culture` | Cultural systems, traditions, social expression |
| `ikigai` | Purpose, meaning, life design |
| `hermeneutics` | Interpretation, textual analysis |
| `knowledge-systems` | Epistemology, knowledge organization |
| `consciousness` | States of consciousness, contemplative traditions |
| `spirituality` | Spiritual practice, mysticism, inner development |
| `music` | Music theory, practice, composition, appreciation |
| `music-theory` | Harmony, rhythm, melody, counterpoint, analysis |
| `ancient-traditions` | Ancient wisdom traditions, mystery schools, initiatic lineages |
| `mathematics` | Mathematical theory, logic, number theory, geometry |
| `systems-thinking` | Systems theory, feedback loops, emergence, complexity |
| `cognitive-science` | Cognition, learning theory, mind and intelligence research |
| `knowledge-management` | Personal and organizational knowledge systems, PKM |
| `emergence` | Emergent phenomena, self-organization in complex systems |
| `complexity-science` | Complex adaptive systems, non-linear dynamics, CAS theory |
| `communication` | Written, verbal, and technical communication |
| `collaboration` | Teamwork, co-creation, collective work, group dynamics |
| `ethics` | Ethical reasoning, moral philosophy, applied ethics |
| `personal-development` | Personal growth, habits, self-improvement, life design |

---

## Domain 5: Health and Wellbeing

**Domain index tag**: `health`

**Path**: `content/knowledge/health-and-wellbeing/`

| Tag | When to use |
|-----|-------------|
| `health` | Any note in this domain; physical and mental health |
| `mental-health` | Psychology, emotional wellbeing, resilience |
| `physical-health` | Exercise, body systems, movement |
| `nutrition` | Food, diet, micronutrients, eating patterns |
| `mindfulness` | Meditation, presence, awareness practices |
| `meditation` | Contemplative and meditative practice |
| `qi-gong` | Qi gong practice, energy cultivation |
| `yoga` | Yoga philosophy, postures, and practice traditions |
| `movement-practices` | Somatic movement, dance, embodied practices |
| `fitness` | Training, strength, conditioning |
| `lifestyle` | Daily habits, routines, wellbeing practices |
| `traditional-medicine` | TCM, Ayurveda, herbal medicine |
| `holistic-healing` | Holistic and integrative healing approaches |
| `mind-body-connection` | Psychosomatic integration, mind-body medicine |
| `somatic` | Body-centered practices, nervous system regulation |

---

## Domain 6: Finance and Economics

**Domain index tag**: `economics`

**Path**: `content/knowledge/finance-and-economics/`

| Tag | When to use |
|-----|-------------|
| `economics` | Any note in this domain; economic theory and systems |
| `finance` | Financial instruments, markets, personal finance |
| `cryptocurrency` | Digital currencies, tokenomics |
| `valueflows` | REA/ValueFlows protocol and accounting |
| `rea` | Resource-Event-Agent accounting model |
| `sustainable-economy` | Post-growth, doughnut economics, commons economics |
| `local-economy` | Local currencies, solidarity economy, cooperatives |
| `decentralized-finance` | DeFi protocols, liquidity, yield |
| `open-value-networks` | OVN theory, network value accounting |
| `commons` | Common-pool resources, commons governance |
| `gift-economy` | Gift circles, reciprocity, non-market exchange |
| `economic-networks` | Network economics, value network analysis |
| `accounting` | Accounting systems, ledgers, resource tracking |
| `cosmo-localism` | Cosmopolitan localism — global knowledge, local production |

---

## Domain 7: Governance and Community

**Domain index tag**: `governance`

**Path**: `content/knowledge/governance-and-community/`

| Tag | When to use |
|-----|-------------|
| `governance` | Any note in this domain; decision-making systems |
| `community` | Community building, social cohesion |
| `decentralized-systems` | Decentralized governance architectures |
| `coordination-infrastructure` | Tools and systems for collective coordination |
| `sociocracy-3` | Sociocracy 3.0 patterns and governance |
| `subsidiarity` | Principle of subsidiarity, federated governance |
| `network-governance` | Network-level governance, digital fabrics |
| `commons` | Commons management, Ostrom principles (cross-domain) |
| `stigmergy` | Self-organizing coordination, ant-colony patterns |
| `holoptism` | Collective intelligence, transparent coordination |
| `anti-fragility` | Resilient systems, Taleb framework |
| `digital-fabrics` | Holochain-based social fabric networks |
| `open-value-networks` | Sensorica, OVN methodology |
| `collective-intelligence` | Wisdom of crowds, swarm intelligence |
| `participatory-democracy` | Direct democracy, citizen assemblies |
| `network-state` | Network state theory, Balaji framework |
| `agent-centric` | Agent-centric architecture applied to governance |

---

## Cross-Domain Tags

Tags that appear across multiple domains — always valid regardless of where a note lives.

| Tag | Primary domains |
|-----|----------------|
| `holochain` | tools-and-technology, governance-and-community, finance-and-economics |
| `decentralization` | tools-and-technology, governance-and-community |
| `open-source` | tools-and-technology, governance-and-community |
| `peer-to-peer` | tools-and-technology, governance-and-community |
| `sustainability` | land-and-nature-stewardship, built-environment, finance-and-economics |
| `commons` | governance-and-community, finance-and-economics |
| `blockchain` | tools-and-technology, finance-and-economics |
| `artificial-intelligence` | tools-and-technology, culture-and-education |
| `open-value-networks` | governance-and-community, finance-and-economics |
| `emergence` | culture-and-education, tools-and-technology (complexity science) |
| `complexity-science` | culture-and-education, tools-and-technology, governance-and-community |
| `ethics` | All domains |
| `communication` | All domains |
| `collaboration` | All domains |
| `blog` | All domains (blog posts only — always the first tag for blog content) |

---

## Garden-Specific Tags

Tags particular to the Alternef Digital Garden and its projects. Valid across all domains.

| Tag | When to use |
|-----|-------------|
| `alternef` | Alternef project, vision, and community content |
| `digital-garden` | Digital gardening philosophy, Quartz, note-taking systems |
| `alchemy` | Alchemical concepts, the PAI Alchemy framework, Hermetic philosophy |
| `mystical-oriented-programming` | MOP paradigm — programming as spiritual practice |
| `nondominium` | Nondominium project (commons governance on Holochain) |
| `sensorica` | Sensorica Open Value Network and related OVN content |
| `alchemical-codex` | Notes in the Alchemical Codex series |
