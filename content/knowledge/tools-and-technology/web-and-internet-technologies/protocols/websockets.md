---
title: WebSockets
description: Protocol for real-time bidirectional communication between client and server
subtitle: Enabling persistent connections for web applications
aliases:
  - WebSocket
tags: ["protocols", "frontend", "backend", "real-time-communication"]
updated: 2026-03-14

---

WebSockets is a communication protocol that provides full-duplex communication channels over a single TCP connection. It enables real-time communication between web clients and servers, allowing for persistent connections where either party can send data at any time.

The connection begins with an [[http|HTTP]] handshake: the client sends an `Upgrade: websocket` header, and if the server agrees, both sides switch protocols. The HTTP connection becomes a persistent WebSocket connection. From this point, either party can send frames at any time without waiting for a request-response cycle. This is the key shift from ordinary [[http|HTTP]]: server-initiated push becomes native rather than a workaround, enabling patterns like live notifications, collaborative editing, and streaming data that feel impossible in purely request-response protocols.

## Key Features

- Bidirectional communication
- Low latency
- Persistent connections
- Compatible with existing web infrastructure
- Standardized by IETF as RFC 6455
- Supported by all modern browsers

## Use Cases

- Live chat applications
- Real-time dashboards
- Collaborative editing tools
- Online gaming
- Financial trading platforms
- Live sports updates
- IoT device communication

## Comparison with Other Protocols

**Server-Sent Events (SSE)**: SSE is one-directional; the server pushes events to the client over a long-lived [[http|HTTP]] connection, but the client cannot send messages back over the same channel. SSE is simpler than WebSockets and works well for broadcast scenarios (live feeds, notifications) where the client only needs to listen.

**[[web-real-time-communication|WebRTC]]**: WebRTC enables true peer-to-peer communication directly between browsers, bypassing the server for data transfer. However, WebRTC still requires a signaling server to establish the initial connection; WebSockets are often used for this signaling phase. Once connected, WebRTC bypasses the server relay that WebSockets require.

**HTTP/2 Server Push**: HTTP/2 added a push mechanism, but it pushes resources (CSS, JS files) that the server anticipates the client will need, not arbitrary event streams. It is not designed for ongoing bidirectional messaging.

**[[rest|REST]] and [[http|HTTP]]**: Standard HTTP is request-response only. Each message requires a new request from the client. WebSockets invert this: the connection persists, and either party can initiate at any time.

## Limitations

**Still server-mediated**: Unlike [[web-real-time-communication|WebRTC]], WebSocket communication routes through a server. The server is a required intermediary that knows everything both sides say and must remain always available.

**Connection overhead at scale**: Maintaining many persistent connections is resource-intensive. Each connection holds state on the server, which complicates horizontal scaling. Solutions (sticky sessions, Redis pub/sub) add architectural complexity.

**Firewall and proxy issues**: Some corporate firewalls and HTTP proxies block WebSocket upgrades or drop idle connections. This makes WebSockets less reliable in enterprise environments than standard HTTPS traffic.

**No native reconnection**: The WebSocket protocol has no built-in reconnection mechanism. If the connection drops, the client must detect it (via ping/pong heartbeats or timeouts) and re-establish manually.

## Garden Perspective

WebSockets solve centralized real-time communication well, but they remain centralized. Every message flows through a server that holds the connection open, knows the participants, and can be a point of failure. This is the architectural tension: real-time requires coordination, and WebSockets achieve it through server authority.

[[web-real-time-communication|WebRTC]] moves toward genuine peer-to-peer by removing the server from the data path, though not from connection setup. [[holochain|Holochain]]'s signals mechanism goes further: nodes signal each other directly through the DHT, without a relay server in the message path. WebSockets are a useful and pragmatic protocol for most real-time web applications, but they represent a stepping stone rather than the destination for agent-centric communication.

## Related Concepts

- [[http|HTTP]]
- [[web-real-time-communication|WebRTC]]
- [[rest|REST]]
- [[graphql|GraphQL]]
- [[holochain|Holochain]]
