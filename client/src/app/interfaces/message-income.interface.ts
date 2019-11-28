import IMessage from './message.interface';

export default interface IMessageIncome extends IMessage {
	chatId: string;
}