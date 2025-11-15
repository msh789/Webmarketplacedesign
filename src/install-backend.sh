#!/bin/bash

# SETReG Marketplace - Backend Installation Script

echo "🚀 Installing SETReG Backend Dependencies..."
echo ""

# Install Supabase client
echo "📦 Installing @supabase/supabase-js..."
npm install @supabase/supabase-js

echo ""
echo "✅ Backend dependencies installed!"
echo ""
echo "📋 Next steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Update .env file with your credentials"
echo "3. Run the database schema (/supabase/schema.sql)"
echo "4. Start the dev server: npm run dev"
echo ""
echo "📚 See QUICK_START.md for detailed instructions"
echo ""
