import inquirer from "inquirer";
import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/expenses.json");

export async function readExpenses(){
  const data = await fs.readJSON(filePath);
  return data;
};

const writeExpenses = async (expenses) => {
  await fs.writeJSON(filePath, expenses, { spaces: 2 });
};

export async function addExpense() {
  const answers = await inquirer.prompt([
    { type: "input", name: "description", message: "Expense Description:" },
    { type: "number", name: "amount", message: "Amount:" },
    { type: "input", name: "category", message: "Category (optional):" },
  ]);

  const expense = {
    id: Date.now().toString(),
    ...answers,
    date: new Date().toISOString(),
  };

  const expenses = await readExpenses();
  expenses.push(expense);
  await writeExpenses(expenses);

  console.log(chalk.green("✅ Expense added..."));
}

export async function listExpense() {
    const expenses = await readExpenses();
  
    //Extract month
    const month=[...new Set(expenses.map(e => new Date(e.date).toISOString().slice(6,7)))];

    //Ask user to select month
    const {selectMonth}=await inquirer.prompt([
        {
            type:"list",
            name:"selectMonth",
            message:"Select month to filter by:",
            choices:["All",...month],
        },
    ]);


    // Extract unique categories
    const categories = [...new Set(expenses.map(e => e.category || "General"))];
  
    // Ask user to pick a category
    const { selectedCategory } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedCategory",
        message: "Select category to filter by:",
        choices: ["All", ...categories],
      },
    ]);
  
    // Filter expenses
    const filteredExpenses = expenses.filter(e=>{
        const matchCategory=selectedCategory==="All"||(e.category || "General")===selectedCategory;
        const matchMonth=selectMonth==="All"||new Date(e.date).toISOString().startsWith(selectMonth);
        return matchCategory && matchMonth;
    })
    // Display results
    console.log(chalk.blue(`Expenses (${selectedCategory})`));
    filteredExpenses.forEach((expense, index) => {
      const dateObj = new Date(expense.date);
      const date = dateObj.toISOString().split("T")[0];
      const time = dateObj.toTimeString().split(" ")[0];
  
      console.log(
        `${index + 1} | ${expense.description} | ₹${expense.amount} | ${expense.category || "General"} | ${date} | ${time}`
      );
    });
  };
  
