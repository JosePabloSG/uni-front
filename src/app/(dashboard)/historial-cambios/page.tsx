"use client";

import React from "react";
import { useGetAllHistorialCambio } from "@/hooks";
import AuditLogItem from "@/components/dashboard/HistorialCambio/audit-log-item";

export default function AuditLogViewer() {
  const { historialCambio } = useGetAllHistorialCambio();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visor de Auditoría</h1>
          {historialCambio &&
            historialCambio.map((item: any) => (
              <AuditLogItem
                key={item.idHistorialCambio}
                idHistorialCambio={item.idHistorialCambio}
                usuario={item.usuario}
                fecha={item.fecha}
                tabla={item.tabla}
                idRegistro={item.idRegistro}
                accionRealizada={item.accionRealizada}
                datosAnteriores={item.datosAnteriores}
                datosNuevos={item.datosNuevos}
              />
            ))}
    </div>
  );
}
