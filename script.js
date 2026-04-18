let state = {
  incomeHistory: {},
  period: 'bulan',
  categories: [
    { id: 1, name: 'Makan', budget: 0, spent: 0, color: '#43e97b', isSaving: false, interestRate: 0, firstSavedAt: null },
    { id: 2, name: 'Transport', budget: 0, spent: 0, color: '#4facfe', isSaving: false, interestRate: 0, firstSavedAt: null },
    { id: 3, name: 'Hiburan', budget: 0, spent: 0, color: '#f093fb', isSaving: false, interestRate: 0, firstSavedAt: null },
    { id: 4, name: 'Tabungan', budget: 0, spent: 0, color: '#a78bfa', isSaving: true, interestRate: 0, firstSavedAt: null },
    { id: 5, name: 'Lainnya', budget: 0, spent: 0, color: '#ffecd2', isSaving: false, interestRate: 0, firstSavedAt: null },
  ],
  transactions: [],
  transfers: [],
  nextId: 6,
  nextTrxId: 1,
  nextTransferId: 1,
  selectedColor: '#43e97b',
  theme: 'dark',
  language: 'id',
  userProfile: { name: 'User' },
  debts: [],
  nextDebtId: 1,
};


const i18n = {
  id: {
    greeting: "Halo,",
    w_budget: "Anggaran", w_target: "Target", w_debt: "Utang", w_report: "Laporan",
    add_debt: "+ Utang Baru", profile_subtitle: "Kelola preferensi akun Anda",
    s_lang: "Bahasa / Language", s_lang_desc: "Pilih bahasa aplikasi",
    s_notif: "Notifikasi Lokal", s_notif_desc: "Pengingat utang jatuh tempo", s_notif_btn: "Aktifkan",
    s_reset: "Reset Data", s_reset_desc: "Hapus semua data dan mulai dari awal", btn_reset: "Reset",
    s_theme: "Tema", s_theme_desc: "Tampilan gelap atau terang", btn_theme: "Dark Mode",
    s_export: "Ekspor Data (CSV)", s_export_desc: "Unduh semua pengeluaran dalam file spreedsheet", btn_export: "Ekspor CSV",
    s_backup: "Backup Data", s_backup_desc: "Simpan semua data sebagai file JSON", btn_backup: "Backup",
    s_restore: "Restore Data", s_restore_desc: "Pulihkan data dari file backup JSON", btn_restore: "Pilih File",
    label_name: "Keterangan", label_amount: "Jumlah (Rp)", label_date: "Tanggal", label_payment: "Metode Pembayaran",
    label_cat: "Kategori", label_creditor: "Pemberi Pinjaman / Nama", label_due_date: "Jatuh Tempo",
    modal_debt_title: "Tambah Utang", btn_save: "Simpan",
    nav_home: "Dashboard", nav_trx: "Transaksi", nav_budget: "Budget", nav_cal: "Kalender", nav_profile: "Profil", nav_debt: "Utang", nav_report: "Laporan",
    total_income: "Total Pemasukan", spent: "Terpakai", remaining: "Sisa Budget", w_available: "Tersedia",
    label_extra: "+Tambahan:", desc_spent: "dari pemasukan",
    w_cash: "Tunai", w_digital: "Saldo Digital", w_saving: "Tabungan",
    breakdown_title: "Rincian Pengeluaran", recent_title: "Transaksi Terbaru",
    dist_title: "Distribusi", used: "terpakai", see_all: "Lihat semua →",
    btn_add_inc: "+ Pemasukan", btn_add_exp: "+ Pengeluaran", btn_transfer: "⇄ Tarik Tunai",
    modal_inc_title: "Tambah Pemasukan", modal_exp_title: "Tambah Pengeluaran",
    s_logout: "Keluar Akun", s_logout_desc: "Keluar dari sesi saat ini", btn_logout: "Logout"
  },
  en: {
    greeting: "Hello,",
    w_budget: "Budget", w_target: "Target", w_debt: "Debt", w_report: "Report",
    add_debt: "+ New Debt", profile_subtitle: "Manage your account preferences",
    s_lang: "Language", s_lang_desc: "Choose application language",
    s_notif: "Local Notifications", s_notif_desc: "Debt due date reminders", s_notif_btn: "Enable",
    s_reset: "Reset Data", s_reset_desc: "Delete all data and start over", btn_reset: "Reset",
    s_theme: "Theme", s_theme_desc: "Dark or light appearance", btn_theme: "Toggle Theme",
    s_export: "Export Data (CSV)", s_export_desc: "Download all transactions in spreadsheet format", btn_export: "Export CSV",
    s_backup: "Backup Data", s_backup_desc: "Save all data as JSON file", btn_backup: "Backup",
    s_restore: "Restore Data", s_restore_desc: "Restore data from JSON backup file", btn_restore: "Choose File",
    label_name: "Description", label_amount: "Amount (Rp)", label_date: "Date", label_payment: "Payment Method",
    label_cat: "Category", label_creditor: "Creditor Name", label_due_date: "Due Date",
    modal_debt_title: "Add Debt", btn_save: "Save",
    nav_home: "Dashboard", nav_trx: "Transactions", nav_budget: "Budget", nav_cal: "Calendar", nav_profile: "Profile", nav_debt: "Debt", nav_report: "Report",
    total_income: "Total Income", spent: "Spent", remaining: "Remaining", w_available: "Available",
    label_extra: "+Extra:", desc_spent: "of income",
    w_cash: "Cash", w_digital: "Digital Balance", w_saving: "Savings",
    breakdown_title: "Spending Breakdown", recent_title: "Recent Transactions",
    dist_title: "Distribution", used: "used", see_all: "See all →",
    btn_add_inc: "+ Income", btn_add_exp: "+ Expense", btn_transfer: "⇄ Cash Out",
    modal_inc_title: "Add Income", modal_exp_title: "Add Expense",
    s_logout: "Logout", s_logout_desc: "Sign out of the current session", btn_logout: "Logout"
  }
};

function updateLanguage(lang) {
  state.language = lang;
  document.getElementById('lang-select').value = lang;
  const dict = i18n[lang] || i18n['id'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  saveState();
}

const COLORS = ['#43e97b', '#4facfe', '#f093fb', '#a78bfa', '#ffecd2', '#f5576c', '#667eea', '#fbbf24', '#38f9d7', '#fb923c'];
const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const WEEK_LABELS = ['M1', 'M2', 'M3', 'M4', 'M5'];
const SHORT_MONTHS_MAP = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5, 'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11 };

const CAT_EMOJI = {
  'Makan': '🍔', 'Transport': '🚗', 'Hiburan': '🎮',
  'Tabungan': '💰', 'Lainnya': '📦',
};

const PAYMENT_METHODS = {
  cash: { label: 'Tunai', icon: '💵', walletType: 'cash' },
  bank_transfer: { label: 'Transfer Bank', icon: '🏦', walletType: 'digital' },
  qris: { label: 'QRIS', icon: '📱', walletType: 'digital' },
  ewallet: { label: 'E-Wallet', icon: '📲', walletType: 'digital' },
  credit_card: { label: 'Kartu Kredit', icon: '💳', walletType: 'digital' },
};

function getWalletFromPayment(paymentMethod) {
  return (PAYMENT_METHODS[paymentMethod] || PAYMENT_METHODS['cash']).walletType;
}

function getPaymentInfo(paymentMethod) {
  return PAYMENT_METHODS[paymentMethod] || { label: 'Tunai', icon: '💵', walletType: 'cash' };
}

function safeNumber(val) {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
}

function getCurrentPeriodKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');

  if (state.period === 'minggu' || state.period === '2minggu') {
    const week = Math.min(Math.ceil(d.getDate() / 7), 5);
    return `${year}-${month}-W${week}`;
  }
  if (state.period === 'tahun') {
    return `${year}`;
  }
  return `${year}-${month}`;
}

function getBaseIncome() {
  const key = getCurrentPeriodKey();
  return safeNumber(state.incomeHistory ? state.incomeHistory[key] : 0);
}

function setBaseIncome(val) {
  const key = getCurrentPeriodKey();
  if (!state.incomeHistory) state.incomeHistory = {};
  state.incomeHistory[key] = safeNumber(val);
}

function getCurrentPeriodRange() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  if (state.period === 'minggu') {
    const week = Math.min(Math.ceil(now.getDate() / 7), 5);
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(startDay + 6, new Date(y, m + 1, 0).getDate());
    return { start: new Date(y, m, startDay), end: new Date(y, m, endDay, 23, 59, 59) };
  }
  if (state.period === '2minggu') {
    const isSecondHalf = now.getDate() > 14;
    const startDay = isSecondHalf ? 15 : 1;
    const endDay = isSecondHalf ? new Date(y, m + 1, 0).getDate() : 14;
    return { start: new Date(y, m, startDay), end: new Date(y, m, endDay, 23, 59, 59) };
  }
  if (state.period === 'tahun') {
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) };
  }

  return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
}

function isInCurrentPeriod(t) {
  const date = parseTrxDate(t.date);
  if (!date) return false;
  const { start, end } = getCurrentPeriodRange();
  return date >= start && date <= end;
}

function formatRp(n) {
  const neg = n < 0;
  n = Math.abs(Math.round(n));
  const result = 'Rp ' + n.toLocaleString('id-ID');
  return neg ? '-' + result : result;
}

function todayStr() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function parseTrxDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(' ');
  if (parts.length < 3) return null;
  const day = parseInt(parts[0]);
  const monthIdx = SHORT_MONTHS_MAP[parts[1]];
  const year = parseInt(parts[2]);
  if (monthIdx === undefined || isNaN(day) || isNaN(year)) return null;
  return new Date(year, monthIdx, day);
}

function getWeekNum(dateStr) {
  const parts = dateStr.split(' ');
  const day = parseInt(parts[0]);
  return Math.min(Math.ceil(day / 7), 5) - 1;
}

