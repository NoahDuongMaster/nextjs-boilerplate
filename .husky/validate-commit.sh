#!/bin/sh

# Determine the platform
PLATFORM=$(uname)

COMMIT_MSG_PATH=
while getopts "m:" opt
do
   case "$opt" in
      m ) COMMIT_MSG_PATH="$OPTARG" ;;
   esac
done

TYPE="$(cat "$PWD/.husky/metadata/type.txt")"
SERVICE="$(cat "$PWD/.husky/metadata/service.txt")"
ISSUE_CODE="$(cat "$PWD/.husky/metadata/issue_code.txt")"
COMMIT_MSG="$(cat "$COMMIT_MSG_PATH")"
valid_commit_regex="^(($TYPE)\(($SERVICE)\): ($ISSUE_CODE(-)[0-9]+|no-issue) [a-zA-Z0-9 \-]+)$"

message="❌ Commit invalid, regex: $valid_commit_regex"

# Use awk to check if the commit message matches the regex
if echo "$COMMIT_MSG" | awk "/$valid_commit_regex/ { exit 0 } { exit 1 }" > /dev/null 2>&1; then
  exit 0
else
  echo "$message"
  echo "Eg: feat($SERVICE): "$ISSUE_CODE"-112 test commit"
  exit 1
fi

exit 0
