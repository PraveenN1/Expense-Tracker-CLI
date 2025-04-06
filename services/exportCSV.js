import fs, { ensureDir } from "fs-extra";
import path from "path";
import {Parser} from "json2csv";
import {readExpenses} from "../controllers/expenseController.js";
import chalk from "chalk";

export async function exportCSV(){
    const expenses=await readExpenses();

    if(!expenses.length){
        console.log(chalk.red("No expenses found to export"));
        return;
    }

    const fields=["id","description","date","amount","category"];
    const opts ={fields};
    const parser=new Parser(opts);
    const csv=parser.parse(expenses);

    const exportPath=path.join("exports",`expenses-${Date.now()}.csv`);
    await ensureDir("exports");
    await fs.writeFile(exportPath,csv);
    console.log(chalk.green(`Expenses exported to ${exportPath}`))
};