# Original Template Reference

This document contains information about the original **Learner** HTML template that was used as the base for this Next.js + Payload CMS project.

## Template Information

- **Template Name**: Learner
- **Template URL**: https://bootstrapmade.com/learner-bootstrap-course-template/
- **Author**: BootstrapMade.com
- **License**: https://bootstrapmade.com/license/

## Original Template Structure

The original template is located in the `Learner/Learner/` folder (can be deleted after migration) and contains:

### HTML Pages (20 pages)
- `index.html` - Homepage
- `about.html` - About page
- `courses.html` - Courses listing
- `course-details.html` - Individual course details
- `instructors.html` - Instructors listing
- `instructor-profile.html` - Individual instructor profile
- `pricing.html` - Pricing plans
- `contact.html` - Contact page
- `blog.html` - Blog listing
- `blog-details.html` - Individual blog post
- `events.html` - Events listing
- `enroll.html` - Enrollment page
- `terms.html` - Terms of service
- `privacy.html` - Privacy policy
- `404.html` - Error page
- `starter-page.html` - Blank starter template

### Assets Structure

#### CSS (`assets/css/`)
- `main.css` - Main compiled stylesheet (all styles in one file)

#### JavaScript (`assets/js/`)
- `main.js` - Main JavaScript file with all functionality

#### SCSS (`assets/scss/`)
- Source SCSS files (if you need to customize styles)
- `Readme.txt` - SCSS documentation

#### Images (`assets/img/`)
Organized into subdirectories:
- `bg/` - Background images
- `blog/` - Blog post images
- `education/` - Education/course related images
- `person/` - People/instructor photos

#### Vendor Libraries (`assets/vendor/`)

The template uses the following third-party libraries:

1. **AOS (Animate On Scroll)**
   - Files: `aos.js`, `aos.css`
   - Purpose: Scroll animations
   - Usage: Already integrated in Next.js project via CDN or npm

2. **Bootstrap 5.3**
   - Files: `bootstrap/css/bootstrap.min.css`, `bootstrap/js/bootstrap.bundle.min.js`
   - Purpose: Responsive framework
   - Usage: Installed via npm in Next.js project

3. **Bootstrap Icons**
   - Files: `bootstrap-icons.css`, `bootstrap-icons.json`
   - Purpose: Icon library
   - Usage: Installed via npm package `bootstrap-icons`

4. **PHP Email Form**
   - Files: `php-email-form/validate.js`
   - Purpose: Contact form validation (PHP backend)
   - Note: Replaced with Next.js API routes in this project

5. **PureCounter**
   - Files: `purecounter.js`
   - Purpose: Animated counters
   - Usage: Used for statistics/counter animations

6. **Swiper**
   - Files: `swiper-bundle.min.js`, `swiper-bundle.min.css`
   - Purpose: Modern slider/carousel
   - Usage: Used for testimonials, course carousels

### Forms (`forms/`)
- `contact.php` - PHP contact form handler
- `newsletter.php` - PHP newsletter subscription handler
- Note: These are replaced with Next.js API routes in the CMS version

## What's Been Migrated to Next.js Project

### ✅ Copied to `public/` directory
All static assets have been copied to maintain original functionality:
- `public/assets/css/main.css`
- `public/assets/js/main.js`
- `public/assets/img/` (all images)
- `public/assets/vendor/` (all libraries)

### ✅ Integrated Pages
All pages converted to Next.js with Payload CMS:
- Home (`src/app/(frontend)/page.tsx`)
- About (`src/app/(frontend)/about/page.tsx`)
- Courses (`src/app/(frontend)/courses/page.tsx`)
- Course Details (`src/app/(frontend)/course-details/page.tsx`)
- Instructors (`src/app/(frontend)/instructors/page.tsx`)
- Pricing (`src/app/(frontend)/pricing/page.tsx`)
- Contact (`src/app/(frontend)/contact/page.tsx`)
- Blog (`src/app/(frontend)/blog/page.tsx`)
- Events (`src/app/(frontend)/events/page.tsx`)

### ✅ CMS Collections Created
- `PageContent` - For page sections and content blocks
- `Courses` - Course management
- `Instructors` - Instructor profiles
- `BlogPosts` - Blog articles
- `Events` - Event listings
- `PricingPlans` - Pricing tiers
- `Testimonials` - Customer testimonials
- `ContactInfo` - Contact information
- `Media` - Image/file uploads

### ✅ Global Settings
- `Settings` - Site-wide configuration (logo, social links, footer, SEO, contact info)

## CSS Class Reference

### Important Classes Used in Template

**Layout Classes:**
- `.container`, `.container-fluid` - Bootstrap containers
- `.row`, `.col-*` - Bootstrap grid system
- `.d-flex`, `.align-items-center`, `.justify-content-*` - Flexbox utilities

**Template-Specific Classes:**
- `.header` - Main header
- `.hero` - Hero/banner sections
- `.footer` - Footer
- `.section-title` - Section headings
- `.course-item` - Course card
- `.instructor-item` - Instructor card
- `.pricing-item` - Pricing card
- `.testimonial-item` - Testimonial card
- `.blog-item` - Blog post card
- `.event-item` - Event card
- `.cta` - Call-to-action sections

**Component Classes:**
- `.btn-getstarted` - Primary CTA button
- `.navmenu` - Navigation menu
- `.social-links` - Social media icons
- `.footer-links` - Footer navigation
- `.accent-background` - Accent color background
- `.light-background` - Light background sections

## JavaScript Functionality

The original `main.js` includes:
- Mobile navigation toggle
- Sticky header on scroll
- Smooth scrolling
- AOS initialization
- Swiper slider initialization
- PureCounter initialization
- Dropdown menu handlers
- Form validation

**Note:** The main.js is loaded in the Next.js layout to preserve all original functionality.

## Vendor Library Versions

From the original template (approximate versions):
- Bootstrap: 5.3.x
- Bootstrap Icons: Latest
- AOS: 2.3.x
- Swiper: 11.x
- PureCounter: 1.x

## Migration Notes

1. **Static Assets**: All images, CSS, and JS are in `public/assets/` and accessible via `/assets/` URL
2. **Dynamic Content**: All text/images are now editable via Payload CMS admin panel
3. **Forms**: Contact forms use Next.js API routes instead of PHP
4. **Styling**: Original CSS is preserved; custom styles can be added in `src/app/(frontend)/styles.css`
5. **Components**: Header and Footer are React components but use original CSS classes

## If You Need to Reference Original Files

Before deleting the `Learner/Learner/` folder, you may want to:
1. Check any custom HTML/CSS you need to replicate
2. Verify all images are copied to `public/assets/img/`
3. Confirm vendor libraries are working in Next.js version
4. Archive the original template for future reference

## Customization Guide

### To modify styles:
1. Edit `public/assets/css/main.css` directly, OR
2. Use SCSS from `assets/scss/` and recompile, OR
3. Add custom styles in `src/app/(frontend)/styles.css`

### To update content:
- Login to `/admin` panel
- Edit pages, courses, instructors, etc.
- Changes reflect immediately on frontend

### To add new pages:
- Create new route in `src/app/(frontend)/`
- Use existing page components as reference
- Maintain original CSS classes for consistency

## Support & Resources

- **Template Documentation**: https://bootstrapmade.com/learner-bootstrap-course-template/
- **Bootstrap Docs**: https://getbootstrap.com/docs/5.3/
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Note:** The original `Learner/Learner/` folder can be safely deleted after confirming all assets and functionality have been migrated to the Next.js project.
