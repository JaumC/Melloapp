import { notifyToast } from "./Toast";

export const getDiffDays = (dataStart: string, dataEnd: string, weekend: boolean) => {
    if (!dataStart || !dataEnd) return;
    if (dataStart > dataEnd) {
      notifyToast('error', 'Erro', 'A data incial deve ser menor do que a final.')
    };

    const [startDay, startMonth, startYear] = dataStart.split('/').map(Number);
    const [endDay, endMonth, endYear] = dataEnd.split('/').map(Number);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let businessDays = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay(); // 0 = Domingo, 6 = Sábado

      if (weekend || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
        businessDays++;
      }
    }

    return businessDays.toString()

  };