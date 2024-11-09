// repositories/GenericRepository.ts

import { httpClient, HttpMethod } from "@/helpers/httpClient";
import { IRepository } from "../Interfaces/IRepository";

export class GenericRepository<T extends Record<string, any>>
  implements IRepository<T>
{
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    return await httpClient<T[]>({
      method: HttpMethod.GET,
      endpoint: this.endpoint,
    });
  }

  async getById(id: number): Promise<T> {
    return await httpClient<T>({
      method: HttpMethod.GET,
      endpoint: `${this.endpoint}/${id}`,
    });
  }

  async create(item: T): Promise<T> {
    console.log("Datos recibidos en create:", item);
    
    const response = await httpClient<{ data: T; message: string; success: boolean }>({
        method: HttpMethod.POST,
        endpoint: this.endpoint,
        data: item,
    });

    console.log("Respuesta del servidor:", response);

    if (response.success) {
        return response.data;
    } else {
        console.error("Error al crear:", response.message);
        throw new Error(response.message);
    }
}

  async update(id: number, item: Partial<T>): Promise<T> {
    return await httpClient<T>({
      method: HttpMethod.PUT,
      endpoint: `${this.endpoint}/${id}`,
      data: item,
    });
  }

  async delete(id: number, idUsuario: number): Promise<void> {
    console.log("Datos recibidos en delete:", { id, idUsuario });

    await httpClient<void>({
      method: HttpMethod.DELETE,
      endpoint: `${this.endpoint}/${id}?idUsuario=${idUsuario}`, // Pasa idUsuario en la URL
    });
}

}
