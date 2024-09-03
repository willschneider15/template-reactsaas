#!/bin/bash
# Beta version of setup.sh tested on MacOS
# Run this first: $ chmod +x setup.sh

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function for styled echo
styled_echo() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function for section headers
section_header() {
    echo
    styled_echo $BLUE "========================================"
    styled_echo $BLUE "  $1"
    styled_echo $BLUE "========================================"
    echo
}

# Progress indicator
progress_indicator() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

# Function to parse Firebase config
parse_firebase_config() {
    local env=$1
    styled_echo $YELLOW "Paste your Firebase config for $env environment (press Enter twice when finished):"
    config=""
    while IFS= read -r line; do
        [[ -z "$line" ]] && break
        config+="$line"$'\n'
    done

    api_key=$(echo "$config" | grep 'apiKey:' | cut -d '"' -f 2)
    auth_domain=$(echo "$config" | grep 'authDomain:' | cut -d '"' -f 2)
    project_id=$(echo "$config" | grep 'projectId:' | cut -d '"' -f 2)
    storage_bucket=$(echo "$config" | grep 'storageBucket:' | cut -d '"' -f 2)
    messaging_sender_id=$(echo "$config" | grep 'messagingSenderId:' | cut -d '"' -f 2)
    app_id=$(echo "$config" | grep 'appId:' | cut -d '"' -f 2)
    measurement_id=$(echo "$config" | grep 'measurementId:' | cut -d '"' -f 2)

    echo "NEXT_PUBLIC_FIREBASE_API_KEY_${env}=$api_key" >> .env.local
    echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_${env}=$auth_domain" >> .env.local
    echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID_${env}=$project_id" >> .env.local
    echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_${env}=$storage_bucket" >> .env.local
    echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_${env}=$messaging_sender_id" >> .env.local
    echo "NEXT_PUBLIC_FIREBASE_APP_ID_${env}=$app_id" >> .env.local
    [ -n "$measurement_id" ] && echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_${env}=$measurement_id" >> .env.local
    echo "" >> .env.local
}

# Function to read project ID from .env.local
get_project_id() {
    local env=$1
    grep "FIREBASE_PROJECT_ID_${env}" .env.local | cut -d '=' -f2
}

# Welcome message
clear
section_header "Welcome to the React SaaS Template Setup Script"
styled_echo $GREEN "This script will guide you through setting up your SaaS project for both development and production environments."
echo
styled_echo $GREEN "Reccomend referring to: https://www.reactsaas.net/docs as you go through the setup."

# Step 0: Dependencies
section_header "Step 0: Checking Dependencies"
styled_echo $YELLOW "Please ensure you have Node.js and Git installed on your machine."
echo
styled_echo $YELLOW "Press Enter to continue..."
read -p ""


# Step 1: Set up environment variables
section_header "Step 1: Setting Up Environment Variables"
styled_echo $YELLOW "We need Firebase environment variables for your dev and prod environments."
styled_echo $BLUE "Create new projects: https://console.firebase.google.com for dev and prod."

# Parse DEV environment
echo
styled_echo $BLUE "Setting up DEV environment..."
echo 
styled_echo $BLUE "Example:"
styled_echo $BLUE "  apiKey: \"AIzaSyD9qgoef0BjuBPpoJ0yWoUgwmuu3hCc51U\","
styled_echo $BLUE "  authDomain: \"test-setup-dev.firebaseapp.com\","
styled_echo $BLUE "  projectId: \"test-setup-dev\","
styled_echo $BLUE "  storageBucket: \"test-setup-dev.appspot.com\","
styled_echo $BLUE "  messagingSenderId: \"1064160319795\","
styled_echo $BLUE "  appId: \"1:1064160319795:web:32036442a5329c43658646\","
styled_echo $BLUE "  measurementId: \"G-60Q0GZRDTE\""

echo "# Firebase : https://console.firebase.google.com" >> .env.local
echo "# Create Project > Add App > Web > Register App > Copy Config" >> .env.local
echo "" >> .env.local
echo "# Dev Environment" >> .env.local
parse_firebase_config "DEV"

# Parse PROD environment
echo
styled_echo $BLUE "Setting up PROD environment..."
echo "# Prod Environment (Recommend creating a new project for production)" >> .env.local
parse_firebase_config "PROD"

# Add ENVIRONMENT variable
echo "# Select Environment: DEV or PROD" >> .env.local
echo "ENVIRONMENT=DEV" >> .env.local
styled_echo $GREEN "✓ Environment variables set up successfully."

