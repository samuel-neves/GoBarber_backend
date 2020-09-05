import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ListProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const providerMonthAvailability = await listProviderMonthAvailability.execute(
      {
        provider_id,
        month: Number(month),
        year: Number(year),
      },
    );

    return response.json(providerMonthAvailability);
  }
}
