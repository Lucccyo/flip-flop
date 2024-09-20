#!/usr/bin/env bash
RED='\033[0;31m'
YELLOW='\033[0;93m'
NC='\033[0m'

db_path="$PWD/src-tauri/data.json"
bak_dir="$PWD/src-tauri/backups"

hint="Try 'print', 'reset', 'save <backup_name>' or 'load <backup_name>'."

error() {
  case "$1" in
  'missing')
    echo -e "${RED}Error:${NC} Missing $2."
    if [[ "$2" == "operand" ]]; then
      echo "$hint"
    fi;;
  'not_found')
    echo -e "${RED}Error:${NC} File <$2> does not exists.";;
  esac
  exit 0
}

if [[ "$#" -eq 0 ]]; then 
  error 'missing' 'operand'
fi
case "$1" in
  'print')
    cat "$db_path"
    ;;
  'reset')
    cat > "$db_path"<< EOF
{
  "users": []
}
EOF
;;
  'save')
    if [[ "$#" -lt 2 ]]; then
      error 'missing' 'name of backup file'
    fi
    mkdir -p "$bak_dir"
    cp "$db_path" "$bak_dir/$2.json";;
  'load')
    if [[ "$#" -lt 2 ]]; then
      error 'missing' 'name of file to load'
    fi
    if [ ! -f "$bak_dir/$2" ]; then
      error 'not_found' "$2"
    fi
    echo -e "${YELLOW}Warning:${NC} This action will overwrite the actual <data.json>."
    while true; do
      read -p "Continue ?" yn
      case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
      esac
    done
    cp "$bak_dir/$2" "$db_path";;
  *)
    echo -e "${RED}Error:${NC} Unrecognized command '$1'."
    echo "$hint"
    exit 0
esac
