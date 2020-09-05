import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
