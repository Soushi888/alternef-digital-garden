---
title: "COP-Lang: A Complexity Oriented Programming DSL"
description: "A syntax sketch for a domain-specific language that describes complex systems as ecologies of agents, resources, feedback loops, and attractors: no functions, no return values, only topology, tension, and time."
tags: ["programming-paradigms", "complexity-science", "complexity-oriented-programming", "domain-specific-language", "holochain", "nondominium", "distributed-systems", "emergence"]
date: 2026-03-11
draft: false
---

### Syntax Sketch v0.1 (for Tibi's amusement)

---

## Core Philosophy

COP-Lang does not describe *procedures*. It describes *ecologies*.
You declare agents, resources, flows, feedback loops, and attractors.
The runtime finds coherent states. You observe what emerges.

No functions. No return values. No control flow.
Only **topology**, **tension**, and **time**.

---

## 1. Agents

Agents are autonomous nodes with local perception and local rules.
They do not "call" each other. They sense, respond, and emit.

```cop
agent Contributor {
  perceives: [ResourcePool, ReputationSignal]

  threshold contribute_when {
    ResourcePool.demand > 0.6
    ReputationSignal.own > 0.3
  }

  emits: ContributionEvent on threshold.contribute_when
  adapts: reputation by ContributionEvent.acknowledgment
}

agent Steward {
  perceives: [ContributionEvent, ResourcePool]

  emits: AcknowledgmentEvent on ContributionEvent.received
  emits: AllocationProposal when ResourcePool.surplus > 0.8
}
```

---

## 2. Resources

Resources are not data structures. They are *fields* with gradients.
They have scarcity, flow rates, and memory.

```cop
resource LabourCapacity {
  unit: hours
  decay: 0.05 per cycle     // unused capacity fades
  replenish: 40 per week per Contributor

  gradient: demand          // high demand = pull signal
  gradient: saturation      // high supply = push signal
}

resource Reputation {
  unit: scalar [0..1]
  decay: 0.01 per cycle
  ceiling: 1.0

  // reputation is relational, not absolute
  relative_to: [ContributorPool]
}
```

---

## 3. Events

Events are the only "verbs" in COP-Lang.
They are immutable facts about what happened, REA-style.

```cop
event ContributionEvent {
  provider: Contributor
  resource: LabourCapacity
  quantity: hours
  context: ProjectProcess
  timestamp: auto

  triggers: [ReputationUpdate, ResourcePoolUpdate]
}

event AcknowledgmentEvent {
  acknowledger: Steward
  contribution: ContributionEvent
  weight: scalar [0..1]    // quality signal

  triggers: [ReputationUpdate]
}
```

---

## 4. Feedback Loops

This is the heart of COP-Lang. Loops are declared explicitly,
with their sign (reinforcing vs balancing) and their delay.

```cop
loop ReputationReinforcement {
  sign: +                         // reinforcing loop
  delay: 2 cycles

  path:
    ContributionEvent
    -> AcknowledgmentEvent.weight
    -> Reputation.increase
    -> threshold.contribute_when.lower  // easier to contribute again
    -> ContributionEvent               // closes the loop

  dampening: 0.3                 // prevents runaway accumulation
  ceiling_break: Reputation > 0.95  // breaks loop at saturation
}

loop ResourceScarcityBalance {
  sign: -                         // balancing loop
  delay: 1 cycle

  path:
    ResourcePool.demand
    -> ContributionEvent.rate.increase
    -> ResourcePool.supply.increase
    -> ResourcePool.demand.decrease   // closes the loop

  lag_sensitivity: high          // system responds quickly to scarcity
}
```

---

## 5. Attractors

Attractors declare where the system *tends to go*.
They are not commands. They are gravity wells in state space.

```cop
attractor HealthyCommons {
  // The system is "healthy" when it gravitates here

  conditions {
    ResourcePool.utilization between [0.4, 0.8]
    Reputation.distribution.gini < 0.4     // not too concentrated
    ContributionEvent.rate stable_over 10 cycles
    AgentPool.size growing
  }

  basin_width: wide              // many paths lead here
  stability: medium              // perturbable but recoverable
}

attractor Burnout {
  // We declare this to make it visible and avoidable

  conditions {
    ResourcePool.demand > 0.95
    Contributor.reputation.average < 0.2
    AcknowledgmentEvent.rate < 0.1
  }

  basin_width: narrow            // hard to fall into, hard to escape
  stability: high                // once here, sticky

  warning_signal: 0.7            // emit alert when 70% of conditions met
}
```

