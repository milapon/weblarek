import { IApi, IProduct, IOrder, IOrderResult } from "../../types";

export class Communication {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProduct[]> {
    return this.api.get<{ total: number; items: IProduct[] }>("/product/").then(data => data.items);
  }

  sendOrder(orderData: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order/", orderData);
  }  
}
