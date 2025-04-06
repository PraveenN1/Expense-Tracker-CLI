import { program } from "commander";
import {addExpense,listExpense} from "./controllers/expenseController.js";
import {exportCSV} from "./services/exportCSV.js";

console.log("Start...")

program.command("add").description("Add a new expense").action(addExpense);
program.command("list").description("List all expense").action(listExpense);
program.command("export").description("Export expenses into csv file").action(exportCSV);

program.parse(process.argv);