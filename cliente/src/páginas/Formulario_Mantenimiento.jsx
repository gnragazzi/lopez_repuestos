export const Formulario_Mantenimiento = () => {
  const vehiculos = [
    {
      patente: "WUB 750",
      marca: "Scania",
      modelo: "R123",
      cilindrada: "360",
      kilometraje: "100.000km",
      tarjeta_ruta: {
        fecha_emision: new Date(2024, 8, 27),
        fecha_vencimiento: new Date(2025, 8, 27),
      },
      técnica: {
        fecha_emision: new Date(2024, 8, 27),
        fecha_vencimiento: new Date(2025, 8, 27),
        ubicacion: "San Luis",
      },
      seguro: {
        fecha_emision: new Date(2024, 8, 27),
        fecha_vencimiento: new Date(2025, 8, 27),
        pago: 51251,
        tipo: "todo_riesgo",
        nombre: "Seguro Metal",
      },
      semiremolque: "hyu 123",
      viajes: [],
    },
    {
      patente: "ABC 321",
      marca: "Patito",
      tipo: "Tolva",
      carga: "cemento",
      tarjeta_ruta: {
        fecha_emision: new Date(2024, 8, 24),
        fecha_vencimiento: new Date(2025, 8, 4),
      },
      técnica: {
        fecha_emision: new Date(2024, 8, 12),
        fecha_vencimiento: new Date(2025, 4, 17),
        ubicacion: "San Luis",
      },
      seguro: {
        fecha_emision: new Date(2024, 8, 27),
        fecha_vencimiento: new Date(2025, 8, 27),
        pago: 65466,
        tipo: "algún_riesgo",
        nombre: "Seguro Madera",
      },
      camion: "WUB 750",
    },
  ];
  /*
    Vehículo
    Mecánicos
    Trabajos realizados
    Fecha
    Costos_Repuesto
    Costo_mano de obra
    */
  /*
    0. Ir a nuevo mantenimiento
    1. Elegir un vehículo de la lista
    2. Elegir uno o más mecánicos de los disponibles
    ///////////////////////////////////////////////
    3. Describir trabajo,
    4. Seleccionar Fecha
    5. Ingresar costos 
    ///////////////////////////////////////////////
    6. Pantalla de confirmación (debería mostrar toda la info)
    ///////////////////////////////////////////////
    7. Volver a pantalla de
    */
  return <div>Formulario_Mantenimiento</div>;
};
