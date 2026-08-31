import { config, fields, collection } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd ? { kind: 'cloud' } : { kind: 'local' },
  cloud: { project: 'TU-EQUIPO/TU-PROYECTO' },
  collections: {
    productos: collection({
      label: 'Productos',
      slugField: 'nombre',
      path: 'src/content/productos/*',
      schema: {
        nombre: fields.text({ label: 'Nombre' }),
        marca: fields.text({ label: 'Marca (ej: Essentials, Corteiz)' }),
        tallas: fields.text({ label: 'Tallas' }),
        precioUSD: fields.number({ label: 'Precio USD' }),
        enStock: fields.checkbox({ label: 'En stock' }),
        imagen: fields.text({ label: 'Imagen' }),
      },
    }),
  },
});
