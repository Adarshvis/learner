# 🚀 Setup Instructions - Make All Content Editable

## Quick Setup (3 Steps)

### Step 1: Build the Project
```bash
pnpm build
```
*This compiles all the TypeScript files needed for seeding*

### Step 2: Seed All Content & Images
```bash
pnpm run seed:content
```
*This will:*
- ✅ Upload 25+ images to Media collection
- ✅ Create 14+ page content sections
- ✅ Populate hero sections, CTA, titles, etc.

### Step 3: Start Development Server
```bash
pnpm dev
```

### Step 4: Access Admin Panel
Open your browser:
```
http://localhost:3000/admin
```

1. Create your first admin user
2. Login
3. Navigate to **"Page Content"** collection
4. Start editing! ✨

---

## 📋 What Happens After Seeding?

### ✅ Images Uploaded (25+)
All images from `/public/assets/img` uploaded to CMS:
- Hero images
- Course thumbnails
- Instructor avatars
- Blog post images
- Person avatars
- CTA images

### ✅ Page Content Created (14+)
All frontend sections created in admin:
- Homepage Hero
- Homepage CTA
- Featured Courses Title
- Featured Instructors Title
- Testimonials Title
- Blog Posts Title
- Floating Cards Data
- About/Courses/Pricing/Blog/Contact Hero Sections

### ✅ Ready to Edit
Everything is now editable through admin panel!

---

## 🎨 How to Edit Content

### Example: Change Homepage Hero

1. Go to admin panel
2. Click **"Page Content"**
3. Find **"Homepage - Hero Section"**
4. Edit:
   - Title: "Transform Your Future..."
   - Description: "Discover thousands..."
   - Buttons, stats, features
   - Upload new hero image
5. Save
6. **Refresh homepage** → Changes live! ✅

---

## 🔄 Using the CMS-Powered Homepage

To activate the fully CMS-controlled homepage:

**Option 1: Export from cms-page.tsx**
```tsx
// src/app/(frontend)/page.tsx
export { default } from './cms-page'
```

**Option 2: Copy cms-page content**
Replace contents of `page.tsx` with `cms-page.tsx`

---

## 📚 Documentation

- **CONTENT_MANAGEMENT.md** - Complete guide to content editing
- **ADMIN_QUICK_REFERENCE.md** - Quick reference for admin panel
- **CMS_SETUP.md** - Original CMS setup documentation

---

## 🎯 What's Editable?

### ✅ ALL Text
- Headings
- Descriptions
- Button labels
- Stats & numbers
- Feature titles

### ✅ ALL Images
- Hero images
- Course thumbnails
- Instructor avatars
- Blog images
- Background images

### ✅ ALL Buttons
- Button text
- Button URLs
- Primary & secondary actions

### ✅ ALL Sections
- Hero sections
- CTA sections
- Section titles
- Feature lists
- Statistics

---

## 🆘 Troubleshooting

### Seeding Fails?
```bash
# Make sure you built first
pnpm build

# Try again
pnpm run seed:content
```

### Images Not Found?
Make sure images exist in `/public/assets/img/`

### Content Not Showing?
1. Check admin panel
2. Verify status is "Active"
3. Clear browser cache
4. Check console for errors

---

## ✨ You're All Set!

Your learning platform now has **complete CMS control**. Every piece of content is editable through the admin panel!

**Next Steps:**
1. ✅ Edit homepage hero section
2. ✅ Upload your own images
3. ✅ Customize all text
4. ✅ Add your courses & instructors
5. ✅ Train your content team

🎉 **No code needed for content updates!**
