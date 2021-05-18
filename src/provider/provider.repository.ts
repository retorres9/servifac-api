import { EntityRepository, Repository } from "typeorm"
import { CreateProviderDto } from "./create-provider.dto";
import { GetProviderName } from "./get-roviderName.dto";
import { Provider } from './provider.entity';


@EntityRepository(Provider)
export class PorviderRepository extends Repository<Provider> {
    async createProvider(createProviderDto: CreateProviderDto): Promise<Provider> {
        const {
            prov_ruc,
            prov_name,
            prov_accountName,
            prov_accountType,
            prov_accountNumber,
            prov_debt,
            prov_phone
        } = createProviderDto;
        const provider = new Provider();
        provider.prov_ruc = prov_ruc;
        provider.prov_name = prov_name;
        provider.prov_accountName = prov_accountName;
        provider.prov_accountType = prov_accountType;
        provider.prov_accountNumber = prov_accountNumber;
        provider.prov_debt = prov_debt;
        provider.prov_phone = prov_phone;

        try {
            await provider.save();
        } catch (error) {
            console.log(error);            
        }
        return provider;
    }

    getProviderName(): Promise<GetProviderName> {
        let providers;
        const query = this.createQueryBuilder('provider');
        query.select('provider.prov_ruc, provider.prov_name');
        query.where('provider.prov_isActive = true')
        
        providers = query.execute();
        
        return providers
    }
}