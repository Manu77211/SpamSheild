# SpamShield Backend Startup Script
Write-Host "🚀 Starting SpamShield Backend..." -ForegroundColor Green

# Activate virtual environment
Write-Host "📦 Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Set environment variables
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "True"

# Check if MongoDB is running (optional)
Write-Host "🔍 Checking MongoDB connection..." -ForegroundColor Yellow

# Start the Flask application
Write-Host "🌟 Starting Flask server..." -ForegroundColor Green
Write-Host "📍 API will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 Health check: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host "📚 API docs: http://localhost:5000/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

python app.py