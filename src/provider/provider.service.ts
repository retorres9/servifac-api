import { Injectable } from '@nestjs/common';
import { ProviderRepository } from './provider.repository';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './create-provider.dto';
import { GetProviderName } from './get-roviderName.dto';

@Injectable()
export class ProviderService {
    constructor(private providerRepository: ProviderRepository) {}

    createProvider(createProviderDto: CreateProviderDto): Promise<Provider> {
        return this.providerRepository.createProvider(createProviderDto);
    }

    getProviders() {
        return this.providerRepository.getAllProviders();
    }

    getProvidersName(): Promise<GetProviderName> {
        return this.providerRepository.getProviderName();
    }

    getProvider(ruc: string) {
        return this.providerRepository.getProvider(ruc);
    }
}
