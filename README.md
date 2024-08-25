![Diagram](https://storage.googleapis.com/images-reactsaas/diagram_bg.png)

## Features

- Landing Page
- Dashboard Page
- Pricing Page
- Email Login and Sign Up
- Password Reset
- Forgot Password
- Account Billing and Security
- Example Components
- Mobile Responsive
- Support For Recurring and One-Time Payments
- Integrated Firebase Auth
- Integrated Firestore Storage
- Integrated Data Protection
- Integrated Protected Routes
- Integrated Routing Users to Dashboard
- Integrated Stripe
- Integrated SchadCN

## Getting Started

1. Download the template locally from your Dashboard
   - Update the directory name for the downloaded code to whatever you want
   ```bash
   cd <project-directory>
   ```
   - Optional: Run setup script to get started fast or continue manually
     - MacOs: setup.sh
      ```bash
        chmod +x setup.sh
        ./setup.sh
      ```
     - Windows: setup.ps1
      ```powershell
        Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
        .\setup.ps1
      ```

2. Set up your development environment variables:
   - Copy the contents of **env.example** to a new file named **.env.local**
   - Create a Firebase account at https://firebase.google.com/
   - Create a new Firebase project for your app's development environment
     - Suggested name: <project>-dev
     - Do not need Firebase hosting
   - In Firebase console, go to Project Overview > Add app > Web
   - Copy the configuration values provided
     - Everything inside the brackets of firebaseConfig
   - Paste these values into your **.env.local** file, replacing the placeholders
     - Ensure all variable names are in uppercase and prefixed with NEXT_PUBLIC_
     - Reference: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

3. Configure Firebase services:
   - In Firebase console, enable Authentication and add the Email/Password sign-in method
   - Create a Firestore Database in your preferred region
     - Choose "Start in production mode"
   - Set up Firestore security rules:
     - Go to Firestore Database > Rules
     - Replace the default rules with the following template for user-specific data access control:

4. Under Firestore security rules add the following in place of the default rules:

    ```
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
    ```

5. Run the development server:

   ```bash
   npm i
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

7. Create your production environment:
   - Repeat steps 2-4 to set up your production environment
   - Create a separate prod Firebase project
     - Suggested name: <project>-prod
   - Update **.env.local** with the production environment variables

8. Add version control and save your progress on Github:
   - Create a private Github Repo: https://github.com/new
   - Initialize the code with Git then push it to Github:

   ```bash
   git init
   git remote add origin <your-github-url>
   git branch -M main
   git add .
   git commit -m 'Adding the template code to my repo'
   git push -u origin main 
   ```

9. Create shareable URLs for your web application, synced with Github (CI/CD).
   - Import your Git Repository into Vercel: https://vercel.com/new
     - You will need the Vercel application added to your GitHub account
     - Copy and paste your dev environment variables from **.env.local** into Vercel
       - Select Development and Preview in Vercel
       - Add NEXT_PUBLIC_ENVIRONMENT="DEV" in Vercel
       - Push to a different branch to get the first preview URL
       ![Diagram](https://storage.googleapis.com/images-reactsaas/docs/env-vars.png)
     - Copy and paste your prod environment variables from **.env.local** into Vercel
       - Select Production in Vercel 
       - Add NEXT_PUBLIC_ENVIRONMENT="PROD" in Vercel 
       - Prod will be deployed to your main branch
       ![Diagram](https://storage.googleapis.com/images-reactsaas/docs/prod-env-vars.png)
   - Click Deploy in Vercel

10. Start creating new branches with code updates for version control and staging domains

### Install Stripe Plugin in Firebase 

1. Install the stripe plugin on your project and go through the options
   ![55b6ad8a-175e-4849-a059-7d691b9ac414](https://storage.googleapis.com/images-reactsaas/docs/55b6ad8a-175e-4849-a059-7d691b9ac414.png)

2. In Firebase select your billing account
    ![9ba50971-081d-4210-81de-a8b171e8913d](https://storage.googleapis.com/images-reactsaas/docs/9ba50971-081d-4210-81de-a8b171e8913d.png)

      
3. In Firebase enable services needed
    ![464bb1cf-4a87-4ca2-bdc0-1bd957d7407f](https://storage.googleapis.com/images-reactsaas/docs/464bb1cf-4a87-4ca2-bdc0-1bd957d7407f.png)

4. Login to your Stripe account

      
5. In Stripe create a restricted API key and save it to use in Firebase: 
    - stripe.com > developers > api keys > restricted keys
    - Select write access for:
      - Customers
      - Checkout Sessions
      - Customer Portal
    - Select Read-only access for:
      - Subscriptions
      - Prices
    ![306aa19b-4cc4-4f0e-a3f0-39d4a37f03b3](https://storage.googleapis.com/images-reactsaas/docs/306aa19b-4cc4-4f0e-a3f0-39d4a37f03b3.png)

6. Recommendation set min warm instances to 1 (to avoid a slow user experience)
    ![9f754e49-5cbb-4ddc-a879-81165bf8881a](https://storage.googleapis.com/images-reactsaas/docs/9f754e49-5cbb-4ddc-a879-81165bf8881a.png)


7. Go back to Firebase:
   - Using the Stripe secret from step 5: Firebase > Extension Configuration > Click Create secret
   - Click **Install** extension


### Firebase Configure Stripe Plugin
1. In Firebase go to: Extensions > Run Payments with Stripe > Manage > How this extension works
   
2. In Firebase ensure your security rules are in place

3. In Stripe go to Configure Stripe webhook
   - Use the extension endpoint URL from Firebase > How this extension works
   - Listen to **events** on your account
   - Select these 16 events as listed in the Firebase documentation:
    ```
        1.  checkout.session.completed
        2.  customer.subscription.created
        3.  customer.subscription.deleted
        4.  customer.subscription.updated
        5.  payment_intent.canceled
        6.  payment_intent.payment_failed
        7.  payment_intent.processing
        8.  payment_intent.succeeded
        9.  price.created
        10. price.deleted
        11. price.updated
        12. product.created
        13. product.deleted
        14. product.updated
        15. tax_rate.created
        16. tax_rate.updated
    ```
    - Click **Add endpoint** and copy the Signing secret
    
4. In Firebase goto Extensions > Run Payments with Stripe > Manage > Reconfigure extension > Stripe Webhook secret > Paste From Step #3 > Click Create secret > Save
    - This should take 3-5 minutes to save your updated configuration

5. In Stripe Create product and pricing information

6. Add pricingIDs to **@/stripe/config.ts**

7. Go to billing portal and click Save changes: 
   - Dev: https://dashboard.stripe.com/test/settings/billing/portal
   - Prod: https://dashboard.stripe.com/settings/billing/portal

### Configure Stripe in The Code
1. Goto **stripe/config.ts** then add **pricingIDs**
   - Controls which products are displayed in:
     - **components/payments/Pricing.tsx** : Pricing table on **/pricing** page
     - **components/dashboard/settings/Billing.tsx**: Manage your purchases on **/billing** page

### Live Production Stripe Payments
1. Make sure you have tested and reviewed the application with fake payments

2. Make sure you have applied and been approved for live payments in Stripe

3. Repeat all the steps above with live Stripe keys in the production Firebase project
   - Make sure to add the production pricingIDs to **stripe/config.ts** under prod_products

## Going to production
1. Ensure you have tested and reviewed your application, marketing page, terms of service and privacy policy.
   - Terms of service: **<your-url>/#terms-of-service**
   - Privacy policy: **<your-url>/#privacy-policy**
2. Ensure you have a production environment properly configured
   - Different prod Firebase project 
   - Stripe plugin configured in prod Firebase project with production webhook and products
   - Production stripe product IDs added to **stripe/config.ts**
   - Production .env vars in **env.local** and vercel
3. In the stripe dashboard make sure you have updated your branding and profile to use live payments.
4. Look into bill-capping and billing notification in your cloud providers
   - Vercel: https://vercel.com/docs/pricing/spend-management#pausing-projects
   - Firebase / GCP: https://medium.com/@steffenjanbrouwer/how-to-set-a-hard-payment-spending-cost-limits-for-google-cloud-platform-projects-d4fee7550d42
5. Merge all production code into your main branch
6. Update your custom domain DNS to point to your prod webapp

### Important Files
#### APP
  - **app/page.tsx** : The landing page for marketing
  - **app/dashboard/page.tsx** : The dashboard page
  - **app/login/page.tsx** : The login page
  - **app/signup/page.tsx** : The signup page
  - **app/billing/page.tsx** : The page to manage your purchases
  - **app/security/page.tsx**: The page to update your password
  - **app/pricing/page.tsx**: The page to review the pricing options
  - **app/examples/firebase_example**: Page example of how to do CRUD with Firestore
  - **app/examples/stripe_example**: Page example of querying all the products in Stripe dynamically

#### Components
  - **components/auth/GuardAccess.tsx** : Component used to protect child components from unauthenticated users
  - **components/auth/PaidAccess.tsx** : Component used to protect child components from unpaid users
  - **components/auth/ForgotPasswordModal.tsx** : Modal that pops up when a user clicks forgot password
  - **components/auth/Login.tsx** : The login component
  - **components/auth/SignUp.tsx** : The signup component
  - **components/auth/RouteUser.tsx**: Route logged in users to the dashboard page from landing, login, and signup pages
  - **components/dashboard/Layout.tsx** : Combines the Sidebar and Header in a responsive dashboard layout
  - **components/dashboard/Sidebar.tsx** : Used to navigate
  - **components/dashboard/Header.tsx** : Shows the current page and user profile
  - **components/dashboard/NavLink.tsx** : Highlights the active link in the Sidebar
  - **components/dashboard/settings/Billing.tsx** : Component to manage your purchases
  - **components/dashboard/settings/Security.tsx**: Component to update your password
  - **components/legal/PrivacyPolicyModal.tsx** : Modal that has the privacy policy for your app
  - **components/legal/TermsOfServiceModal.tsx** : Modal that has the terms of service for your app
  - **components/examples/FirebasePosts.tsx** : Component for an example of how to do CRUD with Firestore
  - **components/examples/StripeTesting.tsx** : Component for an example of querying all the products in Stripe dynamically
  - **components/examples/Welcome.tsx** : Component to introduce developers to the template
  - **components/landing/Header.tsx** : Component for the header of the landing page
  - **components/landing/Hero.tsx** : Component for the hero of the landing page
  - **components/landing/Footer.tsx** : Component for the footer of the landing page
  - **components/payments/Pricing.tsx** : Component to view the pricing table
  - **components/ui** : Default from shadcn/ui

#### Context
  - **context/AuthContext** : Used to get the current state of the User
  - **context/AuthContext/AuthContext.tsx** : Creates the AuthContext that is used by the AuthProvider
  - **context/AuthContext/AuthContext.tsx** : Wrapping the entire application in the AuthProvider in **app/layout.tsx**
  - **context/AuthContext/typings.ts** : The data that we store about each user in the AuthContext

#### Firebase
  - **firebase/auth** : Sigin and Signup functions for email/password auth
  - **firebase/firestore/posts/posts.ts** : Examples of interacting with Firestore (Create, Read, Update, Destroy)
  - **firebase/firestore/user.ts**: Getters and setters for user in AuthContext
  - **firebase/config.ts** : Connecting to your firebase account

#### Stripe
  - **stripe/config.ts** : The products you want to display in your app
  - **stripe/createCheckoutSession.ts** : Creates the temporary stripe link for users to checkout from
  - **stripe/createPortal.ts** : Creates the temporary stripe link for users to manage their purchases
  - **stripe/pricing.ts** : Creates helper functions related to pricingIDs
  - **stripe/products.ts** : Creates helper functions related to productIDs


### User Interface
  - [React Icons](https://react-icons.github.io/react-icons/icons/md/) - Include popular icons in your React projects easily (Using Material Design Icons)
  - [shadcn/ui](https://ui.shadcn.com/docs) - Re-usable components that you can copy and paste
  - [v0](https://v0.dev/) - Generate UI with shadcn/ui from simple text prompts and images.

### Backend
  - [Firebase](https://firebase.google.com/) - A  platform designed to support you throughout your app development journey
  - [Stripe](https://stripe.com/) - Financial infrastructure to grow your revenue
  - [Vercel](https://vercel.com) - Hosting, Logs, and Continuous Deployment


### Learn
To learn more about the stack:

  - [Next.js Documentation](https://nextjs.org/docs) - Open-source web development framework
  - [Firebase Documentation](https://firebase.google.com/docs/web/setup) - Set of backend cloud computing services
    - Using Auth and Firestore
  - [Stripe Documentation](https://docs.stripe.com/) - Powers online payment processing
  - [React Hooks](https://react.dev/reference/react/hooks) - Use different React features
  - [React Overview](https://react.dev/reference/react) - Detailed reference documentation for working with React

### Troubleshooting

  - Try refreshing your browser, sometimes on localhost the state needs force updated.