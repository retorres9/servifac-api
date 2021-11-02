export interface ClientSales {
    sale_id:           number;
    sale_totalRetail:  number;
    sale_totalPayment: number;
    sale_date:         Date;
    sale_paymentType:  string;
    sale_saleState:    string;
    sale_store:        number;
    sale_maxDate:      null;
    sale_client:       SaleClient;
}

export interface SaleClient {
    cli_ci:        string;
    cli_firstName: string;
    cli_lastName:  string;
    cli_email:     string;
    cli_phone:     string;
    cli_address:   string;
    cli_debt:      string;
    cli_isActive:  boolean;
}
