#holochain/tools 

[[Outils et Technologie/DWeb/Holochain/Holochain]]
[[HDK]]

```embed
title: 'Get Building'
image: 'https://d33wubrfki0l68.cloudfront.net/79f6577e3c8102e1f0caf8d2f43d4fcf472a3e34/3e15e/assets/img/holochain-logo-small.png'
description: 'In Quick Start you installed Holochain and built a templated forum application. Here you will use the scaffolding tool to build your own application and learn the basic commands for using the scaffold.'
url: 'https://developer.holochain.org/get-building/'
```

```embed
title: "Holochain"
image: "https://avatars.githubusercontent.com/u/29492745?s=280&v=4"
description: "Scalable framework for P2P distributed apps. For all those projects you wish you could take from centralized web servers but you know can’t scale on blockchain. - Holochain"
url: "https://github.com/holochain/"
```

``` shell
nix run github:/holochain/holochain#hc-scaffold -- web-app
```

The Holochain Scaffolding tool is a command-line interface (CLI) that allows developers to quickly generate and edit Holochain applications[1][2][5]. The tool is designed to simplify the process of creating Holochain zomes, which are the building blocks of Holochain applications. Zomes are self-contained modules that can be combined to create complex applications.

The Holochain Scaffolding tool provides a set of commands that developers can use to scaffold an example app, an empty web-app, a DNA, a zome, an entry-type, a collection, or a new link-type[1]. The tool generates a scaffold.json file that the Holochain software uses to generate an application framework. The scaffold.json file contains all the modules, data structures, CRUD, and validation scripts that the developer specifies[3].

The Holochain Scaffolding tool is an essential tool for developers who want to build Holochain applications quickly and efficiently. It allows developers to focus on the business logic of their applications, rather than the low-level details of Holochain development. The tool is available for Windows, macOS, and Linux, and can be obtained through Holonix, a Nix-based environment for Linux and macOS-based developers[4].

Overall, the Holochain Scaffolding tool is a powerful tool that simplifies the process of building Holochain applications. It provides a set of high-level abstractions that make it easier to write complex applications, while still allowing developers to have fine-grained control over the details of their code.

Citations:
[1] https://github.com/holochain/scaffolding
[2] https://blog.holochain.org/scaffolding-my-first-happ-in-10-minutes/
[3] https://github.com/holochain/scaffold
[4] https://www.holochain.org/tools-and-libraries/
[5] https://developer.holochain.org/get-started/
[6] https://youtube.com/watch?v=ZKf_rRqc_ww
