import { Injectable } from '@nestjs/common';
import { PorviderRepository } from './provider.repository';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './create-provider.dto';
import { GetProviderName } from './get-roviderName.dto';

@Injectable()
export class ProviderService {
    constructor(private providerRepository: PorviderRepository) {}

    createProvider(createProviderDto: CreateProviderDto): Promise<Provider> {
        return this.providerRepository.createProvider(createProviderDto);
    }

    getProviders(): Promise<GetProviderName> {
        return this.providerRepository.getProviderName();
    }
}