function saveState() { localStorage.setItem('finlyV1', JSON.stringify(state)); }
function loadState() {
  const s = localStorage.getItem('finlyV1');
  if (s) {
    const saved = JSON.parse(s);
    state = { ...state, ...saved };
    if (!state.transfers) state.transfers = [];
    if (!state.nextTransferId) state.nextTransferId = 1;


    if (!state.incomeHistory) state.incomeHistory = {};
    if (state.income !== undefined) {
      const key = getCurrentPeriodKey();
      state.incomeHistory[key] = safeNumber(state.income);
      delete state.income;
    }

    state.transactions = state.transactions.map(t => ({
      transactionType: t.type || 'expense',
      walletType: t.paymentMethod ? (PAYMENT_METHODS[t.paymentMethod]?.walletType || 'digital') : (t.walletType || (t.type === 'income' ? 'digital' : 'cash')),
      ...t,
    }));
  }
}

function getExtraIncome() {
  return state.transactions
    .filter(t => t.type === 'income' && isInCurrentPeriod(t))
    .reduce((s, t) => s + safeNumber(t.amount), 0);
}
function getTotalIncome() { return getBaseIncome() + getExtraIncome(); }

function getTotalSpent() {
  return state.transactions.filter(t => {
    if (!isInCurrentPeriod(t)) return false;
    if (t.type !== 'expense') return false;
    const cat = state.categories.find(c => c.id === t.catId);
    return !cat?.isSaving;
  }).reduce((s, t) => s + safeNumber(t.amount), 0);
}

function getTotalSaving() {
  return state.transactions
    .filter(t => {
      if (!isInCurrentPeriod(t)) return false;
      if (t.type !== 'expense') return false;
      const cat = state.categories.find(c => c.id === t.catId);
      return cat?.isSaving;
    })
    .reduce((s, t) => s + safeNumber(t.amount), 0);
}

function calcInterest(cat) {
  if (!cat.isSaving || !cat.interestRate || cat.interestRate <= 0) return 0;
  if (!cat.firstSavedAt) return 0;
  const principal = cat.spent;
  if (principal <= 0) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((Date.now() - new Date(cat.firstSavedAt).getTime()) / msPerDay);
  if (days < 1) return 0;
  const r = cat.interestRate / 100;
  return principal * (Math.pow(1 + r / 365, days) - 1);
}

function getTotalInterest() {
  return state.categories.filter(c => c.isSaving).reduce((s, c) => s + calcInterest(c), 0);
}

function resolveWalletType(t) {
  if (t.paymentMethod) return getWalletFromPayment(t.paymentMethod);
  return t.walletType || (t.type === 'income' ? 'digital' : 'cash');
}

function isRealExpense(t) {
  if (t.type !== 'expense') return false;
  const cat = state.categories.find(c => c.id === t.catId);
  return !cat?.isSaving;
}

function getWalletBalance(type) {
  const baseIncome = type === 'digital' ? getBaseIncome() : 0;

  const trxIncome = state.transactions
    .filter(t => t.type === 'income' && resolveWalletType(t) === type)
    .reduce((s, t) => s + safeNumber(t.amount), 0);

  const trxExpense = state.transactions
    .filter(t => t.type === 'expense' && resolveWalletType(t) === type)
    .reduce((s, t) => s + safeNumber(t.amount), 0);

  const transfersOut = type === 'digital'
    ? (state.transfers || []).reduce((s, t) => s + safeNumber(t.amount), 0) : 0;
  const transfersIn = type === 'cash'
    ? (state.transfers || []).reduce((s, t) => s + safeNumber(t.amount), 0) : 0;

  return safeNumber(baseIncome + trxIncome - trxExpense - transfersOut + transfersIn);
}

function setButtonLoading(btn, loading) {
  if (loading) {
    btn.dataset.originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-spinner"></span> Menyimpan...';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || 'Simpan';
  }
}

function renderDashboard() {
  const totalIncome = getTotalIncome();
  const extra = getExtraIncome();
  const totalSpent = getTotalSpent();
  const totalSaving = getTotalSaving();
  const totalInterest = getTotalInterest();
  const savingWithInterest = totalSaving + totalInterest;

  const cashBal = getWalletBalance('cash');
  const digitalBal = getWalletBalance('digital');
  const remaining = cashBal + digitalBal;
  const usagePct = totalIncome > 0 ? Math.min((totalSpent / totalIncome) * 100, 100) : 0;
  const savingPct = totalIncome > 0 ? Math.min((totalSaving / totalIncome) * 100, 100) : 0;

  document.getElementById('extra-display').textContent = formatRp(extra);
  document.getElementById('spent-display').textContent = formatRp(totalSpent);
  const spentPctEl = document.querySelector('.spent-pct-num');
  if (spentPctEl) spentPctEl.textContent = Math.round(usagePct);

  document.getElementById('saving-display').textContent = formatRp(savingWithInterest);
  const savingPctEl = document.querySelector('.saving-pct-num');
  if (savingPctEl) savingPctEl.textContent = Math.round(savingPct);

  if (totalInterest > 0) {
    const labelEl = document.getElementById('saving-pct-label');
    if (labelEl) labelEl.innerHTML += ` · +${formatRp(totalInterest)} bunga`;
  }

  const remEl = document.getElementById('remaining-display');
  remEl.textContent = formatRp(remaining);
  remEl.style.background = remaining < 0
    ? 'linear-gradient(135deg, #f093fb, #f5576c)'
    : remaining < totalIncome * 0.2
      ? 'linear-gradient(135deg, #ffecd2, #fcb69f)'
      : 'linear-gradient(135deg, #43e97b, #38f9d7)';
  remEl.style.webkitBackgroundClip = 'text';
  remEl.style.webkitTextFillColor = 'transparent';
  remEl.style.backgroundClip = 'text';

  document.getElementById('remaining-label').textContent =
    remaining < 0 ? '⚠️ DEFISIT!' : 'Tersedia';


  const remCard = document.querySelector('.card-remaining');
  if (remCard) {
    const cardLabel = remCard.querySelector('.sum-card-label');
    if (remaining < 0) {
      remCard.style.borderColor = 'rgba(245,87,108,0.5)';
      remCard.style.boxShadow = '0 0 0 1px rgba(245,87,108,0.18), inset 0 0 28px rgba(245,87,108,0.07)';
      if (cardLabel) cardLabel.style.color = '#f5576c';
    } else {
      remCard.style.borderColor = '';
      remCard.style.boxShadow = '';
      if (cardLabel) cardLabel.style.color = '';
    }
  }

  const notif = document.getElementById('budget-notif');
  if (remaining < 0) {
    notif.innerHTML = `🚨 <strong>DEFISIT!</strong> Pengeluaran melebihi pemasukan sebesar <strong>${formatRp(Math.abs(remaining))}</strong> — segera kurangi pengeluaran!`;
    notif.className = 'budget-notif show danger';
  } else if (totalIncome > 0 && usagePct >= 80) {
    notif.innerHTML = `⚡ Sudah ${Math.round(usagePct)}% terpakai. Sisa <strong>${formatRp(remaining)}</strong>`;
    notif.className = 'budget-notif show warning';
  } else {
    notif.className = 'budget-notif';
  }

  const cashEl = document.getElementById('wallet-cash-display');
  const digitalEl = document.getElementById('wallet-digital-display');
  const savingEl = document.getElementById('wallet-saving-display');
  if (cashEl) cashEl.textContent = formatRp(cashBal);
  if (digitalEl) digitalEl.textContent = formatRp(digitalBal);
  if (savingEl) savingEl.textContent = formatRp(savingWithInterest);

  renderDonut(totalSpent);
  renderWeeklyChart();
  renderBreakdown();
  renderRecent();
  renderInsights();
}

function renderDonut(totalSpent) {
  const canvas = document.getElementById('donut-chart');
  const ctx = canvas.getContext('2d');
  const cx = 80, cy = 80, r = 65, innerR = 48;
  const cats = state.categories.filter(c => c.spent > 0);
  const pct = getTotalIncome() > 0 ? Math.round((totalSpent / getTotalIncome()) * 100) : 0;

  ctx.clearRect(0, 0, 160, 160);
  if (!cats.length) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg4').trim() || '#22222e';
    ctx.fill();
  } else {
    let angle = -Math.PI / 2;
    cats.forEach(cat => {
      const slice = (cat.spent / totalSpent) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.arc(cx, cy, r, angle, angle + slice);
      ctx.arc(cx, cy, innerR, angle + slice, angle, true);
      ctx.closePath();
      ctx.fillStyle = cat.color;
      ctx.fill();
      angle += slice;
    });
  }

  document.getElementById('donut-pct').textContent = pct + '%';

  const legend = document.getElementById('donut-legend');
  legend.innerHTML = '';
  state.categories.forEach(cat => {
    const el = document.createElement('div');
    el.className = 'legend-item';
    el.innerHTML = `<div class="legend-dot" style="background:${cat.color}"></div>${cat.name}`;
    legend.appendChild(el);
  });
}

