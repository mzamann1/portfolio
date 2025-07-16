import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Contact from '@components/Contact'
import { useContactData } from '@hooks/usePortfolioData'
import { useLanguageFont } from '@hooks/useLanguageFont'

// Mock the hooks
vi.mock('@hooks/usePortfolioData')
vi.mock('@hooks/useLanguageFont')
vi.mock('@services/analytics', () => ({
  default: {
    trackFormSubmission: vi.fn(),
    trackInteraction: vi.fn(),
  },
}))

// Mock security module with factory function
vi.mock('@utils/security', () => ({
  validateFormData: vi.fn(),
  sanitizeFormData: vi.fn(),
  contactFormRateLimiter: {
    isAllowed: vi.fn(),
    getRemainingAttempts: vi.fn(),
    getResetTime: vi.fn(),
  },
  generateCSRFToken: vi.fn(() => 'test-csrf-token'),
  validateCSRFToken: vi.fn(),
  isSecureConnection: vi.fn(),
}))

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}))

const mockContactData = {
  description: 'Get in touch for collaborations',
  contactInfo: [
    {
      id: 'email',
      title: 'Email',
      value: 'contact@example.com',
      icon: 'FaEnvelope',
      type: 'email',
    },
    {
      id: 'phone',
      title: 'Phone',
      value: '+92 300 1234567',
      icon: 'FaPhone',
      type: 'phone',
    },
    {
      id: 'location',
      title: 'Location',
      value: 'Karachi, Pakistan',
      icon: 'FaMapMarkerAlt',
      type: 'location',
    },
  ],
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/example',
      icon: 'FaGithub',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/example',
      icon: 'FaLinkedin',
    },
  ],
  availability: {
    status: 'available',
    message: 'Available for new opportunities',
    availableFor: ['Freelance', 'Full-time'],
  },
}

const mockLanguageFont = {
  fontClass: 'font-sans',
  heading: 'text-3xl font-bold',
  body: 'text-base',
}

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup default mocks
    ;(useContactData as any).mockReturnValue({
      data: mockContactData,
      loading: false,
      error: null,
    })
    
    ;(useLanguageFont as any).mockReturnValue(mockLanguageFont)
    
    // Setup default security mocks
    const { validateFormData, sanitizeFormData, contactFormRateLimiter, isSecureConnection } = require('@utils/security')
    validateFormData.mockReturnValue({ isValid: true, errors: {} })
    sanitizeFormData.mockImplementation((data: any) => data)
    contactFormRateLimiter.isAllowed.mockReturnValue(true)
    isSecureConnection.mockReturnValue(true)
  })

  it('renders contact form with all sections', () => {
    render(<Contact />)
    
    // Check for main sections
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByText('Send Message')).toBeInTheDocument()
    
    // Check for form fields
    expect(screen.getByPlaceholderText('John')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Inquiry')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
  })

  it('displays contact information correctly', () => {
    render(<Contact />)
    
    expect(screen.getByText('contact@example.com')).toBeInTheDocument()
    expect(screen.getByText('+92 300 1234567')).toBeInTheDocument()
    expect(screen.getByText('Karachi, Pakistan')).toBeInTheDocument()
  })

  it('displays social links', () => {
    render(<Contact />)
    
    const githubLink = screen.getByRole('link', { name: /github/i })
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/example')
  })

  it('shows loading state when data is loading', () => {
    ;(useContactData as any).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    })

    render(<Contact />)
    
    expect(screen.getByRole('status')).toBeInTheDocument() // loading spinner
  })

  it('handles form submission successfully', async () => {
    const emailjs = require('@emailjs/browser').default
    emailjs.send.mockResolvedValue({})

    render(<Contact />)
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText('John'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Doe'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Project Inquiry'), {
      target: { value: 'Test Subject' },
    })
    fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), {
      target: { value: 'This is a test message with more than 10 characters.' },
    })
    
    // Submit form
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalled()
    })
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully/)).toBeInTheDocument()
    })
  })

  it('handles form validation errors', async () => {
    const { validateFormData } = require('@utils/security')
    validateFormData.mockReturnValue({
      isValid: false,
      errors: {
        firstName: 'First name is required',
        email: 'Please enter a valid email',
      },
    })

    render(<Contact />)
    
    // Submit form without filling required fields
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    })
  })

  it('handles rate limiting', async () => {
    const { contactFormRateLimiter } = require('@utils/security')
    contactFormRateLimiter.isAllowed.mockReturnValue(false)
    contactFormRateLimiter.getRemainingAttempts.mockReturnValue(0)
    contactFormRateLimiter.getResetTime.mockReturnValue(Date.now() + 300000) // 5 minutes

    render(<Contact />)
    
    // Try to submit form
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(screen.getByText(/Rate limit exceeded/)).toBeInTheDocument()
    })
  })

  it('handles insecure connection', async () => {
    const { isSecureConnection } = require('@utils/security')
    isSecureConnection.mockReturnValue(false)

    render(<Contact />)
    
    // Try to submit form
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(screen.getByText(/Please use a secure connection/)).toBeInTheDocument()
    })
  })

  it('handles form submission errors', async () => {
    const emailjs = require('@emailjs/browser').default
    emailjs.send.mockRejectedValue(new Error('Network error'))

    render(<Contact />)
    
    // Fill and submit form
    fireEvent.change(screen.getByPlaceholderText('John'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Doe'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Project Inquiry'), {
      target: { value: 'Test Subject' },
    })
    fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), {
      target: { value: 'This is a test message with more than 10 characters.' },
    })
    
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/)).toBeInTheDocument()
    })
  })

  it('tracks analytics events on social link clicks', () => {
    const analytics = require('@services/analytics').default
    
    render(<Contact />)
    
    const githubLink = screen.getByRole('link', { name: /github/i })
    fireEvent.click(githubLink)
    
    expect(analytics.trackInteraction).toHaveBeenCalledWith('click', 'social_link', 'GitHub')
  })

  it('disables form when submitting', async () => {
    const emailjs = require('@emailjs/browser').default
    emailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    render(<Contact />)
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText('John'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Doe'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Project Inquiry'), {
      target: { value: 'Test Subject' },
    })
    fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), {
      target: { value: 'This is a test message with more than 10 characters.' },
    })
    
    // Submit form
    const submitButton = screen.getByText('Send Message')
    fireEvent.click(submitButton)
    
    // Check that form is disabled during submission
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('John')).toBeDisabled()
    expect(screen.getByPlaceholderText('Doe')).toBeDisabled()
    expect(screen.getByPlaceholderText('john@example.com')).toBeDisabled()
    expect(screen.getByPlaceholderText('Project Inquiry')).toBeDisabled()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeDisabled()
  })

  it('shows security notice', () => {
    render(<Contact />)
    
    expect(screen.getByText(/This form is protected with rate limiting/)).toBeInTheDocument()
  })

  it('shows availability status', () => {
    render(<Contact />)
    
    expect(screen.getByText('Available Now')).toBeInTheDocument()
    expect(screen.getByText(/I'm currently available for freelance work/)).toBeInTheDocument()
  })
}) 