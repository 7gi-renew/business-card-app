import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://inizuopvaciuzdblqiju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaXp1b3B2YWNpdXpkYmxxaWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjg2MTQsImV4cCI6MjA1NzcwNDYxNH0.SdrbpZjfCMkuFMONVmPEqmbW0bmVn8uOi4s53RUej34",
);
