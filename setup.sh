#!/bin/bash

echo "========================================"
echo "RL Compiler - Backend Setup"
echo "========================================"
echo ""
echo "Installing dependencies..."
cd backend
npm install
echo ""
echo "✓ Installation complete!"
echo ""
echo "To start the backend server, run:"
echo "  npm run dev    (development)"
echo "  npm start      (production)"
echo ""
echo "Backend will run on: http://localhost:5000"
echo ""
