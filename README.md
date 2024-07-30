<img width="600" alt="diagram" src="https://github.com/willschneider15/nextsaas/assets/44822021/ca6be7df-b0ea-4d63-93d3-04aed60a7d29"/>

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
cd  <project-directory>
```

2. Go to env.example get the vars you need, and change the file name to .env.local
- This will require creating a [Firebase](https://firebase.google.com/) account
- Create the Firebase Project for your apps resources
- You will then click: Project Overview > Add app > Then copy those values
- Pase those values into `.env.example` and then change the name to `.env.local`
  - Note: Make sure to keep the env variables all caps and NEXT_PUBLIC_ : https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
- In Firebase enable Authentication and add Email/Password 
- In Firebase enable the Firestore Database
  - Add this Firestore Rule Template for User-Specific Data Access Control

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

3. Run the development server:

```bash
npm i
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

5. Add version control and save your progress on Github:
   - Create a private Github Repo: [https://github.com/new](https://github.com/new)
   - Initialize the code with Git then push it to Github:

```bash
git init
git remote add origin <your-github-url>
git branch -M main
git add .
git commit -m 'Adding the template code to my repo'
git push -u origin main
```

6. Create shareable URLs for your web application, synced with Github.
   - Import your Git Repository into Vercel: [https://vercel.com/new](https://vercel.com/new)
     - You will need the Vercel application added to your Github account
     - Then copy and paste your environment variables from `.env.local` in before you click deploy
      <img width="500" alt="Screenshot 2024-05-22 at 6 19 59 PM" src="https://github.com/willschneider15/nextsaas/assets/44822021/8df5bc79-8576-4eff-9cbf-39d48693f2a8">

7. Start playing with creating new branches for version control

## Firebase Install Stripe Plugin
### Take your time Stripe is the hardest part to setup
1. Setup a stripe account
2. Install the stripe plugin on your project and go thru the options

   <img width="500" alt="Screenshot 2024-06-19 at 10 00 20 PM" src="https://github.com/willschneider15/nextsaas/assets/44822021/55b6ad8a-175e-4849-a059-7d691b9ac414">

   1. Select your billing account
  <img width="500" alt="Screenshot 2024-06-19 at 10 00 41 PM" src="https://github.com/willschneider15/nextsaas/assets/44822021/9ba50971-081d-4210-81de-a8b171e8913d">

      
   3. Enable services needed
  <img width="500" alt="Screenshot 2024-06-19 at 10 01 51 PM" src="https://github.com/willschneider15/nextsaas/assets/44822021/464bb1cf-4a87-4ca2-bdc0-1bd957d7407f">

      
   5. Create a stripe restricted api key and paste it: stripe.com > developers > api keys > restricted keys
     <img width="500" alt="Screenshot 2024-06-19 at 10 07 57 PM" src="https://github.com/willschneider15/nextsaas/assets/44822021/306aa19b-4cc4-4f0e-a3f0-39d4a37f03b3">
      - Firebase > Extension Configuration > Click Create secret

     
   8. Recommendation set min warm instances to 1 (to avoid slow user experience)
    <img width="500" alt="Screenshot 2024-06-19 at 10 02 59 PM" src="https://github.com/willschneider15/nextsaas/assets/44822021/9f754e49-5cbb-4ddc-a879-81165bf8881a">

    9. Click Install extension

## Firebase Configure Stripe Plugin
    1. Go to: Extensions > Run Payments with Stripe > Manage > How this extension works
    2. Ensure your security rules are in place
    3. Configure Stripe webhook, use extension endpoint URL, then copy/paste this or manually select events
    ```
          # Handle the event
          case event.type
          when 'checkout.session.completed'
              session = event.data.object
          when 'customer.subscription.created'
              subscription = event.data.object
          when 'customer.subscription.deleted'
              subscription = event.data.object
          when 'customer.subscription.updated'
              subscription = event.data.object
          when 'payment_intent.canceled'
              payment_intent = event.data.object
          when 'payment_intent.payment_failed'
              payment_intent = event.data.object
          when 'payment_intent.processing'
              payment_intent = event.data.object
          when 'payment_intent.succeeded'
              payment_intent = event.data.object
          when 'price.created'
              price = event.data.object
          when 'price.deleted'
              price = event.data.object
          when 'price.updated'
              price = event.data.object
          when 'product.created'
              product = event.data.object
          when 'product.deleted'
              product = event.data.object
          when 'product.updated'
              product = event.data.object
          when 'tax_rate.created'
              tax_rate = event.data.object
          when 'tax_rate.updated'
              tax_rate = event.data.object
          # ... handle other event types
          else
              puts "Unhandled event type: #{event.type}"
          end
    ```

    4. Extension Configuration > Stripe Webhook secret > Paste From Step #3 > Click Create secret > Save
    5. Create product and pricing information
    6. Add product and pricing information to @/stripe/config.ts
      - Note keep track of pricingIDs for future steps
    7. Update typings from dev_products to prod_products when ready to deploy
    8. Go here: https://dashboard.stripe.com/test/settings/billing/portal make sure to click Save and update if you want

## Configure Stripe in The Code
    1. Goto `stripe/config.ts then add pricingIDs and type
        - Controls which products are displayed in:
          - `components/payments/Pricing.tsx` : Pricing table on /pricing page
          - `components/dashboard/settings/Billing.tsx`: Manage your purchases on /billing page
    2. Review and update your pricing table to match your needs: `components/payments/Pricing.tsx`

## Going to production
    1. Ensure you have tested and reviewed your application, marketing page, terms of service and privacy policy.
      - Terms of service: <your-url>/#terms-of-service
      - Privacy policy: <your-url>/#privacy-policy
    2. Create a prod environment to keep things separate for testing
       - Create new Firebase project 
       - Configure the stripe plugin again with your live webhook and products
       - Add prod stripe product IDs to `stripe/config.ts`
       - Add your prod .env vars to `env.local` and vercel env vars
    3. In the stripe dashboard make sure you have updated your branding and profile to use live payments.
    4. Look into bill-capping and billing notification in your cloud providers
       - Vercel: https://vercel.com/docs/pricing/spend-management#pausing-projects
       - Firebase / GCP: https://medium.com/@steffenjanbrouwer/how-to-set-a-hard-payment-spending-cost-limits-for-google-cloud-platform-projects-d4fee7550d42
    5. Merge all production code into your main branch
    6. Update your custom domain DNS to point to your prod webapp

## Important Files
### APP
- `app/page.tsx` : The landing page for marketing
- `app/dashboard/page.tsx` : The dashboard page
- `app/login/page.tsx` : The login page
- `app/signup/page.tsx` : The signup page
- `app/billing/page.tsx` : The page to manage your purchases
- `app/security/page.tsx`: The page to update your password
- `app/pricing/page.tsx`: The page to review the pricing options
- `app/examples/firebase_example`: Page example of how to do CRUD with Firestore
- `app/examples/stripe_example`: Page example of querying all the products in Stripe dynamically

### Components
- `components/auth/GuardAccess.tsx` : Component used to protect child components from unauthenticated users
- `components/auth/PaidAccess.tsx` : Component used to protect child components from unpaid users
- `components/auth/ForgotPasswordModal.tsx` : Modal that pops up when a user clicks forgot password
- `components/auth/Login.tsx` : The login component
- `components/auth/SignUp.tsx` : The signup component
- `components/auth/RouteUser.tsx`: Route logged in users to the dashboard page from landing, login, and signup pages
- `components/dashboard/Layout.tsx` : Combines the Sidebar and Header in a responsive dashboard layout
- `components/dashboard/Sidebar.tsx` : Used to navigate
- `components/dashboard/Header.tsx` : Shows the current page and user profile
- `components/dashboard/NavLink.tsx` : Highlights the active link in the Sidebar
- `components/dashboard/settings/Billing.tsx` : Component to manage your purchases
- `components/dashboard/settings/Security.tsx`: Component to update your password
- `components/legal/PrivacyPolicyModal.tsx` : Modal that has the privacy policy for your app
- `components/legal/TermsOfServiceModal.tsx` : Modal that has the terms of service for your app
- `components/examples/FirebasePosts.tsx` : Component for an example of how to do CRUD with Firestore
- `components/examples/StripeTesting.tsx` : Component for an example of querying all the products in Stripe dynamically
- `components/examples/Welcome.tsx` : Component to introduce developers to the template
- `components/landing/Header.tsx` : Component for the header of the landing page
- `components/landing/Hero.tsx` : Component for the hero of the landing page
- `components/landing/Footer.tsx` : Component for the footer of the landing page
- `components/payments/Pricing.tsx` : Component to view the pricing table
- `components/ui` : Default from shadcn/ui

### Context
- `context/AuthContext` : Used to get the current state of the User
- `context/AuthContext/AuthContext.tsx` : Creates the AuthContext that is used by the AuthProvider
- `context/AuthContext/AuthContext.tsx` : Wrapping the entire application in the AuthProvider in `app/layout.tsx`
- `context/AuthContext/typings.ts` : The data that we store about each user in the AuthContext

### Firebase
- `firebase/auth` : Sigin and Signup functions for email/password auth
- `firebase/firestore/posts/posts.ts` : Examples of interacting with Firestore (Create, Read, Update, Destroy)
- `firebase/firestore/user.ts`: Getters and setters for user in AuthContext
- `firebase/config.ts` : Connecting to your firebase account

### Stripe
- `stripe/config.ts` : The products you want to display in your app
- `stripe/createCheckoutSession.ts` : Creates the temporary stripe link for users to checkout from
- `stripe/createPortal.ts` : Creates the temporary stripe link for users to manage their purchases
- `stripe/pricing.ts` : Creates helper functions related to pricingIDs
- `stripe/products.ts` : Creates helper functions related to productIDs

## Continue Building

This stack was created for ease of use and speed to market.

### User Interface
- [React Icons](https://react-icons.github.io/react-icons/icons/md/) - Include popular icons in your React projects easily (Using Material Design Icons)
- [shadcn/ui](https://ui.shadcn.com/docs) - Re-usable components that you can copy and paste
- [v0](https://v0.dev/) - Generate UI with shadcn/ui from simple text prompts and images.

### Backend
- [Firebase](https://firebase.google.com/) - A  platform designed to support you throughout your app development journey
- [Stripe](https://stripe.com/) - Financial infrastructure to grow your revenue
- [Vercel](https://vercel.com) - Hosting, Logs, and Continuous Deployment


## Learn

To learn more about the stack:

- [Next.js Documentation](https://nextjs.org/docs) - Open-source web development framework
- [Firebase Documentation](https://firebase.google.com/docs/web/setup) - Set of backend cloud computing services
  - Using Auth and Firestore
- [Stripe Documentation](https://docs.stripe.com/) - Powers online payment processing
- [React Hooks](https://react.dev/reference/react/hooks) - Use different React features
- [React Overview](https://react.dev/reference/react) - Detailed reference documentation for working with React

## Troubleshooting

- Try refreshing your browser, sometimes on localhost the state needs force updated.

## Next Version

We want reinvest into the project by hiring professionals and or community members.

- Project Goals:
  - Easy Cloud Vendor Switching
  - More Secure
  - Faster
  - Improved Docs and Videos

- Considering Based on Community Feedback:
  - Web Frameworks:
    - Laravel
    - Angular
    - React
    - Sveltekit 
    - Spring Boot
  - Auth:
    - Auth.js
    - Passport
  - DBs:
    - Postgres
    - MongoDB
  - IAC Support (Terraform):
    - GCP
    - Azure
    - AWS