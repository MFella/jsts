export interface IPerson {
  name: string;

  surname: string;

  street: string;

  houseNumber: string;

  apartmentNumber?: number;

  zipCode: string;

  city: string;

  coundtryId?: number;

  children?: IPerson | IPerson[];

  birthday: Date;
}

export interface ICountry {
  id: number;

  name: string;
}

const countries: Array<ICountry> = [
  // : ICountry[]

  { id: 1, name: 'Poland' },

  { id: 2, name: 'Ukraine' },

  { id: 3, name: 'USA' },
];

const arr: Array<IPerson> = [
  // : IPerson[]

  {
    name: 'Alex',

    surname: 'Smith',

    street: 'Marszalkowska',

    houseNumber: '2',

    apartmentNumber: 21,

    zipCode: '03-100',

    city: 'Warsaw',

    coundtryId: 1,

    children: [
      {
        name: 'Max',

        surname: 'Bigowski',

        street: 'Kyivska',

        houseNumber: '25a',

        apartmentNumber: 2,

        zipCode: '10-029',

        city: 'Zhytomierz',

        coundtryId: 2,

        children: [
          {
            name: 'Den',

            surname: 'Bigowski',

            street: 'North',

            houseNumber: '25a',

            zipCode: '10-029',

            city: 'Zhytomierz',

            coundtryId: 3,

            children: [],

            birthday: new Date(2000, 5, 16),
          },
        ],

        birthday: new Date(1980, 5, 16),
      },

      {
        name: 'Bogdan',

        surname: 'Bigowski',

        street: 'Kyivska',

        houseNumber: '25a',

        apartmentNumber: 2,

        zipCode: '10-029',

        city: 'Zhytomierz',

        coundtryId: 2,

        birthday: new Date(1985, 9, 6),
      },
    ],

    birthday: new Date(1960, 0, 1),
  },

  {
    name: 'Walentyn',

    surname: 'Blizniak',

    street: 'Chmielna',

    houseNumber: '105/5',

    zipCode: '03-100',

    city: 'Warsaw',

    children: [
      {
        name: 'Olah',

        surname: 'Hah',

        street: 'Zlota',

        houseNumber: '1',

        apartmentNumber: 2,

        zipCode: '10-029',

        city: 'Poznan',

        birthday: new Date(1985, 0, 1),
      },
    ],

    birthday: new Date(1950, 0, 1),
  },

  {
    name: 'Walentyn',

    surname: 'Blizniak',

    street: 'Chmielna',

    houseNumber: '105/5',

    zipCode: '03-100',

    city: 'Warsaw',

    birthday: new Date(1975, 0, 1),
  },
];

export { arr, countries };
