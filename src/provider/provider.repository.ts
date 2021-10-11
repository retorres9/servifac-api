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
    const provRucFound = await this.findOne(prov_ruc);
    if (provRucFound) {
      throw new BadRequestException(`RUC ${prov_ruc} already exists!`);
    }
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
      console.error(error);
      if (error.errno === 1062) {
        throw new BadRequestException('Revise RUC o nombre de proveedor, verifique que el ruc o el nombre del proveedor no hayan sido ingresados')
      }
    }
    return provider;
  }

  async getProviderName(): Promise<GetProviderName> {
    const query = this.createQueryBuilder('provider');
    query.select('provider.prov_ruc, provider.prov_name');
    query.where('provider.prov_isActive = true');
    return query.execute();
  }

  async getAllProviders() {
    const query = this.createQueryBuilder('provider');
    query.where('provider.prov_isActive = true');
    return query.getMany();
  }
}
