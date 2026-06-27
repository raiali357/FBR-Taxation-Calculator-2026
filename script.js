const formatMoney = (value) => `Rs. ${Math.round(value || 0).toLocaleString("en-PK")}`;
const numeric = (value) => Number(String(value || "").replace(/[^0-9.-]/g, "")) || 0;
const formatInputNumber = (value) => {
  const raw = String(value || "").replace(/[^0-9]/g, "");
  return raw ? Number(raw).toLocaleString("en-PK") : "";
};

const rateItems = [
  { section: "148", category: "Imports", label: "Part I goods", individual: 1, company: 1, inactiveIndividual: 2, inactiveCompany: 2, nature: "Minimum / not minimum subject to facts" },
  { section: "148", category: "Imports", label: "Part II goods other than commercial importer", individual: 2, company: 2, inactiveIndividual: 4, inactiveCompany: 4, nature: "Minimum / not minimum subject to facts" },
  { section: "148", category: "Imports", label: "Part III goods other than commercial importer", individual: 5.5, company: 5.5, inactiveIndividual: 11, inactiveCompany: 11, nature: "Minimum / not minimum subject to facts" },
  { section: "148", category: "Imports", label: "Commercial importer - Part II goods", individual: 3.5, company: 3.5, inactiveIndividual: 7, inactiveCompany: 7, nature: "Minimum" },
  { section: "148", category: "Imports", label: "Commercial importer - Part III goods", individual: 6, company: 6, inactiveIndividual: 12, inactiveCompany: 12, nature: "Minimum" },
  { section: "150", category: "Dividends", label: "Independent Power Producer pass-through dividend", individual: 7.5, company: 7.5, inactiveIndividual: 15, inactiveCompany: 15, nature: "Final" },
  { section: "150", category: "Dividends", label: "Company exempt / losses / tax credit", individual: 25, company: 25, inactiveIndividual: 50, inactiveCompany: 50, nature: "Final" },
  { section: "150", category: "Dividends", label: "REIT dividend", individual: 15, company: 15, inactiveIndividual: 30, inactiveCompany: 30, nature: "Final" },
  { section: "150", category: "Dividends", label: "Mutual fund debt-security income - corporate recipient", individual: 29, company: 29, inactiveIndividual: 58, inactiveCompany: 58, nature: "Final" },
  { section: "150", category: "Dividends", label: "Mutual fund equity income / other dividend cases", individual: 15, company: 15, inactiveIndividual: 30, inactiveCompany: 30, nature: "Final" },
  { section: "151", category: "Profit on debt", label: "National Savings / Post Office saving account", individual: 15, company: 15, inactiveIndividual: 30, inactiveCompany: 30, nature: "Final / minimum if profit exceeds Rs. 5m" },
  { section: "151", category: "Profit on debt", label: "Banking company or financial institution deposit", individual: 20, company: 20, inactiveIndividual: 40, inactiveCompany: 40, nature: "Final / minimum if profit exceeds Rs. 5m" },
  { section: "151", category: "Profit on debt", label: "Government security profit - individual / AOP", individual: 15, company: 20, inactiveIndividual: 30, inactiveCompany: 40, nature: "Final / minimum if profit exceeds Rs. 5m" },
  { section: "151(1A)", category: "Profit on debt", label: "Return on sukuk - company holder", individual: 25, company: 25, inactiveIndividual: 50, inactiveCompany: 50, nature: "Final" },
  { section: "153", category: "Goods / services / contracts", label: "Rice, cotton seed oil or edible oil", individual: 1.5, company: 1.5, inactiveIndividual: 3, inactiveCompany: 3, nature: "Minimum / adjustable for listed manufacturer" },
  { section: "153", category: "Goods / services / contracts", label: "Cigarette distributors", individual: 2.5, company: 2.5, inactiveIndividual: 5, inactiveCompany: 5, nature: "Minimum" },
  { section: "153", category: "Goods / services / contracts", label: "Pharmaceutical distributors", individual: 1, company: 1, inactiveIndividual: 2, inactiveCompany: 2, nature: "Minimum" },
  { section: "153", category: "Goods / services / contracts", label: "FMCG / fertilizer / electronics / sugar / cement / steel dealers on ATL", individual: 0.25, company: 0.25, inactiveIndividual: 0.25, inactiveCompany: 0.25, nature: "Minimum" },
  { section: "153", category: "Goods / services / contracts", label: "Gold, silver and articles thereof", individual: 1, company: 1, inactiveIndividual: 2, inactiveCompany: 2, nature: "Adjustable" },
  { section: "153", category: "Goods / services / contracts", label: "Sale of other goods - company excluding toll manufacturing", individual: 5, company: 5, inactiveIndividual: 10, inactiveCompany: 10, nature: "Minimum / adjustable subject to facts" },
  { section: "153", category: "Goods / services / contracts", label: "Sale of other goods - company toll manufacturing", individual: 9, company: 9, inactiveIndividual: 18, inactiveCompany: 18, nature: "Minimum" },
  { section: "153", category: "Goods / services / contracts", label: "Sale of other goods - other taxpayers", individual: 5.5, company: 5.5, inactiveIndividual: 11, inactiveCompany: 11, nature: "Minimum" },
  { section: "153(2A)", category: "E-commerce", label: "E-commerce paid through digital means or banking channel", individual: 1, company: 1, inactiveIndividual: 2, inactiveCompany: 2, nature: "Final" },
  { section: "153(2A)", category: "E-commerce", label: "E-commerce cash on delivery", individual: 2, company: 2, inactiveIndividual: 4, inactiveCompany: 4, nature: "Final" },
  { section: "154", category: "Exports", label: "Realization of foreign exchange proceeds on export of goods", individual: 1, company: 1, inactiveIndividual: 1, inactiveCompany: 1, nature: "Minimum plus additional 1% u/s 147 as adjustable advance tax" },
  { section: "156", category: "Prizes and winnings", label: "Prize bond / crossword prize", individual: 15, company: 15, inactiveIndividual: 30, inactiveCompany: 30, nature: "Final" },
  { section: "156", category: "Prizes and winnings", label: "Raffle, lottery, quiz or sales-promotion prize", individual: 20, company: 20, inactiveIndividual: 40, inactiveCompany: 40, nature: "Final" },
  { section: "156A", category: "Petroleum products", label: "Commission or discount to petrol pump operator", individual: 12, company: 12, inactiveIndividual: 24, inactiveCompany: 24, nature: "Final" },
  { section: "231AB", category: "Banking", label: "Cash withdrawal exceeding Rs. 50,000 per day", individual: 0, company: 0, inactiveIndividual: 0.8, inactiveCompany: 0.8, nature: "Adjustable" },
  { section: "233", category: "Brokerage / commission", label: "Advertisement agent", individual: 10, company: 10, inactiveIndividual: 20, inactiveCompany: 20, nature: "Minimum" },
  { section: "233", category: "Brokerage / commission", label: "Life insurance agent under Rs. 0.5m commission", individual: 8, company: 8, inactiveIndividual: 16, inactiveCompany: 16, nature: "Minimum" },
  { section: "233", category: "Brokerage / commission", label: "Other brokerage or commission", individual: 12, company: 12, inactiveIndividual: 24, inactiveCompany: 24, nature: "Minimum" },
  { section: "236Y", category: "Cards / remittance", label: "Amount remitted abroad through credit, debit or prepaid cards", individual: 5, company: 5, inactiveIndividual: 10, inactiveCompany: 10, nature: "Adjustable" },
  { section: "236Z", category: "Bonus shares", label: "Value of bonus shares issued by companies", individual: 10, company: 10, inactiveIndividual: 10, inactiveCompany: 10, nature: "Final" }
];

