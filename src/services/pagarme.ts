import pagarme from 'pagarme';
import { format } from 'date-fns';

const API_KEY = 'ak_test_4qhZhjzL7fnvy5AMFluiwBSiDLTMA5';

const defaultCustomer = (data: {
  id?: string;
  name: string;
  document: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
}) => {
  const { id, name, document, email, phoneNumber, birthday } = data;

  return {
    external_id: id || '',
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
  cardNumber: string;
  cardHolderName: string;
  cardExpiration: string;
  cardCode: string;
  usuarioId: string;
  name: string;
  document: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
}) => {
  const {
    price,
    cardNumber,
    cardHolderName,
    cardExpiration,
    cardCode,
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
    const resposne = await pagarme.client
      .connect({ api_key: API_KEY })
      .then((client) =>
        client.transactions.create({
          amount: price,
          payment_method: 'credit_card',
          postback_url: 'https://5766abe859e3.ngrok.io/postback',
          card_number: cardNumber,
          card_holder_name: cardHolderName,
          card_expiration_date: cardExpiration,
          card_cvv: cardCode,
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
              title: 'Pagamento de',
              unit_price: 10000,
              quantity: 1,
              tangible: true,
            },
          ],
          customer,
        })
      );

    return resposne;
  } catch (error) {
    console.log(JSON.stringify(error, null, '\t'));
    return error;
  }
};

export const pagarComBoleto = async (data: {
  price: number;
  name: string;
  document: string;
  dueDate: Date;
  email?: string;
  phoneNumber?: string;
  birthday?: Date;
}) => {
  const { price, name, document, dueDate, email, phoneNumber, birthday } = data;

  const customer = defaultCustomer({
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
          amount: price,
          payment_method: 'boleto',
          postback_url: 'https://5766abe859e3.ngrok.io/postback',
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
