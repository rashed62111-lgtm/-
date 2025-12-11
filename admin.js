// معلومات تسجيل الدخول (يمكن تغييرها)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // يجب تغييرها لاحقاً
};

// التحقق من جلسة الإدمن
function checkAdminSession() {
    const isAdmin = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isAdmin) {
        showDashboard();
    }
}

// معالجة تسجيل الدخول
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        showNotification('تم تسجيل الدخول بنجاح!', false);
    } else {
        showNotification('اسم المستخدم أو كلمة المرور غير صحيحة!', true);
    }
});

// عرض لوحة التحكم
function showDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    loadSubmissions();
}

// تحميل الطلبات
function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    
    // تحديث الإحصائيات
    document.getElementById('totalSubmissions').textContent = submissions.length;
    document.getElementById('complaintsCount').textContent = 
        submissions.filter(s => s.type === 'شكوى').length;
    document.getElementById('supportCount').textContent = 
        submissions.filter(s => s.type === 'دعم فني').length;
    document.getElementById('suggestionsCount').textContent = 
        submissions.filter(s => s.type === 'نصيحة').length;
    
    // عرض الطلبات
    const container = document.getElementById('submissionsContainer');
    
    if (submissions.length === 0) {
        container.innerHTML = '<div class="empty-state">لا توجد طلبات حالياً</div>';
        return;
    }
    
    // ترتيب الطلبات من الأحدث للأقدم
    submissions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = submissions.map(submission => `
        <div class="submission-item">
            <div class="submission-header">
                <div>
                    <span class="submission-type type-${getTypeClass(submission.type)}">
                        ${submission.type}
                    </span>
                    <strong style="margin-right: 15px;">${submission.name}</strong>
                </div>
                <div>
                    <span style="color: #999; font-size: 0.9rem;">
                        ${new Date(submission.date).toLocaleString('ar-SA')}
                    </span>
                    <button class="delete-btn" onclick="deleteSubmission(${submission.id})">
                        حذف
                    </button>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <p><strong>الهاتف:</strong> ${submission.phone}</p>
                ${submission.email ? `<p><strong>البريد:</strong> ${submission.email}</p>` : ''}
                <p style="margin-top: 10px;"><strong>الرسالة:</strong></p>
                <p style="background: var(--bg-color); padding: 15px; border-radius: 8px; margin-top: 5px;">
                    ${submission.message}
                </p>
            </div>
        </div>
    `).join('');
}

// الحصول على فئة النوع
function getTypeClass(type) {
    if (type === 'شكوى') return 'complaint';
    if (type === 'دعم فني') return 'support';
    if (type === 'نصيحة') return 'suggestion';
    return '';
}

// حذف طلب
function deleteSubmission(id) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
        let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        submissions = submissions.filter(s => s.id !== id);
        localStorage.setItem('submissions', JSON.stringify(submissions));
        loadSubmissions();
        showNotification('تم حذف الطلب بنجاح', false);
    }
}

// عرض الإشعارات
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${isError ? 'error' : ''} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// تهيئة الصفحة
checkAdminSession();