const vehicleBands = [
  { id: "850", label: "Up to 850CC", regRate: 0.5, annual: 800, lump: 10000 },
  { id: "1000", label: "851CC to 1,000CC", regRate: 1, annual: 800, lump: 10000 },
  { id: "1300", label: "1,001CC to 1,300CC", regRate: 1.5, annual: 1750, lump: 20000 },
  { id: "1600", label: "1,301CC to 1,600CC", regRate: 2, annual: 3750, lump: 45000 },
  { id: "1800", label: "1,601CC to 1,800CC", regRate: 3, annual: 4500, lump: 60000 },
  { id: "2000", label: "1,801CC to 2,000CC", regRate: 5, annual: 10000, lump: 120000 },
  { id: "2500", label: "2,001CC to 2,500CC", regRate: 7, annual: 10000, lump: 120000 },
  { id: "3000", label: "2,501CC to 3,000CC", regRate: 9, annual: 10000, lump: 120000 },
  { id: "above", label: "Above 3,000CC", regRate: 12, annual: 10000, lump: 120000 }
];

const el = (id) => document.getElementById(id);

function getRate(item, personType, status) {
  if (status === "active") return personType === "company" ? item.company : item.individual;
  return personType === "company" ? item.inactiveCompany : item.inactiveIndividual;
}

