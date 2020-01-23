import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration, student } = data;

    console.log('A fila executou!');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula no GymPoint',
      template: 'registration',
      context: {
        name: student.name,
        start_date: format(
          parseISO(registration.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: registration.price,
      },
    });
  }
}

export default new RegistrationMail();
