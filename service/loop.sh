#!/bin/bash
set -euxo pipefail
docker build --platform linux/amd64 -t $IMAGE .
docker push $IMAGE
gcloud run deploy --image $IMAGE app --region us-central1
