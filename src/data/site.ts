/**
 * Single source of truth for every piece of Plaza Baruj content.
 *
 * Values marked with TODO(content) are placeholders: they render as neutral
 * "por confirmar" labels until the real data is provided. Do not publish the
 * site while any TODO(content) remains.
 */

const CDN = 'https://cdn.flujoo.dev/plaza-baru';

/** Exact pin of the venue, as resolved from the shared Google Maps link. */
export const geo = { lat: 14.4146486, lng: -88.9527101 } as const;
const COORDS = `${geo.lat},${geo.lng}`;

export interface Photo {
	src: string;
	alt: string;
	width: number;
	height: number;
}

const photo = (file: string, alt: string, width = 1080, height = 608): Photo => ({
	src: `${CDN}/${file}`,
	alt,
	width,
	height,
});

export const images = {
	fachada: photo('FachadaFrente.jpeg', 'Fachada de Plaza Baruj vista desde la calle.', 960, 540),
	cuarto1: photo('Cuarto_1.jpeg', 'Primera habitación de una de las unidades del hotel.'),
	cuarto2: photo('Cuarto_2.jpeg', 'Segunda habitación de una de las unidades del hotel.'),
	cama: photo('CamaCuarto.jpeg', 'Detalle de la cama dentro de una habitación.'),
	salaEntrada: photo(
		'SalaEntradaCuartos.jpeg',
		'Sala de estar de una unidad, con la entrada a las habitaciones.',
	),
	salaSola: photo('SoloSala.jpeg', 'La sala de estar de una unidad por sí sola.'),
	salaCocina: photo(
		'SalaDesdeInteriorVistaCocinaySalidaPuerta.jpeg',
		'La sala vista desde el interior, con la cocina y la puerta de salida.',
	),
	cocina: photo('Cocina.jpeg', 'Cocina equipada de una unidad.'),
	bano: photo('ToiletShower.jpeg', 'Baño de una unidad, con toilet y ducha.'),
} satisfies Record<string, Photo>;

export interface SiteConfig {
	name: string;
	/** Canonical origin, e.g. "https://plazabaruj.com". Empty until the domain is chosen:
	 *  canonical, og:url, sitemap and llms.txt links degrade to relative paths. */
	url: string;
	/** Municipality and department, reverse-geocoded from the map pin. */
	locality: string;
	region: string;
	country: string;
	/** First word of the wordmark, set small and letterspaced above the name. */
	nameKicker: string;
	/** The name itself, set large in the display face. */
	nameWord: string;
	tagline: string;
	description: string;
	/** Full international number, digits only, used to build the wa.me link. */
	whatsapp: string;
	/** Human-readable version of the same number. */
	whatsappLabel: string;
	/** Public contact email. Empty hides the email row. */
	email: string;
	/** Street address. Empty hides the address row in favour of the map pin. */
	address: string;
	/** Map pin resolved from the shared Google Maps link. */
	mapsUrl: string;
	/** Turn-by-turn directions deep link (Google Maps). */
	directionsUrl: string;
	/** Waze deep link that starts navigating to the venue. */
	wazeUrl: string;
	/** Instagram handle without the @. Empty hides the row. */
	instagram: string;
}

export const site: SiteConfig = {
	name: 'Plaza Baruj',
	url: '',
	locality: 'San Marcos',
	region: 'Ocotepeque',
	country: 'HN',
	nameKicker: 'Plaza',
	nameWord: 'Baruj',
	tagline: 'Locales comerciales y hotel, bajo un mismo techo.',
	description:
		'Plaza Baruj reúne cinco locales comerciales en planta baja y cinco unidades de hotel equipadas en la segunda planta, en San Marcos, Ocotepeque. Una sola dirección para comprar, atender clientes y hospedarse.',
	whatsapp: '50496015933',
	whatsappLabel: '+504 9601-5933',
	email: '',
	address: '',
	mapsUrl: `https://maps.google.com/?q=${COORDS}`,
	directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`,
	wazeUrl: `https://waze.com/ul?ll=${COORDS}&navigate=yes`,
	instagram: '',
};

export type LocalStatus = 'disponible' | 'ocupado' | 'por-confirmar';

export interface Local {
	slug: string;
	nombre: string;
	rubro: string;
	status: LocalStatus;
	descripcion: string;
}

// TODO(content): replace every entry with the real tenant name and category.
export const locales: Local[] = Array.from({ length: 5 }, (_, index) => {
	const number = String(index + 1).padStart(2, '0');
	return {
		slug: `local-${number}`,
		nombre: `Local ${number}`,
		rubro: 'Por confirmar',
		status: 'por-confirmar' as LocalStatus,
		descripcion: 'Planta baja, con acceso directo desde la calle.',
	};
});

export interface Space {
	titulo: string;
	detalle: string;
}

export const hotel = {
	nombre: 'Hotel Plaza Baruj',
	unidades: 5,
	habitacionesPorUnidad: 2,
	resumen:
		'La segunda planta tiene cinco unidades independientes. Cada una con dos habitaciones, baño, cocina y sala: el mismo equipamiento en todas, listo para recibir a quien llega por una noche o por una temporada.',
	distribucion: [
		{
			titulo: '2 habitaciones',
			detalle: 'En cada unidad, con acceso desde la sala.',
		},
		{ titulo: 'Baño', detalle: 'Con toilet y ducha.' },
		{ titulo: 'Cocina', detalle: 'Equipada, integrada a la sala.' },
		{ titulo: 'Sala', detalle: 'Área de estar que conecta habitaciones y cocina.' },
	] satisfies Space[],
	/** Confirmed by the owner (2026-10): services included with every unit. */
	equipamiento: [
		'Aire acondicionado',
		'Wifi',
		'TV',
		'Agua caliente',
		'Parqueo',
	],
	galeria: [
		images.salaEntrada,
		images.salaCocina,
		images.cocina,
		images.bano,
		images.cama,
		images.salaSola,
	] satisfies Photo[],
};
