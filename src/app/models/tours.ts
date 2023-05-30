export interface ITours {
    name: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    id: string,
    type: string,
    date: string,
    _id: string
}

export interface ITourTypeSelect {
    label?: string,
    value?: string,
    date?: string
}

export interface INearestTour extends ITours {
    locationId: string
}

export interface ITourLocation {
    name: string,
    id: string
}

export interface ICustomTicketData extends INearestTour {
    region: ITourLocation
}