function renderWeeklyChart() {
  const container = document.getElementById('weekly-chart');
  container.innerHTML = '';

  let dataPoints = [];
  let xLabels = [];

  if (currentTimeFilter === 'daily') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      const dayTrxs = state.transactions.filter(t => t.date === dateStr);
      dataPoints.push({
        income: dayTrxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        expense: dayTrxs.filter(t => isRealExpense(t)).reduce((s, t) => s + t.amount, 0),
      });
      xLabels.push(d.toLocaleDateString('id-ID', { weekday: 'short' }));
    }
  } else if (currentTimeFilter === 'monthly') {
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const tgtMonth = d.getMonth();
      const tgtYear = d.getFullYear();
      const monthTrxs = state.transactions.filter(t => {
        const p = parseTrxDate(t.date);
        return p && p.getMonth() === tgtMonth && p.getFullYear() === tgtYear;
      });
      dataPoints.push({
        income: monthTrxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        expense: monthTrxs.filter(t => isRealExpense(t)).reduce((s, t) => s + t.amount, 0),
      });
      xLabels.push(MONTHS_ID[tgtMonth].substring(0, 3));
    }
  } else {
    const weeks = Array(5).fill(null).map(() => ({ income: 0, expense: 0 }));
    state.transactions.filter(t => isInCurrentPeriod(t)).forEach(t => {
      const w = getWeekNum(t.date);
      if (w >= 0 && w < 5) {
        if (t.type === 'income') weeks[w].income += t.amount;
        if (isRealExpense(t)) weeks[w].expense += t.amount;
      }
    });
    dataPoints = weeks;
    xLabels = WEEK_LABELS;
  }

  const maxVal = Math.max(...dataPoints.map(d => Math.max(d.income, d.expense)), 1);
  const W = 500, H = 160, padX = 20, padY = 16;

  function toX(i) { return padX + (i / (dataPoints.length - 1)) * (W - padX * 2); }
  function toY(val) { return padY + (1 - val / maxVal) * (H - padY * 2); }

  function makeCurvePath(values) {
    return values.map((v, i) => {
      const x = toX(i), y = toY(v);
      if (i === 0) return `M ${x} ${y}`;
      const px = toX(i - 1), py = toY(values[i - 1]);
      const cpx = (px + x) / 2;
      return `C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`;
    }).join(' ');
  }

  function makeAreaPath(values) {
    return `${makeCurvePath(values)} L ${toX(dataPoints.length - 1)} ${H} L ${toX(0)} ${H} Z`;
  }

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.style.cssText = 'width:100%;height:auto;display:block;';

  const defs = document.createElementNS(ns, 'defs');
  [['income', '#43e97b'], ['expense', '#f5576c']].forEach(([type, color]) => {
    const grad = document.createElementNS(ns, 'linearGradient');
    grad.setAttribute('id', `wcg-${type}`);
    grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0'); grad.setAttribute('y2', '1');
    [['0%', '0.18'], ['100%', '0']].forEach(([offset, opacity]) => {
      const s = document.createElementNS(ns, 'stop');
      s.setAttribute('offset', offset);
      s.setAttribute('stop-color', color);
      s.setAttribute('stop-opacity', opacity);
      grad.appendChild(s);
    });
    defs.appendChild(grad);
  });
  svg.appendChild(defs);

  [0, 0.5, 1].forEach(pct => {
    const y = padY + (1 - pct) * (H - padY * 2);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', padX); line.setAttribute('x2', W - padX);
    line.setAttribute('y1', y); line.setAttribute('y2', y);
    line.setAttribute('stroke', 'rgba(255,255,255,0.05)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  });

  const series = [
    { vals: dataPoints.map(d => d.income), color: '#43e97b', type: 'income', label: 'Pemasukan' },
    { vals: dataPoints.map(d => d.expense), color: '#f5576c', type: 'expense', label: 'Pengeluaran' },
  ];

  series.forEach(({ vals, color, type, label }) => {
    if (vals.every(v => v === 0)) return;

    const area = document.createElementNS(ns, 'path');
    area.setAttribute('d', makeAreaPath(vals));
    area.setAttribute('fill', `url(#wcg-${type})`);
    svg.appendChild(area);

    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', makeCurvePath(vals));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.style.strokeDasharray = '1200';
    path.style.strokeDashoffset = '1200';
    path.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)';
    svg.appendChild(path);
    requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });

    vals.forEach((v, i) => {
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', toX(i));
      circle.setAttribute('cy', toY(v));
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', color);
      circle.setAttribute('stroke', '#13131a');
      circle.setAttribute('stroke-width', '2.5');
      circle.style.opacity = '0';
      circle.style.transition = `opacity 0.3s ease ${0.5 + i * 0.07}s`;
      const title = document.createElementNS(ns, 'title');
      title.textContent = `${label} ${xLabels[i]}: ${formatRp(v)}`;
      circle.appendChild(title);
      svg.appendChild(circle);
      requestAnimationFrame(() => { circle.style.opacity = '1'; });
    });
  });

  container.appendChild(svg);

  const labelRow = document.createElement('div');
  labelRow.className = 'line-chart-labels';
  xLabels.forEach(lbl => {
    const span = document.createElement('span');
    span.className = 'week-label';
    span.textContent = lbl;
    labelRow.appendChild(span);
  });
  container.appendChild(labelRow);

  const legend = document.createElement('div');
  legend.className = 'line-chart-legend';
  [['#43e97b', 'Pemasukan'], ['#f5576c', 'Pengeluaran']].forEach(([color, label]) => {
    const item = document.createElement('div');
    item.className = 'line-chart-legend-item';
    item.innerHTML = `<span class="line-chart-legend-line" style="background:${color}"></span>${label}`;
    legend.appendChild(item);
  });
  container.appendChild(legend);
}



function renderBreakdown() {
  const list = document.getElementById('breakdown-list');
  list.innerHTML = '';
  const totalSpent = getTotalSpent();

  state.categories.forEach(cat => {
    const catSpent = state.transactions
      .filter(t => t.catId === cat.id && isInCurrentPeriod(t) && t.type === 'expense')
      .reduce((s, t) => s + safeNumber(t.amount), 0);

    if (catSpent === 0 && cat.budget === 0) return;

    const pct = cat.budget > 0 ? Math.min((catSpent / cat.budget) * 100, 100) : 0;
    const ofTotal = totalSpent > 0 ? Math.round((catSpent / totalSpent) * 100) : 0;
    const el = document.createElement('div');
    el.className = 'breakdown-item';
    el.innerHTML = `
      <div class="breakdown-top">
        <div class="breakdown-name">
          <div class="breakdown-dot" style="background:${cat.color}"></div>
          ${cat.name}
        </div>
        <div class="breakdown-right">
          <div class="breakdown-amt">${formatRp(catSpent)} <span style="color:var(--text2);font-size:10px">(${ofTotal}%)</span></div>
          <div class="breakdown-pct-label">${i18n[state.language]?.desc_spent || 'dari'} ${formatRp(cat.budget)}</div>
        </div>
      </div>
      <div class="breakdown-track">
        <div class="breakdown-fill" style="width:${pct}%;background:${cat.color}"></div>
      </div>`;
    list.appendChild(el);
  });

  if (!state.categories.some(c => c.spent > 0 || c.budget > 0)) {
    list.innerHTML = `
      <div class="empty-state-full">
        <div class="empty-icon">📊</div>
        <p class="empty-title">Belum ada data kategori</p>
        <p class="empty-sub">Set alokasi budget di halaman Budget</p>
      </div>`;
  }
}

function renderRecent() {
  const list = document.getElementById('recent-list');
  const trxs = [...state.transactions].reverse().slice(0, 5);
  list.innerHTML = '';

  if (!trxs.length) {
    list.innerHTML = `
      <div class="empty-state-full">
        <div class="empty-icon">📝</div>
        <p class="empty-title">Belum ada transaksi</p>
        <p class="empty-sub">Transaksi terbaru akan muncul di sini</p>
      </div>`;
    return;
  }

  trxs.forEach(trx => {
    const cat = state.categories.find(c => c.id === trx.catId);
    const isInc = trx.type === 'income';
    const pmInfo = getPaymentInfo(trx.paymentMethod || 'cash');
    const emoji = isInc ? '💵' : (CAT_EMOJI[cat?.name] || '📦');
    const bgColor = isInc
      ? 'linear-gradient(135deg, rgba(67,233,123,0.2), rgba(56,249,215,0.2))'
      : `${cat?.color || '#888'}22`;
    const catLabel = isInc ? 'Pemasukan' : (cat?.name || 'Lainnya');
    const pmLabel = `${pmInfo.icon} ${pmInfo.label}`;

    const el = document.createElement('div');
    el.className = 'recent-item';
    el.innerHTML = `
      <div class="recent-left">
        <div class="recent-icon" style="background:${bgColor}">${emoji}</div>
        <div>
          <p class="recent-name">${trx.name} <span class="trx-pm-badge">${pmLabel}</span></p>
          <p class="recent-cat">${catLabel} · ${trx.date}</p>
        </div>
      </div>
      <span class="recent-amount" style="color:${isInc ? 'var(--income)' : 'var(--expense)'}">
        ${isInc ? '+' : '-'} ${formatRp(trx.amount)}
      </span>`;
    list.appendChild(el);
  });
}

let currentFilter = 'all';
let currentSearchQuery = '';
let currentCatFilter = 'all';
let currentTimeFilter = 'weekly';

function renderTransactions() {
  const list = document.getElementById('trx-list');

  const transferItems = (state.transfers || []).map(tr => ({
    id: 'tr_' + tr.id,
    name: tr.note || 'Tarik Tunai',
    amount: tr.amount,
    type: 'transfer',
    catId: null,
    date: tr.date,
    paymentMethod: null,
  }));

  let trxs = [...state.transactions, ...transferItems].reverse();


  if (currentFilter !== 'all') trxs = trxs.filter(t => t.type === currentFilter);
  if (currentSearchQuery) trxs = trxs.filter(t => t.name.toLowerCase().includes(currentSearchQuery));
  if (currentCatFilter !== 'all') trxs = trxs.filter(t => t.catId === parseInt(currentCatFilter));

  if (!trxs.length) {
    const isFiltered = currentSearchQuery || currentCatFilter !== 'all';
    list.innerHTML = `
      <div class="empty-state-full">
        <div class="empty-icon">💸</div>
        <p class="empty-title">${isFiltered ? 'Tidak ada hasil' : 'Belum ada transaksi'}</p>
        <p class="empty-sub">${isFiltered ? 'Coba ubah pencarian atau filter' : 'Mulai catat pemasukan atau pengeluaranmu'}</p>
        ${!isFiltered ? '<button class="empty-cta" id="empty-add-btn">+ Tambah Transaksi</button>' : ''}
      </div>`;
    document.getElementById('empty-add-btn')?.addEventListener('click', () => {
      refreshCatSelect();
      openModal(modalExpense);
    });
    return;
  }

  const groups = {};
  trxs.forEach(t => {
    if (!groups[t.date]) groups[t.date] = [];
    groups[t.date].push(t);
  });

  list.innerHTML = '';
  Object.entries(groups).forEach(([date, items]) => {
    const totalIn = items.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalOut = items.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const grpHeader = document.createElement('div');
    grpHeader.className = 'trx-group-date';
    grpHeader.innerHTML = `
      <span>${date}</span>
      <div style="display:flex;gap:0.75rem">
        ${totalIn > 0 ? `<span style="color:var(--income);font-size:11px">+ ${formatRp(totalIn)}</span>` : ''}
        ${totalOut > 0 ? `<span style="color:var(--expense);font-size:11px">- ${formatRp(totalOut)}</span>` : ''}
      </div>`;
    list.appendChild(grpHeader);

    items.forEach(trx => {
      const isTransfer = trx.type === 'transfer';
      const cat = state.categories.find(c => c.id === trx.catId);
      const isInc = trx.type === 'income';
      const emoji = isTransfer ? '🔄'
        : isInc ? '💵'
          : (CAT_EMOJI[cat?.name] || '📦');
      const bgColor = isTransfer
        ? 'linear-gradient(135deg, rgba(251,191,36,0.18), rgba(245,87,108,0.12))'
        : isInc
          ? 'linear-gradient(135deg, rgba(67,233,123,0.2), rgba(56,249,215,0.2))'
          : `${cat?.color || '#888'}22`;

      const pmInfo = (!isTransfer) ? getPaymentInfo(trx.paymentMethod || 'cash') : null;
      const pmLabel = pmInfo ? `${pmInfo.icon} ${pmInfo.label}` : '';
      const metaLabel = isTransfer ? 'Transfer Internal · Digital → Tunai'
        : isInc ? 'Pemasukan Tambahan'
          : (cat?.name || 'Lainnya');
      const amountColor = isTransfer ? 'var(--text2)'
        : isInc ? 'var(--income)' : 'var(--expense)';
      const amountPrefix = isTransfer ? '⇄' : (isInc ? '+' : '-');

      const el = document.createElement('div');
      el.className = 'trx-item' + (isTransfer ? ' trx-transfer' : '');
      el.innerHTML = `
        <div class="trx-left">
          <div class="trx-icon" style="background:${bgColor}">${emoji}</div>
          <div>
            <p class="trx-name">${trx.name}${pmLabel ? ` <span class="trx-pm-badge">${pmLabel}</span>` : ''}</p>
            <p class="trx-meta">${metaLabel}</p>
          </div>
        </div>
        <div class="trx-right">
          <span class="trx-amount" style="color:${amountColor}">
            ${amountPrefix} ${formatRp(trx.amount)}
          </span>
          ${isTransfer
          ? `<button class="trx-delete" data-transfer-id="${trx.id.replace('tr_', '')}">×</button>`
          : `<button class="trx-delete" data-id="${trx.id}">×</button>`}
        </div>`;
      list.appendChild(el);
    });
  });

  list.querySelectorAll('.trx-delete').forEach(btn => {
    btn.addEventListener('click', e => {

      if (e.target.dataset.transferId !== undefined) {
        const tid = parseInt(e.target.dataset.transferId);
        const tr = (state.transfers || []).find(t => t.id === tid);
        showConfirm(`Hapus transfer "${tr?.note || 'Tarik Tunai'}"?`, () => {
          state.transfers = state.transfers.filter(t => t.id !== tid);
          renderTransactions(); renderDashboard(); saveState();
        });
        return;
      }

      const id = parseInt(e.target.dataset.id);
      const trx = state.transactions.find(t => t.id === id);
      showConfirm(`Hapus "${trx?.name}"?`, () => {
        if (trx?.type === 'expense') {
          const cat = state.categories.find(c => c.id === trx.catId);
          if (cat) {
            cat.spent = Math.max(0, cat.spent - trx.amount);
            if (cat.isSaving) {
              const remaining = state.transactions.filter(t => t.id !== id && t.catId === cat.id && t.type === 'expense');
              if (!remaining.length) cat.firstSavedAt = null;
            }
          }
        }
        state.transactions = state.transactions.filter(t => t.id !== id);
        renderTransactions(); renderDashboard(); renderBudget(); saveState();
      });
    });
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTransactions();
  });
});

function renderBudget() {
  const list = document.getElementById('budget-list');
  const focusedId = document.activeElement?.dataset?.id;
  const focusedField = document.activeElement?.dataset?.field;

  list.innerHTML = '';
  state.categories.forEach(cat => {
    const isSaving = cat.isSaving;
    const displaySpent = state.transactions
      .filter(t => t.type === 'expense' && t.catId === cat.id && isInCurrentPeriod(t))
      .reduce((s, t) => s + safeNumber(t.amount), 0);
    const interest = calcInterest(cat);
    const totalWithInterest = cat.spent + interest;
    const pct = cat.budget > 0 ? Math.min(((isSaving ? cat.spent : displaySpent) / cat.budget) * 100, 100) : 0;
    const el = document.createElement('div');
    el.className = 'budget-item' + (isSaving ? ' budget-item-saving' : '');
    el.style.setProperty('--cat-color', cat.color);

    const savingBadge = isSaving ? `<span class="saving-badge">💰 Tabungan</span>` : '';

    const interestBlock = isSaving ? `
      <div class="saving-interest-row">
        <div class="saving-interest-info">
          <span class="saving-interest-label">Bunga/tahun</span>
          <input class="budget-input saving-interest-input" type="number" step="0.01" min="0" max="100"
            data-id="${cat.id}" data-field="interest"
            value="${cat.interestRate || ''}" placeholder="0" />
          <span class="saving-interest-unit">%</span>
        </div>
        ${interest > 0 ? `
        <div class="saving-interest-earned">
          <span class="saving-interest-earned-label">Bunga terkumpul</span>
          <span class="saving-interest-earned-val" style="color:${cat.color}">+${formatRp(interest)}</span>
        </div>` : ''}
      </div>` : '';

    const spentLabel = isSaving ? 'ditabung' : 'terpakai';
    const allocLabel = isSaving ? 'target tabungan' : 'alokasi';
    const displayAmt = isSaving ? formatRp(totalWithInterest) : formatRp(displaySpent);

    el.innerHTML = `
      <div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:${cat.color};border-radius:3px 0 0 3px"></div>
      <div class="budget-top">
        <div class="budget-info">
          <div class="budget-dot" style="background:${cat.color}"></div>
          <span class="budget-name">${cat.name}</span>
          ${savingBadge}
        </div>
        <div class="budget-right">
          <div class="budget-amounts">
            <p class="budget-spent">${displayAmt} ${spentLabel}</p>
            <p class="budget-alloc">dari ${formatRp(cat.budget)} ${allocLabel}</p>
          </div>
          <button class="budget-delete" data-id="${cat.id}">×</button>
        </div>
      </div>
      <div class="budget-bar-track">
        <div class="budget-bar-fill" style="width:${pct}%;background:${cat.color}"></div>
      </div>
      <div class="budget-input-row">
        <span class="budget-input-label">${isSaving ? 'Target' : 'Alokasi'} Rp</span>
        <input class="budget-input" type="number" data-id="${cat.id}" data-field="budget"
          value="${cat.budget || ''}" placeholder="0" min="0" />
        ${isSaving ? `
        <label class="saving-toggle-wrap" title="Tandai sebagai tabungan">
          <input type="checkbox" class="saving-toggle" data-id="${cat.id}" ${cat.isSaving ? 'checked' : ''} />
          <span class="saving-toggle-label">Tabungan</span>
        </label>` : `
        <label class="saving-toggle-wrap" title="Tandai sebagai tabungan">
          <input type="checkbox" class="saving-toggle" data-id="${cat.id}" ${cat.isSaving ? 'checked' : ''} />
          <span class="saving-toggle-label">Tabungan</span>
        </label>`}
      </div>
      ${interestBlock}`;
    list.appendChild(el);
  });

  if (focusedId && focusedField) {
    const el = list.querySelector(`[data-id="${focusedId}"][data-field="${focusedField}"]`);
    if (el) el.focus();
  }

  list.querySelectorAll('.budget-input[data-field="budget"]').forEach(input => {
    input.addEventListener('change', e => {
      const cat = state.categories.find(c => c.id === parseInt(e.target.dataset.id));
      if (cat) { cat.budget = parseFloat(e.target.value) || 0; renderBudget(); renderDashboard(); saveState(); }
    });
  });

  list.querySelectorAll('.interest-input').forEach(input => {
    input.addEventListener('change', e => {
      const cat = state.categories.find(c => c.id === parseInt(e.target.dataset.id));
      if (cat) { cat.interestRate = parseFloat(e.target.value) || 0; renderDashboard(); saveState(); }
    });
  });

  list.querySelectorAll('.saving-interest-input').forEach(input => {
    input.addEventListener('change', e => {
      const cat = state.categories.find(c => c.id === parseInt(e.target.dataset.id));
      if (cat) { cat.interestRate = parseFloat(e.target.value) || 0; renderBudget(); renderDashboard(); saveState(); }
    });
  });

  list.querySelectorAll('.saving-toggle').forEach(chk => {
    chk.addEventListener('change', e => {
      const cat = state.categories.find(c => c.id === parseInt(e.target.dataset.id));
      if (cat) {
        cat.isSaving = e.target.checked;
        if (!cat.isSaving) { cat.interestRate = 0; cat.firstSavedAt = null; }
        renderBudget(); renderDashboard(); saveState();
      }
    });
  });

  list.querySelectorAll('.budget-delete').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const cat = state.categories.find(c => c.id === id);
      showConfirm(`Hapus kategori "${cat?.name}"?`, () => {
        state.categories = state.categories.filter(c => c.id !== id);
        renderBudget(); renderDashboard(); saveState();
      });
    });
  });
}

let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();
const tooltip = document.getElementById('cal-tooltip');

