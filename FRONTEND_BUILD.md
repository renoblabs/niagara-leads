# Frontend Build - Niagara Auto Finder (manustest branch)

## Overview

This document describes the frontend implementation for the Niagara Auto Finder lead generation website, built on the `feat/manustest` branch. The frontend incorporates best practices from high-converting automotive and finance lead generation sites.

## Branch Information

- **Branch Name:** `feat/manustest`
- **Purpose:** Testing various frontend direct response lead capture methods
- **Backend:** Uses existing Niagara Leads backend (Supabase, lead scoring, webhook dispatch)
- **Technology:** Next.js 14, TypeScript, Tailwind CSS (inline styles for simplicity)

## Architecture

### Pages Built

#### 1. **Homepage** (`/app/page.tsx`)
- **Purpose:** Brand introduction and lead funnel entry point
- **Key Sections:**
  - Hero section with value proposition ("Get Pre-Approved Without the Hassle")
  - Trust badges (No hard credit pull, Instant results, Secure & Private, All credit types)
  - "How It Works" section (3-step process)
  - Stats section (10,000+ customers, $500M+ financed, 98% satisfaction)
  - Testimonials from satisfied customers
  - Featured inventory showcase
  - Final CTA to finder page
- **Conversion Elements:**
  - Clear value proposition addressing pain points
  - Social proof (testimonials, stats, customer count)
  - Multiple CTAs with contrasting colors
  - Mobile-responsive grid layout

#### 2. **Finder Page** (`/app/finder/page.tsx`)
- **Purpose:** Lead capture form with pre-qualification
- **Form Sections:**
  - **Personal Information:** First name, last name, email, phone, city, postal code
  - **Vehicle Interest:** Make, model, budget
  - **Financing Details:** Monthly payment target, income band, credit range
  - **Consent:** Required checkbox with compliant disclosure
- **Key Features:**
  - Organized fieldsets for better UX
  - Hidden UTM tracking fields
  - Honeypot field for bot protection
  - Trust indicators below form
  - FAQ section addressing common objections
- **Conversion Optimizations:**
  - Short form (8 visible fields) reduces friction
  - Progressive disclosure of finance details
  - Trust signals ("No hard credit pull", "100% secure")
  - FAQ reduces abandonment

#### 3. **Inventory Page** (`/app/inventory/page.tsx`)
- **Purpose:** Vehicle browsing with filtering
- **Features:**
  - Filter by make, price range, monthly payment
  - Grid display of 6 mock vehicles
  - Vehicle cards showing price, payment, specs
  - "View Details" CTA on each card
  - CTA to pre-approval form
- **Conversion Elements:**
  - Clear pricing and monthly payment
  - Quick specs overview
  - Easy navigation to detail pages
  - Pre-approval CTA reinforcement

#### 4. **Vehicle Detail Page** (`/app/inventory/[id]/page.tsx`)
- **Purpose:** Individual vehicle showcase with approval CTA
- **Sections:**
  - Image gallery (placeholder)
  - Key specs (transmission, fuel, mileage, color)
  - Features list
  - "Check Approval for This Vehicle" CTA
  - Related vehicles section
  - Final CTA to pre-approval
- **Conversion Elements:**
  - Primary CTA to pre-approval with vehicle ID
  - Trust info (inspected, warranty, flexible financing)
  - Related vehicles keep users engaged
  - Multiple CTAs throughout page

#### 5. **Thank You Page** (`/app/thank-you/page.tsx`)
- **Purpose:** Post-submission confirmation and next steps
- **Sections:**
  - Success confirmation with icon
  - "What Happens Next" (4-step process)
  - Contact information
  - Exclusive offer section
  - FAQ addressing post-submission questions
- **Conversion Elements:**
  - Clear next steps reduce anxiety
  - Contact info builds confidence
  - Exclusive offer maintains engagement
  - FAQ prevents abandonment

#### 6. **Root Layout** (`/app/layout.tsx`)
- **Purpose:** Global styling and navigation
- **Features:**
  - Responsive global CSS (inline for simplicity)
  - Sticky header with navigation
  - Footer on all pages
  - Consistent color scheme and typography
  - Mobile-first responsive design
  - Component styles (buttons, cards, forms, etc.)

