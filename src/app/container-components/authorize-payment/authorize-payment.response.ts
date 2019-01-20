export interface AuthorizePaymentResponse {
    outcome: string;
    _links: _links;
}
// tslint:disable-next-line:class-name
interface _links {
    'payments:cancel': {
        href: string;
    };
    'payments:settle': {
        href: string;
    };
    'payments:partialSettle': {
        href: string;
    };
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

