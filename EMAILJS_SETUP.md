# EmailJS Setup Guide

## Step 1: Sign Up
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create a free account

## Step 2: Create Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_def456`)

## Step 5: Update Your Code
Replace these values in `src/components/Contact.tsx`:

```typescript
const serviceId = 'YOUR_EMAILJS_SERVICE_ID';     // Replace with your Service ID
const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';   // Replace with your Template ID  
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';     // Replace with your Public Key
```

## Step 6: Test
1. Fill out the contact form
2. Submit and check your email
3. You should receive the message!

## Alternative: Environment Variables
For better security, create a `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the code to use:
```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## Free Tier Limits
- EmailJS free tier: 200 emails/month
- Perfect for portfolio sites!

## Troubleshooting
- Check browser console for errors
- Verify all IDs are correct
- Ensure template variables match the code
- Test with a simple message first 