{
  description = "php devenv";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      myPhp = pkgs.php.buildEnv {
        extensions = ({ enabled, all }: enabled ++ (with all; [
          pdo
          pdo_mysql
          pdo_pgsql
          pdo_sqlite
        ]));
      };
    in
    {
      packages.${system}.default = pkgs.buildEnv {
        name = "camagru-env";
        paths = with pkgs; [
          myPhp
            nodejs_22
            git
        ];
      };
    };
}
