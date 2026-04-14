#!/usr/bin/env python3
"""
Run both backend (Flask) and frontend (Next.js) for deployment
"""
import subprocess
import os
import sys
import time

def run_command(cmd, description):
    """Run command and print output"""
    print(f"\n{'='*60}")
    print(f"🚀 {description}")
    print(f"{'='*60}\n")
    return subprocess.Popen(cmd, shell=True)

def main():
    print("""
    ╔════════════════════════════════════════════╗
    ║     Image Identifier AI - Full Stack       ║
    ║        Starting Backend + Frontend...       ║
    ╚════════════════════════════════════════════╝
    """)
    
    # Install dependencies
    print("📦 Installing dependencies...")
    os.system("pip install -q -r requirements.txt")
    os.system("npm install -q")
    
    print("\n✅ Dependencies installed!\n")
    
    # Run backend in background
    backend_process = run_command(
        "python backend_server.py",
        "Starting Flask Backend Server (port 5000)"
    )
    
    # Give backend time to start
    time.sleep(3)
    
    # Run frontend
    frontend_process = run_command(
        "npm run dev",
        "Starting Next.js Frontend (port 3000)"
    )
    
    print("\n" + "="*60)
    print("✨ Both servers are running!")
    print("="*60)
    print("📱 Frontend: http://localhost:3000")
    print("🔧 Backend:  http://localhost:5000")
    print("="*60 + "\n")
    
    try:
        # Wait for frontend to finish (will run indefinitely)
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\n\n⏹️  Stopping servers...")
        backend_process.terminate()
        frontend_process.terminate()
        backend_process.wait()
        frontend_process.wait()
        print("✅ Servers stopped")
        sys.exit(0)

if __name__ == "__main__":
    main()