---

## 6. Observation Contexts

COP-Lang distinguishes between observing a system from inside vs outside.
This is a first-class language feature, not a debug tool.

```cop
observe HealthyCommons from outside {
  // Statistical view — aggregate patterns
  measure: ContributionEvent.rate over 30 cycles
  measure: Reputation.distribution.entropy
  measure: attractor.proximity to HealthyCommons

  emit: SystemHealthReport every 10 cycles
}

observe HealthyCommons from inside as Contributor {
  // Local view — what an agent actually perceives
  perceives: own.reputation
  perceives: ResourcePool.gradient.nearby
  perceives: AcknowledgmentEvent.received.last_5

  // Does NOT perceive: global state, other agents' reputation
  // This asymmetry is the point
}
```

---

## 7. Process (the MOP layer)

Process is where [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/mystical-oriented-programming/index|Mystical Oriented Programming]] meets COP. It declares the *intention* and *phase* of a transformation. Borrowed from alchemical process notation.

```cop
process LabourPoolNigredo {
  // Decomposition phase — dissolving old contribution patterns
  phase: dissolution

  triggers_when: attractor.proximity to Burnout > 0.6

  suspends: [ReputationReinforcement]   // pause the loop
  activates: [RestProtocol, ReflectionEvent]

  completes_when: ResourcePool.demand < 0.5 for 3 cycles
  transitions_to: LabourPoolAlbedo
}

process LabourPoolAlbedo {
  // Purification phase — clarifying what contributions actually matter
  phase: clarification

  activates: [ContributionReview, ReputationRecalibration]

  completes_when: Reputation.distribution.gini < 0.3
  transitions_to: LabourPoolRubedo
}

process LabourPoolRubedo {
  // Crystallization phase — stable generative commons
  phase: stabilization

  attractor_target: HealthyCommons
  completes_when: attractor.proximity to HealthyCommons > 0.85 for 5 cycles
}
```

---

## 8. A Full Sketch: [[nondominium|Nondominium]] Resource Pool

Putting it all together: a sketch of [[nondominium|Nondominium]]'s core dynamic as a COP-Lang program.

```cop
system NondominiumCommons {

  agents: [Contributor, Steward, Observer]
  resources: [LabourCapacity, SharedAsset, Reputation]

  events: [
    ContributionEvent,
    AcknowledgmentEvent,
    AllocationProposal,
    ConsensusEvent
  ]

  loops: [
    ReputationReinforcement,      // + loop, dampened
    ResourceScarcityBalance,      // - loop, fast
    GovernanceFeedback            // - loop, slow
  ]

  attractors: [
    HealthyCommons,               // target
    Burnout,                      // avoid
    Capture                       // avoid — one agent dominates Reputation
  ]

  process_sequence: [
    LabourPoolNigredo,
    LabourPoolAlbedo,
    LabourPoolRubedo
  ]

  validation: distributed        // Holochain substrate
  time_model: event_driven       // no global clock

  // The system has no administrator.
  // Coherence emerges from local rules.
  // That is the whole point.
}
```

---

## What's Missing (intentionally, for now)

- **Conflict resolution syntax**: what happens when two agents' thresholds fire simultaneously
- **Phase transition detection**: formal notation for when the system crosses critical thresholds
- **Inter-system flows**: how two NondominiumCommons instances exchange resources
- **Temporal scales**: nested time loops (daily cycles vs governance cycles vs cultural cycles)
- **The compiler**: what would actually *run* this? Holochain as substrate is the hypothesis.

---

## Implementation Hypothesis

A COP-Lang program would compile to:

1. **Holochain DHT entries**: events as immutable facts, resources as aggregate views
2. **Validation rules**: loop conditions as distributed validators
3. **Signal subscriptions**: feedback loops as reactive Holochain signals
4. **A simulation harness**: for testing attractor behavior before deployment

The runtime would not execute instructions.
It would *simulate the ecology* and surface emergent states.

---

*"The programmer is not the god of the system. The programmer is its ecologist."*
*COP Manifesto, draft 0.1*

→ See [[complexity-oriented-programming|Complexity Oriented Programming]] for the paradigm this DSL implements.
