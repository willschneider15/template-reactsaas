# Beta version of setup.ps1 tested on Windows
# Run this first: $ Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Define colors
$RED = [ConsoleColor]::Red
$GREEN = [ConsoleColor]::Green
$YELLOW = [ConsoleColor]::Yellow
$BLUE = [ConsoleColor]::Blue
$NC = [ConsoleColor]::White # No Color

# Function for styled echo
function Styled-Echo {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Message,

        [ConsoleColor]$Color = $NC
    )
    
    $originalColor = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Message
    $Host.UI.RawUI.ForegroundColor = $originalColor
}

# Function for section headers
function Section-Header {
    param (
        [string]$HeaderText
    )

    Styled-Echo "========================================" -Color $BLUE
    Styled-Echo "  $HeaderText" -Color $BLUE
    Styled-Echo "========================================" -Color $BLUE
}

# Function to parse Firebase config
function Parse-Firebase-Config {
    param (
        [string]$Env
    )

    # Define the path to the configuration file
    $configFile = ".env.local"

    # Prompt user for Firebase config input
    Styled-Echo "Paste your Firebase config for $Env environment (press Enter twice when finished):" -Color $YELLOW
    $config = ""
    while ($true) {
        $line = Read-Host
        if ([string]::IsNullOrWhiteSpace($line)) { break }
        $config += $line + "`n"
    }

    # Extract values using Select-String and string manipulation
    $api_key = ($config | Select-String -Pattern 'apiKey:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'apiKey:\s*"([^"]+)"', '$1' })
    $auth_domain = ($config | Select-String -Pattern 'authDomain:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'authDomain:\s*"([^"]+)"', '$1' })
    $project_id = ($config | Select-String -Pattern 'projectId:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'projectId:\s*"([^"]+)"', '$1' })
    $storage_bucket = ($config | Select-String -Pattern 'storageBucket:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'storageBucket:\s*"([^"]+)"', '$1' })
    $messaging_sender_id = ($config | Select-String -Pattern 'messagingSenderId:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'messagingSenderId:\s*"([^"]+)"', '$1' })
    $app_id = ($config | Select-String -Pattern 'appId:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'appId:\s*"([^"]+)"', '$1' })
    $measurement_id = ($config | Select-String -Pattern 'measurementId:\s*"([^"]+)"' | ForEach-Object { $_.Matches.Value -replace 'measurementId:\s*"([^"]+)"', '$1' })

    # Prepare environment variables content
    $envVars = @(
        "NEXT_PUBLIC_FIREBASE_API_KEY_${Env}=${api_key}"
        "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_${Env}=${auth_domain}"
        "NEXT_PUBLIC_FIREBASE_PROJECT_ID_${Env}=${project_id}"
        "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_${Env}=${storage_bucket}"
        "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_${Env}=${messaging_sender_id}"
        "NEXT_PUBLIC_FIREBASE_APP_ID_${Env}=${app_id}"
    )

    if ($measurement_id) {
        $envVars += "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_${Env}=${measurement_id}"
    }

    # Ensure no previous entries for the same environment exist
    $existingContent = Get-Content $configFile -Raw
    $updatedContent = $existingContent -replace "NEXT_PUBLIC_FIREBASE_(.*)_${Env}=[^\n]*", ''
    $envVars | ForEach-Object { $updatedContent += "$($_)`n" }

    # Save updated content to .env.local
    $updatedContent | Set-Content -Path $configFile -Encoding utf8

    Styled-Echo "Firebase config for $Env environment saved to $configFile" -Color $GREEN
}



# Function to read project ID from .env.local
function Get-Project-ID {
    param (
        [string]$Env
    )

    (Get-Content .env.local | Select-String "NEXT_PUBLIC_FIREBASE_PROJECT_ID_${Env}" | ForEach-Object { $_.ToString().Split('=')[1] }).Trim()
}

# Welcome message
Clear
Section-Header "Welcome to the React SaaS Template Setup Script"
Styled-Echo "This script will guide you through setting up your SaaS project for both development and production environments." -Color $GREEN
Write-Host
Styled-Echo "Reccomend referring to: https://www.reactsaas.net/docs as you go through the setup." -Color $GREEN

# Step 0: Dependencies
Section-Header "Step 0: Checking Dependencies"
Styled-Echo "Please ensure you have Node.js and Git installed on your machine." -Color $YELLOW
Styled-Echo "Press Enter to continue..." -Color $YELLOW
Read-Host

# Step 1: Set up environment variables
Section-Header "Step 1: Setting Up Environment Variables"
Styled-Echo "We need Firebase environment variables for your dev and prod environments." -Color $YELLOW

# Parse DEV environment
Styled-Echo "Setting up DEV environment..." -Color $BLUE
Styled-Echo "Example:" -Color $BLUE
Styled-Echo '  apiKey: "AIzaSyD9qgoef0BjuBPpoJ0yWoUgwmuu3hCc51U",' -Color $BLUE
Styled-Echo '  authDomain: "test-setup-dev.firebaseapp.com",' -Color $BLUE
Styled-Echo '  projectId: "test-setup-dev",' -Color $BLUE
Styled-Echo '  storageBucket: "test-setup-dev.appspot.com",' -Color $BLUE
Styled-Echo '  messagingSenderId: "1064160319795",' -Color $BLUE
Styled-Echo '  appId: "1:1064160319795:web:32036442a5329c43658646",' -Color $BLUE
Styled-Echo '  measurementId: "G-60Q0GZRDTE"' -Color $BLUE

