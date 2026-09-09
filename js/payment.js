// ========================================
// 扶九API - 套餐支付跳转配置
// ========================================

// 默认充值页：你的官网控制台充值入口（没有专属链接的套餐会跳到这里）
const TOPUP_URL = 'https://fujiuapi.com/console/topup';

// 各套餐对应的支付链接（点击「立即购买」后在新标签页打开）。
// 拿到某个套餐的专属二维码/支付链接后，把下面对应套餐的网址替换掉即可。
// 说明：链接以 /pay/qrcode/... 结尾的是支付平台生成的套餐专属收款页。
const PAYMENT_LINKS = {
  'daily':   'https://pay.xinsuanai.com/pay/qrcode/2026090918460633594/', // 日卡套餐
  'weekly':  'https://pay.xinsuanai.com/pay/qrcode/2026090918463076457/', // 半月卡套餐
  'monthly': TOPUP_URL, // 月卡套餐：拿到专属支付链接后替换这里
  'large':   TOPUP_URL, // 大额套餐：拿到专属支付链接后替换这里
  'lobster': TOPUP_URL  // 龙虾套餐：拿到专属支付链接后替换这里
};

// 打开对应套餐的支付页面
function openPayment(packageId) {
  const link = PAYMENT_LINKS[packageId] || TOPUP_URL;
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
