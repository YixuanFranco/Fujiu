/**
 * 扶九API - 主脚本文件
 */

// ========================================
// 平滑滚动
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 导航栏滚动效果
// ========================================
let lastScrollY = window.scrollY;

const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;

    // 添加/移除阴影
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
};

// 使用 passive 提升滚动性能
window.addEventListener('scroll', handleScroll, { passive: true });

// ========================================
// 产品卡片悬停效果
// ========================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// 添加滚动显现动画
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .section-title');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ========================================
// 页面加载完成处理
// ========================================
window.addEventListener('load', () => {
    // 移除加载动画（如果有的话）
    document.body.classList.add('loaded');

    // 延迟显示浮动球体
    const orbs = document.querySelectorAll('.bg-orb');
    orbs.forEach((orb, index) => {
        orb.style.opacity = '0';
        setTimeout(() => {
            orb.style.transition = 'opacity 1s ease';
            orb.style.opacity = '0.5';
        }, 500 + index * 200);
    });
});

// ========================================
// 移动端菜单
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });

    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        });
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        }
    });
}

// ========================================
// 防抖工具函数
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// 企业微信二维码弹窗
// ========================================
function openWechatQR() {
    const modal = document.getElementById('wechatModal');
    if (modal) modal.style.display = 'block';
}

function closeWechatQR() {
    const modal = document.getElementById('wechatModal');
    if (modal) modal.style.display = 'none';
}

// 点击弹窗外部关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('wechatModal');
    if (modal && event.target === modal) {
        closeWechatQR();
    }
});

// 按 ESC 关闭所有弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWechatQR();
        const pm = document.getElementById('paymentModal');
        if (pm) pm.style.display = 'none';
    }
});