function populateControls() {
  const categories = [...new Set(rateItems.map((item) => item.category))];
  el("category").innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
  el("vehicleCc").innerHTML = vehicleBands.map((band) => `<option value="${band.id}">${band.label}</option>`).join("");
  populateTransactions();
  renderRateTable();
}

function populateTransactions() {
  const selected = el("category").value;
  const options = rateItems.filter((item) => item.category === selected);
  el("transaction").innerHTML = options.map((item, index) => `<option value="${index}">${item.section} - ${item.label}</option>`).join("");
}

function selectedRateItem() {
  const options = rateItems.filter((item) => item.category === el("category").value);
  return options[Number(el("transaction").value)] || options[0] || rateItems[0];
}

function calculateUniversal() {
  const amount = numeric(el("amount").value);
  const item = selectedRateItem();
  const rate = getRate(item, el("personType").value, el("status").value);
  const tax = amount * rate / 100;
  el("rateOut").textContent = `${rate}%`;
  el("taxOut").textContent = formatMoney(tax);
  el("netOut").textContent = formatMoney(Math.max(amount - tax, 0));
  el("explainBox").textContent = `${item.section}: ${item.label}. Nature/status: ${item.nature}. Inactive taxpayer rates are treated as increased rates where the rate card gives active / inactive pairs; confirm any exemption, reduced rate or special schedule before final use.`;
}

function salaryTax(income) {
  if (income <= 600000) return 0;
  if (income <= 1200000) return (income - 600000) * 0.01;
  if (income <= 2200000) return 6000 + (income - 1200000) * 0.11;
  if (income <= 3200000) return 116000 + (income - 2200000) * 0.23;
  if (income <= 4100000) return 346000 + (income - 3200000) * 0.30;
  return 616000 + (income - 4100000) * 0.35;
}

function calculateSalary() {
  const enteredSalary = numeric(el("salaryIncome").value);
  const income = el("salaryBasis").value === "monthly" ? enteredSalary * 12 : enteredSalary;
  const baseTax = salaryTax(income);
  const surcharge = income > 10000000 && el("salarySurcharge").value === "yes" ? baseTax * 0.09 : 0;
  const totalTax = baseTax + surcharge;
  el("salaryAnnual").textContent = formatMoney(income);
  el("salaryTax").textContent = formatMoney(baseTax + surcharge);
  el("salarySurchargeOut").textContent = formatMoney(surcharge);
  el("salaryMonthly").textContent = formatMoney(totalTax / 12);
  el("salaryExplain").textContent = el("salaryBasis").value === "monthly"
    ? `Monthly taxable salary ${formatMoney(enteredSalary)} is annualized to ${formatMoney(income)} for slab calculation.`
    : `Annual taxable salary ${formatMoney(income)} is divided by 12 to estimate monthly withholding.`;
}

function calculateRent() {
  const rent = numeric(el("rentAmount").value);
  let tax = 0;
  if (el("rentType").value === "company") {
    tax = rent * 0.15;
  } else if (rent > 2000000) {
    tax = 155000 + (rent - 2000000) * 0.25;
  } else if (rent > 600000) {
    tax = 15000 + (rent - 600000) * 0.10;
  } else if (rent > 300000) {
    tax = (rent - 300000) * 0.05;
  }
  el("rentTax").textContent = formatMoney(tax);
}

function calculateElectricity() {
  const bill = numeric(el("electricAmount").value);
  let tax = 0;
  if (bill > 20000) {
    tax = 1950 + (bill - 20000) * (el("electricType").value === "industrial" ? 0.05 : 0.12);
  } else if (bill > 500) {
    tax = bill * 0.10;
  }
  el("electricTax").textContent = formatMoney(tax);
}

function calculateCash() {
  const amount = numeric(el("cashAmount").value);
  const taxable = amount > 50000 && el("cashStatus").value === "inactive" ? amount * 0.008 : 0;
  el("cashTax").textContent = formatMoney(taxable);
}

