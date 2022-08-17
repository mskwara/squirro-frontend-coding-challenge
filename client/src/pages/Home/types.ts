export interface IRelation {
  id: string;
  type: string;
}

export interface IAPIBook extends IRelation {
  attributes: {
    name: string;
    copiesSold: number;
  };
  relationships: {
    author: {
      data: IRelation;
    };
  };
}

export interface IAPIAuthor extends IRelation {
  attributes: {
    fullName: string;
  };
}

export interface IAPICountry extends IRelation {
  attributes: {
    code: string;
  };
}

export interface IAPIStore {
  id: string;
  attributes: {
    establishmentDate: string;
    name: string;
    rating: number;
    storeImage: string;
    website: string;
  };
  relationships: {
    books: {
      data: IRelation[];
    };
    countries: {
      data: IRelation;
    };
  };
}

export interface IBook {
  id: string;
  name: string;
  copiesSold: number;
  author: string;
}

export interface IAPIIncluded {
  id: string;
  type: string;
  attributes: {
    [key: string]: any;
  };
  relationships?: {
    [key: string]: {
      data: IRelation;
    };
  };
}
