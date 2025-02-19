[[NixOS configuration file]]

Configuration.nix
```nix
{ pkgs, ... }:

{
  environment.systemPackages = with pkgs; [
    # build essential
    gcc
    gnumake
    binutils
    pkgconfig
    zlib.dev
    # rust
    rustc
    cargo
    rustup
    rustfmt
    # javascript and typescript
    nodePackages.nodejs
    typescript
    nodePackages.pnpm
    node2nix
    # development
    git
    docker
    sqlite
    vscodium
    kate
    vim
    nano 
    # web 
    holochain-launcher
    vivaldi
    brave
    # medias
    vlc
    obs-studio
    kdePackages.kolourpaint
    kdePackages.kdenlive
    drawio
    # musique
    audacity
    audacious
    musescore
    frescobaldi
    # jeux
    steam
    wesnoth
    # divers
    keepassxc
    owncloud-client
    discord
    obsidian
    wasabiwallet
    spotify
  ];

  nix.packageManager = {
    enableForAllUsers = true;
  };
  
  programs.docker.enable = true
  services.docker.image = "nixos/nix:latest";
}
```

home.nix
```nix
{ config, pkgs, ... }:

{
  # Other configuration...

  programs.vscode = {
    enable = true;
    extensions = with pkgs.vscodiumExtensions; [
      giantcola.advanced-new-file
      rogalmic.bash-debug
      bungcip.better-toml
      oven.bun-vscode
      codeium.codeium
      adpyke.codesnap
      serayuzgur.crate
      pucelle.vscode-css-navigation
      phoenisx.cssvar
      ms-azuretools.vscode-docker
      # Add more extensions here
    ];
  };
}

```