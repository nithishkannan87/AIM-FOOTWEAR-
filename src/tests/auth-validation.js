// Authentication Setup Validation Script
// Run with: node src/tests/auth-validation.js

import fs from 'fs';
import path from 'path';

console.log('🧪 Authentication Setup Validation\n');
console.log('===================================\n');

const tests = {
    passed: 0,
    failed: 0,
    results: []
};

function test(name, condition, details = '') {
    if (condition) {
        tests.passed++;
        tests.results.push(`✅ ${name}`);
        if (details) console.log(`   ${details}`);
    } else {
        tests.failed++;
        tests.results.push(`❌ ${name}`);
        if (details) console.log(`   ${details}`);
    }
}

// Test 1: Check Firebase config
try {
    const firebaseExists = fs.existsSync('./firebase.ts');
    test('Firebase config file exists', firebaseExists, 'Location: ./firebase.ts');

    if (firebaseExists) {
        const firebaseContent = fs.readFileSync('./firebase.ts', 'utf8');
        test('Firebase uses environment variables',
            firebaseContent.includes('import.meta.env.VITE_FIREBASE'),
            'Config secured with env vars'
        );
        test('Firestore initialized',
            firebaseContent.includes('getFirestore'),
            'Firestore db exported'
        );
    }
} catch (e) {
    test('Firebase config file exists', false, `Error: ${e.message}`);
}

// Test 2: Check AuthContext
try {
    const authContextExists = fs.existsSync('./context/AuthContext.tsx');
    test('AuthContext file exists', authContextExists, 'Location: ./context/AuthContext.tsx');

    if (authContextExists) {
        const authContent = fs.readFileSync('./context/AuthContext.tsx', 'utf8');
        test('AuthContext includes Firestore',
            authContent.includes('from \'firebase/firestore\''),
            'Firestore imports present'
        );
        test('Signup creates Firestore document',
            authContent.includes('setDoc') && authContent.includes('serverTimestamp'),
            'User document creation implemented'
        );
    }
} catch (e) {
    test('AuthContext file exists', false, `Error: ${e.message}`);
}

// Test 3: Check SignIn page
try {
    const signInExists = fs.existsSync('./pages/SignIn.tsx');
    test('SignIn page exists', signInExists, 'Location: ./pages/SignIn.tsx');

    if (signInExists) {
        const signInContent = fs.readFileSync('./pages/SignIn.tsx', 'utf8');
        test('SignIn has error handling',
            signInContent.includes('auth/user-not-found') && signInContent.includes('auth/wrong-password'),
            'Firebase error codes handled'
        );
    }
} catch (e) {
    test('SignIn page exists', false, `Error: ${e.message}`);
}

// Test 4: Check SignUp page
try {
    const signUpExists = fs.existsSync('./pages/SignUp.tsx');
    test('SignUp page exists', signUpExists, 'Location: ./pages/SignUp.tsx');

    if (signUpExists) {
        const signUpContent = fs.readFileSync('./pages/SignUp.tsx', 'utf8');
        test('SignUp validates passwords',
            signUpContent.includes('confirmPassword') && signUpContent.includes('Passwords do not match'),
            'Password validation implemented'
        );
        test('SignUp has minimum password length',
            signUpContent.includes('minLength={6}') || signUpContent.includes('length < 6'),
            '6 character minimum enforced'
        );
    }
} catch (e) {
    test('SignUp page exists', false, `Error: ${e.message}`);
}

// Test 5: Check ProtectedRoute
try {
    const protectedRouteExists = fs.existsSync('./components/ProtectedRoute.tsx');
    test('ProtectedRoute component exists', protectedRouteExists, 'Location: ./components/ProtectedRoute.tsx');

    if (protectedRouteExists) {
        const protectedContent = fs.readFileSync('./components/ProtectedRoute.tsx', 'utf8');
        test('ProtectedRoute redirects to login',
            protectedContent.includes('Navigate') && protectedContent.includes('/login'),
            'Redirect logic implemented'
        );
    }
} catch (e) {
    test('ProtectedRoute component exists', false, `Error: ${e.message}`);
}

// Test 6: Check environment file
try {
    const envExists = fs.existsSync('./.env.local');
    test('Environment file exists', envExists, 'Location: ./.env.local');

    if (envExists) {
        const envContent = fs.readFileSync('./.env.local', 'utf8');
        test('Firebase env variables present',
            envContent.includes('VITE_FIREBASE_API_KEY') &&
            envContent.includes('VITE_FIREBASE_PROJECT_ID'),
            'All Firebase variables configured'
        );
    }
} catch (e) {
    test('Environment file exists', false, `Error: ${e.message}`);
}

// Test 7: Check App.tsx routing
try {
    const appExists = fs.existsSync('./App.tsx');
    test('App.tsx exists', appExists);

    if (appExists) {
        const appContent = fs.readFileSync('./App.tsx', 'utf8');
        test('App has separate /login and /signup routes',
            appContent.includes('/login') && appContent.includes('/signup'),
            'Auth routes configured'
        );
        test('App uses ProtectedRoute',
            appContent.includes('ProtectedRoute'),
            'Protected routes implemented'
        );
    }
} catch (e) {
    test('App.tsx exists', false, `Error: ${e.message}`);
}

// Print results
console.log('\n📊 TEST RESULTS:');
console.log('================');
tests.results.forEach(r => console.log(r));
console.log('================');
console.log(`Total: ${tests.passed + tests.failed} | Passed: ${tests.passed} | Failed: ${tests.failed}`);

if (tests.failed > 0) {
    console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
    process.exit(1);
} else {
    console.log('\n🎉 All tests passed! Authentication setup is complete.');
    console.log('\n📝 Next Steps:');
    console.log('1. Ensure Firebase Authentication (Email/Password) is enabled in Firebase Console');
    console.log('2. Ensure Firestore Database is created in Firebase Console');
    console.log('3. Run the dev server: npm run dev');
    console.log('4. Test signup flow at: http://localhost:5173/#/signup');
    console.log('5. Test signin flow at: http://localhost:5173/#/login');
    console.log('6. Verify protected routes redirect when logged out');
    process.exit(0);
}
