# 💸 Expense Tracker CLI (https://github.com/PraveenN1/Expense-Tracker-CLI)
A simple command-line Expense Tracker built using Node.js, Inquirer and Commander.js. Track your expenses, filter by category or month, and export to CSV!

---

## 📦 Features

- Add, update, and delete expenses
- View all expenses or filter by category/month
- Monthly expense summary
- Export expenses to a CSV file
- Budget warning (optional)

---

## 🛠 Installation

```bash
git clone https://github.com/PraveenN1/Expense-Tracker-CLI.git
cd expense-tracker-cli
npm install
```

---

## ▶️ Usage

```bash
npm start
```

Or, if using **nodemon**:

```bash
nodemon index.js
```

---

## ⚙️ Commands (via Commander.js)

```bash
# Add a new expense
node index.js add

# List all expenses
node index.js list

# Export to CSV
node index.js export
```

---

## 📁 File Structure

```
├── controllers/
├── data/
│   └── expenses.json
├── services/
│   └── exportCSV.js
├── index.js
└── README.md
```

---

## 🧪 Tech Stack

- Node.js
- Inquirer
- Commander
- Chalk
- fs-extra
- json2csv

---

## 📌 Notes

- All data is stored in `data/expenses.json`
- CSV exports go to the root directory by default

---

## 🧑‍💻 Author

Made with ❤️ by PraveenN1
```
