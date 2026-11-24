#! /bin/bash

RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
MAGENTA='\033[35m'
CYAN='\033[36m'
WHITE='\033[37m'
BOLD='\033[1m'
RESET='\033[0m'

URL=http://localhost:8443
API_VERSION_URL=/api/v1
ROUTE=/
CUSTOM=""
DATA=()
HEADER=""
COOKIE=./cookie.txt

GET() {
  echo -e "$BOLD$GREEN[$HEADER]$RESET"
  CMD=(curl -s -c $COOKIE -b $COOKIE -i -X GET ${URL}${API_VERSION_URL}${ROUTE}${CUSTOM});
  echo -e "$BLUE${CMD[@]}$RESET";
  "${CMD[@]}"
  printf "\n===============================================================\n";
}

POST() {
  REQUEST_DATA=()
  for data in "${DATA[@]}"; do
    REQUEST_DATA+=( "-d" "$data" )
  done

  echo -e "$BOLD$GREEN[$HEADER]$RESET"
  CMD=(curl -s -c $COOKIE -b $COOKIE -i -X POST ${URL}${API_VERSION_URL}${ROUTE}${CUSTOM} ${REQUEST_DATA[@]});
  echo -e "$BLUE${CMD[@]}$RESET";
  "${CMD[@]}"
  printf "\n===============================================================\n";
}

# (
#   HEADER="register"
#   ROUTE=/register
#   DATA+=("email=ab@gmail.com")
#   DATA+=("username=ba")
#   DATA+=("password=password")
#   POST
# )

# (
#   HEADER="login"
#   ROUTE=/login
#   DATA+=("email=ab@gmail.com")
#   DATA+=("password=password")
#   POST
# )

# (
#   HEADER="verify token"
#   ROUTE=/verify
#   TOKEN=991df959-e93c-42d1-9f64-256d21fd9428
#   CUSTOM="?verify_token=$TOKEN"
#   GET
# )

# (
#   HEADER="reset verify token"
#   ROUTE=/reset-token
#   DATA+=("email=kkk@gmail.com")
#   DATA+=("password=password")
#   POST
# )

# (
#   HEADER="get user data"
#   ROUTE=/user
#   GET
# )
#
