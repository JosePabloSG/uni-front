// helpers/httpClient.ts

import { BaseResponse } from "@/types";
import { HttpError, BusinessError } from "./errors";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface HttpClientOptions {
  method: HttpMethod;
  endpoint: string;
  data?: any;
  headers?: HeadersInit;
  expectBaseResponse?: boolean;
}

async function httpClient<T>({
  method,
  endpoint,
  data,
  headers,
  expectBaseResponse = true,
}: HttpClientOptions): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
    config
  );

  let responseData: any = null;

  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    responseData = await response.json();
  } else if (contentType && contentType.includes("text/")) {
    responseData = await response.text();
    try {
      responseData = JSON.parse(responseData);
    } catch {
      // Si no es JSON, mantener como texto
    }
  } else {
    // Intentar parsear como JSON
    const textData = await response.text();
    try {
      responseData = JSON.parse(textData);
    } catch {
      responseData = textData;
    }
  }

  if (!response.ok) {
    const error = new HttpError(
      responseData?.message || "Ocurrió un error en la solicitud",
      response.status,
      responseData
    );
    throw error;
  }

  if (expectBaseResponse) {
    if (!responseData) {
      throw new BusinessError(
        "Respuesta inválida del servidor",
        response.status,
        responseData
      );
    }

    const baseResponse = responseData as BaseResponse<T>;

    if (!baseResponse.success) {
      const error = new BusinessError(
        baseResponse.message || "Operación fallida",
        response.status,
        baseResponse.data
      );
      throw error;
    }

    return baseResponse.data;
  } else {
    return responseData as T;
  }
}

export { httpClient, HttpMethod };
export type { HttpClientOptions };
