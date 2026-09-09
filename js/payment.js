// ========================================
// 扶九API - 套餐支付跳转配置
// ========================================

// 钱包页：中转站自带登录保护，未登录会自动跳登录页，已登录直接选套餐
const WALLET_URL = 'https://fujiuapi.com/wallet';

// 各套餐对应的支付链接（点击「立即购买」后在新标签页打开）。
// 有专属收款链接的套餐 → 直接跳支付页；没有的 → 跳钱包页（由系统判断登录态）。
// 拿到某个套餐的专属二维码/支付链接后，把下面对应套餐的网址替换掉即可。
const PAYMENT_LINKS = {
  'daily':   'https://pay.xinsuanai.com/pay/qrcode/2026090918460633594/', // 日卡套餐
  'weekly':  'https://pay.xinsuanai.com/pay/qrcode/2026090918463076457/', // 半月卡套餐
  'monthly': WALLET_URL, // 月卡套餐
  'large':   WALLET_URL, // 大额套餐
  'lobster': WALLET_URL  // 无忧套餐
};

// 打开对应套餐的支付页面
function openPayment(packageId) {
  const link = PAYMENT_LINKS[packageId] || WALLET_URL;
  window.open(link, '_blank', 'noopener');
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
