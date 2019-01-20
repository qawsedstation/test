export interface CancelPaymentResponse {
    _links: _links;
}
// tslint:disable-next-line:class-name
interface _links {
    'payments:events': {
        href: string;
    };
    curies: CuriesItem[];
}
interface CuriesItem {
    name: string;
    href: string;
    templated: boolean;
}

