# Cartify E-Commerce App (Frontend Only)

This project is a modern e-commerce web app built with React + TypeScript + Vite.
It is a frontend-only implementation (no backend), with localStorage-based persistence for key user flows.

## Current Status

The app is implemented and running with the main customer journey:
- Browse products
- View product details
- Add to cart
- Checkout (test/mock payment flow)

## Implemented Features

### Authentication & Profile
- Login, Signup, Forgot Password flows
- Profile management
- Address management
- Preferred pincode management

### Shopping Experience
- Home page with hero, featured, trending, and conditional favorites strip
- Products listing with search, filters, sorting, pagination, and grid/list view
- Product detail page with gallery, reviews, quantity controls, and delivery check
- Favorites page with add-to-cart support
- Cart page with quantity controls and order summary
- Checkout flow with shipping + payment + confirmation

### Pincode System (Implemented Globally)
- Pincode can be set from header (desktop + mobile) and profile
- Product detail supports pincode delivery check
- First-time pincode guard before cart actions:
  - `Add to Cart` and `Buy Now` require pincode if not already set
  - After saving pincode, action continues automatically
- Guarded on Home, Products, Favorites, and Product Detail pages

### Informational Pages
- About Us
- Contact Us
- Return Policy
- Terms & Conditions
- Privacy Policy

### UX & Responsiveness
- Responsive header and mobile menu
- Mobile-friendly filters drawer
- Responsive legal table overflow handling
- Route-change scroll-to-top behavior
- Error boundary and loading states

## Key Routes

- `/`
- `/products`
- `/products/:id`
- `/cart`
- `/checkout`
- `/favorites`
- `/profile`
- `/login`
- `/signup`
- `/forgot-password`
- `/about`
- `/contact`
- `/return-policy`
- `/terms`
- `/privacy`

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router v6
- TailwindCSS
- Context API (Auth, Cart, Favorites, Pincode)
- Lucide React icons

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Environment Variables

Create `.env` in project root (copy from `.env.example`):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

If missing, checkout still works in current mock/test-mode UI flow.

## Stripe / Payment Notes

Current implementation is frontend-only test flow (no backend payment intent).

### Test card examples
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`

Use:
- Any future expiry (`MM/YY`)
- Any valid CVC

### For real production Stripe
You need a backend to:
- Create payment intents
- Handle webhooks
- Persist order/payment records securely

## Scripts

- `npm run dev` - start dev server
- `npm run build` - type-check + production build
- `npm run preview` - preview production build
- `npm run lint` - lint codebase
- `npm run test` - run tests (currently no test files in repo)

## Project Structure (High Level)

```text
src/
  components/
    common/
    layout/
  contexts/
  data/
  hooks/
  pages/
  types/
  utils/
```

## Notes / Known Gaps

- Backend APIs are not implemented (frontend-only project).
- Some lint issues exist in older files and can be cleaned separately.
- Test script exists, but automated tests are not currently added.

## Deployment

- Configured for Vercel deployment (`vercel.json` present).
- Ensure environment variables are set in hosting platform.

---

This `README.md` is the single consolidated documentation file for the project.
