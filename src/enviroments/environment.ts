// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  recaptcha: {
    siteKey: '6LfL3aAlAAAAAER5RAdwJQf7_-krF_y7R5FnnbpF',
  },
  languages: [
    {
      label: 'Español',
      alias: 'ec',
      icon: 'ec.gif',
    },
    {
      label: 'Ingles',
      alias: 'en',
      icon: 'en.gif',
    },
    {
      label: 'Portugués Brasileño',
      alias: 'br',
      icon: 'br.gif',
    },
    // {
    //   label: 'Francés',
    //   alias: 'fr',
    //   icon: 'fr.gif',
    // },
    // {
    //   label: 'Italiano',
    //   alias: 'it',
    //   icon: 'it.gif',
    // },
    // {
    //   label: 'Mandarín',
    //   alias: 'cn',
    //   icon: 'cn.gif',
    // },
    // {
    //   label: 'Hindi',
    //   alias: 'in',
    //   icon: 'in.gif',
    // },
  ],
};
