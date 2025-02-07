import { useState } from "react";
import useIncomeItems from "../../../hook/UseIncomeItems";
import useIncomes from "../../../hook/UseIncomes";
import TimestampConverter from "../../../utils/TimestampConverter";

function IncomesController () {
    const { useIncomeList, getIncomesByUserId, getIncomeByDate, getIncomeById } = useIncomes();

    const [currentDate, setCurrentDate] = useState(new Date())
    

    const CurrentRating = async () => {
        const currentIncome = await getIncomeByDate(new Date());
        const lastIncome = await getIncomeByDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))

        if(!currentIncome && !lastIncome){
            return {
                value: 0
            }
        }

        if(!currentIncome){
            return {
                value: -100
            }
        }

        if(!lastIncome){
            return {
                value: 100
            }
        }

        return {
            value: 0
        }
    }
    
    const CurrentIncomeValue = async () => {
        const currentIncome = await getIncomeByDate(new Date());

        if(currentIncome){
            return {
                value: currentIncome.total
            }
        }

        return {
            value: 0
        }
    }
    return {
        CurrentRating,
        CurrentIncomeValue
    }
}
export default IncomesController