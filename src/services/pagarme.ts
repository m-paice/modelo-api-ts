import pagarme from 'pagarme';
import { format } from 'date-fns';

const URL_ENV = {
  development: '',
  production: 'https://api.qa.credas.com.br',
};

const KEY_ENV = {
  development: 'ak_test_4qhZhjzL7fnvy5AMFluiwBSiDLTMA5',
  production: 'ak_live_WSMtLvK2ItOPteW3xlaerIzxJO6Abf',
};

const API_KEY = KEY_ENV.production;
const POSTBACK_URL = `${URL_ENV.production}/postback`;

const defaultCustomer = (data: {
  id: string;
  name: string;
  document: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
}) => {
  const { id, name, document, email, phoneNumber, birthday } = data;

  return {
    external_id: id,
    type: 'individual',
    country: 'br',
    name,
    email,
    phone_numbers: [`+55${phoneNumber.replace(/([^\d])+/gim, '')}`],
    birthday: format(birthday, 'yyyy-MM-dd'),
    documents: [
      {
        type: 'cpf',
        number: document,
      },
    ],
  };
};

export const pagarComCartao = async (data: {
  price: number;
  installments: number;
  cardHash: string;
  usuarioId: string;
  name: string;
  document: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
}) => {
  const {
    price,
    installments,
    cardHash,
    usuarioId,
    name,
    document,
    email,
    phoneNumber,
    birthday,
  } = data;

  const customer = defaultCustomer({
    id: usuarioId,
    name,
    document,
    email,
    phoneNumber,
    birthday,
  });

  try {
    const response = await pagarme.client
      .connect({ api_key: API_KEY })
      .then((client) =>
        client.transactions.create({
          async: false,
          amount: price,
          card_hash: cardHash,
          installments,
          payment_method: 'credit_card',
          postback_url: POSTBACK_URL,
          billing: {
            name: 'Trinity Moss',
            address: {
              country: 'br',
              state: 'sp',
              city: 'Cotia',
              neighborhood: 'Rio Cotia',
              street: 'Rua Matrix',
              street_number: '9999',
              zipcode: '06714360',
            },
          },
          items: [
            {
              id: 'r123',
              title: 'Pagamento de débito',
              unit_price: price,
              quantity: 1,
              tangible: true,
            },
          ],
          customer,
        })
      );

    return response;
  } catch (error) {
    console.log(JSON.stringify(error, null, '\t'));
    return error;
  }
};

export const pagarComBoleto = async (data: {
  usuarioId: string;
  price: number;
  name: string;
  document: string;
  dueDate: Date;
  email: string;
  phoneNumber: string;
  birthday: Date;
}) => {
  const {
    usuarioId,
    price,
    name,
    document,
    dueDate,
    email,
    phoneNumber,
    birthday,
  } = data;

  const customer = defaultCustomer({
    id: usuarioId,
    name,
    document,
    email,
    phoneNumber,
    birthday,
  });

  try {
    const response = await pagarme.client
      .connect({ api_key: API_KEY })
      .then((client) =>
        client.transactions.create({
          async: false,
          amount: price,
          payment_method: 'boleto',
          postback_url: POSTBACK_URL,
          boleto_expiration_date: dueDate,
          customer,
        })
      );

    return response;
  } catch (error) {
    console.log(JSON.stringify(error, null, '\t'));
    return error;
  }
};
