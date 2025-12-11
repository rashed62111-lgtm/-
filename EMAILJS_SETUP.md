# تعليمات إعداد EmailJS لإرسال الإيميلات

## الخطوة 1: إنشاء حساب في EmailJS

1. اذهب إلى [https://www.emailjs.com/](https://www.emailjs.com/)
2. اضغط على "Sign Up" لإنشاء حساب مجاني
3. سجّل بحساب Gmail أو أي بريد إلكتروني

## الخطوة 2: إضافة Service (خدمة البريد)

1. بعد تسجيل الدخول، اذهب إلى "Email Services"
2. اضغط على "Add New Service"
3. اختر مزود البريد الذي تريد استخدامه (Gmail موصى به)
4. اتبع التعليمات لإضافة حسابك
5. **انسخ Service ID** (مثل: `service_xxxxx`)

## الخطوة 3: إنشاء Template (نموذج الإيميل)

1. اذهب إلى "Email Templates"
2. اضغط على "Create New Template"
3. استخدم Template ID الافتراضي أو أنشئ واحداً جديداً
4. في حقل "Subject" (الموضوع)، اكتب:
   ```
   {{type}} جديد من موقع محل علي عيد
   ```

5. في حقل "Content" (المحتوى)، اكتب:
   ```
   نوع الطلب: {{type}}
   الاسم: {{name}}
   البريد الإلكتروني: {{email}}
   رقم الهاتف: {{phone}}
   التاريخ: {{date}}
   
   الرسالة:
   {{message}}
   ```

6. في حقل "To Email" (البريد المستقبل)، اكتب بريدك الإلكتروني
7. احفظ Template
8. **انسخ Template ID** (مثل: `template_xxxxx`)

## الخطوة 4: الحصول على Public Key

1. اذهب إلى "Account" → "General"
2. ابحث عن "Public Key"
3. **انسخ Public Key** (مثل: `xxxxxxxxxxxxx`)

## الخطوة 5: تحديث الملفات

افتح ملف `script.js` وحدّث الأسطر التالية:

```javascript
// السطر 48: ضع Public Key هنا
emailjs.init("YOUR_PUBLIC_KEY"); // استبدل YOUR_PUBLIC_KEY بالمفتاح الذي نسخته

// السطر 88: ضع Service ID و Template ID هنا
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**مثال:**
```javascript
emailjs.init("abc123xyz456");
emailjs.send('service_gmail123', 'template_abc456', templateParams)
```

## الخطوة 6: اختبار الإعداد

1. افتح الموقع في المتصفح
2. املأ أحد النماذج وأرسلها
3. تحقق من بريدك الإلكتروني - يجب أن تصل رسالة

## ملاحظات مهمة

- ✅ الحساب المجاني في EmailJS يسمح بـ 200 إيميل شهرياً
- ✅ إذا لم تصل الإيميلات، تحقق من مجلد Spam
- ✅ حتى بدون EmailJS، الطلبات تُحفظ محلياً ويمكن رؤيتها في لوحة الإدارة
- ✅ يمكنك استخدام الموقع بدون إعداد EmailJS - كل شيء سيعمل عدا إرسال الإيميلات

## الدعم

إذا واجهت أي مشاكل:
- راجع [وثائق EmailJS](https://www.emailjs.com/docs/)
- تأكد من أن Service و Template تم إعدادهما بشكل صحيح
- تحقق من أن Public Key صحيح

