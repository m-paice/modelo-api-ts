const csv = require('csv-parser');
const fs = require('fs');

export interface DataCsv {
  NOME: string;
  DOCUMENTO: string;
  ASSOCIADO: string;
  SEQDIV: string;
  INCLUSAO: string;
  STATUS: string;
  TIPODOC: string;
  CONTRATO: string;
  VALOR: string;
  VENCIMENTO: string;
}

const readingFile = (file: string): Promise<DataCsv[]> => {
  const result: DataCsv[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csv({ separator: ';' }))
      .on('data', (row: any) => {
        result.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(result);
      });
  });
};

export default readingFile;
