
#!/usr/bin/env bash

set -u

SWAP_DIR="$HOME/.local/state/nvim/swap"
OUT_DIR="$PWD/temp"
BACKUP_DIR="$OUT_DIR/swap-backup"
RECOVER_DIR="$OUT_DIR/recovered"

mkdir -p "$OUT_DIR" "$RECOVER_DIR"

if [ ! -d "$SWAP_DIR" ]; then
    echo "Swap directory not found: $SWAP_DIR"
    exit 1
fi

# 1. Backup original swap files
if [ -e "$BACKUP_DIR" ]; then
    BACKUP_DIR="$OUT_DIR/swap-backup-$(date +%Y%m%d-%H%M%S)"
fi

cp -a "$SWAP_DIR" "$BACKUP_DIR"

echo "Backup saved: $BACKUP_DIR"

# 2. Prepare isolated recovery directory
WORK_DIR=$(mktemp -d "$OUT_DIR/.recover.XXXXXX")

cleanup() {
    rm -rf -- "$WORK_DIR"
}
trap cleanup EXIT

SUCCESS=0
FAILED=0

# 3. Recover every swap file
find "$BACKUP_DIR" -maxdepth 1 -type f \
    \( -name '*.swp' -o -name '*.swo' -o -name '*.swn' \) \
    -print0 |
while IFS= read -r -d '' swap; do

    filename=$(basename "$swap")
    extension="${filename##*.}"
    encoded="${filename%.*}"

    # Decode Neovim swap filename into original absolute path
    original=$(printf '%s' "$encoded" | sed 's/%/\//g')

    # Keep every version separate
    relative="${original#/}"
    destination="$RECOVER_DIR/$relative.from-$extension"

    mkdir -p "$(dirname "$destination")"

    # Isolate one swap at a time.
    # Rename its suffix to .swp so Neovim can locate it independently.
    find "$WORK_DIR" -mindepth 1 -delete
    cp "$swap" "$WORK_DIR/$encoded.swp"

    echo ""
    echo "Recovering: $original"

    if nvim -u NONE -i NONE -n -es \
        --cmd "set directory=$WORK_DIR//" \
        -c "execute 'recover ' . fnameescape('$original')" \
        -c "execute 'write! ' . fnameescape('$destination')" \
        -c "qa!"; then

        if [ -f "$destination" ]; then
            echo "OK: $destination"
        else
            echo "FAILED: No output generated"
        fi
    else
        echo "FAILED: $original"
        FAILED=$((FAILED + 1))
    fi

done

echo ""
echo "Recovery process finished."
echo "Results: $RECOVER_DIR"

