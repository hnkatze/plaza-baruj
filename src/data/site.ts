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
	fachada: photo(
		'locales/fachada-completa-angulo.jpeg',
		'Fachada de Plaza Baruj en ángulo desde la calle, con las montañas al fondo.',
		1600,
		1200,
	),
	localFrente: photo(
		'locales/local-vacio-frente.jpeg',
		'Un local vacío visto desde la calle, con la persiana metálica abierta.',
		1600,
		1200,
	),
	localBalcon: photo(
		'locales/local-frente-balcon.jpeg',
		'Frente de un local vacío, con la puerta de madera del balcón arriba.',
		1200,
		1600,
	),
	localInterior: photo(
		'locales/local-vacio-interior.jpeg',
		'Interior de un local vacío, con el piso y las paredes terminados.',
		1200,
		1600,
	),
	localBano: photo(
		'locales/bano-local.jpeg',
		'Baño de un local, con zócalo damero, inodoro y lavamanos.',
		1200,
		1600,
	),
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
	fachadaCalle: photo(
		'locales/fachada-completa-calle.jpeg',
		'Fachada de Plaza Baruj de frente, con los seis locales y las unidades de arriba.',
		1600,
		1200,
	),
} satisfies Record<string, Photo>;

/** A hero slide: the photo it shows plus the one-line caption under the frame. */
export interface HeroFoto extends Photo {
	caption: string;
}

/**
 * The hero carousel. Ordered as the visit reads the building: the street, the
 * ground floor, then the hotel upstairs. The first photo is the one that loads
 * eagerly, so keep the facade first.
 */
export const heroFotos: HeroFoto[] = [
	{ ...images.fachada, caption: 'La plaza desde la calle' },
	{ ...images.fachadaCalle, caption: 'Seis locales, cinco unidades' },
	{ ...images.localFrente, caption: 'Los locales se entregan vacíos' },
	{ ...images.salaEntrada, caption: 'La sala de una unidad' },
	{ ...images.cuarto1, caption: 'Dos habitaciones por unidad' },
];

export interface SiteConfig {
	name: string;
	/** Canonical origin, e.g. "https://plazabaruj.com".
	 *  TODO(domain): still unchosen. While empty, canonical, og:url, the sitemap line
	 *  and the absolute links in llms.txt degrade to relative paths on purpose. */
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
	// TODO(domain): set to the final origin once the domain is registered.
	url: '',
	locality: 'San Marcos',
	region: 'Ocotepeque',
	country: 'HN',
	nameKicker: 'Plaza',
	nameWord: 'Baruj',
	tagline: 'Locales comerciales y hotel, bajo un mismo techo.',
	description:
		'Plaza Baruj reúne seis locales comerciales en planta baja y cinco unidades de hotel equipadas en la segunda planta, en San Marcos, Ocotepeque. Una sola dirección para comprar, atender clientes y hospedarse.',
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
	/** Photo shown as the preview of the unit. Missing until that unit is photographed. */
	foto?: Photo;
}

/**
 * TODO(content): replace every entry with the real tenant name and category, and
 * confirm which photo belongs to which unit. The four photos below are assigned in
 * the order the ground floor was shot, not verified unit by unit: correct `foto`
 * once the owner identifies them. Locals 05 and 06 have no photo yet.
 */
export const locales: Local[] = [
	{
		slug: 'local-01',
		nombre: 'Local 01',
		rubro: 'Por confirmar',
		status: 'por-confirmar',
		descripcion: 'Planta baja, con acceso directo desde la calle.',
		foto: images.localFrente,
	},
	{
		slug: 'local-02',
		nombre: 'Local 02',
		rubro: 'Por confirmar',
		status: 'por-confirmar',
		descripcion: 'Planta baja, con acceso directo desde la calle.',
		foto: images.localBalcon,
	},
	{
		slug: 'local-03',
		nombre: 'Local 03',
		rubro: 'Por confirmar',
		status: 'por-confirmar',
		descripcion: 'Planta baja, con acceso directo desde la calle.',
		foto: images.localInterior,
	},
	{
		slug: 'local-04',
		nombre: 'Local 04',
		rubro: 'Por confirmar',
		status: 'por-confirmar',
		descripcion: 'Planta baja, con acceso directo desde la calle.',
		foto: images.localBano,
	},
	{
		slug: 'local-05',
		nombre: 'Local 05',
		rubro: 'Por confirmar',
		status: 'por-confirmar',
		descripcion: 'Planta baja, con acceso directo desde la calle.',
	},
	{
		slug: 'local-06',
		nombre: 'Local 06',
		rubro: 'Por confirmar',
		status: 'por-confirmar',
		descripcion: 'Planta baja, con acceso directo desde la calle.',
	},
];

/**
 * Photos of the ground floor as delivered (2026-10), collected from the locals that
 * already have one. Derived on purpose: a local that gets a photo enters the gallery
 * on its own, with no second list to keep in sync.
 */
export const localesGaleria: Photo[] = locales.flatMap((local) =>
	local.foto ? [local.foto] : [],
);

/**
 * The two facade shots the hero carousel also uses. They are repeated on purpose in
 * the ground-floor gallery, which opens with the building seen from the street before
 * showing the units inside.
 */
export const galeriaFachadas: Photo[] = [images.fachadaCalle, images.fachada];

export interface Space {
	titulo: string;
	detalle: string;
}

/**
 * Services shared by the whole building, confirmed by the owner (2026-10).
 * They belong to the plaza, not to an individual hotel unit: keep them out of
 * `hotel.equipamiento` so the page never promises them inside a unit.
 */
export const servicios: Space[] = [
	{
		titulo: 'Agua las 24 horas',
		detalle: 'El edificio tiene suministro de agua disponible todo el día.',
	},
	{
		titulo: 'Generador',
		detalle: 'Respaldo eléctrico propio para el edificio.',
	},
	{
		titulo: 'Acceso con tarjeta',
		detalle: 'Las entradas se abren con tarjeta electrónica.',
	},
	{
		titulo: 'Parqueo al frente y al costado',
		detalle: 'Estacionamiento en la parte de enfrente y a un costado, con cerco perimetral.',
	},
	{
		titulo: 'Lavadora y secadora',
		detalle: 'Acceso a lavandería dentro del edificio.',
	},
	{
		titulo: 'Área social',
		detalle: 'Espacio común en la segunda planta, aparte de la sala de cada unidad.',
	},
];

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
	/**
	 * Confirmed by the owner (2026-10): services included inside every unit.
	 * Building-wide services (generator, water, parking, laundry, social area) live
	 * in `servicios` instead, because they are shared and not part of a unit.
	 */
	equipamiento: ['Aire acondicionado', 'Wifi', 'TV', 'Agua caliente'],
	galeria: [
		images.salaEntrada,
		images.salaCocina,
		images.cocina,
		images.bano,
		images.cama,
		images.salaSola,
	] satisfies Photo[],
};
