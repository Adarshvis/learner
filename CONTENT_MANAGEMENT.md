# 🎨 Complete CMS Content Management Guide

## 🎯 Overview

**ALL frontend content is now editable through the admin panel!** Every text, image, button, section title, and stat on every page can be changed without touching code.

---

## 🚀 Quick Start

### 1. Setup & Seed Content

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Seed all images and content to CMS
pnpm run seed:content
```

### 2. Start Development Server

```bash
pnpm dev
```

### 3. Access Admin Panel

```
http://localhost:3000/admin
```

- Create your first admin user
- Navigate to **"Page Content"** collection
- Start editing!

---

## 📄 What Gets Seeded

### ✅ All Images Uploaded to Media Collection:
- Hero section images
- Course thumbnails (6 courses)
- Instructor avatars (4 instructors)
- Blog post images (3 posts)
- Testimonial avatars (3 testimonials)
- CTA section images
- Person avatars (13 images)

### ✅ All Page Content Sections Created:

#### **Homepage Sections:**
1. ✅ Hero Section (title, description, buttons, stats, features, image)
2. ✅ Hero Floating Cards (3 cards with icons, titles, student counts)
3. ✅ Featured Courses Title
4. ✅ Course Categories Title
5. ✅ Featured Instructors Title
6. ✅ Testimonials Title
7. ✅ Recent Blog Posts Title
8. ✅ CTA Section (title, description, features, stats, buttons, image)

#### **Other Pages:**
9. ✅ About - Hero Section
10. ✅ Courses - Hero Section
11. ✅ Instructors - Hero Section
12. ✅ Pricing - Hero Section
13. ✅ Blog - Hero Section
14. ✅ Contact - Hero Section

---

## 🎨 How to Edit Content

### Example 1: Edit Homepage Hero Section

1. Go to **Admin Panel** → **Page Content**
2. Find **"Homepage - Hero Section"**
3. Click to edit
4. **You can change:**
   - ✅ Main title
   - ✅ Description text
   - ✅ Primary button text & link
   - ✅ Secondary button text & link
   - ✅ Hero image (upload new)
   - ✅ All 3 statistics (numbers & labels)
   - ✅ All 3 features (titles & icons)
5. Click **Save**
6. **Changes appear immediately on homepage!**

---

### Example 2: Change Hero Floating Cards

1. Go to **Page Content** → **"Homepage - Hero Floating Cards"**
2. Edit **Custom Fields**:
   - `card1_icon` → Change icon class (e.g., `bi-code-slash`)
   - `card1_title` → Change title (e.g., `Web Development`)
   - `card1_students` → Change student count
   - Repeat for card2 and card3
3. Save
4. **Floating cards update instantly!**

---

### Example 3: Update CTA Section

1. Find **"Homepage - Call to Action"**
2. **Edit:**
   - Title and description
   - Upload new CTA image
   - Change feature list items
   - Update statistics
   - Modify button text and links
3. Save → Done!

---

## 📊 Page Content Collection Structure

Each page content entry has:

### **Core Fields:**
- `pageName` - Which page (homepage, about, courses, etc.)
- `section` - Section identifier (hero, cta, featured-courses)
- `sectionLabel` - Friendly name shown in admin

### **Content Group:**
- `title` - Main heading
- `subtitle` - Subheading
- `description` - Plain text description
- `richDescription` - Rich text with formatting
- `buttonText` - Primary button label
- `buttonLink` - Primary button URL
- `secondaryButtonText` - Secondary button label
- `secondaryButtonLink` - Secondary button URL
- `image` - Main section image
- `backgroundImage` - Background image

### **Stats Array:**
Each stat has:
- `number` - The number to display
- `label` - Label below number
- `icon` - Bootstrap icon class

### **Features Array:**
Each feature has:
- `title` - Feature title
- `description` - Feature description (optional)
- `icon` - Bootstrap icon class

### **Custom Fields Array:**
For any additional data:
- `fieldName` - Name of the field
- `fieldValue` - Value
- `fieldType` - Type (text, number, url, email, json)

---

## 🖼️ Image Management

### Upload New Images

1. Go to **Media** collection
2. Click **Create New**
3. Upload image
4. Add alt text (for SEO/accessibility)
5. Save
6. Copy the image and use in Page Content

### Replace Existing Images

1. Find the Page Content section
2. Click on the image field
3. Either:
   - Upload new image
   - Select from existing media
4. Save

---

## 🎯 CMS-Powered Homepage

### Using the New CMS Page

To use the fully CMS-powered homepage:

```tsx
// src/app/(frontend)/page.tsx
export { default } from './cms-page'
```

This will make the homepage fetch ALL content from the CMS, including:
- ✅ All text
- ✅ All images
- ✅ All buttons and links
- ✅ All stats and numbers
- ✅ Featured courses (dynamic)
- ✅ Featured instructors (dynamic)
- ✅ Featured blog posts (dynamic)
- ✅ Testimonials (dynamic)

---

## 📝 Content Editing Workflow

### For Non-Technical Users:

1. **Login** to admin panel
2. **Navigate** to Page Content
3. **Find** the section you want to edit
4. **Click** to edit
5. **Change** text, images, buttons, etc.
6. **Save** changes
7. **Done!** - Changes are live immediately

### No Code Required ✨

---

## 🔍 Finding Content to Edit

### By Page:

Filter by `pageName`:
- Homepage
- About
- Courses
- Instructors
- Pricing
- Blog
- Contact
- Enroll

### By Section:

Common sections:
- `hero` - Top section of page
- `cta` - Call to action
- `featured-courses` - Course section titles
- `featured-instructors` - Instructor section titles
- `testimonials` - Testimonials section
- `recent-blog-posts` - Blog section

---

## 💡 Advanced Customization

### Adding New Sections

1. Create new Page Content entry
2. Set pageName and section identifier
3. Fill in content fields
4. Update frontend component to fetch new section:

```typescript
const newSection = await getPageContent('homepage', 'new-section')
```

### Using Custom Fields

For unique data not covered by standard fields:

```typescript
// In admin, add custom field:
// fieldName: "special_note"
// fieldValue: "Limited time offer!"
// fieldType: "text"