function sellerPropertyRate(value, status) {
  if (status === "active") {
    if (value <= 50000000) return 4.5;
    if (value <= 100000000) return 5;
    return 5.5;
  }
  if (status === "late") {
    if (value <= 50000000) return 7.5;
    if (value <= 100000000) return 8.5;
    return 9.5;
  }
  return 11.5;
}

function buyerPropertyRate(value, status) {
  if (status === "active") {
    if (value <= 50000000) return 1.5;
    if (value <= 100000000) return 2;
    return 2.5;
  }
  if (status === "late") {
    if (value <= 50000000) return 4.5;
    if (value <= 100000000) return 5.5;
    return 6.5;
  }
  if (value <= 50000000) return 10.5;
  if (value <= 100000000) return 14.5;
  return 18.5;
}

function parseLocalDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function holdingYears(purchaseDate, saleDate) {
  if (!purchaseDate || !saleDate || saleDate < purchaseDate) return null;
  let years = saleDate.getFullYear() - purchaseDate.getFullYear();
  const saleMonthDay = [saleDate.getMonth(), saleDate.getDate()];
  const purchaseMonthDay = [purchaseDate.getMonth(), purchaseDate.getDate()];
  if (
    saleMonthDay[0] < purchaseMonthDay[0] ||
    (saleMonthDay[0] === purchaseMonthDay[0] && saleMonthDay[1] < purchaseMonthDay[1])
  ) {
    years -= 1;
  }
  return years;
}

function holdingLabel(years) {
  if (years === null) return "-";
  if (years < 1) return "Up to 1 year";
  if (years === 1) return "More than 1 year up to 2 years";
  if (years === 2) return "More than 2 years up to 3 years";
  if (years === 3) return "More than 3 years up to 4 years";
  if (years === 4) return "More than 4 years up to 5 years";
  if (years === 5) return "More than 5 years up to 6 years";
  return "More than 6 years";
}

function oldRegimeCapitalGainRate(propertyType, years) {
  if (years === null) return 0;
  const bands = {
    open: [15, 12.5, 10, 7.5, 5, 2.5, 0],
    constructed: [15, 10, 7.5, 5, 0, 0, 0],
    flat: [15, 7.5, 0, 0, 0, 0, 0]
  };
  const index = Math.min(Math.max(years, 0), 6);
  return bands[propertyType][index];
}

function capitalGainResult(propertyType, purchaseDate, saleDate, status) {
  const cutoff = new Date(2024, 6, 1);
  const years = holdingYears(purchaseDate, saleDate);
  if (!purchaseDate || !saleDate || years === null) {
    return { rate: 0, years, regime: "missing", warning: "Enter valid purchase and sale dates. Sale date must be after purchase date." };
  }
  if (purchaseDate >= cutoff) {
    const statusNote = status === "active"
      ? "Active ATL seller: 15% rate applies under the post 1 July 2024 acquisition regime."
      : "For a seller not appearing on ATL, law refers to normal rates with tax not less than 15% of gain. This calculator uses 15% as the minimum estimate; final tax may be higher.";
    return { rate: 15, years, regime: "new", warning: statusNote };
  }
  return {
    rate: oldRegimeCapitalGainRate(propertyType, years),
    years,
    regime: "old",
    warning: "Property acquired on or before 30 June 2024: rate is based on property type and holding period."
  };
}

