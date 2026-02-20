
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

import sys
import os

# Configure logging
logging.basicConfig(level=logging.INFO)

app = FastAPI(title="SentinAI Backend", version="0.1.0")

# CORS (allow frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
from api import routes
app.include_router(routes.router, prefix="/api")

# Serve frontend static files
if getattr(sys, 'frozen', False):
    # If the application is run as a bundle, the PyInstaller bootloader
    # extends the sys module by a flag frozen=True and sets the app 
    # path into variable _MEIPASS'.
    frontend_dir = os.path.join(sys._MEIPASS, 'frontend')
else:
    frontend_dir = "../frontend"

app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
