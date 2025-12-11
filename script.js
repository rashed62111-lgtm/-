// تغيير الألوان كل 3 ثواني
const colorSchemes = [
    {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c',
        text: '#2c3e50',
        bg: '#ecf0f1',
        card: '#ffffff'
    },
    {
        primary: '#9b59b6',
        secondary: '#f39c12',
        accent: '#e67e22',
        text: '#34495e',
        bg: '#f8f9fa',
        card: '#ffffff'
    },
    {
        primary: '#1abc9c',
        secondary: '#3498db',
        accent: '#e74c3c',
        text: '#2c3e50',
        bg: '#ecf0f1',
        card: '#ffffff'
    },
    {
        primary: '#e74c3c',
        secondary: '#f39c12',
        accent: '#9b59b6',
        text: '#2c3e50',
        bg: '#fff5f5',
        card: '#ffffff'
    },
    {
        primary: '#16a085',
        secondary: '#27ae60',
        accent: '#c0392b',
        text: '#2c3e50',
        bg: '#e8f8f5',
        card: '#ffffff'
    },
    {
        primary: '#2980b9',
        secondary: '#8e44ad',
        accent: '#d35400',
        text: '#2c3e50',
        bg: '#ebf5fb',
        card: '#ffffff'
    }
];

let currentColorIndex = 0;

function changeColors() {
    const scheme = colorSchemes[currentColorIndex];
    document.documentElement.style.setProperty('--primary-color', scheme.primary);
    document.documentElement.style.setProperty('--secondary-color', scheme.secondary);
    document.documentElement.style.setProperty('--accent-color', scheme.accent);
    document.documentElement.style.setProperty('--text-color', scheme.text);
    document.documentElement.style.setProperty('--bg-color', scheme.bg);
    document.documentElement.style.setProperty('--card-bg', scheme.card);
    
    currentColorIndex = (currentColorIndex + 1) % colorSchemes.length;
}

// تغيير الألوان كل 3 ثواني
setInterval(changeColors, 3000);

// تهيئة EmailJS
// ملاحظة: يجب على المستخدم إضافة Public Key الخاص به من EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // سيتم تحديثه لاحقاً

// عرض الإشعارات
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${isError ? 'error' : ''} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// معالجة نموذج الشكوى
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('complaintName').value,
        email: document.getElementById('complaintEmail').value,
        phone: document.getElementById('complaintPhone').value,
        message: document.getElementById('complaintMessage').value,
        type: 'شكوى'
    };
    
    sendEmail(formData, 'complaintForm');
});

// معالجة نموذج الدعم الفني
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('supportName').value,
        email: document.getElementById('supportEmail').value,
        phone: document.getElementById('supportPhone').value,
        message: document.getElementById('supportMessage').value,
        type: 'دعم فني'
    };
    
    sendEmail(formData, 'supportForm');
});

// معالجة نموذج النصيحة
document.getElementById('suggestionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('suggestionName').value,
        email: document.getElementById('suggestionEmail').value,
        phone: document.getElementById('suggestionPhone').value,
        message: document.getElementById('suggestionMessage').value,
        type: 'نصيحة'
    };
    
    sendEmail(formData, 'suggestionForm');
});

// إرسال الإيميل
function sendEmail(formData, formId) {
    // حفظ البيانات محلياً
    saveSubmission(formData);
    
    // إرسال عبر EmailJS
    const templateParams = {
        type: formData.type,
        name: formData.name,
        email: formData.email || 'غير محدد',
        phone: formData.phone,
        message: formData.message,
        date: new Date().toLocaleString('ar-SA')
    };
    
    // ملاحظة: يجب إضافة Service ID و Template ID من EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            showNotification('تم إرسال الرسالة بنجاح! شكراً لتواصلكم معنا.');
            document.getElementById(formId).reset();
        }, function(error) {
            // حتى لو فشل الإيميل، نحفظ البيانات محلياً
            showNotification('تم حفظ رسالتك. سنتواصل معك قريباً.', false);
            document.getElementById(formId).reset();
        });
}

// حفظ الطلبات محلياً
function saveSubmission(formData) {
    let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push({
        ...formData,
        date: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('submissions', JSON.stringify(submissions));
}

