/**
 * The guided route through the building, in page order.
 *
 * Stop ids must match the section ids in src/components/*.astro, and they are the
 * anchor targets of the progress indicator.
 */

export interface TourStop {
	id: string;
	numero: string;
	titulo: string;
	piso: string;
}

export const tourStops: TourStop[] = [
	{ id: 'inicio', numero: '01', titulo: 'La calle', piso: 'Calle' },
	{ id: 'plaza', numero: '02', titulo: 'La plaza', piso: 'Calle' },
	{ id: 'locales', numero: '03', titulo: 'Los locales', piso: 'Planta baja' },
	{ id: 'hotel', numero: '04', titulo: 'El hotel', piso: 'Segunda planta' },
	{ id: 'contacto', numero: '05', titulo: 'Contacto', piso: 'Segunda planta' },
];
