// ========================================
// 扶九API - 套餐支付跳转配置
// ========================================

// 钱包页：中转站自带登录保护，未登录会自动跳登录页，已登录直接选套餐
const WALLET_URL = 'https://fujiuapi.com/wallet';

// 所有套餐统一跳转钱包页（由中转站系统判断登录态，未登录自动跳登录页）
const PAYMENT_LINKS = {
  'daily':   WALLET_URL, // 3日卡套餐
  'weekly':  WALLET_URL, // 半月套餐
  'monthly': WALLET_URL, // 月卡套餐
  'large':   WALLET_URL, // 大额套餐
  'lobster': WALLET_URL  // 无忧套餐
};

// 打开对应套餐的支付页面
function openPayment(packageId) {
  const link = PAYMENT_LINKS[packageId] || WALLET_URL;
  // 页面被嵌入 iframe 时，window.open 会被浏览器当弹窗拦截导致点击无反应，
  // 此时让整个页面（顶层窗口）跳转；独立访问时正常跳转
  if (window.self !== window.top) {
    window.top.location.href = link;
    return;
  }
  window.location.href = link;
}

// 关闭支付弹窗（保留兼容）
function closePayment() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.style.display = 'none';
}

// 点击支付弹窗外部时关闭
window.addEventListener('click', function (event) {
  const modal = document.getElementById('paymentModal');
  if (modal && event.target === modal) {
    closePayment();
  }
});
