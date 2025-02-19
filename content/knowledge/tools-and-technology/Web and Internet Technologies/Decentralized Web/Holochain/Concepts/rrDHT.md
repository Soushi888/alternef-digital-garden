rrDHT (relaxed, agent-centric distributed hash table) is a key component of Holochain's technology that ensures fast, robust, and secure peer-to-peer networking.

It's a unique design of [[Outils et Technologie/DWeb/Holochain/Holochain]] that is covered under intellectual property laws. It is a key component of Holochain's secure peer-to-peer networking technology.

The rrDHT is a distributed hash table ([[Distributed Hash Table]]) that spreads responsibility for keys and values across many machines. Each machine stores just a portion of them, which means if one machine disappears, only a little bit of data is lost.

In rrDHT, each peer has a range of the key space that it considers its 'neighbourhood'. Within this neighbourhood, peers take responsibility for storing a copy of all data whose keys fall within it, to the best of their ability. They also know the transport addresses of all peers whose keys fall within it. This neighbourhood model is used for data storage, retrieval, and security.

The rrDHT design allows for fast and robust data retrieval. It uses a simple nearness algorithm where keys are just 32-bit numbers, and the machine whose number is closest to the data’s number is the best match. This makes lookups very fast to calculate.

The rrDHT also ensures data integrity. When a neighbourhood is called on to store a piece of someone else’s public data, they first validate it according to Holochain’s rules and an application’s particular rules. If they find any suspicious activity, they sound the alarm. This alarm acts like an antibody — it spreads through the network of peers, triggering an immune response in each of them until everyone recognises the bad actor and has taken steps to protect themselves.
