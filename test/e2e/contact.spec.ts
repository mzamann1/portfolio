import { test, expect } from '@playwright/test'

test.describe('Contact Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the contact section
    await page.goto('/')
    await page.click('a[href="#contact"]')
    await page.waitForSelector('#contact')
  })

  test('should display contact form with all elements', async ({ page }) => {
    // Check that the contact section is visible
    await expect(page.locator('#contact')).toBeVisible()
    
    // Check for main sections
    await expect(page.locator('h2:has-text("Contact")')).toBeVisible()
    await expect(page.locator('h3:has-text("Get In Touch")')).toBeVisible()
    await expect(page.locator('h3:has-text("Send Message")')).toBeVisible()
    
    // Check for form fields
    await expect(page.locator('input[placeholder="John"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Doe"]')).toBeVisible()
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Project Inquiry"]')).toBeVisible()
    await expect(page.locator('textarea[placeholder="Tell me about your project..."]')).toBeVisible()
    
    // Check for submit button
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible()
  })

  test('should display contact information', async ({ page }) => {
    // Check for contact info cards
    await expect(page.locator('text=Email')).toBeVisible()
    await expect(page.locator('text=Phone')).toBeVisible()
    await expect(page.locator('text=Location')).toBeVisible()
    
    // Check for social links
    await expect(page.locator('a[href*="github"]')).toBeVisible()
    await expect(page.locator('a[href*="linkedin"]')).toBeVisible()
  })

  test('should show availability status', async ({ page }) => {
    await expect(page.locator('text=Available Now')).toBeVisible()
    await expect(page.locator('text=freelance work')).toBeVisible()
  })

  test('should show security notice', async ({ page }) => {
    await expect(page.locator('text=This form is protected with rate limiting')).toBeVisible()
  })

  test('should fill and submit form successfully', async ({ page }) => {
    // Fill the form
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'john.doe@example.com')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Project')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'This is a test message for the contact form with more than 10 characters to meet the minimum requirement.')
    
    // Submit the form
    await page.click('button:has-text("Send Message")')
    
    // Check for loading state
    await expect(page.locator('text=Sending...')).toBeVisible()
    
    // Note: In a real test, you would mock the email service
    // For now, we'll just check that the form was submitted
    await expect(page.locator('button:has-text("Send Message")')).toBeDisabled()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    // Try to submit empty form
    await page.click('button:has-text("Send Message")')
    
    // Check for validation errors (these will depend on your validation implementation)
    // This test assumes you have client-side validation
    await expect(page.locator('.alert-error, .text-error')).toBeVisible()
  })

  test('should show validation errors for invalid email', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'invalid-email')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Subject')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'Test message')
    
    // Submit form
    await page.click('button:has-text("Send Message")')
    
    // Check for email validation error
    await expect(page.locator('text=Please enter a valid email')).toBeVisible()
  })

  test('should show validation errors for short message', async ({ page }) => {
    // Fill form with short message
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'john@example.com')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Subject')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'Short')
    
    // Submit form
    await page.click('button:has-text("Send Message")')
    
    // Check for message validation error
    await expect(page.locator('text=Please enter a valid message')).toBeVisible()
  })

  test('should disable form fields during submission', async ({ page }) => {
    // Fill the form
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'john@example.com')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Subject')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'This is a test message with more than 10 characters.')
    
    // Submit the form
    await page.click('button:has-text("Send Message")')
    
    // Check that form fields are disabled
    await expect(page.locator('input[placeholder="John"]')).toBeDisabled()
    await expect(page.locator('input[placeholder="Doe"]')).toBeDisabled()
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeDisabled()
    await expect(page.locator('input[placeholder="Project Inquiry"]')).toBeDisabled()
    await expect(page.locator('textarea[placeholder="Tell me about your project..."]')).toBeDisabled()
  })

  test('should clear form after successful submission', async ({ page }) => {
    // Fill the form
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'john@example.com')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Subject')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'This is a test message with more than 10 characters.')
    
    // Submit the form
    await page.click('button:has-text("Send Message")')
    
    // Wait for form to be cleared (this depends on your implementation)
    // You might need to wait for a success message first
    await expect(page.locator('text=Message sent successfully')).toBeVisible()
    
    // Check that form fields are cleared
    await expect(page.locator('input[placeholder="John"]')).toHaveValue('')
    await expect(page.locator('input[placeholder="Doe"]')).toHaveValue('')
    await expect(page.locator('input[placeholder="john@example.com"]')).toHaveValue('')
    await expect(page.locator('input[placeholder="Project Inquiry"]')).toHaveValue('')
    await expect(page.locator('textarea[placeholder="Tell me about your project..."]')).toHaveValue('')
  })

  test('should handle social link clicks', async ({ page }) => {
    // Click on GitHub link
    const githubLink = page.locator('a[href*="github"]')
    await githubLink.click()
    
    // Check that it opens in a new tab (if target="_blank")
    // This test assumes the link opens in a new tab
    const newPage = await page.context().waitForEvent('page')
    await expect(newPage.url()).toContain('github.com')
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that form is still accessible
    await expect(page.locator('#contact')).toBeVisible()
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible()
    
    // Check that form fields are still visible
    await expect(page.locator('input[placeholder="John"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Doe"]')).toBeVisible()
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible()
  })

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on first input
    await page.keyboard.press('Tab')
    
    // Check that first input is focused
    await expect(page.locator('input[placeholder="John"]')).toBeFocused()
    
    // Navigate through form with Tab
    await page.keyboard.press('Tab')
    await expect(page.locator('input[placeholder="Doe"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('input[placeholder="Project Inquiry"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('textarea[placeholder="Tell me about your project..."]')).toBeFocused()
  })

  test('should handle form submission with Enter key', async ({ page }) => {
    // Fill the form
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'john@example.com')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Subject')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'This is a test message with more than 10 characters.')
    
    // Focus on submit button and press Enter
    await page.locator('button:has-text("Send Message")').focus()
    await page.keyboard.press('Enter')
    
    // Check that form submission was triggered
    await expect(page.locator('text=Sending...')).toBeVisible()
  })

  test('should show error message on network failure', async ({ page }) => {
    // Mock network failure by going offline
    await page.context().setOffline(true)
    
    // Fill and submit form
    await page.fill('input[placeholder="John"]', 'John')
    await page.fill('input[placeholder="Doe"]', 'Doe')
    await page.fill('input[placeholder="john@example.com"]', 'john@example.com')
    await page.fill('input[placeholder="Project Inquiry"]', 'Test Subject')
    await page.fill('textarea[placeholder="Tell me about your project..."]', 'This is a test message with more than 10 characters.')
    
    await page.click('button:has-text("Send Message")')
    
    // Check for error message
    await expect(page.locator('text=Failed to send message')).toBeVisible()
    
    // Go back online
    await page.context().setOffline(false)
  })

  test('should handle rate limiting', async ({ page }) => {
    // This test would require mocking the rate limiter
    // For now, we'll just check that the rate limit warning is present in the UI
    await expect(page.locator('text=rate limiting')).toBeVisible()
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper ARIA labels
    await expect(page.locator('input[placeholder="John"]')).toHaveAttribute('aria-label', /first name/i)
    await expect(page.locator('input[placeholder="Doe"]')).toHaveAttribute('aria-label', /last name/i)
    await expect(page.locator('input[placeholder="john@example.com"]')).toHaveAttribute('aria-label', /email/i)
    
    // Check for proper form labels
    await expect(page.locator('label:has-text("First Name")')).toBeVisible()
    await expect(page.locator('label:has-text("Last Name")')).toBeVisible()
    await expect(page.locator('label:has-text("Email")')).toBeVisible()
    await expect(page.locator('label:has-text("Subject")')).toBeVisible()
    await expect(page.locator('label:has-text("Message")')).toBeVisible()
  })
}) 