#!/bin/bash

# Deployment script for User Management System
set -e  # Exit on any error

LOG_DIR="logs"
LOG_FILE="$LOG_DIR/deploy-$(date +%Y%m%d-%H%M%S).log"
BACKEND_IMAGE="um-backend:latest"
FRONTEND_IMAGE="um-frontend:latest"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

# Switch to script directory
cd "$(dirname "$0")"

log "=== Starting deployment for User Management System ==="

# Pull latest code
log "Pulling latest code from Git..."
git pull origin main 2>&1 | tee -a "$LOG_FILE"

# Switch to Minikube's Docker environment
log "Switching to Minikube's Docker environment..."
eval $(minikube -p minikube docker-env)

# Backend Deployment
log "Building backend Docker image..."
docker rmi -f $BACKEND_IMAGE 2>/dev/null || true
cd backend
docker build --no-cache -t $BACKEND_IMAGE . 2>&1 | tee -a "../$LOG_FILE"
cd ..

# Frontend Deployment
log "Building frontend Docker image..."
docker rmi -f $FRONTEND_IMAGE 2>/dev/null || true
cd frontend
docker build --no-cache -t $FRONTEND_IMAGE . 2>&1 | tee -a "../$LOG_FILE"
cd ..

# Deploy to Kubernetes
log "Deleting existing deployments and services..."
kubectl delete deployment um-backend um-frontend 2>/dev/null || true
kubectl delete service um-backend um-frontend 2>/dev/null || true

log "Deploying to Minikube Kubernetes..."
kubectl apply -f kubernetes/ 2>&1 | tee -a "$LOG_FILE"

log "Waiting for backend deployment to complete..."
kubectl rollout status deployment/um-backend 2>&1 | tee -a "$LOG_FILE"

log "Waiting for frontend deployment to complete..."
kubectl rollout status deployment/um-frontend 2>&1 | tee -a "$LOG_FILE"

log "=== Deployment completed for User Management System ==="

# Display service URLs
MINIKUBE_IP=$(minikube ip)
BACKEND_PORT=$(kubectl get svc um-backend -o jsonpath='{.spec.ports[0].nodePort}')
FRONTEND_PORT=$(kubectl get svc um-frontend -o jsonpath='{.spec.ports[0].nodePort}')

log "Services are available at:"
log "Backend: http://${MINIKUBE_IP}:${BACKEND_PORT}"
log "Frontend: http://${MINIKUBE_IP}:${FRONTEND_PORT}"