function renderCalendar() {
  document.getElementById('cal-month-label').textContent = MONTHS_ID[calMonth] + ' ' + calYear;
  const grid = document.getElementById('cal-grid');
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  grid.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement('div');
    e.className = 'cal-day empty';
    grid.appendChild(e);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = new Date(calYear, calMonth, d)
      .toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const dayTrxs = state.transactions.filter(t => t.date === dateStr);
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

    const cell = document.createElement('div');
    cell.className = 'cal-day' + (isToday ? ' today' : '');

    const num = document.createElement('div');
    num.className = 'cal-day-num';
    num.textContent = d;
    cell.appendChild(num);

    if (dayTrxs.length > 0) {
      const dots = document.createElement('div');
      dots.className = 'cal-dot-wrap';
      dayTrxs.slice(0, 3).forEach(t => {
        const cat = state.categories.find(c => c.id === t.catId);
        const dot = document.createElement('div');
        dot.className = 'cal-dot';
        dot.style.background = t.type === 'income' ? 'var(--income)' : (cat?.color || '#888');
        dots.appendChild(dot);
      });
      cell.appendChild(dots);
    }

    cell.addEventListener('mousemove', e => {
      const rect = cell.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      cell.style.transform = `perspective(300px) rotateX(${((y - cy) / cy) * -8}deg) rotateY(${((x - cx) / cx) * 8}deg) translateY(-3px) scale(1.06)`;

      if (dayTrxs.length > 0) {
        const inc = dayTrxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const exp = dayTrxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        tooltip.innerHTML = `
          <div style="font-size:10px;color:var(--text2);margin-bottom:4px">${dateStr}</div>
          ${inc > 0 ? `<div class="tooltip-row"><span>Pemasukan</span><span class="tooltip-in">+ ${formatRp(inc)}</span></div>` : ''}
          ${exp > 0 ? `<div class="tooltip-row"><span>Pengeluaran</span><span class="tooltip-out">- ${formatRp(exp)}</span></div>` : ''}`;
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 50) + 'px';
        tooltip.classList.add('show');
      }
    });

    cell.addEventListener('mouseleave', () => {
      cell.style.transform = '';
      tooltip.classList.remove('show');
    });

    cell.addEventListener('click', () => {
      document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      showCalDetail(dateStr, dayTrxs);
    });

    grid.appendChild(cell);
  }
}

function showCalDetail(dateStr, trxs) {
  const detail = document.getElementById('cal-detail');
  if (!trxs.length) {
    detail.innerHTML = `<p class="cal-detail-date">${dateStr}</p><p class="cal-detail-empty">Tidak ada transaksi hari ini</p>`;
    return;
  }
  const inc = trxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const exp = trxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  detail.innerHTML = `
    <p class="cal-detail-date">${dateStr}</p>
    <div class="cal-detail-totals">
      ${inc > 0 ? `<span style="color:var(--income)">+ ${formatRp(inc)}</span>` : ''}
      ${exp > 0 ? `<span style="color:var(--expense)">- ${formatRp(exp)}</span>` : ''}
    </div>`;

  trxs.forEach(trx => {
    const cat = state.categories.find(c => c.id === trx.catId);
    const isInc = trx.type === 'income';
    const el = document.createElement('div');
    el.className = 'trx-item';
    el.style.marginBottom = '0.5rem';
    el.innerHTML = `
      <div class="trx-left">
        <div class="trx-icon" style="background:${isInc ? 'rgba(67,233,123,0.2)' : `${cat?.color || '#888'}22`}">${isInc ? '💵' : (CAT_EMOJI[cat?.name] || '📦')}</div>
        <div>
          <p class="trx-name">${trx.name}</p>
          <p class="trx-meta">${isInc ? 'Pemasukan' : (cat?.name || 'Lainnya')}</p>
        </div>
      </div>
      <span class="trx-amount" style="color:${isInc ? 'var(--income)' : 'var(--expense)'}">
        ${isInc ? '+' : '-'} ${formatRp(trx.amount)}
      </span>`;
    detail.appendChild(el);
  });
}

document.getElementById('cal-prev').addEventListener('click', () => { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
document.getElementById('cal-next').addEventListener('click', () => { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });

const PAGE_TITLES = { dashboard: 'Dashboard', transactions: 'Transaksi', budget: 'Budget', calendar: 'Kalender', settings: 'Pengaturan', debt: 'Utang', report: 'Laporan' };
const PAGE_ALIASES = {};

function navigateTo(page) {
  const ALIAS_MAP = { 'debt': 'utang', 'report': 'laporan', 'settings': 'settings' };
  page = ALIAS_MAP[page] || page || 'dashboard';
  const targetPage = document.getElementById('page-' + page);
  if (!targetPage) return;
  if (page === 'utang') { setTimeout(() => { renderDebtList(); processDebts(); refreshWidgets(); }, 50); }
  if (page === 'laporan') { setTimeout(() => { refreshWidgets(); }, 50); }
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  document.querySelector(`.mobile-nav-item[data-page="${page}"]`)?.classList.add('active');
  targetPage.classList.add('active');

  const dict = i18n[state.language] || i18n['id'];
  const navKey = `nav_${page === 'dashboard' ? 'home' : (page === 'utang' ? 'debt' : (page === 'laporan' ? 'report' : page.substring(0, 3)))}`;
  document.getElementById('topbar-title').textContent = dict[navKey] || PAGE_TITLES[page] || page;

  if (page === 'transactions') renderTransactions();
  if (page === 'budget') renderBudget();
  if (page === 'calendar') renderCalendar();
  if (page === 'debt') { renderDebtList(); processDebts(); }
  if (page === 'report') refreshWidgets();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

document.querySelectorAll('.mobile-nav-item[data-page]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

function openMobileChoice() {
  const overlay = document.getElementById('mobile-choice-overlay');
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => overlay.classList.add('visible'));
}
function closeMobileChoice() {
  const overlay = document.getElementById('mobile-choice-overlay');
  overlay.classList.remove('visible');
  setTimeout(() => overlay.classList.add('hidden'), 200);
}

document.getElementById('mobile-add-btn').addEventListener('click', e => {
  e.preventDefault();
  openMobileChoice();
});

document.getElementById('choice-income').addEventListener('click', () => {
  closeMobileChoice();
  document.getElementById('inc-name').value = '';
  document.getElementById('inc-amount').value = '';
  document.getElementById('inc-payment').value = 'cash';
  openModal(modalIncome);
});

document.getElementById('choice-expense').addEventListener('click', () => {
  closeMobileChoice();
  document.getElementById('exp-name').value = '';
  document.getElementById('exp-amount').value = '';
  document.getElementById('exp-payment').value = 'cash';
  refreshCatSelect();
  openModal(modalExpense);
});

document.getElementById('choice-transfer').addEventListener('click', () => {
  closeMobileChoice();
  document.getElementById('transfer-amount').value = '';
  document.getElementById('transfer-note').value = '';
  openModal(modalTransfer);
});

document.getElementById('choice-cancel').addEventListener('click', () => closeMobileChoice());

document.getElementById('mobile-choice-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('mobile-choice-overlay')) closeMobileChoice();
});

document.getElementById('mobile-settings-btn').addEventListener('click', () => {
  navigateTo('settings');
});

document.querySelectorAll('.see-all').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

document.getElementById('income-input').addEventListener('input', e => {
  setBaseIncome(e.target.value);
  renderDashboard(); saveState();
});

document.getElementById('income-input').addEventListener('blur', e => {
  const currentInc = getBaseIncome();
  if (currentInc > 0) e.target.value = currentInc.toLocaleString('id-ID');
});

document.getElementById('income-input').addEventListener('focus', e => {
  const currentInc = getBaseIncome();
  e.target.value = currentInc || '';
});

document.getElementById('income-period').addEventListener('change', e => {
  state.period = e.target.value;
  const currentInc = getBaseIncome();
  document.getElementById('income-input').value = currentInc > 0 ? currentInc.toLocaleString('id-ID') : '';
  renderDashboard(); saveState();
});

function applyTheme(theme) {
  if (!theme || (theme !== 'dark' && theme !== 'light')) theme = 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  const themeLabel = document.getElementById('theme-label');
  if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  const b2 = document.getElementById('theme-toggle-2');
  if (b2) b2.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    if (theme === 'light') {
      toggleBtn.classList.add('is-light');
    } else {
      toggleBtn.classList.remove('is-light');
    }
  }

  state.theme = theme;
}

const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    saveState();
  });
}

const themeToggle2Btn = document.getElementById('theme-toggle-2');
if (themeToggle2Btn) {
  themeToggle2Btn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    saveState();
  });
}

function openModal(m) { m.classList.remove('hidden'); requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add('visible'))); }
function closeModal(m) { m.classList.remove('visible'); setTimeout(() => m.classList.add('hidden'), 300); }

const colorOpts = document.getElementById('color-options');
COLORS.forEach(color => {
  const btn = document.createElement('div');
  btn.className = 'color-opt' + (color === state.selectedColor ? ' selected' : '');
  btn.style.background = color;
  btn.dataset.color = color;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.selectedColor = color;
  });
  colorOpts.appendChild(btn);
});

const modalIncome = document.getElementById('modal-income');
document.getElementById('add-income-btn').addEventListener('click', () => {
  document.getElementById('inc-name').value = '';
  document.getElementById('inc-amount').value = '';
  openModal(modalIncome);
});
document.getElementById('modal-income-close').addEventListener('click', () => closeModal(modalIncome));
modalIncome.addEventListener('click', e => { if (e.target === modalIncome) closeModal(modalIncome); });
function showError(inputId, errId) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);
  const modalBox = inp.closest('.modal-box');
  if (!inp || !err || !modalBox) return;
  inp.classList.add('error');
  err.classList.remove('hidden');
  modalBox.classList.remove('shake');
  void modalBox.offsetWidth;
  modalBox.classList.add('shake');
  inp.addEventListener('input', function clearErr() {
    inp.classList.remove('error');
    err.classList.add('hidden');
    inp.removeEventListener('input', clearErr);
  });
}

document.getElementById('modal-income-save').addEventListener('click', () => {
  const name = document.getElementById('inc-name').value.trim();
  const amount = parseFloat(document.getElementById('inc-amount').value) || 0;
  const paymentMethod = document.getElementById('inc-payment').value || 'cash';
  const walletType = getWalletFromPayment(paymentMethod);

  let valid = true;
  if (!name) { showError('inc-name', 'err-inc-name'); valid = false; }
  if (amount <= 0) { showError('inc-amount', 'err-inc-amount'); valid = false; }
  if (!valid) return;
  const btn = document.getElementById('modal-income-save');
  setButtonLoading(btn, true);
  setTimeout(() => {
    const newId = state.nextTrxId;
    state.transactions.push({ id: state.nextTrxId++, name, amount, catId: null, type: 'income', date: (document.getElementById('inc-date').value ? parseCustomDate(document.getElementById('inc-date').value) : todayStr()), paymentMethod, walletType });
    setButtonLoading(btn, false);
    closeModal(modalIncome); renderDashboard(); renderTransactions(); highlightNewTrx(newId); saveState();
  }, 400);
});

