(() => {
  const SUPABASE_URL = 'https://wdyusuhpmefxpbvwewwt.supabase.co';
  const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeXVzdWhwbWVmeHBidndld3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MzgzMjUsImV4cCI6MjEwNDMxNDMyNX0.A0jFTH-hqs1mBNZD1tUrhT4LsfbltEdMVq0k-18uXoc';

  const getClient = () => {
    if (!window.supabase) return null;

    return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  };

  window.UdiAutoLabSupabase = { getClient };
})();
