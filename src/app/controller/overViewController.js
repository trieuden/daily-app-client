import { useState } from "react";
import useSpends from "../../hook/UseSpends";

function OverviewController() {

  const {getSpendByUserIdAndDate, getSpendByUserIdAndBetweenDate} = useSpends()


  //lấy tổng chi tiêu trong 7 ngày trước
  const GetTotalSpends7Days = async (currentAccount ,currentDay) => {    
    let total = 0;
    const lastDays = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 5); 
    
    const spends = getSpendByUserIdAndBetweenDate(currentAccount.id, lastDays, currentDay);
    spends.forEach(spend => {
      total += spend.total;
    });
    return total
  }

  const GetSpendsData7Days = async (currentAccount) => {
    
    const data7days = [
      { id: "1", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
      { id: "2", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
      { id: "3", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
      { id: "4", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
      { id: "5", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
      { id: "6", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
      { id: "7", labels: ["Spend"], data: [0.4], colors: ["#00e699"] },
    ];
    
    const today = new Date();
    
    const total7Days = GetTotalSpends7Days(currentAccount.id, today);    

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date();
      currentDay.setDate(today.getDate() - i);

      const spends = getSpendByUserIdAndDate(currentAccount.id, currentDay);
      if(spends.length) {
        data7days[i] = {
          ...data7days,
          data: spends.total / total7Days,
        }
      }

      data7days[i] = {
        ...data7days[i],
        date: currentDay,
        day: currentDay.toLocaleDateString("en-US", { weekday: "long" }).charAt(0).toLocaleUpperCase(),
      };
    }
    
    return data7days;
  };
  return {
    GetSpendsData7Days,
  };
}
export default OverviewController;
