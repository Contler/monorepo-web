import { FormCreation } from '../interfaces/form-creation';

export const travelServiceTemplate: FormCreation = {
  name: 'Conserje',
  description: ' Dinos a qué lugar turístico te gustaría ir y cuándo quieres visitarlo ',
  icon: 'fa-map-marker-alt fas',
  form: [
    { description: 'Fecha del servicio', type: 1, option: [] },
    { description: 'Lugar', type: 0, option: [] },
  ],
};

export const cashLoanTemplate: FormCreation = {
  name: 'Prestamos',
  description: ' ¿Necesitas un préstamo en efectivo? Complete esta información. ',
  icon: 'fa-dollar-sign fas',
  form: [
    {
      description: 'Monto en efectivo',
      type: 4,
      money: { money: { name: 'US Dollar', symbol: '$' }, staticMoney: true, nameSelect: '' },
    },
  ],
};

export const exchangeTemplate: FormCreation = {
  name: 'Cambio de divisas',
  description: ' ¿Necesitas un cambio de moneda? Complete esta información. ',
  icon: 'fas fa-futbol',
  form: [
    {
      description: 'Cantidad a cambiar',
      type: 4,
      money: {
        money: { name: 'US Dollar', symbol: '$' },
        staticMoney: false,
        nameSelect: 'Moneda para cambiar',
      },
    },
  ],
};

export const transportTemplate: FormCreation = {
  name: 'Transporte',
  description: ' Podemos ayudarlo con el transporte desde el hotel, complete esta información ',
  icon: 'fas fa-car',
  form: [
    { description: 'Fecha', type: 1 },
    { description: 'Hora de salida', type: 5 },
    { description: 'Destino', type: 3, option: ['Aeropuerto', 'Otro'] },
  ],
};
