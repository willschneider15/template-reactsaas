#!/bin/bash
# TODO: Still needs more testing

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if npm is installed
if ! command_exists npm; then
    echo "Error: npm is not installed. Please install Node.js and npm from https://nodejs.org/ and try again."
    exit 1
fi

# Check if git is installed
if ! command_exists git; then
    echo "Error: git is not installed. Please install Git from https://git-scm.com/ and try again."
    exit 1
fi

# Step 1: Set up environment variables
mv .env.example .env.local
echo "We need some Firebase environment variables for your dev environment."

# TODO: Copy and paste your whole config and paste it here to be parsed
read -p "Enter your NEXT_PUBLIC_FIREBASE_API_KEY_DEV: " firebase_api_key
read -p "Enter your NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV: " firebase_auth_domain
read -p "Enter your NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV: " firebase_project_id
read -p "Enter your NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV: " firebase_storage_bucket
read -p "Enter your NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV: " firebase_messaging_sender_id
read -p "Enter your NEXT_PUBLIC_FIREBASE_APP_ID_DEV: " firebase_app_id
read -p "Enter your NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_DEV : " firebase_measurement_id

echo "# Firebase : https://console.firebase.google.com"
echo "# Create Project > Add App > Web > Register App > Copy Config"
echo
echo "# Dev Environment"
echo "NEXT_PUBLIC_FIREBASE_API_KEY_DEV=$firebase_api_key" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV=$firebase_auth_domain" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV=$firebase_project_id" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV=$firebase_storage_bucket" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV=$firebase_messaging_sender_id" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_APP_ID_DEV=$firebase_app_id" >> .env.local
if [ -n "$firebase_measurement_id" ]; then
  echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_DEV=$firebase_measurement_id" >> .env.local
fi

echo "# Prod Environment (Reccomend creating a new project for production)"
echo NEXT_PUBLIC_FIREBASE_API_KEY_PROD="enter-env-here"
echo NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD="enter-env-here"
echo NEXT_PUBLIC_FIREBASE_PROJECT_ID_PROD="enter-env-here"
echo NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD="enter-env-here"
echo NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PROD="enter-env-here"
echo NEXT_PUBLIC_FIREBASE_APP_ID_PROD="enter-env-here"
echo NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_PROD="enter-env-here"

echo "# DEV or PROD"
echo ENVIRONMENT="DEV" 

# Display instructions to enable Firebase services
echo "Please make sure the following Firebase services are enabled:"
echo "1. Authentication: enable Email/Password provider at https://console.firebase.google.com/project/$firebase_project_id/authentication/providers"
echo "2. Firestore Database: enable Firestore at https://console.firebase.google.com/project/$firebase_project_id/firestore"

# Firestore Rules setup
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
echo "$firestore_rules" > firestore.rules
echo "Please add the following Firestore rules manually at https://console.firebase.google.com/project/$firebase_project_id/firestore/rules"
cat firestore.rules
read -p "Press any key after setting up the Firestore rules..."

# Step 2: Install dependencies and run the development server
npm install
npm run dev &

# Step 3: Open http://localhost:3000 in browser
echo "Open http://localhost:3000 in your browser to see the result."
echo
# Step 4: Add version control and save progress on GitHub
read -p "Enter a GitHub repository URL (e.g., https://github.com/username/repository.git): to save progress" github_url
git init
git remote add origin "$github_url"
git branch -M main
git add .
git commit -m 'Adding the template code to my repo'
git push -u origin main

# Step 5: Deploy on Vercel
echo "To deploy your project on Vercel:"
echo "1. Import your Git repository into Vercel: https://vercel.com/new"
echo "2. Copy and paste your environment variables from .env.local."
echo "3. Click deploy."

echo "Setup complete."