function calculateProperty() {
  const sellerValue = numeric(el("sellerPropertyValue").value);
  const buyerValue = numeric(el("buyerPropertyValue").value);
  const cgtSale = numeric(el("cgtSaleValue").value);
  const cgtCost = numeric(el("cgtCostValue").value);
  const cgtImprovement = numeric(el("cgtImprovement").value);
  const purchaseDate = parseLocalDate(el("cgtPurchaseDate").value);
  const saleDate = parseLocalDate(el("cgtSaleDate").value);
  const sellerRate = sellerPropertyRate(sellerValue, el("sellerStatus").value);
  const buyerRate = buyerPropertyRate(buyerValue, el("buyerStatus").value);
  const cgtResult = capitalGainResult(el("cgtPropertyType").value, purchaseDate, saleDate, el("cgtStatus").value);
  const cgtRate = cgtResult.rate;
  const seller = sellerValue * sellerRate / 100;
  const buyer = buyerValue * buyerRate / 100;
  const gain = Math.max(cgtSale - cgtCost - cgtImprovement, 0);
  const cgt = gain * cgtRate / 100;
  el("sellerRate").textContent = `${sellerRate}%`;
  el("sellerTax").textContent = formatMoney(seller);
  el("sellerNet").textContent = formatMoney(Math.max(sellerValue - seller, 0));
  el("buyerRate").textContent = `${buyerRate}%`;
  el("buyerTax").textContent = formatMoney(buyer);
  el("buyerGross").textContent = formatMoney(buyerValue + buyer);
  el("cgtGain").textContent = formatMoney(gain);
  el("cgtHoldingOut").textContent = holdingLabel(cgtResult.years);
  el("cgtRate").textContent = `${cgtRate}%`;
  el("cgtTax").textContent = formatMoney(cgt);
  el("cgtExplain").textContent = cgtRate === 0
    ? `${cgtResult.warning} Estimated capital gain is sale value minus purchase cost and improvement / transfer cost.`
    : `${cgtResult.warning} Estimated capital gain is sale value minus purchase cost and improvement / transfer cost. Applied CGT rate: ${cgtRate}%.`;
}

function calculateVehicle() {
  const value = numeric(el("vehicleValue").value);
  const band = vehicleBands.find((item) => item.id === el("vehicleCc").value) || vehicleBands[0];
  const mode = el("vehicleMode").value;
  let tax = value * band.regRate / 100;
  let rateText = `${band.regRate}%`;
  if (mode === "annual") {
    tax = band.annual;
    rateText = formatMoney(band.annual);
  }
  if (mode === "lump") {
    tax = band.lump;
    rateText = formatMoney(band.lump);
  }
  el("vehicleRate").textContent = rateText;
  el("vehicleTax").textContent = formatMoney(tax);
}

function renderRateTable() {
  const query = (el("searchRates")?.value || "").toLowerCase();
  const rows = rateItems.filter((item) => `${item.section} ${item.category} ${item.label} ${item.nature}`.toLowerCase().includes(query));
  el("rateTable").innerHTML = rows.map((item) => `
    <tr>
      <td>${item.section}</td>
      <td><strong>${item.category}</strong><br>${item.label}</td>
      <td>${item.individual}% / ${item.company}%</td>
      <td>${item.inactiveIndividual}% / ${item.inactiveCompany}%</td>
      <td>${item.nature}</td>
    </tr>
  `).join("");
}

function bindEvents() {
  document.querySelectorAll("input, select").forEach((node) => {
    node.addEventListener("input", runAll);
    node.addEventListener("change", runAll);
  });
  document.querySelectorAll(".money-input").forEach((node) => {
    node.addEventListener("input", () => {
      const caretAtEnd = node.selectionStart === node.value.length;
      node.value = formatInputNumber(node.value);
      if (caretAtEnd) node.setSelectionRange(node.value.length, node.value.length);
    });
  });
  document.querySelectorAll(".tab-button, .js-tab-link").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
  });
  document.querySelectorAll(".sub-tab-button").forEach((button) => {
    button.addEventListener("click", () => activateSubTab(button.dataset.subtabTarget));
  });
  el("category").addEventListener("change", () => {
    populateTransactions();
    calculateUniversal();
  });
  el("searchRates").addEventListener("input", renderRateTable);
  el("resetBtn").addEventListener("click", () => {
    el("whtForm").reset();
    el("amount").value = "";
    populateTransactions();
    calculateUniversal();
  });
}

function activateTab(tabId) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tabTarget === tabId);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
  window.location.hash = tabId;
}

function activateSubTab(tabId) {
  document.querySelectorAll(".sub-tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.subtabTarget === tabId);
  });
  document.querySelectorAll(".sub-tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

function runAll() {
  calculateUniversal();
  calculateSalary();
  calculateRent();
  calculateElectricity();
  calculateCash();
  calculateProperty();
  calculateVehicle();
  renderRateTable();
}

populateControls();
bindEvents();
if (window.location.hash) {
  const hashTab = window.location.hash.replace("#", "");
  if (document.getElementById(hashTab)?.classList.contains("tab-panel")) activateTab(hashTab);
}
runAll();