# Read project IDs
dev_project_id=$(get_project_id "DEV")
prod_project_id=$(get_project_id "PROD")

# Create Firestore databases
section_header "Step 2: Creating Firestore Databases"
styled_echo $YELLOW "Please create your default databases in prod and dev:"
styled_echo $BLUE "DEV: https://console.firebase.google.com/project/$dev_project_id/firestore"
styled_echo $BLUE "PROD: https://console.firebase.google.com/project/$prod_project_id/firestore"
echo
styled_echo $YELLOW "Press Enter after adding both databases..."
read -p ""

# Firestore Rules setup
section_header "Step 3: Setting Up Firestore Rules"
styled_echo $YELLOW "Please add the following Firestore rules manually:"
styled_echo $BLUE "DEV: https://console.firebase.google.com/project/$dev_project_id/firestore/rules"
styled_echo $BLUE "PROD: https://console.firebase.google.com/project/$prod_project_id/firestore/rules"

firestore_rules='
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /customers/{uid} {
      allow read: if request.auth.uid == uid;

      match /checkout_sessions/{id} {
        allow read, write: if request.auth.uid == uid;
      }
      match /subscriptions/{id} {
        allow read: if request.auth.uid == uid;
      }
      match /payments/{id} {
        allow read: if request.auth.uid == uid;
      }
    }

    match /products/{id} {
      allow read: if true;

      match /prices/{id} {
        allow read: if true;
      }

      match /tax_rates/{id} {
        allow read: if true;
      }
    }
  }
}
'

echo "$firestore_rules"
echo
styled_echo $YELLOW "Press Enter after setting up the Firestore rules…"
read -p ""


# Enable Firebase Authentication
section_header "Step 4: Enabling Firebase Authentication"
styled_echo $YELLOW "Enable Firebase Authentication: Email/Password provider at:"
styled_echo $BLUE "DEV: https://console.firebase.google.com/project/$dev_project_id/authentication/providers"
styled_echo $BLUE "PROD: https://console.firebase.google.com/project/$prod_project_id/authentication/providers"
echo
styled_echo $YELLOW "Press Enter after setting up the Firebase Authentication..."
read -p ""

# Step 5: Install dependencies and run the development server
section_header "Step 5: Installing Dependencies and Starting Dev Server"
styled_echo $YELLOW "Installing dependencies…"
npm install &
progress_indicator $!
styled_echo $GREEN "✓ Dependencies installed successfully."

styled_echo $YELLOW "Starting development server…"
npm run dev &
DEV_SERVER_PID=$!
styled_echo $GREEN "✓ Development server started."

# Step 6: Opening Localhost Project in Browser
section_header "Step 6: Opening Project in Browser"

# Give user time to check the development server
styled_echo $YELLOW "Please check your browser to ensure the development server is running correctly."
styled_echo $YELLOW "The development server will be stopped after this check."
echo
styled_echo $YELLOW "Press Enter when you're ready to continue…"
read -p ""

# Stop the development server
kill $DEV_SERVER_PID
wait $DEV_SERVER_PID 2>/dev/null
styled_echo $GREEN "✓ Development server stopped."

# Step 7: Add version control and save progress on GitHub
section_header "Step 7: Setting Up Version Control"
styled_echo $YELLOW "We'll now set up version control and push your project to GitHub."
styled_echo $YELLOW "If you haven't created a GitHub repository yet, please do so now."
styled_echo $YELLOW "Visit https://github.com/new to create a new repository."
echo
styled_echo $YELLOW "Press Enter when you're ready to continue…"
read -p ""

echo
echo "Enter your GitHub repository URL (e.g., https://github.com/username/repository.git): "
read github_url
git init
git remote add origin "$github_url"
git branch -M main
git add .
git commit -m 'Adding the template code to my repo'
git push -u origin main
styled_echo $GREEN "✓ Project pushed to GitHub successfully."

# Step 8: Deploy on Vercel
section_header "Step 8: Deploying on Vercel"
styled_echo $YELLOW "To deploy your project on Vercel:"
styled_echo $BLUE "1. Import your Git repository into Vercel: https://vercel.com/new"
styled_echo $BLUE "2. Copy and paste your environment variables from .env.local."
styled_echo $BLUE "3. Click deploy."

# Summary
section_header "Setup Complete!"
styled_echo $GREEN "Your Firebase project has been set up successfully."
styled_echo $GREEN "Your code has been pushed to $github_url"
styled_echo $YELLOW "Don't forget to deploy your project on Vercel!"

styled_echo $BLUE "Thank you for using the Firebase Project Setup Script."
