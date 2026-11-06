export const TEXTOS = {
  global: {
    volver: '← Volver',
    cerrar: 'Cerrar',
    entendido: 'Entendido',
    cancelar: 'Cancelar',
    guardadoOk: 'Guardado en este dispositivo',
    guardadoError: 'No se pudo guardar. Intenta de nuevo.',
  },
  moduloA: {
    titulo: 'Mi presupuesto mensual',
    necesitoAlMes: 'Necesito al mes',
    totalVacio: 'Q 0.00',
    porCategoria: 'Por categoría',
    todosLosGastos: 'Todos los gastos',
    agregarGasto: '+ Agregar un gasto',
    guardarEnTelefono: 'Guardar en el teléfono',
    guardado: 'Guardado ✓',
    guardando: 'Guardando…',
    calcularCuantoDeboPedir: '→ Calcular cuánto debo pedir',
    agregarPrimerGasto: '+ Agregar mi primer gasto',
    estadoVacioTitulo: 'Aún no has registrado ningún gasto',
    estadoVacioSub: 'Piensa qué gastas cada mes: renta, comida, transporte…',
    maxCaracteres: 'Máximo 40 caracteres.',
    nombreVacio: 'Ponle un nombre al gasto.',
    montoVacio: 'Ingresa un monto.',
    montoCero: 'El monto debe ser mayor que cero.',
    montoAlto: 'El monto es demasiado alto.',
  },
  moduloB: {
    tituloEntrada: 'Calcular cuánto pedir',
    etiquetaNeto: 'Necesito recibir al mes',
    placeholderMonto: 'Q 0.00',
    calcular: 'Calcular',
    avisoNeto:
      'Este es el dinero que realmente quieres recibir, ya descontados el IGSS y el ISR.',
    volverACalcular: '← Volver a calcular',
    tituloPlanilla: 'Si estás en planilla',
    deberiasPedir: 'Deberías pedir',
    comoSeCalcula: 'Cómo se calcula',
    tocaCadaLinea: 'Toca cada línea para ver la explicación',
    verSiFacturo: '→ Ver si facturo',
    meta: '≈ meta',
    ajustado: 'Ajustado para acercarse a tu meta',
    avisoLegal: 'Estimación educativa. No sustituye una liquidación oficial.',

    tituloFacturado: 'Si facturas',
    deberiasFacturar: 'Deberías facturar',
    proteccionSalud: 'Protección de salud',
    comparacion: 'Comparación',
    completaPrima: 'Completa la prima del seguro para ver el total',
    netoVacio: 'Ingresa cuánto necesitas recibir.',
    netoCero: 'El monto debe ser mayor que cero.',
    netoAlto: 'El monto es demasiado alto para esta estimación.',
  },
  conceptos: {
    sueldo_base:
      'Es el "salario mensual" que acuerdas con tu empleador. No incluye la bonificación incentivo. Ejemplo: si pides Q4,200 de sueldo base, ese es el monto sobre el que se calculan tus prestaciones.',
    bonificacion_incentivo:
      'Es un pago mensual de Q250 que la ley obliga a darte, además de tu sueldo base. No se incluye en el cálculo del aguinaldo, bono 14 ni vacaciones.',
    igss: 'Es el seguro social de Guatemala. En planilla, cada mes te descuentan el 4.83% de tu sueldo base. Con eso, cuando te jubiles tendrás pensión, y si te enfermas puedes ir al hospital del IGSS. Ejemplo: sueldo base Q4,200 × 4.83% = Q203. Por eso tu neto baja Q203.',
    isr: 'Es el impuesto sobre la renta. Se calcula sobre lo que ganas en todo el año, no solo sobre un mes. Con las reglas de 2026, a los sueldos de entrada normalmente no se les retiene ISR. Ejemplo: con un sueldo base cercano al mínimo, tu retención mensual de ISR será Q0.',

    provision_aguinaldo:
      'Es para que en diciembre recibas un pago extra, equivalente a un sueldo. Se calcula guardando 1/12 cada mes. Si facturas, tú debes apartar ese dinero mes a mes.',
    provision_bono14:
      'Es un segundo pago anual obligatorio, equivalente a un sueldo, que se entrega en julio. También se guarda 1/12 cada mes. Si facturas, tú debes apartarlo.',
    provision_vacaciones:
      'Son 15 días hábiles de vacaciones pagadas al año. Equivalen a medio mes de sueldo. Si facturas, no te los pagan: debes incluirlos en tu precio para poder tomarte ese descanso.',
    igss_voluntario:
      'Es la cuota que puedes pagar por tu cuenta si ya trabajaste en planilla antes. Solo cubre pensión. No cubre consultas, medicinas ni hospitalización. Requisito: haber cotizado al menos 12 meses en los últimos 3 años.',
    seguro_privado:
      'Es un seguro comercial que cubre consultas, medicinas y hospitalización. La prima la defines tú según la póliza que elijas. Como referencia, para jóvenes suele estar entre Q250 y Q900 al mes.',

    impuesto_unico:
      'Es el impuesto único del régimen de Pequeño Contribuyente: 5% sobre tus ingresos brutos. Sustituye al IVA y al ISR. No genera crédito fiscal para quien te contrata, pero es un régimen simplificado para emprendedores. El límite anual del régimen se actualiza cada año: si tus ingresos se acercan al tope, consulta el monto vigente en la SAT.',
  },
} as const;
