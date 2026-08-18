#!/usr/bin/env bash
# Builds the stripped client image for amd64 + arm64 and pushes it to Docker Hub.
#
#   ./docker/publish.sh <tag> [experience-id]
#
# Requires: docker login (as a user with push access to the convaieng org)
set -euo pipefail

ORG="${ORG:-convaieng}"
IMAGE="${IMAGE:-pixelstream-domain-test}"

TAG="${1:?usage: publish.sh <tag> [experience-id]}"
EXP_ID="${2:-}"

REF="docker.io/${ORG}/${IMAGE}:${TAG}"

echo "Building and pushing ${REF}"

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --build-arg "NEXT_PUBLIC_EXP_ID=${EXP_ID}" \
  --tag "${REF}" \
  --push \
  .

echo
echo "Pushed ${REF}"
echo "Client runs it with:"
echo "  docker run --rm -p 8080:8080 -e EXP_ID=<their-experience-id> ${ORG}/${IMAGE}:${TAG}"
