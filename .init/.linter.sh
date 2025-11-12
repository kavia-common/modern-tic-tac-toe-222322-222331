#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-tic-tac-toe-222322-222331/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