const modalExpense = document.getElementById('modal-expense');
function refreshCatSelect() {
  const sel = document.getElementById('exp-category');
  sel.innerHTML = '';
  state.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id; opt.textContent = cat.name;
    sel.appendChild(opt);
  });
}
document.getElementById('add-expense-btn').addEventListener('click', () => {
  document.getElementById('exp-name').value = '';
  document.getElementById('exp-amount').value = '';
  refreshCatSelect();
  openModal(modalExpense);
});
document.getElementById('modal-expense-close').addEventListener('click', () => closeModal(modalExpense));
modalExpense.addEventListener('click', e => { if (e.target === modalExpense) closeModal(modalExpense); });
document.getElementById('modal-expense-save').addEventListener('click', () => {
  const name = document.getElementById('exp-name').value.trim();
  const amount = parseFloat(document.getElementById('exp-amount').value) || 0;
  const catId = parseInt(document.getElementById('exp-category').value);
  const expPayment = document.getElementById('exp-payment').value || 'cash';
  const walletType = getWalletFromPayment(expPayment);

  let valid = true;
  if (!name) { showError('exp-name', 'err-exp-name'); valid = false; }
  if (amount <= 0) { showError('exp-amount', 'err-exp-amount'); valid = false; }
  if (!valid) return;
  const btn = document.getElementById('modal-expense-save');
  setButtonLoading(btn, true);
  setTimeout(() => {
    const cat = state.categories.find(c => c.id === catId);
    if (cat) {
      cat.spent += amount;
      if (cat.isSaving && !cat.firstSavedAt) {
        cat.firstSavedAt = Date.now();
      }
    }
    const newId = state.nextTrxId;
    state.transactions.push({ id: state.nextTrxId++, name, amount, catId, type: 'expense', date: (document.getElementById('exp-date').value ? parseCustomDate(document.getElementById('exp-date').value) : todayStr()), paymentMethod: expPayment, walletType });
    setButtonLoading(btn, false);
    closeModal(modalExpense); renderDashboard(); renderTransactions(); highlightNewTrx(newId); saveState();
  }, 400);
});

const modalTransfer = document.getElementById('modal-transfer');
document.getElementById('modal-transfer-close').addEventListener('click', () => closeModal(modalTransfer));
modalTransfer.addEventListener('click', e => { if (e.target === modalTransfer) closeModal(modalTransfer); });

document.getElementById('modal-transfer-save').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('transfer-amount').value) || 0;
  const note = document.getElementById('transfer-note').value.trim() || 'Tarik Tunai';
  if (amount <= 0) { showError('transfer-amount', 'err-transfer-amount'); return; }

  const digitalBal = getWalletBalance('digital');
  if (amount > digitalBal) {
    alert(`Saldo Digital tidak cukup. Saldo saat ini: ${formatRp(digitalBal)}`);
    return;
  }

  const btn = document.getElementById('modal-transfer-save');
  setButtonLoading(btn, true);
  setTimeout(() => {
    state.transfers.push({
      id: state.nextTransferId++,
      amount,
      note,
      date: todayStr(),
    });
    setButtonLoading(btn, false);
    closeModal(modalTransfer);
    renderDashboard();
    renderTransactions();
    saveState();
  }, 400);
});

const addTransferBtnDesk = document.getElementById('add-transfer-btn');
if (addTransferBtnDesk) {
  addTransferBtnDesk.addEventListener('click', () => {
    document.getElementById('transfer-amount').value = '';
    document.getElementById('transfer-note').value = '';
    openModal(modalTransfer);
  });
}

const modalCat = document.getElementById('modal-cat');
document.getElementById('add-category-btn').addEventListener('click', () => {
  document.getElementById('cat-name').value = '';
  document.getElementById('cat-budget').value = '';
  document.getElementById('cat-is-saving').checked = false;
  openModal(modalCat);
});
document.getElementById('modal-cat-close').addEventListener('click', () => closeModal(modalCat));
modalCat.addEventListener('click', e => { if (e.target === modalCat) closeModal(modalCat); });
document.getElementById('modal-cat-save').addEventListener('click', () => {
  const name = document.getElementById('cat-name').value.trim();
  const budget = parseFloat(document.getElementById('cat-budget').value) || 0;
  const isSaving = document.getElementById('cat-is-saving').checked;
  if (!name) return;
  state.categories.push({
    id: state.nextId++, name, budget, spent: 0, color: state.selectedColor,
    isSaving, interestRate: 0, firstSavedAt: null
  });
  closeModal(modalCat); renderBudget(); renderDashboard(); refreshCatFilterSelect(); saveState();
});

function showConfirm(message, onConfirm) {
  const overlay = document.getElementById('confirm-overlay');
  document.getElementById('confirm-message').textContent = message;
  openModal(overlay);
  const yes = document.getElementById('confirm-yes');
  const no = document.getElementById('confirm-no');
  const cleanup = () => closeModal(overlay);
  const newYes = yes.cloneNode(true);
  const newNo = no.cloneNode(true);
  yes.replaceWith(newYes);
  no.replaceWith(newNo);
  newYes.addEventListener('click', () => { cleanup(); onConfirm(); });
  newNo.addEventListener('click', () => cleanup());
}

document.getElementById('reset-btn').addEventListener('click', () => {
  showConfirm('Reset semua data? Tindakan ini tidak bisa dibatalkan.', () => {
    localStorage.removeItem('finlyV1');
    location.reload();
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    [modalIncome, modalExpense, modalCat, document.getElementById('confirm-overlay')].forEach(m => closeModal(m));
  }
});

const sidebarEl = document.querySelector('.sidebar');
const mainWrapEl = document.querySelector('.main-wrap');
const toggleBtn = document.getElementById('sidebar-toggle');

let sidebarCollapsed = false;

toggleBtn.addEventListener('click', () => {
  sidebarCollapsed = !sidebarCollapsed;
  sidebarEl.classList.toggle('collapsed', sidebarCollapsed);
  toggleBtn.classList.toggle('is-collapsed', sidebarCollapsed);
  mainWrapEl.classList.toggle('sidebar-collapsed', sidebarCollapsed);
});

function renderInsights() {
  const row = document.getElementById('insights-row');
  if (!row) return;

  const totalIncome = getTotalIncome();
  const totalSpent = getTotalSpent();
  const totalSaving = getTotalSaving();
  const remaining = totalIncome - totalSpent - totalSaving;
  const usagePct = totalIncome > 0 ? (totalSpent / totalIncome) * 100 : 0;

  row.innerHTML = '';
  if (totalIncome === 0 && totalSpent === 0) return;

  const insights = [];

  if (usagePct > 100) {
    insights.push({ icon: '🔴', text: `Kamu overspend ${Math.round(usagePct - 100)}% dari pemasukan bulan ini`, type: 'danger' });
  } else if (usagePct > 80) {
    insights.push({ icon: '⚡', text: `${Math.round(usagePct)}% budget sudah terpakai — hampir habis!`, type: 'warning' });
  }

  const expCats = state.categories.filter(c => !c.isSaving && c.spent > 0).sort((a, b) => b.spent - a.spent);
  if (expCats.length > 0 && totalSpent > 0) {
    const top = expCats[0];
    const topPct = Math.round((top.spent / totalSpent) * 100);
    if (topPct >= 40) {
      insights.push({ icon: '📊', text: `Kategori "${top.name}" mendominasi ${topPct}% dari total pengeluaranmu`, type: 'info' });
    }
  }

  const overBudgetCats = state.categories.filter(c => c.budget > 0 && c.spent > c.budget);
  if (overBudgetCats.length > 0) {
    const cat = overBudgetCats[0];
    insights.push({ icon: '⚠️', text: `"${cat.name}" melebihi alokasi sebesar ${formatRp(cat.spent - cat.budget)}`, type: 'warning' });
  }

  if (remaining > 0 && totalSpent > 0) {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dayOfMonth = today.getDate();
    const daysLeft = daysInMonth - dayOfMonth;
    const dailyAvg = totalSpent / dayOfMonth;
    if (dailyAvg > 0) {
      const daysCanAfford = Math.floor(remaining / dailyAvg);
      if (daysCanAfford < daysLeft) {
        insights.push({ icon: '⏳', text: `Sisa budget hanya cukup ~${daysCanAfford} hari lagi dengan rata-rata pengeluaran saat ini`, type: 'warning' });
      } else if (insights.length < 2) {
        insights.push({ icon: '✅', text: `Budget aman! Sisa ${formatRp(remaining)} cukup untuk ${daysLeft} hari ke depan`, type: 'success' });
      }
    }
  }

  if (insights.length === 0) return;

  insights.slice(0, 3).forEach((ins, i) => {
    const card = document.createElement('div');
    card.className = `insight-card insight-${ins.type}`;
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `<span class="insight-icon">${ins.icon}</span><span class="insight-text">${ins.text}</span>`;
    row.appendChild(card);
  });
}

function refreshCatFilterSelect() {
  const sel = document.getElementById('trx-cat-filter');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = '<option value="all">Semua Kategori</option>';
  state.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id; opt.textContent = cat.name;
    sel.appendChild(opt);
  });
  sel.value = prev;
}

document.getElementById('trx-search').addEventListener('input', e => {
  currentSearchQuery = e.target.value.trim().toLowerCase();
  document.getElementById('trx-search-clear').classList.toggle('hidden', !currentSearchQuery);
  renderTransactions();
});

document.getElementById('trx-search-clear').addEventListener('click', () => {
  document.getElementById('trx-search').value = '';
  currentSearchQuery = '';
  document.getElementById('trx-search-clear').classList.add('hidden');
  renderTransactions();
});

document.getElementById('trx-cat-filter').addEventListener('change', e => {
  currentCatFilter = e.target.value;
  renderTransactions();
});

document.querySelectorAll('.time-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.time-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTimeFilter = tab.dataset.period;
    renderWeeklyChart();
  });
});

