# Testing Setup Guide

This document provides instructions for setting up the testing environment for SintetizaDoc, including authentication, MFA configuration, and test data.

## Prerequisites

1. Node.js 18+ installed
2. Clerk account with configured application
3. Supabase project set up
4. Valid environment variables configured

## Clerk Authentication Setup

### 1. Basic Configuration

1. Create a Clerk application at [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Copy your publishable key to `VITE_CLERK_PUBLISHABLE_KEY` in your `.env` file
3. Copy your secret key to `CLERK_SECRET_KEY` in your `.env` file

### 2. Enable Social Providers

In your Clerk dashboard:

1. Go to **User & Authentication** > **Social Connections**
2. Enable the following providers:
   - **Google**: Configure OAuth 2.0 credentials
   - **GitHub**: Set up GitHub OAuth app
   - **Apple**: Configure Apple Sign-in (optional for testing)

3. Configure redirect URLs:
   - Development: `http://localhost:3012/dashboard`
   - Production: `https://your-domain.com/dashboard`

### 3. Multi-Factor Authentication (MFA) Setup

1. In Clerk dashboard, go to **User & Authentication** > **Multi-factor**
2. Enable **SMS verification** and/or **TOTP (Authenticator apps)**
3. Set MFA requirement:
   - **Optional**: Users can choose to enable MFA
   - **Required**: All users must set up MFA (recommended for production)

### 4. Password Policies

Configure strong password requirements:
1. Go to **User & Authentication** > **Email, phone, username**
2. Set password requirements:
   - Minimum length: 8 characters
   - Require uppercase and lowercase
   - Require numbers
   - Require special characters

## Test Accounts Configuration

### 1. Create Test Users

For comprehensive testing, create these test accounts in your Clerk dashboard:

#### Basic User (Free Plan)
- **Email**: `test.user@sintetizadoc.com`
- **Password**: `TestUser123!`
- **MFA**: Disabled
- **Plan**: Free (default)

#### Premium User (Paid Plan)
- **Email**: `premium.user@sintetizadoc.com`
- **Password**: `PremiumUser123!`
- **MFA**: Enabled (TOTP)
- **Plan**: Professional

#### MFA-Enabled User
- **Email**: `mfa.user@sintetizadoc.com`
- **Password**: `MFAUser123!`
- **MFA**: Required (SMS + TOTP)
- **Plan**: Basic

#### Admin User
- **Email**: `admin@sintetizadoc.com`
- **Password**: `AdminUser123!`
- **MFA**: Required
- **Role**: Admin (set via Clerk metadata)

### 2. Configure User Metadata

For users requiring special roles or plan assignments, set public metadata:

```json
{
  "role": "admin",
  "plan": "enterprise",
  "features": ["unlimited_uploads", "api_access", "priority_support"]
}
```

## Environment Configuration for Testing

### Development Environment (.env)

```bash
# Application
VITE_APP_URL=http://localhost:3012
VITE_APP_ENV=development

# Clerk (replace with your actual keys)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_here

# Enable test mode features
VITE_DEBUG=true
VITE_MOCK_OPENAI=false
VITE_MOCK_STRIPE=true
```

### Test Environment (.env.test)

```bash
# Test-specific configuration
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_test_key_here
CLERK_SECRET_KEY=sk_test_your_test_secret_here

# Mock external services
VITE_MOCK_OPENAI=true
VITE_MOCK_STRIPE=true
VITE_MOCK_EMAIL=true
```

## Running Tests

### 1. Unit Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### 2. Integration Tests

```bash
# Run integration tests specifically
npm run test:integration

# Run E2E tests (if configured)
npm run test:e2e
```

### 3. Manual Testing Checklist

#### Authentication Flow
- [ ] Email registration with valid credentials
- [ ] Email registration with weak password (should fail)
- [ ] Social login with Google
- [ ] Social login with GitHub
- [ ] Login with incorrect credentials (should fail)
- [ ] MFA setup and verification
- [ ] Password reset flow

#### Document Upload
- [ ] Upload PDF document under size limit
- [ ] Upload unsupported file format (should fail)
- [ ] Drag and drop functionality
- [ ] OCR text extraction accuracy

#### AI Summary Generation
- [ ] Generate summary using GPT-4
- [ ] Fallback to Claude on GPT-4 failure
- [ ] Summary regeneration with adjusted parameters
- [ ] Different summary types (standard, executive, technical)

#### Subscription Management
- [ ] Free plan limits enforcement
- [ ] Stripe payment processing
- [ ] Subscription upgrade flow
- [ ] Plan feature restrictions

#### Compliance
- [ ] LGPD consent during registration
- [ ] Privacy policy accessibility
- [ ] Data deletion request handling
- [ ] Multilingual interface switching

## Troubleshooting

### Common Issues

1. **Clerk Development Key Warnings**
   - Ensure you're using the correct publishable key for your environment
   - Check that your domain is configured in Clerk dashboard

2. **Social Login Not Appearing**
   - Verify social providers are enabled in Clerk dashboard
   - Check OAuth configurations for each provider

3. **MFA Not Working**
   - Ensure MFA is enabled in Clerk dashboard
   - Verify phone number format for SMS verification
   - Check TOTP secret generation

4. **Registration Failures**
   - Check password policy requirements
   - Verify email domain restrictions
   - Ensure LGPD consent is properly handled

### Debug Mode

Enable debug mode for detailed logging:

```bash
VITE_DEBUG=true
LOG_LEVEL=debug
```

This will provide detailed information about:
- Authentication flow
- API requests and responses
- Error details
- User session management

## Test Data Management

### 1. Sample Documents

Create test documents in `test-data/` directory:
- `sample.pdf` - Standard PDF document
- `sample.docx` - Word document
- `sample.txt` - Plain text file
- `scanned.pdf` - PDF with OCR requirements
- `large-file.pdf` - File exceeding size limits
- `invalid.xyz` - Unsupported file format

### 2. Expected Summaries

For consistency in testing, maintain expected summaries for sample documents to validate AI output quality.

### 3. Database Seeding

```bash
# Seed test database (if implemented)
npm run db:seed:test

# Reset test database
npm run db:reset:test
```

## Monitoring and Logging

### Test Monitoring

- Set up test result monitoring in CI/CD
- Configure alerts for failing tests
- Track test coverage metrics

### Error Tracking

- Configure Sentry for test environment
- Monitor authentication errors
- Track API failure rates

## Security Considerations

1. **Never use production keys in test environment**
2. **Regularly rotate test API keys**
3. **Ensure test users have limited permissions**
4. **Clean up test data periodically**
5. **Monitor for any exposed credentials in logs**

For questions or issues with testing setup, contact the development team or create an issue in the repository.