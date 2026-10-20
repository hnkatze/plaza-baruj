import type { APIRoute } from 'astro';
import { geo, hotel, images, site } from '../data/site';

/**
 * llms.txt (spec v2, llmstxt.org): H1 + blockquote summary, plain details, then
 * H2 sections with link lists. Generated from the same data the page renders,
 * so it cannot drift from the site.
 */
export const GET: APIRoute = () => {
	const base = site.url.replace(/\/$/, '');
	const abs = (path: string) => (base ? `${base}${path}` : path);

	const body = `# ${site.name}

> Plaza de dos plantas en ${site.locality}, ${site.region}, Honduras: cinco locales comerciales en planta baja y cinco unidades de hotel equipadas en la segunda planta.

La planta baja tiene cinco locales comerciales con acceso directo desde la calle. La segunda planta tiene cinco unidades de hotel independientes; cada una con dos habitaciones, baño, cocina y sala, e incluye aire acondicionado, wifi, TV, agua caliente y parqueo.

Datos verificables:

- Ubicación: ${site.locality}, ${site.region}, Honduras. No hay dirección con nomenclatura publicada; se usa el pin del mapa.
- Pin del mapa: ${site.mapsUrl}
- Cómo llegar: ${site.directionsUrl}
- Waze: ${site.wazeUrl}
- WhatsApp y teléfono: ${site.whatsappLabel}
- Coordenadas: ${geo.lat}, ${geo.lng}
- Hotel: ${hotel.unidades} unidades, ${hotel.habitacionesPorUnidad} habitaciones por unidad.
- Equipamiento en cada unidad: ${hotel.equipamiento.join(', ')}.
- Los nombres de los locales de planta baja todavía no se publican.
- Idioma del sitio: español.

## Páginas

- [Inicio](${abs('/')}): la única página del sitio; recorre la fachada, la plaza, los cinco locales, el hotel y el contacto.
- [Inicio en Markdown](${abs('/index.md')}): la misma página en texto plano, para leerla directo sin HTML.

## Imágenes

${hotel.galeria.map((photo) => `- [${photo.alt}](${photo.src})`).join('\n')}

## Opcional

- [Fachada](${images.fachada.src}): foto del edificio desde la calle.
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