function exportCSV() {
  if (!state.transactions.length && !state.transfers?.length) { alert('Belum ada transaksi untuk diekspor.'); return; }
  const headers = ['Tanggal', 'Keterangan', 'Tipe', 'Kategori', 'Jumlah (Rp)', 'Metode'];
  const rows = state.transactions.map(t => {
    const cat = state.categories.find(c => c.id === t.catId);
    const pm = getPaymentInfo(t.paymentMethod || 'cash');
    return [t.date, `"${t.name}"`, t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
    t.type === 'income' ? '-' : (cat?.name || 'Lainnya'), t.amount, pm.label].join(',');
  });
  const transferRows = (state.transfers || []).map(t => {
    return [t.date, `"${t.note || 'Tarik Tunai'}"`, 'Transfer Internal', 'Digital → Tunai', t.amount, '-'].join(',');
  });
  const csv = [headers.join(','), ...rows, ...transferRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finly-transaksi-${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('export-csv-btn').addEventListener('click', exportCSV);

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finly-backup-${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('backup-btn').addEventListener('click', exportBackup);

document.getElementById('restore-btn').addEventListener('click', () => {
  document.getElementById('restore-file').click();
});

function highlightNewTrx(id) {
  requestAnimationFrame(() => {
    const btn = document.querySelector(`.trx-delete[data-id="${id}"]`);
    if (!btn) return;
    const item = btn.closest('.trx-item');
    if (!item) return;
    item.classList.add('trx-new');
    setTimeout(() => item.classList.remove('trx-new'), 1800);
  });
}

document.getElementById('restore-file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!imported.categories || !imported.transactions) { alert('File backup tidak valid.'); return; }
      if (!imported.transfers) imported.transfers = [];
      if (!imported.nextTransferId) imported.nextTransferId = 1;
      showConfirm('Restore data dari backup? Data saat ini akan digantikan.', () => {
        state = imported;
        saveState();
        applyTheme(state.theme || 'dark');
        const currentIncRestored = getBaseIncome();
        document.getElementById('income-input').value = currentIncRestored > 0 ? currentIncRestored.toLocaleString('id-ID') : '';
        if (state.period) document.getElementById('income-period').value = state.period;
        refreshCatFilterSelect();
        renderDashboard(); renderBudget(); renderTransactions(); renderCalendar();
      });
    } catch { alert('File backup rusak atau tidak valid.'); }
  };
  reader.readAsText(file);
  e.target.value = '';
});

function initApp() {
  loadState();
  applyTheme(state.theme);

  const now = new Date();
  document.getElementById('topbar-month').textContent = MONTHS_ID[now.getMonth()] + ' ' + now.getFullYear();

  const initialInc = getBaseIncome();
  if (initialInc > 0) {
    document.getElementById('income-input').value = initialInc.toLocaleString('id-ID');
  }
  if (state.period) document.getElementById('income-period').value = state.period;

  renderDashboard();
  renderBudget();
  renderTransactions();
  renderCalendar();
  refreshCatFilterSelect();

  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('fade-out');
      document.body.classList.remove('loading');
      setTimeout(() => { splash.style.display = 'none'; }, 800);
    }
  }, 300);
}

function parseCustomDate(isoDateStr) {
  if (!isoDateStr) return todayStr();
  const d = new Date(isoDateStr);
  if (isNaN(d)) return todayStr();
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

let hasNotifiedDebt = false;
function processDebts() {
  const badge = document.getElementById('debt-widget-badge');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let dueCount = 0;

  if (!state.debts) state.debts = [];
  state.debts.forEach(d => {
    let due = new Date(d.dueDate);
    due.setHours(0, 0, 0, 0);
    let diffDays = (due - now) / (1000 * 60 * 60 * 24);
    if (diffDays <= 3 && d.status === 'Active') {
      dueCount++;
    }
  });

  if (dueCount > 0) {
    badge.textContent = dueCount;
    badge.classList.remove('hidden');
    if (!hasNotifiedDebt) {
      triggerNotification(`Ada ${dueCount} utang yang mendekati atau melewati jatuh tempo!`);
      hasNotifiedDebt = true; 
    }
  } else {
    badge.classList.add('hidden');
    hasNotifiedDebt = false;
  }
}

function renderDebtList() {
  const list = document.getElementById('debt-list');
  if (!list) return;
  list.innerHTML = '';

  if (!state.debts || state.debts.length === 0) {
    list.innerHTML = `<div class="empty-state-full"><p class="empty-sub">Belum ada utang tercatat.</p></div>`;
    return;
  }

  state.debts.forEach(d => {
    const el = document.createElement('div');
    el.className = 'debt-item';
    el.innerHTML = `
      <div class="debt-info">
        <p>${d.creditor}</p>
        <div class="debt-meta">Jatuh Tempo: ${d.dueDate} | Status: <span style="color:${d.status === 'Paid' ? 'var(--income)' : 'var(--expense)'}">${d.status}</span></div>
      </div>
      <div>
        <div class="debt-amount ${d.status === 'Paid' ? 'income-color' : 'expense-color'}">${formatRp(d.amount)}</div>
        <div class="debt-actions">
           ${d.status === 'Active' ? `<button onclick="markDebtPaid(${d.id})">Lunas</button>` : ''}
           <button class="danger-btn" onclick="deleteDebt(${d.id})">Hapus</button>
        </div>
      </div>
    `;
    list.appendChild(el);
  });
}

window.markDebtPaid = function (id) {
  const d = state.debts.find(x => x.id === id);
  if (d) d.status = 'Paid';
  saveState();
  renderDebtList();
  processDebts();
};
window.deleteDebt = function (id) {
  state.debts = state.debts.filter(x => x.id !== id);
  saveState();
  renderDebtList();
  processDebts();
};

const modalDebt = document.getElementById('modal-debt');
function openDebtModal() {
  document.getElementById('debt-creditor').value = '';
  document.getElementById('debt-amount').value = '';
  document.getElementById('debt-due').value = '';
  if (document.getElementById('debt-status')) document.getElementById('debt-status').value = 'Active';
  const errs = document.querySelectorAll('#modal-debt .error-msg');
  errs.forEach(e => e.classList.add('hidden'));
  openModal(document.getElementById('modal-debt'));
}
document.querySelectorAll('#add-debt-btn, #add-debt-btn-page').forEach(btn => {
  btn.addEventListener('click', openDebtModal);
});
document.getElementById('modal-debt-close').addEventListener('click', () => closeModal(modalDebt));
document.getElementById('modal-debt-save').addEventListener('click', () => {
  const creditor = document.getElementById('debt-creditor').value.trim();
  const amount = parseFloat(document.getElementById('debt-amount').value) || 0;
  let due = document.getElementById('debt-due').value;
  let statusSel = document.getElementById('debt-status');
  const dStatus = statusSel ? statusSel.value : 'Active';
  let valid = true;
  if (!creditor) { showError('debt-creditor', 'err-debt-creditor'); valid = false; }
  if (amount <= 0) { showError('debt-amount', 'err-debt-amount'); valid = false; }
  if (!due) { document.getElementById('debt-due').focus(); return; }
  if (!valid) return;
  if (!state.debts) state.debts = [];
  state.debts.push({
    id: state.nextDebtId++,
    creditor: creditor,
    amount: amount,
    dueDate: due,
    status: dStatus
  });
  saveState();
  closeModal(modalDebt);
  renderDebtList();
  processDebts();
});

function askNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Browser tidak mendukung notifikasi desktop.");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        alert("Notifikasi diizinkan!");
      }
    });
  }
}

document.getElementById('notif-btn').addEventListener('click', askNotificationPermission);

function triggerNotification(msg) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification("Finly Alert", { body: msg, icon: 'favicon.svg' });
  }
}

function initDashboardEvents() {
  document.querySelectorAll('.dash-widget[data-page-target], .dash-widget#export-pdf-widget').forEach(el => {
    el.addEventListener('click', () => {
      let target = el.getAttribute('data-page-target');
      if (el.id === 'export-pdf-widget') target = 'report';
      if (target) navigateTo(target);
    });
  });

  const pdfBtn = document.getElementById('download-pdf-btn');
  if (pdfBtn) pdfBtn.addEventListener('click', exportToPDF);

  validateNavSetup();
}

function exportToPDF() {
  if (!window.jspdf) {
    alert("Menyiapkan PDF engine, harap tunggu.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('Laporan Finly', 14, 22);
  doc.setFontSize(11);
  doc.text(`Periode: ${getCurrentPeriodKey()}`, 14, 30);
  doc.text(`Total Pemasukan: ${formatRp(getTotalIncome())}`, 14, 38);
  doc.text(`Total Pengeluaran: ${formatRp(getTotalSpent())}`, 14, 46);

  const headers = [['Tanggal', 'Keterangan', 'Kategori', 'Jumlah']];
  const trxs = state.transactions.filter(t => isInCurrentPeriod(t));
  const data = trxs.map(t => {
    let catName = t.type === 'income' ? 'Pemasukan' : (state.categories.find(c => c.id === t.catId)?.name || 'Lainnya');
    return [t.date, t.name, catName, formatRp(t.amount)];
  });

  if (doc.autoTable) {
    doc.autoTable({
      head: headers,
      body: data,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] }
    });
  } else {
    doc.text('Data transaksi tidak dapat dimuat.', 14, 55);
  }

  doc.save(`Finly_Laporan_${getCurrentPeriodKey()}.pdf`);
}

function validateNavSetup() {
  document.querySelectorAll('[data-page]').forEach(n => {
    n.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(n.getAttribute('data-page'));
    });
  });
}

const originalInit = initApp;
initApp = function () {
  originalInit();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (currentUser.name) {
    if (!state.userProfile) state.userProfile = {};
    state.userProfile.name = currentUser.name;
  }

  const displayName = state.userProfile?.name || currentUser.name || 'User';
  document.getElementById('profile-name-input').value = displayName;
  document.getElementById('greeting-name').textContent = displayName;

  document.getElementById('lang-select').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
  });

  updateLanguage(state.language || 'id');
  renderDebtList();
  processDebts();
  initDashboardEvents();
};


