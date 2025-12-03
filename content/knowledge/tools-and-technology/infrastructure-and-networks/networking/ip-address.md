---
title: "IP Address"
aliases: ["IP", "Internet Protocol Address", "IPv4", "IPv6"]
tags: [tools-and-technology, networking, tcp-ip, network-addressing, ipv4, ipv6]
created: 2025-12-02
modified: 2025-12-02
draft: false
---

# IP Address

An IP address (Internet Protocol address) is a unique numerical identifier assigned to each device connected to a computer network that uses the Internet Protocol for communication. IP addresses serve two main functions: host or network interface identification and location addressing.

## IP Address Versions

### IPv4 (Internet Protocol version 4)
IPv4 uses a 32-bit address scheme allowing for approximately 4.3 billion unique addresses. Written in dotted-decimal notation (e.g., 192.168.1.1), where four octets are separated by periods.

**IPv4 Address Classes:**
- **Class A**: 1.0.0.0 to 126.255.255.255 (16 million hosts per network)
- **Class B**: 128.0.0.0 to 191.255.255.255 (65,534 hosts per network)
- **Class C**: 192.0.0.0 to 223.255.255.255 (254 hosts per network)
- **Class D**: 224.0.0.0 to 239.255.255.255 (multicast addresses)
- **Class E**: 240.0.0.0 to 255.255.255.255 (experimental use)

**Private IPv4 Address Ranges:**
- **10.0.0.0 to 10.255.255.255** (Class A private network)
- **172.16.0.0 to 172.31.255.255** (Class B private networks)
- **192.168.0.0 to 192.168.255.255** (Class C private networks)

### IPv6 (Internet Protocol version 6)
IPv6 uses a 128-bit address scheme providing approximately 340 undecillion unique addresses (3.4×10^38). Written in hexadecimal notation separated by colons (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334).

**IPv6 Address Types:**
- **Unicast**: One-to-one communication
- **Multicast**: One-to-many communication
- **Anycast**: One-to-nearest communication

**Special IPv6 Addresses:**
- **::1/128**: Loopback address (equivalent to 127.0.0.1 in IPv4)
- **::/128**: Unspecified address
- **2001:db8::/32**: Documentation prefix
- **fe80::/10**: Link-local addresses

## Subnetting and CIDR

### Subnet Masks
Subnet masks determine which portion of an IP address identifies the network and which identifies the host. Common subnet masks include:

- **255.0.0.0** (/8) - Class A default
- **255.255.0.0** (/16) - Class B default
- **255.255.255.0** (/24) - Class C default

### CIDR Notation
Classless Inter-Domain Routing (CIDR) expresses IP addresses and their routing prefix as a pair (e.g., 192.168.1.0/24), where the suffix indicates the number of bits in the network prefix.

**Common CIDR Blocks:**
- **/32**: Single host (255.255.255.255)
- **/24**: Small network (256 addresses, 254 usable)
- **/16**: Large network (65,536 addresses, 65,534 usable)
- **/8**: Very large network (16,777,216 addresses, 16,777,214 usable)

## IP Address Allocation

### Dynamic Allocation
- **DHCP**: Dynamic Host Configuration Protocol automatically assigns IP addresses
- **Temporary leases**: Addresses assigned for specific time periods
- **Address pools**: Ranges of addresses available for dynamic assignment

### Static Allocation
- **Manual configuration**: Fixed addresses set by administrators
- **Reserved addresses**: Important devices (servers, routers, printers)
- **DNS integration**: Static mappings for consistent name resolution

## Address Resolution

### ARP (Address Resolution Protocol)
Maps IPv4 addresses to MAC addresses in local networks:
1. Device broadcasts ARP request for IP address
2. Device with matching IP responds with MAC address
3. Mapping cached for future use

### Neighbor Discovery Protocol (IPv6)
IPv6 equivalent of ARP with additional functionality:
- Address autoconfiguration
- Duplicate address detection
- Router discovery

## IP Address Management (IPAM)

### Enterprise Considerations
- **Address planning**: Structured allocation of IP ranges
- **Documentation**: Maintaining accurate address records
- **Monitoring**: Tracking address utilization and conflicts
- **Automation**: Tools for managing large-scale deployments

### Tools and Solutions
- **Spreadsheet tracking**: Small networks
- **Dedicated IPAM software**: Enterprise environments
- **Network management systems**: Integrated solutions
- **Cloud-based services**: Scalable management platforms

## IPv4 to IPv6 Transition

### Transition Technologies
- **Dual stack**: Running both IPv4 and IPv6 simultaneously
- **Tunneling**: Encapsulating IPv6 traffic in IPv4 networks
- **Translation**: Converting between IPv4 and IPv6 addresses

### Deployment Strategies
- **Gradual migration**: Phased approach by network segments
- **Hybrid environments**: Supporting both protocols during transition
- **Native IPv6**: Direct IPv6 connectivity where available

## Security Considerations

### IP Address Spoofing
- **Source address validation**: Verifying packet origins
- **Ingress/egress filtering**: Preventing forged addresses
- **Authentication mechanisms**: Securing address assignments

### Network Segmentation
- **Subnet isolation**: Separating network segments
- **Access control**: Restricting communication between subnets
- **VLAN implementation**: Logical network separation

## Troubleshooting IP Address Issues

### Common Problems
- **IP conflicts**: Duplicate addresses on the same network
- **Configuration errors**: Incorrect subnet masks or gateways
- **DHCP failures**: Servers not responding or exhausted pools
- **Resolution failures**: DNS or ARP issues

### Diagnostic Tools
- **ipconfig/ifconfig**: Display IP configuration
- **ping**: Test connectivity to specific addresses
- **tracert/traceroute**: Trace network paths
- **nslookup/dig**: DNS resolution testing
- **arp**: Display and manage ARP tables

## Related Topics
- [[dhcp-server|DHCP Server]] - Dynamic IP address assignment
- [[tcp-ip|TCP/IP Protocol Suite]] - Underlying protocol architecture
- [[distributed-systems/domain-name-system|Domain Name System (DNS)]] - Name resolution
- [[networking|Network Fundamentals]] - Basic networking concepts
- [[../../../security-and-privacy/index|Network Security]] - Securing IP communications

## References
- IETF RFC 791: Internet Protocol (IPv4)
- IETF RFC 2460: Internet Protocol, Version 6 (IPv6) Specification
- IETF RFC 1918: Address Allocation for Private Internets
- IETF RFC 4632: Classless Inter-domain Routing (CIDR)