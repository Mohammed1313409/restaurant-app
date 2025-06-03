# 🍽️ Restaurant App | تطبيق المطعم

A mobile restaurant app developed using **React Native (Expo)** and **TypeScript**.  
تطبيق موبايل لعرض أصناف الطعام، تم تطويره باستخدام React Native وTypeScript عبر منصة Expo.

---

## 🚀 Features | الميزات

- 🔐 User Authentication | تسجيل الدخول وإنشاء حساب
- 📋 Food Categories | عرض الأقسام (مأكولات بحرية، سندويشات، أطباق رئيسية، مشروبات...)
- 🧾 Detailed Item View | عرض تفاصيل كل صنف (وصف - سعر - تقييم - سعرات حرارية)
- 💬 Comments & Ratings | تعليقات المستخدمين وتقييمهم لكل صنف
- 🛒 Cart with Quantity Tracking | سلة مشتريات مع حساب الكمية والمجموع
- 💳 Payment Options | الدفع كاش أو بفيزا
- 💾 AsyncStorage | حفظ البيانات محليًا

---

## 🧭 App Navigation | التنقل داخل التطبيق

- `/login.tsx` – Login Page | صفحة تسجيل الدخول
- `/signup.tsx` – Signup Page | صفحة إنشاء حساب
- `/home.tsx` – Home Page | الصفحة الرئيسية
- `/[id].tsx` – Food List by Category | عرض الأصناف حسب القسم
- `/item/[itemId].tsx` – Item Details | تفاصيل الصنف
- `/cart.tsx` – Shopping Cart | سلة الطلبات

---

## 🧠 Technologies Used | التقنيات المستخدمة

- **React Native + Expo**
- **TypeScript**
- **AsyncStorage**
- **Git & GitHub**

---

## 🛠️ How to Run | كيفية تشغيل المشروع

```bash
npm install
npx expo start
