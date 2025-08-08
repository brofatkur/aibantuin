# AI Bantuin - Admin Panel

## Admin Access

### Login Credentials
- **URL**: `http://localhost:5173/admin`
- **Username**: `admin`
- **Password**: `admin123`

### Admin Features

The admin panel allows you to edit all dynamic content on the landing page:

#### 1. Hero Section
- Edit main title
- Edit subtitle/description
- Change button text
- Modify tagline

#### 2. Pricing
- Edit package names
- Change prices
- Modify token amounts
- Update descriptions
- Change button text for each package

#### 3. Testimonials
- Edit customer names
- Change roles/positions
- Modify testimonial content
- Adjust star ratings (1-5)

#### 4. Contact Information
- Update WhatsApp number
- Change default WhatsApp message

#### 5. Features
- Edit feature titles
- Modify descriptions
- Change icon names (use Lucide React icon names)

#### 6. Company Settings
- Update company name
- Change company tagline

### How to Use

1. Navigate to `/admin` in your browser
2. Login with the credentials above
3. Use the sidebar to navigate between different sections
4. Make your changes in the forms
5. Click "Simpan Perubahan" to save
6. Use "Preview Site" button to see changes on the main site

### Data Persistence

All changes are automatically saved to localStorage and will persist between browser sessions.

### Security Note

This is a demo implementation. In production, you should:
- Use proper authentication with secure passwords
- Implement server-side data storage
- Add proper authorization checks
- Use HTTPS for all admin operations

### Available Icon Names

For the Features section, you can use any Lucide React icon name, such as:
- Wallet
- Rocket
- Settings
- Clock
- Star
- Shield
- Zap
- MessageCircle
- Phone
- Mail
- etc.

Visit [Lucide Icons](https://lucide.dev/icons/) for a complete list.
