/**
 * Bernaba el Rasol - Application Configuration
 * 
 * Replace SUPABASE_URL and SUPABASE_ANON_KEY with your live Supabase project details.
 * If left empty or invalid, the application automatically uses the local storage mock driver
 * so all features, workflows, and UI interactions work immediately offline or in demo mode!
 */
window.APP_CONFIG = {
  // Live Supabase Credentials (Optional: Leave empty for local storage offline mode, or enter your Supabase credentials)
  SUPABASE_URL: 'https://Scoring-System.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaWZkcHd6YXB1ZXFlZXVleGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MTA0MjIsImV4cCI6MjEwNzI4NjQyMn0._MFwmPm3mpqjJ0IpqPvcitccvZvIa3wirum-mjRIYYE',

  // App Settings
  APP_NAME: 'Bernaba el Rasol',
  CHURCH_CLASS: 'St. Bernaba Youth Class',
  DEFAULT_QR_BASE_URL: window.location.origin + window.location.pathname.replace(/Bernaba_elrasol\.html|admin\/index\.html|user\/index\.html/g, '') + 'user/index.html'
};
