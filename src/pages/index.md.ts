import type { APIRoute } from 'astro';
import { geo, hotel, images, locales, site } from '../data/site';

/**
 * Markdown mirror of the landing page, as recommended by the llms.txt spec
 * (`page.html.md` or `page.md` next to the page). Linked from the layout with
 * rel="alternate" type="text/markdown".
 */
export const GET: APIRoute = () => {
	const base = site.url.replace(/\/$/, '');
	const abs = (path: string) => (base ? `${base}${path}` : path);

	const statusLabel = {
		disponible: 'Disponible',
		ocupado: 'Ocupado',
		'por-confirmar': 'Por confirmar',
	} as const;

	const localesMd = locales
		.map((local) => `- **${local.nombre}** — ${statusLabel[local.status]}. ${local.descripcion}`)
		.join('\n');

	const body = `# ${site.name}

> ${site.description}

![${images.fachada.alt}](${images.fachada.src})

## La plaza

Dos plantas, dos formas de usar la misma dirección. En la planta baja, cinco locales comerciales abiertos a la calle. En la segunda planta, el hotel: un piso de distancia entre el comercio y el descanso.

- 05 locales comerciales en planta baja
- 05 unidades de hotel en la segunda planta
- 02 habitaciones dentro de cada unidad

## Los locales

${localesMd}

## El hotel

${hotel.resumen}

Las cinco unidades repiten la misma distribución:

${hotel.distribucion.map((space) => `- **${space.titulo}**: ${space.detalle}`).join('\n')}

Equipamiento en cada unidad: ${hotel.equipamiento.join(', ')}.

### Habitaciones

${[images.cuarto1, images.cuarto2]
	.map((photo) => `![${photo.alt}](${photo.src})`)
	.join('\n\n')}

### Galería

${hotel.galeria.map((photo) => `- [${photo.alt}](${photo.src})`).join('\n')}

## Contacto

- WhatsApp: ${site.whatsappLabel} (${`https://wa.me/${site.whatsapp}`})
- Ubicación: ${site.locality}, ${site.region}, Honduras — ${site.mapsUrl}
- Cómo llegar: ${site.directionsUrl}
- Waze: ${site.wazeUrl}
- Coordenadas: ${geo.lat}, ${geo.lng}

Página original: ${abs('/')}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
