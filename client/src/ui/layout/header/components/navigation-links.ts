import * as ROUTES from "../../../../routes/constants";

interface LinkType {
    title: string;
    path: string;
}

export const navigationLinksMiddle: LinkType[] = [
    { title: "catalog", path: ROUTES.CATALOG },
    { title: "About", path: ROUTES.ABOUT },
    { title: "Contact", path: ROUTES.CONTACT },
];

export const navigationLinksRight: LinkType[] = [
    { title: "Login", path: ROUTES.CATALOG },
    { title: "Register", path: ROUTES.ABOUT },
];
