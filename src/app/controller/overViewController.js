import { useState } from "react";
import useSpends from "../../hook/UseSpends";
import useIncomes from "../../hook/UseIncomes";

function OverviewController() {
    const { getSpendByUserIdAndDate, getSpendByUserIdAndBetweenDate, getSpendByMonth } = useSpends();
    const { getIncomeByDate } = useIncomes();

    //lấy tổng chi tiêu trong 7 ngày trước
    const GetTotalSpends7Days = async (currentAccount, currentDay) => {
        let total = 0;
        const lastDays = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 5);

        const spends = await getSpendByUserIdAndBetweenDate(1, lastDays, currentDay);

        spends.forEach((spend) => {
            total += spend.total;
        });
        return total;
    };

    //Data for chart 7 days
    const GetSpendsData7Days = async (currentAccount, setData7days) => {
        // dữ liệu gốc
        const data7days = [
            { id: "1", labels: ["Spend"], data: [0], colors: ["#00e699"] },
            { id: "2", labels: ["Spend"], data: [0], colors: ["#00e699"] },
            { id: "3", labels: ["Spend"], data: [0], colors: ["#00e699"] },
            { id: "4", labels: ["Spend"], data: [0], colors: ["#00e699"] },
            { id: "5", labels: ["Spend"], data: [0], colors: ["#00e699"] },
            { id: "6", labels: ["Spend"], data: [0], colors: ["#00e699"] },
            { id: "7", labels: ["Spend"], data: [0], colors: ["#00e699"] },
        ];
        //lấy tổng chi 7 ngày
        const today = new Date();
        const total7Days = await GetTotalSpends7Days(currentAccount, today);

        //cập nhật dữ liệu gốc
        const promises = Array.from({ length: 7 }, async (_, i) => {
            const currentDay = new Date(today.getTime());
            currentDay.setDate(today.getDate() - i);
            const dateStr = currentDay.toISOString().split("T")[0];

            const spends = await getSpendByUserIdAndDate(currentAccount.id, dateStr);
            if (spends.length) {
                data7days[i] = {
                    ...data7days[i],
                    data: [spends[0].total / total7Days],
                };
            }

            data7days[i] = {
                ...data7days[i],
                date: currentDay,
                day: currentDay.toLocaleDateString("en-US", { weekday: "long" }).charAt(0).toLocaleUpperCase(),
            };
        });
        await Promise.all(promises);

        setData7days(data7days);
        return data7days;
    };

    const GetBudgetThisMonth = async (setBudgetThisMonth, setRemainIncomePercent, setRemainSpendPercent) => {
        let incomesTotal = 0;
        let spendsTotal = 0;
        const incomes = await getIncomeByDate(new Date());
        if(incomes)
            incomesTotal = incomes.total;
        const spends = await getSpendByMonth(new Date());
        spends.forEach((item) => {
            spendsTotal += item.total;
        });

        const data = {
            incomes: { total: incomesTotal, list: incomes },
            spends: { total: spendsTotal, list: spends },
        };
        setBudgetThisMonth(data);
        setRemainIncomePercent(incomesTotal / (incomesTotal + spendsTotal));
        setRemainSpendPercent(spendsTotal / (incomesTotal + spendsTotal));
        return data;
    };
    return {
        GetTotalSpends7Days,
        GetSpendsData7Days,
        GetBudgetThisMonth,
    };
}
export default OverviewController;
