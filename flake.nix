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
          pdo_mysql   # For MySQL / MariaDB
          pdo_pgsql   # For PostgreSQL
          pdo_sqlite  # For SQLite
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

      devShells.${system}.default = pkgs.mkShell {
        packages = [
          myPhp
          pkgs.nodejs_22
          pkgs.git
        ];

        shellHook = ''
          # Auto-load .env if it exists in the project root
          if [ -f .env ]; then
            set -a
            source .env
            set +a
            echo "Loaded environment variables from .env"
          fi
        '';
      };
    };
}