function refreshWidgets() {
  const activeCats = state.categories.filter(c => !c.isSaving && c.budget > 0);
  const totalAllocated = activeCats.reduce((sum, c) => sum + c.budget, 0);
  const totalSpentCats = activeCats.reduce((sum, c) => sum + c.spent, 0);
  const budgetVal = document.getElementById('widget-budget-val');
  if (budgetVal) budgetVal.textContent = formatRp(Math.max(0, totalAllocated - totalSpentCats));

  const targetVal = document.getElementById('widget-target-val');
  if (targetVal) {
    let sv = 0;
    state.categories.filter(c => c.isSaving).forEach(c => {
      sv += c.spent;
      if (typeof calcInterest === 'function') sv += calcInterest(c);
    });
    targetVal.textContent = formatRp(sv);
  }

  const debtVal = document.getElementById('widget-debt-val');
  if (debtVal) {
    const activeDebts = (state.debts || []).filter(d => d.status === 'Active').reduce((sum, d) => sum + d.amount, 0);
    debtVal.textContent = formatRp(activeDebts);
  }

  const reportVal = document.getElementById('widget-report-val');
  const surplus = getTotalIncome() - getTotalSpent();
  if (reportVal) {
    if (surplus > 0) {
      reportVal.style.color = "var(--income)";
      reportVal.textContent = '+' + formatRp(surplus);
    } else if (surplus < 0) {
      reportVal.style.color = "var(--expense)";
      reportVal.textContent = formatRp(surplus);
    } else {
      reportVal.style.color = "var(--text)";
      reportVal.textContent = "Rp 0";
    }
  }

  const lapInc = document.getElementById('laporan-inc');
  const lapExp = document.getElementById('laporan-exp');
  const lapNet = document.getElementById('laporan-net');
  const lapMon = document.getElementById('laporan-month');
  if (lapInc) lapInc.textContent = formatRp(getTotalIncome());
  if (lapExp) lapExp.textContent = formatRp(getTotalSpent());
  if (lapNet) {
    lapNet.textContent = formatRp(surplus);
    lapNet.style.color = surplus >= 0 ? 'var(--income)' : 'var(--expense)';
  }
  if (lapMon) {
    const now = new Date();
    lapMon.textContent = MONTHS_ID[now.getMonth()] + ' ' + now.getFullYear();
  }

  const uAktif = document.getElementById('utang-aktif-display');
  const uLunas = document.getElementById('utang-lunas-display');
  if (uAktif) {
    const aD = (state.debts || []).filter(d => d.status === 'Active').reduce((sum, d) => sum + d.amount, 0);
    uAktif.textContent = formatRp(aD);
  }
  if (uLunas) {
    const pD = (state.debts || []).filter(d => d.status === 'Paid').reduce((sum, d) => sum + d.amount, 0);
    uLunas.textContent = formatRp(pD);
  }
}

const originalRenderDashboard = renderDashboard;
renderDashboard = function () {
  originalRenderDashboard();
  refreshWidgets();
};

function startOnboardingTour() {
  if (state.hasSeenOnboarding) return;

  const mask = document.createElement('div');
  mask.className = 'tour-mask';
  document.body.appendChild(mask);

  const popover = document.createElement('div');
  popover.className = 'tour-popover';
  popover.innerHTML = `
      <h3 id="tour-title"></h3>
      <p id="tour-desc"></p>
      <div class="actions">
         <button class="outline-btn" id="tour-skip">Lewati</button>
         <button class="primary-btn" id="tour-next">Selanjutnya</button>
      </div>
    `;
  document.body.appendChild(popover);

  const steps = [
    {
      target: document.getElementById('add-income-btn') || document.getElementById('mobile-add-btn'),
      title: "Catat Pemasukan & Pengeluaran 💰",
      desc: "Gunakan tombol ini untuk mencatat semua transaksi harian Anda. Anda dapat menentukan tanggal lampau atau mendatang."
    },
    {
      target: document.querySelector('.dashboard-widgets-row'),
      title: "Widget Pintar 📊",
      desc: "Di sini Anda bisa memantau rasio Anggaran, pergerakan Tabungan (Target), jumlah Utang saat ini, dan laporan NetFlow secara real-time. Klik masing-masing widget untuk melihat detailnya."
    },
    {
      target: document.querySelector('.topbar'),
      title: "Install sebagai App 📥",
      desc: "Finly sekarang adalah PWA! Buka setting browser (titik tiga) dan pilih 'Add to Home Screen' untuk menjadikan Finly layaknya aplikasi native tanpa koneksi internet."
    }
  ];

  let current = 0;

  function highlightStep() {
    if (current >= steps.length) {
      endTour();
      return;
    }
    const step = steps[current];
    if (!step.target) {
      current++; highlightStep(); return;
    }

    step.target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const rect = step.target.getBoundingClientRect();
      mask.style.top = (rect.top + window.scrollY - 8) + 'px';
      mask.style.left = (rect.left + window.scrollX - 8) + 'px';
      mask.style.width = (rect.width + 16) + 'px';
      mask.style.height = (rect.height + 16) + 'px';

      document.getElementById('tour-title').textContent = step.title;
      document.getElementById('tour-desc').textContent = step.desc;

      const popY = rect.bottom + window.scrollY + 20;
      popover.style.top = popY + 'px';
      let popX = rect.left + window.scrollX + (rect.width / 2) - 150;
      if (popX < 10) popX = 10;
      if (popX > window.innerWidth - 320) popX = window.innerWidth - 320;
      popover.style.left = popX + 'px';

      if (current === steps.length - 1) {
        document.getElementById('tour-next').textContent = "Selesai";
      }
    }, 300);
  }

  function endTour() {
    mask.remove();
    popover.remove();
    state.hasSeenOnboarding = true;
    saveState();
  }

  document.getElementById('tour-next').addEventListener('click', () => { current++; highlightStep(); });
  document.getElementById('tour-skip').addEventListener('click', endTour);

  setTimeout(highlightStep, 500);
}

const nextInit = initApp;
initApp = function () {
  if (typeof state.hasSeenOnboarding === 'undefined') state.hasSeenOnboarding = false;
  nextInit();

  if (!state.hasSeenOnboarding) {
    setTimeout(startOnboardingTour, 1500); // Wait for splash screen
  }
};

let isRegisterMode = false;
const authPageEl = document.getElementById('auth-page');
const mainAppEl = document.querySelector('.app');
const authForm = document.getElementById('auth-form');
const authSwitchLink = document.getElementById('auth-switch-link');
const authSwitchText = document.getElementById('auth-switch-text');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const authBtn = document.getElementById('auth-submit-btn');

function showErrorShake(inputId, errId, text) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);
  const card = document.querySelector('.auth-card');
  if (!inp || !err || !card) return;
  if (text) err.textContent = text;
  inp.classList.add('error');
  err.classList.remove('hidden');
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');
  inp.addEventListener('input', function clearErr() {
    inp.classList.remove('error');
    err.classList.add('hidden');
    inp.removeEventListener('input', clearErr);
  });
}

function checkAuth() {
  const currentUser = localStorage.getItem('currentUser');
  const mobileNav = document.getElementById('mobile-nav');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    authPageEl.style.display = 'none';
    mainAppEl.style.display = 'flex';

    if (mobileNav) mobileNav.style.display = '';
    
    document.getElementById('greeting-name').textContent = user.name || 'User';
    document.getElementById('profile-name-input').value = user.name || 'User';
    if (!state.userProfile) state.userProfile = {};
    state.userProfile.name = user.name || 'User';
    
    initApp();
  } else {
    authPageEl.style.display = 'flex';
    mainAppEl.style.display = 'none';

    if (mobileNav) mobileNav.style.display = 'none';
  }
}

authSwitchLink.addEventListener('click', (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  document.getElementById('register-name-group').classList.toggle('hidden', !isRegisterMode);
  if (isRegisterMode) {
    authTitle.textContent = 'Create Account';
    authSubtitle.textContent = 'Join Finly to master your finances.';
    authBtn.textContent = 'Register';
    authSwitchText.textContent = 'Sudah punya akun?';
    authSwitchLink.textContent = 'Login sekarang';
  } else {
    authTitle.textContent = 'Welcome Back';
    authSubtitle.textContent = 'Login to continue tracking your budget.';
    authBtn.textContent = 'Login';
    authSwitchText.textContent = 'Belum punya akun?';
    authSwitchLink.textContent = 'Daftar sekarang';
  }
});

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailVal = document.getElementById('auth-email').value.trim();
  const passVal = document.getElementById('auth-password').value.trim();

  let valid = true;
  if (!emailVal) { showErrorShake('auth-email', 'err-auth-email', 'Email tidak boleh kosong!'); valid = false; }
  if (!passVal) { showErrorShake('auth-password', 'err-auth-password', 'Password tidak boleh kosong!'); valid = false; }

  if (isRegisterMode) {
    const nameVal = document.getElementById('auth-name').value.trim();
    if (!nameVal) { showErrorShake('auth-name', 'err-auth-name', 'Nama tidak boleh kosong!'); valid = false; }
    if (!valid) return;

    let users = JSON.parse(localStorage.getItem('finly_users') || '[]');
    if (users.find(u => u.email === emailVal)) {
      showErrorShake('auth-email', 'err-auth-email', 'Email sudah terdaftar!');
      return;
    }

    const newUser = { name: nameVal, email: emailVal, password: passVal };
    users.push(newUser);
    localStorage.setItem('finly_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.display = 'flex';
      splash.classList.remove('fade-out');
    }
    checkAuth();
  } else {
    if (!valid) return;

    let users = JSON.parse(localStorage.getItem('finly_users') || '[]');
    const user = users.find(u => u.email === emailVal);

    if (!user) {
      showErrorShake('auth-email', 'err-auth-email', 'User not found');
      return;
    }
    if (user.password !== passVal) {
      showErrorShake('auth-password', 'err-auth-password', 'Wrong password');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));

    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.display = 'flex';
      splash.classList.remove('fade-out');
    }
    checkAuth();
  }
});

function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const settingsLogoutBtn = document.getElementById('logout-btn-settings');
  if (settingsLogoutBtn) settingsLogoutBtn.addEventListener('click', logout);

  const sidebarLogoutBtn = document.getElementById('logout-btn-sidebar');
  if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener('click', logout);

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkAuth();
  }
});