Add-Content -Path .env.local -Value "# Firebase : https://console.firebase.google.com"
Add-Content -Path .env.local -Value "# Create Project > Add App > Web > Register App > Copy Config"
Add-Content -Path .env.local -Value ""
Add-Content -Path .env.local -Value "# Dev Environment"
Parse-Firebase-Config "DEV"

# Parse PROD environment
Styled-Echo "Setting up PROD environment..." -Color $BLUE
Add-Content -Path .env.local -Value "# Prod Environment (Recommend creating a new project for production)"
Parse-Firebase-Config "PROD"

# Add ENVIRONMENT variable
Add-Content -Path .env.local -Value "# Select Environment: DEV or PROD"
Add-Content -Path .env.local -Value "ENVIRONMENT=DEV"
Styled-Echo "Environment variables set up successfully." -Color $GREEN

# Read project IDs
$dev_project_id = Get-Project-ID "DEV"
$prod_project_id = Get-Project-ID "PROD"

# Create Firestore databases
Section-Header "Step 2: Creating Firestore Databases"
Styled-Echo "Please create your default databases in prod and dev:" -Color $YELLOW
Styled-Echo "DEV: https://console.firebase.google.com/project/$dev_project_id/firestore" -Color $BLUE
Styled-Echo "PROD: https://console.firebase.google.com/project/$prod_project_id/firestore" -Color $BLUE
Styled-Echo "Press Enter after adding both databases..." -Color $YELLOW
Read-Host

# Firestore Rules setup
Section-Header "Step 3: Setting Up Firestore Rules"
Styled-Echo "Please add the following Firestore rules manually:" -Color $YELLOW
Styled-Echo "DEV: https://console.firebase.google.com/project/$dev_project_id/firestore/rules" -Color $BLUE
Styled-Echo "PROD: https://console.firebase.google.com/project/$prod_project_id/firestore/rules" -Color $BLUE


$firestore_rules = @'
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
'@

Write-Host $firestore_rules
Write-Host
Styled-Echo "Press Enter after setting up the Firestore rules..." $YELLOW
Read-Host

# Enable Firebase Authentication
Section-Header "Step 4: Enabling Firebase Authentication"
Styled-Echo "Enable Firebase Authentication: Email/Password provider at:" -Color $YELLOW
Styled-Echo "DEV: https://console.firebase.google.com/project/$dev_project_id/authentication/providers" -Color $BLUE
Styled-Echo "PROD: https://console.firebase.google.com/project/$prod_project_id/authentication/providers" -Color $BLUE
Styled-Echo "Press Enter after setting up the Firebase Authentication..." -Color $YELLOW
Read-Host

# Install dependencies and show progress
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "install" -Wait
Styled-Echo "Dependencies installed successfully." -Color $GREEN

Styled-Echo "Starting development server…" -Color $YELLOW
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run dev" -PassThru | ForEach-Object {
    $global:DEV_SERVER_PID = $_.Id
}
Styled-Echo "Development server started." -Color $GREEN

# # Step 6: Opening Localhost Project in Browser
Section-Header "Step 6: Opening Project in Browser"
Styled-Echo "Please check your browser to ensure the development server is running correctly." -Color $YELLOW
Styled-Echo "The development server will be stopped after this check." -Color $YELLOW
Styled-Echo "Press Enter when you're ready to continue..." -Color $YELLOW
Read-Host

# # Stop the development server
Stop-Process -Id $DEV_SERVER_PID -Force -ErrorAction SilentlyContinue
Styled-Echo "Development server stopped." -Color $GREEN

# # Step 7: Add version control and save progress on GitHub
Section-Header "Step 7: Setting Up Version Control"
Styled-Echo "We'll now set up version control and push your project to GitHub." -Color $YELLOW
Styled-Echo "If you haven't created a GitHub repository yet, please do so now." -Color $YELLOW
Styled-Echo "Visit https://github.com/new to create a new repository." -Color $YELLOW
Styled-Echo "Press Enter when you're ready to continue..." -Color $YELLOW
Read-Host

Styled-Echo "Enter your GitHub repository URL (e.g., https://github.com/username/repository.git): " -Color $YELLOW
$github_url = Read-Host

git init
git remote add origin "$github_url"
git branch -M main
git add .
git commit -m 'Adding the template code to my repo'
git push -u origin main
Styled-Echo "Project pushed to GitHub successfully." -Color $GREEN

# Step 8: Deploy on Vercel
Section-Header "Step 8: Deploying on Vercel"
Styled-Echo "To deploy your project on Vercel:" -Color $YELLOW
Styled-Echo "1. Import your Git repository into Vercel: https://vercel.com/new" -Color $BLUE
Styled-Echo "2. Copy and paste your environment variables from .env.local." -Color $BLUE
Styled-Echo "3. Click deploy." -Color $BLUE

# Summary
Section-Header "Setup Complete!"
Styled-Echo "Your Firebase project has been set up successfully." -Color $GREEN
Styled-Echo "Your code has been pushed to $github_url" -Color $GREEN
Styled-Echo "Do not forget to deploy your project on Vercel" -Color $YELLOW
Styled-Echo "Thank you for using the Firebase Project Setup Script." -Color $BLUE