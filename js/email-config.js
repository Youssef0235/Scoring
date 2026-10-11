/**
 * Toma el Rasol - Automated Birthday Notification Emails Configuration
 * 
 * ==============================================================================
 * TO ADD OR REMOVE EMAIL RECIPIENTS:
 * Simply add or remove email addresses in the NOTIFICATION_EMAILS array below.
 * Example:
 *   NOTIFICATION_EMAILS: [
 *     'servant1@example.com',
 *     'servant2@example.com'
 *   ]
 * ==============================================================================
 */

const EMAIL_CONFIG = {
  // Automated Birthday Notification Recipient Email Addresses
  NOTIFICATION_EMAILS: [
    // Add your church servant email addresses here (e.g. 'servant@church.org')
  ],

  // Automated Email Service Options
  AUTOMATION_ENABLED: true,

  // Schedule Rules
  MONTHLY_ROSTER_CRON: '0 0 1 * *', // 1st day of every month at midnight
  DAILY_REMINDER_CRON: '0 16 * * *', // Daily at 16:00 PM (4:00 PM - 1 day before birthday reminder)

  // Default Email Branding
  SENDER_NAME: 'Toma_el_rasol',
  SENDER_EMAIL: 'Toma_el_rasol@church.org'
};

if (typeof window !== 'undefined') {
  window.EMAIL_CONFIG = EMAIL_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EMAIL_CONFIG;
}

