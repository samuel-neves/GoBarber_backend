import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthDTO): Promise<Appointment[]>;
}
