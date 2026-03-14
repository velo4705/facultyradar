const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('../config/environment');

const supabaseClient = createClient(supabase.url, supabase.anonKey);

module.exports = supabaseClient;