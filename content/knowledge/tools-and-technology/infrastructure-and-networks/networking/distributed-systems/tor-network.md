---
title: "Tor Network"
aliases: ["TOR", "The Onion Router", "Anonymous Network"]
tags: [tools-and-technology, networking, distributed-systems, privacy, security, anonymity]
created: 2025-12-02
modified: 2025-12-02
draft: false
---

The Tor network, short for "**The Onion Router**," is a free and open-source software that enables anonymous communication on the internet. It directs internet traffic through a worldwide network of volunteer-run servers known as Tor relays. 

The Tor network aims to conceal users' identities and their online activities from surveillance and traffic analysis by separating identification and routing.

Here's how the Tor network works:
1. When a user wants to access a website or service through the Tor network, their request is encrypted by the Tor client software on their device.
2. The encrypted request is then forwarded to one of the predefined entry points, also known as entry guards.
3. The entry guard receives the encrypted request and redirects it to a relay node within the Tor network.
4. The relay node forwards the request to another relay node, and this process continues through multiple nodes within the network.
5. Each relay node only knows the previous node and the next node in the chain, ensuring that no single node has complete knowledge of the entire communication.
6. Finally, the request reaches the exit node, which decrypts the request and sends it to the intended destination.
7. The response from the destination follows the same path in reverse, ensuring anonymity.

The Tor network provides anonymity by encrypting and randomly bouncing communications through a network of relays run by volunteers around the globe.

It also supports the hosting and accessing of onion services, which are websites or services that can only be accessed through the Tor network.

The Tor network is used by individuals who want to protect their privacy online, including whistleblowers, journalists, activists, and individuals living in countries with restricted internet access. 

However, it's worth noting that while Tor provides anonymity, it does not guarantee complete security. Users should still take precautions to protect their online activities and personal information.

![[Pasted image 20230830133512.png]]
![[Pasted image 20230830133527.png]]
![[Pasted image 20230830133536.png]]
![[Pasted image 20230830133547.png]]
