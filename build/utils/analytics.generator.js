"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MonthsData = generateLast12MonthsData;
async function generateLast12MonthsData(model) {
    const last12Months = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28);
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);
        const monthYear = endDate.toLocaleDateString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        const filter = {
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            },
        };
        const count = await model.countDocuments(filter);
        last12Months.push({ month: monthYear, count });
    }
    return { last12Months };
}