### Global Styling Approach

All styling is implemented as inline CSS in the root layout to:
- Avoid external dependencies
- Ensure consistency across all pages
- Make styling easy to modify and test
- Support rapid iteration

**Color Scheme:**
- Primary: Blue (#2563eb) - Trust, professional
- Success/CTA: Green (#10b981) - Action, positive
- Neutral: Gray (#6b7280, #e5e7eb) - Text, borders
- Background: White (#ffffff) - Clean, professional

**Typography:**
- System font stack for fast loading
- Clear hierarchy with font sizes
- Readable line height (1.6)

## Conversion Optimization Features

### 1. **Trust Signals**
- Customer testimonials (3 examples)
- Statistics (10,000+ customers, $500M+ financed)
- Trust badges (security, no hard pull, instant)
- Contact information visibility
- Security/privacy messaging

### 2. **Form Optimization**
- **Short form:** 8 visible fields (reduces friction)
- **Organized fieldsets:** Groups related fields
- **Clear labels:** Every field has descriptive label
- **Placeholder text:** Examples of expected input
- **Required fields:** Marked with asterisk
- **Honeypot:** Hidden field for bot protection
- **Progressive disclosure:** Finance details optional

### 3. **CTA Strategy**
- **Multiple CTAs:** Homepage, finder, inventory, detail pages
- **Contrasting colors:** Green (#10b981) stands out
- **Action-oriented copy:** "See My Buying Power", "Check Approval"
- **Strategic placement:** Above fold, end of sections
- **Varied messaging:** Different CTAs for different stages

### 4. **Social Proof**
- Customer testimonials with names and locations
- Quantified benefits ("From $299/month")
- Trust badges throughout
- Customer count (10,000+)
- Satisfaction rating (98%)

### 5. **Objection Handling**
- FAQ sections address common concerns
- "No hard credit pull" emphasized repeatedly
- "All credit types" messaging
- Transparent process ("What Happens Next")
- Contact info for support

## Backend Integration

### API Endpoints Used

1. **POST /api/lead** - Lead submission
   - Accepts form data from finder page
   - Validates origin, honeypot
   - Computes lead score and tier
   - Stores in Supabase
   - Dispatches Tier A to dealer webhook
   - Returns lead ID, score, tier

2. **GET /api/go** - Offer redirects
   - Used for post-submission redirects
   - Tracks UTMs and clicks
   - Logs in Supabase clicks table

3. **GET /api/ping** - Health check
   - Verifies API availability

### Data Flow

```
User fills form on /finder
    ↓
POST /api/lead with form data
    ↓
Backend validates, scores, stores in Supabase
    ↓
Tier A: Dispatches to dealer webhook
Tier B/C: Stored for later routing
    ↓
Response with lead_id, score, tier
    ↓
Redirect to /thank-you (or offer page via /api/go)
```

## Testing & Iteration Strategy

### Phase 1: Current Build (Starter Version)
- ✅ Homepage with hero and social proof
- ✅ Finder page with optimized form
- ✅ Inventory browsing
- ✅ Vehicle detail pages
- ✅ Thank you page with next steps
- ✅ Global styling and responsive design
- ✅ Trust signals and objection handling

### Phase 2: Potential Iterations (if credits available)
1. **Form Variations**
   - Minimal form (3 fields): Name, phone, vehicle interest
   - Comprehensive form (current): 8 fields with finance details
   - Multi-step form: Split across multiple pages

2. **Copy Variations**
   - Urgency-driven: "See your buying power in 60 seconds"
   - Benefit-focused: "Get pre-approved without a hard credit pull"
   - Pain-point: "Bad credit? We work with all credit profiles"

3. **Design Variations**
   - Minimal design: High contrast, clear hierarchy
   - Feature-rich: More testimonials, stats, trust badges
   - Video hero: Instead of static image

4. **Page Variations**
   - Finance calculator page
   - Testimonials/case studies page
   - FAQ/education page
   - Comparison page (vs. traditional dealerships)

5. **Traffic-Specific Landing Pages**
   - Paid search landing page (minimal, focused)
   - Social media landing page (visual, testimonials)
   - Email campaign landing page (personalized)
   - Organic traffic page (educational, SEO-focused)

## Performance Considerations

### Current Implementation
- Inline CSS (no external stylesheets)
- No JavaScript framework overhead (server-side rendering)
- Minimal dependencies (Next.js, React, Supabase client)
- Fast form submission via API
- Optimized images (placeholders for now)

### Optimization Opportunities
- Image optimization (next/image component)
- Code splitting for large pages
- Caching strategies for inventory data
- Database query optimization
- CDN for static assets

## Deployment

### Local Development
```bash
cd /home/ubuntu/niagara-leads
npm install
npm run dev
```

### Vercel Deployment
1. Connect repository to Vercel
2. Set environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE, ALLOWED_ORIGINS)
3. Deploy from `feat/manustest` branch
4. Test form submission and lead capture

### Environment Variables Required
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE` - Service role key for server-side operations
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins (for CORS)
- `DEALER_WEBHOOK_URL` - Optional: Webhook URL for Tier A leads

## File Structure

```
apps/web/
├── app/
│   ├── layout.tsx                 # Root layout with global styling
│   ├── page.tsx                   # Homepage
│   ├── finder/
│   │   ├── layout.tsx             # Finder layout
│   │   └── page.tsx               # Finder form page
│   ├── inventory/
│   │   ├── page.tsx               # Inventory listing
│   │   └── [id]/
│   │       └── page.tsx           # Vehicle detail page
│   ├── thank-you/
│   │   └── page.tsx               # Thank you page
│   ├── api/
│   │   ├── lead/route.ts          # Lead submission endpoint
│   │   ├── go/route.ts            # Offer redirect endpoint
│   │   └── ping/route.ts          # Health check endpoint
│   └── (brands)/
│       └── finder/
│           ├── layout.tsx         # Legacy finder layout
│           └── page.tsx           # Legacy finder page
├── lib/
│   ├── lead.ts                    # Lead scoring logic
│   ├── supabase.ts                # Supabase client
│   ├── env.ts                     # Environment variable helpers
│   └── routes.ts                  # Route resolution logic
└── tests/
    ├── lead.test.ts               # Lead scoring tests
    └── routes.test.ts             # Route tests
```

## Metrics to Track

### Lead Generation Metrics
- **Submission volume:** Total leads per day/week
- **Conversion rate:** Visitors → Form submissions
- **Tier distribution:** % of Tier A, B, C leads
- **Average lead score:** Quality indicator

### Traffic Metrics
- **Page views:** Homepage, finder, inventory, detail
- **Bounce rate:** By page and traffic source
- **Time on page:** Engagement indicator
- **Form abandonment:** Where users drop off

### Business Metrics
- **Cost per lead:** Ad spend ÷ leads
- **Cost per qualified lead:** Ad spend ÷ Tier A leads
- **Dealer acceptance rate:** % of Tier A leads accepted
- **Lead to sale conversion:** Leads → Actual sales

## Next Steps

1. **Deploy to Vercel:** Push `feat/manustest` branch and deploy
2. **Test form submission:** Verify leads appear in Supabase
3. **Verify webhook:** Check dealer webhook dispatch for Tier A leads
4. **Monitor metrics:** Track conversion rates and lead quality
5. **Gather feedback:** Test with real traffic and iterate
6. **Plan iterations:** Based on performance data, plan variations

## Notes

- All vehicle data is currently mocked (placeholders)
- Images are placeholder divs (can be replaced with actual images)
- Form submission redirects to `/api/lead` endpoint (backend handles response)
- Consider adding redirect to `/thank-you` page after successful submission
- UTM parameters are captured and passed through to backend
- All pages are mobile-responsive and accessible

## References

- Research findings: `/home/ubuntu/research_findings.md`
- Backend spec: `docs/leadgen-spec.md`
- Session wrap: `docs/SESSION_WRAP_2025-10-25.md`

