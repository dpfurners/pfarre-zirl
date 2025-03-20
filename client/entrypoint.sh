#!/bin/sh

if [ "$ENVIRONMENT" = "dev" ]; then
    echo "Starting Vite for development (master branch)..."
    cd /app/dev && npm run dev
elif [ "$ENVIRONMENT" = "dev-testing" ]; then
    echo "Starting Vite for testing (updating branch)..."
    cd /app/dev-testing && npm run dev
else
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
fi
