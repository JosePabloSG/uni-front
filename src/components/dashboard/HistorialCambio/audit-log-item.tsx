'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, User, Calendar, Database, FileText, ArrowRight } from "lucide-react"
import React from 'react'

type AuditLogItemProps = {
  idHistorialCambio: number
  usuario: string
  fecha: string
  tabla: string
  idRegistro: number
  accionRealizada: string
  datosAnteriores: string | null
  datosNuevos: string | null
}

export default function AuditLogItem({
  idHistorialCambio,
  usuario,
  fecha,
  tabla,
  idRegistro,
  accionRealizada,
  datosAnteriores,
  datosNuevos
}: AuditLogItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatData = (data: string | null) => {
    if (!data) return "N/A"
    try {
      const parsedData = JSON.parse(data)
      return (
        <div className="space-y-2">
          {Object.entries(parsedData).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <span className="font-medium text-sm text-muted-foreground">{key}:</span>
              <span className="text-sm">{String(value)}</span>
            </div>
          ))}
        </div>
      )
    } catch {
      return data
    }
  }

  const getBadgeColor = (action: string) => {
    switch (action.toUpperCase()) {
      case 'INSERT':
        return 'bg-green-500'
      case 'UPDATE':
        return 'bg-yellow-500'
      case 'DELETE':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Cambio ID: {idHistorialCambio}
        </CardTitle>
        <Badge className={getBadgeColor(accionRealizada)}>{accionRealizada}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{usuario}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{new Date(fecha).toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Database className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{tabla}</span>
          </div>
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">ID Registro: {idRegistro}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" /> Ocultar detalles
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" /> Ver detalles
            </>
          )}
        </Button>
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-muted-foreground" />
                    Datos Anteriores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background p-3 rounded-md shadow-sm">
                    {formatData(datosAnteriores)}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-muted-foreground" />
                    Datos Nuevos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background p-3 rounded-md shadow-sm">
                    {formatData(datosNuevos)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}