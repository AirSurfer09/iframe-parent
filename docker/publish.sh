#!/usr/bin/env bash
# Builds the stripped client image for amd64 + arm64 and pushes it to
# Convai's Artifact Registry.
#
#   ./docker/publish.sh <tag> [experience-id]
#
# Requires: gcloud auth login && gcloud auth configure-docker <REGION>-docker.pkg.dev
set -euo pipefail

REGION="${REGION:-us-west1}"
PROJECT="${PROJECT:-convaieng}"
REPO="${REPO:-convai}"
IMAGE="${IMAGE:-pixelstream-demo}"

TAG="${1:?usage: publish.sh <tag> [experience-id]}"
EXP_ID="${2:-}"

REF="${REGION}-docker.pkg.dev/${PROJECT}/${REPO}/${IMAGE}:${TAG}"

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
echo "  docker run --rm -p 8080:8080 -e EXP_ID=<their-experience-id> ${REF}"