// In code:
const specialNote = getCustomField(content.customFields, 'special_note')
```

---

## 🎨 What Can Be Edited

### ✅ Text Content:
- All headings
- All descriptions
- All button labels
- All feature titles
- All stats and numbers

### ✅ Images:
- Hero images
- Background images
- Section images
- Course thumbnails
- Instructor avatars
- Blog post images
- Testimonial avatars

### ✅ Links & Buttons:
- Button text
- Button URLs
- Navigation links
- Call-to-action links

### ✅ Stats & Numbers:
- Student counts
- Course counts
- Success rates
- Any numerical data

### ✅ Features & Highlights:
- Feature titles
- Feature descriptions
- Icon classes
- Benefit lists

### ✅ Dynamic Content:
- Featured courses (from Courses collection)
- Featured instructors (from Instructors collection)
- Blog posts (from Blog Posts collection)
- Testimonials (from Testimonials collection)

---

## 🚀 Deployment Checklist

Before going live:

1. ✅ Run `pnpm run seed:content` to populate all content
2. ✅ Create admin user at `/admin`
3. ✅ Review all Page Content entries
4. ✅ Upload final images to Media collection
5. ✅ Update all text to final copy
6. ✅ Test all buttons and links
7. ✅ Switch homepage to use `cms-page.tsx`
8. ✅ Verify changes reflect on frontend

---

## 📚 Collections Summary

### Page Content
- **Purpose:** Control all page sections
- **Editable:** Text, images, buttons, stats, features
- **Count:** 14+ sections seeded

### Media
- **Purpose:** All images and files
- **Editable:** Upload, replace, delete
- **Count:** 25+ images seeded

### Courses
- **Purpose:** Course catalog
- **Editable:** Fully managed courses
- **Dynamic:** Shows on homepage, course page

### Instructors
- **Purpose:** Teacher profiles
- **Editable:** Full instructor management
- **Dynamic:** Shows on homepage, instructor page

### Blog Posts
- **Purpose:** Blog content
- **Editable:** Articles and posts
- **Dynamic:** Shows on homepage, blog page

### Testimonials
- **Purpose:** Student reviews
- **Editable:** Reviews and ratings
- **Dynamic:** Shows on homepage

---

## 🎉 Benefits

### For Content Managers:
✅ No code knowledge required
✅ Change anything instantly
✅ Upload images directly
✅ Preview changes immediately
✅ Manage all content in one place

### For Developers:
✅ Separation of concerns
✅ Content lives in CMS, not code
✅ Easy to extend with new sections
✅ Type-safe with Payload types
✅ Automatic image optimization

---

## 🆘 Troubleshooting

### Content not showing?

1. Check `status` is set to `active`
2. Verify `pageName` and `section` match
3. Clear browser cache
4. Check browser console for errors

### Images not loading?

1. Verify image uploaded to Media collection
2. Check image reference in Page Content
3. Ensure image URL is correct
4. Check file permissions

### Need help?

1. Check Payload docs: https://payloadcms.com/docs
2. Review CMS_SETUP.md
3. Check console logs for errors

---

## 🎯 Next Steps

1. **Customize Content** - Edit all sections to match your brand
2. **Upload Images** - Replace placeholder images with your own
3. **Expand Collections** - Add more courses, instructors, blog posts
4. **Create More Sections** - Add new page content entries as needed
5. **Train Your Team** - Show content managers how to use admin panel

---

**🎊 Congratulations! Your entire website is now CMS-controlled!**

Every text, image, button, and section can be edited through the admin panel without writing a single line of code.
