import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship } from '@keystone-6/core/fields';
// import { document } from '@keystone-6/fields-document';
import type { ServerConfig } from '@keystone-6/core/types';
// import { list } from '@keystone-next/keystone/schema';
// import { cloudinaryImage } from '@keystone-6/cloudinary';
// import { cloudinaryImage } from '@keystone-next/cloudinary';
// import { CloudinaryAdapter } from '@keystone-nex/cloudinary';
// import { text } from '@keystone-next/fields';
// import multer from 'multer';



import dotenv from 'dotenv'
dotenv.config()


export default config({
    db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
  },
  // db: {
  //   provider: 'postgresql',
  //   url: `${process.env.DATABASE_URL}`,
  //   onConnect: async (context) => { },
  //   // Optional advanced configuration
  //   enableLogging: true,
  //   idField: { kind: 'uuid' },
  //   shadowDatabaseUrl: 'postgres://deanscotthorne:chicken@localhost:5432/shadowdb'
 
  // },
     server: {
      cors: { origin: [`${process.env.ORIGIN}`], credentials: true },
      port: Number(process.env.PORT),
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      }
    }),
    // NavLink: list({
    //   access: allowAll,
    //   fields: {
    //     name: text({ validation: { isRequired: true } }),
    //     slug: text()
    //   }
    // }),
    Team: list({
      access: allowAll,
      fields: {
        name: text(),
        players: relationship({ ref: 'Player', many: true }),
        league: text(), 
      }
    }),
     Player: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
        position: text(),
        age: text(),
        previousClub: text(),
        team: relationship({ ref: 'Team', many: false }),
      }
    }),
    Page: list({
      access: allowAll,
      fields: {
        name: text(),
        slug: text({ validation: { isRequired: true } }),
      //   content: document({
      //   formatting: true,
      //   links: true,
      //   dividers: true,
      //   layouts: [
      //     [1, 1],
      //     [1, 1, 1],
      //     [2, 1],
      //     [1, 2],
      //     [1, 2, 1],
      //   ],
      // }),
      metaTitle: text(),
      metaDescription: text(),
      }
    }),
    Sponsor: list({
      access: allowAll,
      fields: {
        title: text({validation:  {isRequired: true} }),
        link: text(),
        // images: cloudinaryImage({
        //       cloudinary: {
        //         cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        //         apiKey: `${process.env.CLOUDINARY_API_KEY}`,
        //         apiSecret: `${process.env.CLOUDINARY_API_SECRET}`,
        //         folder: `${process.env.CLOUDINARY_API_FOLDER}`,         
        //       },   
        //     }),
      },
      ui: {
        listView: {
          initialColumns: ['title', 'images'],
        },
      },
    })
  }}
)

// import { config } from '@keystone-6/core';
// import type { ServerConfig } from '@keystone-6/core/types';
// import lists from './lists'
// import { withAuth, session } from './auth';

// import dotenv from 'dotenv'
// dotenv.config()

// export default config(
//     withAuth({
//     db: {
//       provider: 'mysql',
//       url: `${process.env.DATABASE}`,
//       onConnect: async context => { /* ... */ },
//       // Optional advanced configuration
//       enableLogging: true,
//       useMigrations: true,
//       idField: { kind: 'uuid' },
//     },
//     lists,
//     session,
//     ui: {
//       isAccessAllowed: (context) => !!context.session?.data,
//     },
//     server: {
//       cors: { origin: [`${process.env.ORIGIN}`], credentials: true },
//       port: Number(process.env.PORT),
//       maxFileSize: 200 * 1024 * 1024,
//       healthCheck: true,
//     },
// }
//   ));