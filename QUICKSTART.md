# 🚀 Quick Start Guide - Firebase Auth Setup

## ⚡ Essential Steps (5 Minutes)

### Step 1: Enable Email/Password in Firebase Console
```
1. Go to: https://console.firebase.google.com/
2. Select: aim-footwear-2b697
3. Click: Build → Authentication → Get Started
4. Enable: Email/Password provider
5. Save
```

### Step 2: Create Firestore Database
```
1. Stay in Firebase Console
2. Click: Build → Firestore Database → Create database
3. Select: Start in test mode
4. Choose location → Enable
```

### Step 3: Run the Application
```bash
npm run dev
```

### Step 4: Test Sign Up
```
1. Navigate to: http://localhost:5173/#/signup
2. Create account with:
   - Name: Your Name
   - Email: your@email.com
   - Password: yourpass123
3. Should redirect to home page automatically
```

### Step 5: Test Protected Route
```
1. Go to: http://localhost:5173/#/cart
2. If logged in → Access granted ✅
3. If logged out → Redirects to /login ✅
```

---

## 📁 What Was Changed

| File | Action | Purpose |
|------|--------|---------|
| `firebase.ts` | Modified | Secured with env vars + added Firestore |
| `.env.local` | Modified | Added Firebase credentials |
| `context/AuthContext.tsx` | Enhanced | Added Firestore user storage |
| `pages/SignIn.tsx` | Created | Dedicated login page |
| `pages/SignUp.tsx` | Created | Dedicated signup page |
| `components/ProtectedRoute.tsx` | Created | Route protection |
| `App.tsx` | Modified | Updated routing + protected cart |

---

## 🔑 Key Routes

- **Home**: `/#/`
- **Login**: `/#/login`
- **Sign Up**: `/#/signup`
- **Cart** (Protected): `/#/cart`
- **Catalog**: `/#/catalog`

---

## ✅ What's Working

- ✅ Email/password sign up
- ✅ Email/password sign in
- ✅ User data stored in Firestore
- ✅ Protected routes redirect to login
- ✅ Error messages for invalid credentials
- ✅ Password validation (min 6 chars)
- ✅ Password confirmation matching
- ✅ Loading states prevent double-submission
- ✅ No social login buttons (per requirements)

---

## 🆘 Common Issues

**Can't sign up?**
→ Check Firebase Console → Authentication is enabled

**"Permission denied" error?**
→ Check Firestore is in test mode OR rules allow access

**Changes not reflecting?**
→ Restart dev server: `Ctrl+C` then `npm run dev`

---

## 📊 Validation

Run automated tests:
```bash
node src/tests/auth-validation.js
```

Expected: `18/18 tests passed ✅`

---

## 🎯 Next Features (Optional)

After workshop, consider adding:
- Forgot Password (using `sendPasswordResetEmail()`)
- Email Verification (using `sendEmailVerification()`)
- User Profile Page
- Update Profile functionality
- Password change

---

**Ready to go! 🚀**
