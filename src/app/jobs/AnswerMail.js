import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { updatedHelpOrder, student } = data;
    console.log('A fila executou!');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'HelpOrder GymPoint',
      template: 'answer',
      context: {
        name: student.name,
        question: updatedHelpOrder.question,
        answer: updatedHelpOrder.answer,
        answerAt: format(
          parseISO(updatedHelpOrder.answer_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
