[[Distributed Systems]] [[Networking]] [[Peer to Peer]] [[Local-first]]

[Automerge CRDT | Automerge CRDT](https://automerge.org)
> Automerge is a library of data structures for building collaborative applications.

[Welcome to Automerge | Automerge CRDT](https://automerge.org/docs/hello/)
> Automerge is a library of data structures for building collaborative

Automerge is a library of data structures for building collaborative applications. You can have a copy of the application state locally on several devices which may belong to the same user, or to different users. Each user can independently update the application state on their local device, even while offline, and save the state to local disk. This is similar to Git, which allows you to edit files and commit changes offline.

- When a network connection is available, Automerge figures out which changes need to be synced from one device to another, and brings them into the same state. (Similar to Git, which lets you push your own changes, and pull changes from other developers, when you are online.)

- If the state was changed concurrently on different devices, Automerge automatically merges the changes together cleanly, so that everybody ends up in the same state, and no changes are lost. (Git only supports merging of plain text; Automerge allows complex file formats to be merged automatically.)

- Automerge keeps track of the changes you make to the state, so that you can view old versions, compare versions, create branches, and choose when to merge them. (Similar to Git, which allows diffing, branching, merging, and pull request workflows.)
