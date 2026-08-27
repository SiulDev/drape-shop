import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // Cuando estés en local, guarda en tu disco. En producción, se conectará a GitHub.
    kind: 'local',
  },
  collections: {
    productos: collection({
      label: 'Productos del Catálogo',
      slugField: 'nombre',
      path: 'src/content/productos/*',
      format: { data: 'json' },
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre del Producto' } }),
        tallas: fields.text({ label: 'Tallas Disponibles (ej: S - M - L)' }),
        precioUSD: fields.number({ label: 'Precio en Dólares ($)' }),
        enStock: fields.checkbox({ label: '¿Está en Stock?', defaultValue: true }),
        imagen: fields.image({
          label: 'Imagen del Producto',
          // Aquí configuramos para que la imagen vaya sola a tu carpeta pública
          directory: 'public/assets/productos',
          publicPath: '/assets/productos/',
        }),
      },
    }),
  },
});
