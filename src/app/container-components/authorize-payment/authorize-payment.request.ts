export interface AuthorizePaymentRequest {
    transactionReference: string;
    instruction: Instruction;
}
interface Instruction {
    description: string;
    value: Value;
    paymentInstrument: PaymentInstrument;
}
interface Value {
    currency: string;
    amount: number;
}
interface PaymentInstrument {
    cvc: string;
    type: string;
    cardNumber: string;
    cardHolderName: string;
    billingAddress?: BillingAddress;
    cardExpiryDate: CardExpiryDate;
}
interface BillingAddress {
    address1: string;
    address2: string;
    countryCode: string;
    postalCode: string;
    state: string;
}
interface CardExpiryDate {
    month: number;
    year: number;
}

