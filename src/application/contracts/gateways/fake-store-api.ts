export interface IFakeStoreAPI {
  getProducts: () => Promise<IFakeStoreAPI.GetProductsResponse>;
  getProductById: (id: string) => Promise<IFakeStoreAPI.GetProductByIdResponse>;
}

export namespace IFakeStoreAPI {
  type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };

  export type GetProductsResponse = Array<Product>;
  export type GetProductByIdResponse = Product;
}
