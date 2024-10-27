#!/bin/sh

# Determine the platform
PLATFORM=$(uname)

# Get the local branch name
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

# Read metadata from files
TYPE="$(cat "$PWD/.husky/metadata/type.txt")"
SERVICE="$(cat "$PWD/.husky/metadata/service.txt")"
ISSUE_CODE="$(cat "$PWD/.husky/metadata/issue_code.txt")"

# Define the regex for a valid branch name
valid_branch_regex="^(($TYPE)\(($SERVICE)\)\/($ISSUE_CODE(-)[0-9]+(-)|no-issue(-))[a-zA-Z0-9\-]+)$"

# Error message for invalid branch name
message="❌ Branch name invalid, regex: $valid_branch_regex"

# Use awk to check if the commit message matches the regex
if echo "$local_branch_name" | awk "/$valid_branch_regex/ { exit 0 } { exit 1 }"; then
  exit 0
else
  echo "$message"
  echo "Eg: feat($SERVICE)/$ISSUE_CODE-112-test-branch"
  exit 1
fi

exit 0
