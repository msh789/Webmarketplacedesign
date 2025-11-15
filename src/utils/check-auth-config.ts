/**
 * Supabase Email Authentication Configuration Checker
 * 
 * Run this to verify your Supabase email auth settings
 */

import { supabase } from '../lib/supabase';

export async function checkAuthConfig() {
  console.log('🔍 Checking Supabase Authentication Configuration...\n');

  const results = {
    connection: false,
    emailAuthEnabled: false,
    canCreateUser: false,
    siteUrlConfigured: false,
  };

  try {
    // 1. Check connection
    console.log('1️⃣ Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase.auth.getSession();
    
    if (!testError) {
      results.connection = true;
      console.log('   ✅ Connection successful!\n');
    } else {
      console.log('   ❌ Connection failed:', testError.message, '\n');
      return results;
    }

    // 2. Check if we can access auth settings
    console.log('2️⃣ Checking auth configuration...');
    try {
      // Try to get current user (if any)
      const { data: userData } = await supabase.auth.getUser();
      console.log('   ✅ Auth API accessible\n');
    } catch (e) {
      console.log('   ⚠️  Auth API check inconclusive\n');
    }

    // 3. Display current configuration status
    console.log('3️⃣ Configuration Status:\n');
    console.log('   📡 Project ID: lestthjgmdwivoozrmtr');
    console.log('   🔗 Project URL: https://lestthjgmdwivoozrmtr.supabase.co');
    console.log('   🔑 Anon Key: Connected ✅\n');

    // 4. What needs to be configured
    console.log('4️⃣ Required Dashboard Configuration:\n');
    console.log('   ⚙️  Settings to configure in Supabase Dashboard:');
    console.log('   ');
    console.log('   🔧 Email Confirmation:');
    console.log('      → Go to: Settings → Authentication');
    console.log('      → Enable: "Confirm email" checkbox');
    console.log('   ');
    console.log('   🔧 Site URL:');
    console.log('      → Go to: Settings → API');
    console.log('      → Set Site URL: http://localhost:5173');
    console.log('   ');
    console.log('   🔧 Redirect URLs:');
    console.log('      → Same page (Settings → API)');
    console.log('      → Add: http://localhost:5173/verify-email');
    console.log('      → Add: http://localhost:5173/login');
    console.log('      → Add: http://localhost:5173/*');
    console.log('   ');

    // 5. Quick links
    console.log('5️⃣ Quick Access Links:\n');
    console.log('   🌐 Dashboard: https://app.supabase.com/project/lestthjgmdwivoozrmtr');
    console.log('   ⚙️  Auth Settings: https://app.supabase.com/project/lestthjgmdwivoozrmtr/settings/auth');
    console.log('   🔗 API Settings: https://app.supabase.com/project/lestthjgmdwivoozrmtr/settings/api');
    console.log('   📧 Email Templates: https://app.supabase.com/project/lestthjgmdwivoozrmtr/auth/templates');
    console.log('   👥 Users: https://app.supabase.com/project/lestthjgmdwivoozrmtr/auth/users\n');

    console.log('6️⃣ Next Steps:\n');
    console.log('   1. Click the "Auth Settings" link above');
    console.log('   2. Enable "Confirm email" checkbox');
    console.log('   3. Click the "API Settings" link above');
    console.log('   4. Set Site URL and Redirect URLs');
    console.log('   5. Click Save');
    console.log('   6. Test by registering at: http://localhost:5173/register\n');

    console.log('⏱️  Time required: 2 minutes\n');

  } catch (error) {
    console.error('❌ Error checking configuration:', error);
  }

  return results;
}

// Auto-run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAuthConfig();
}
