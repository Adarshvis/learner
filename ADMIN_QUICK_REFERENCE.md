# 📖 Quick Admin Panel Reference

## 🎯 Access Admin Panel
```
http://localhost:3000/admin
```

---

## 📋 Content Editing Cheat Sheet

### 🏠 Homepage Hero Section
**Location:** Page Content → "Homepage - Hero Section"

**Can Edit:**
- Main title
- Description
- Primary button (text + link)
- Secondary button (text + link)
- Hero image
- 3 statistics (number + label)
- 3 features (title + icon)

**Changes reflect:** Immediately on homepage

---

### 🎴 Homepage Floating Cards
**Location:** Page Content → "Homepage - Hero Floating Cards"

**Can Edit:**
- Card 1: icon, title, student count
- Card 2: icon, title, student count
- Card 3: icon, title, student count

**Field names:**
- `card1_icon`, `card1_title`, `card1_students`
- `card2_icon`, `card2_title`, `card2_students`
- `card3_icon`, `card3_title`, `card3_students`

---

### 📢 Homepage CTA
**Location:** Page Content → "Homepage - Call to Action"

**Can Edit:**
- Title & description
- CTA image
- 4 feature items
- 3 statistics
- 2 buttons (text + links)

---

### 🎓 Featured Courses
**Location:** Courses Collection

**To feature on homepage:**
1. Edit course
2. Check ✅ "Featured"
3. Set status to "Published"
4. Save

**Limit:** Top 6 featured courses show

---

### 👨‍🏫 Featured Instructors
**Location:** Instructors Collection

**To feature on homepage:**
1. Edit instructor
2. Check ✅ "Featured"
3. Set status to "Active"
4. Save

**Limit:** Top 4 featured instructors show

---

### 📝 Featured Blog Posts
**Location:** Blog Posts Collection

**To feature on homepage:**
1. Edit blog post
2. Check ✅ "Featured"
3. Set status to "Published"
4. Save

**Limit:** Top 3 featured posts show

---

### ⭐ Testimonials
**Location:** Testimonials Collection

**To show on homepage:**
1. Edit testimonial
2. Check ✅ "Featured"
3. Set status to "Approved"
4. Save

**Limit:** Top 5 featured testimonials show

---

## 🖼️ Image Management

### Upload New Image
1. Go to **Media** collection
2. Click **Create New**
3. Upload file
4. Add alt text (required)
5. Save
6. Copy to use in other collections

### Use Image in Page Content
1. Edit Page Content section
2. Click image field
3. Select from media library OR upload new
4. Save

### Replace Image
1. Find the content entry
2. Click current image
3. Click "X" to remove
4. Select or upload new image
5. Save

---

## 🎨 Section Titles

All section titles are editable:

| Section | Location |
|---------|----------|
| Featured Courses Title | Page Content → "Homepage - Featured Courses Title" |
| Course Categories Title | Page Content → "Homepage - Course Categories Title" |
| Featured Instructors Title | Page Content → "Homepage - Featured Instructors Title" |
| Testimonials Title | Page Content → "Homepage - Testimonials Title" |
| Blog Posts Title | Page Content → "Homepage - Recent Blog Posts Title" |

**Edit:**
- `title` - Main heading
- `description` - Subtitle

---

## 📱 Bootstrap Icons

Common icons used:

```
bi-people          (people/students)
bi-book            (courses)
bi-graph-up        (success/growth)
bi-shield-check    (certified)
bi-clock           (time/access)
bi-code-slash      (web development)
bi-palette         (design)
bi-check-circle-fill (checkmark)
bi-star-fill       (rating star)
bi-linkedin        (LinkedIn)
bi-twitter         (Twitter)
bi-github          (GitHub)
```

Find more at: https://icons.getbootstrap.com/

---

## 🔄 Workflow

### Daily Content Updates
1. Login to admin
2. Go to collection
3. Edit entry
4. Save
5. ✅ Done - Live immediately

### Adding New Course
1. Go to **Courses**
2. Click **Create New**
3. Fill all fields
4. Upload course image
5. Select instructor
6. Set price & duration
7. Check "Featured" for homepage
8. Set status to "Published"
9. Save

### Adding New Instructor
1. Go to **Instructors**
2. Click **Create New**
3. Fill profile details
4. Upload avatar
5. Add experience & skills
6. Check "Featured" for homepage
7. Set status to "Active"
8. Save

### Adding Blog Post
1. Go to **Blog Posts**
2. Click **Create New**
3. Write content
4. Upload featured image
5. Set category & tags
6. Check "Featured" for homepage
7. Set status to "Published"
8. Save

---

## 🎯 Status Fields

### Courses
- **Draft** - Not visible
- **Published** - Live on site ✅
- **Coming Soon** - Shows as upcoming
- **Archived** - Hidden

### Instructors
- **Active** - Shows on site ✅
- **Inactive** - Hidden
- **On Leave** - Temporarily hidden

### Blog Posts
- **Draft** - Not visible
- **Published** - Live on site ✅
- **Archived** - Hidden

### Testimonials
- **Pending Review** - Waiting approval
- **Approved** - Shows on site ✅
- **Rejected** - Hidden

### Page Content
- **Active** - Shows on site ✅
- **Inactive** - Hidden

---

## 💡 Pro Tips

### Tip 1: Use Descriptive Labels
When creating Page Content, use clear section labels:
- ✅ "Homepage - Hero Section"
- ❌ "hero"

### Tip 2: Set Alt Text
Always add alt text to images for:
- SEO optimization
- Accessibility
- Better user experience

### Tip 3: Preview Before Publishing
For courses and blog posts:
1. Save as "Draft"
2. Review on frontend
3. Change to "Published" when ready

### Tip 4: Use Featured Wisely
Only feature your best content:
- Top courses
- Best instructors
- Most popular posts
- Highest-rated testimonials

### Tip 5: Organize with Custom Fields
For unique data, use Custom Fields in Page Content:
- Easy to add
- Flexible structure
- No code needed

---

## 🆘 Quick Fixes

### Content not showing?
✅ Check status is "Active"
✅ Check "Featured" if needed
✅ Refresh browser

### Image not loading?
✅ Re-upload image
✅ Check file size (keep under 2MB)
✅ Use .webp, .jpg, or .png format

### Changes not visible?
✅ Hard refresh (Ctrl+F5 or Cmd+Shift+R)
✅ Clear browser cache
✅ Check correct page/section

---

## 📞 Field Types Guide

| Field Type | Use For | Example |
|------------|---------|---------|
| Text | Short text | Course title |
| Textarea | Multi-line | Description |
| Rich Text | Formatted content | Blog post content |
| Number | Numerical data | Price, rating |
| Select | Dropdown choice | Status, category |
| Checkbox | Yes/No | Featured toggle |
| Date | Dates | Event date |
| Upload | Images/files | Course image |
| Relationship | Link to other | Instructor → Course |
| Array | Repeating items | Features list |
| Group | Nested fields | Price (amount + currency) |

---

## 🎓 Remember

✅ **Save often** - Changes aren't live until saved
✅ **Use active status** - Only active content shows
✅ **Optimize images** - Keep files small for faster loading
✅ **Write clear text** - Your content represents your brand
✅ **Test after editing** - Always check frontend after changes

---

## 🚀 You're Ready!

Start editing your content through the admin panel. No coding required! 🎉
