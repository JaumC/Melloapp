import { notifyApiToast, notifyToast } from "@/components/Toast/Toast";
import { ApiAxiosError } from "@/utils/Typos";
import { AxiosError } from "axios";

export const AxiosCatchError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const err = error as ApiAxiosError;

    const apiResponse = err.response?.data;

    if (apiResponse) {
      notifyApiToast(apiResponse);
    } else {
      notifyToast("error", "Erro", "Erro inesperado da API.");
    }

  } else {
    notifyToast("error", "Erro", "Erro desconhecido.");
    console.error("Erro recebido: ", error);
  }
};
