require('dotenv').config();

module.exports = {
    supabase: {
        url: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    port: process.env.PORT || 8000,
    nodeEnv: process.env.NODE_ENV
};