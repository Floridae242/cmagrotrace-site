#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Build Next.js app
echo "Building Next.js app..."
npm run build

# Export static files
echo "Exporting static files..."
npm run export

# Build Firebase Functions
echo "Building Firebase Functions..."
cd functions
npm install
npm run build
cd ..

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy