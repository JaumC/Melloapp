export const calculateDaysLeft = (endDateStr: string) => {
    const [day, month, year] = endDateStr.split('/');
    const endDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();

    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
};