import { EntityRepository, Repository } from 'typeorm';
import { CreateProviderDto } from './create-provider.dto';
import { GetProviderName } from './get-roviderName.dto';
import { Provider } from './provider.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Provider)
export class PorviderRepository extends Repository<Provider> {
  async createProvider(
    createProviderDto: CreateProviderDto,
  ): Promise<Provider> {
    const {
      prov_ruc,
      prov_name,
      prov_accountName,
      prov_accountType,
      prov_accountNumber,
      prov_debt,
      prov_phone,
    } = createProviderDto;
    console.log(prov_ruc);
    
    const provider = this.create({
      prov_ruc,
      prov_name,
      prov_accountName,
      prov_accountType,
      prov_accountNumber,
      prov_debt,
      prov_phone,
    });

    try {
      await provider.save();
    } catch (error) {
      throw new BadRequestException()
    }
    return provider;
  }

  getProviderName(): Promise<GetProviderName> {
    let providers;
    const query = this.createQueryBuilder('provider');
    query.select('provider.prov_ruc, provider.prov_name');
    query.where('provider.prov_isActive = true');

    providers = query.execute();

    return providers;
  }
}
