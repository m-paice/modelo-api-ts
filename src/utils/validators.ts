export default {
  document: (value: string) =>
    /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/.test(value) ? 'pf' : 'pj',
};
