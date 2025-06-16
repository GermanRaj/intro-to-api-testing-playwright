
export class orderDto {
  status: string;
  courierId: number;
  customerName: string
  customerPhone: string
  comment: string
  id: number

  private constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number

  ) {
    this.status = status;
    this.courierId = courierId;
    this.customerName = customerName;
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }
  static createOrderWithRandomData():orderDto {
    return new orderDto(
      "OPEN",
      Math.floor(Math.random() *100),
      "Hello World",
      '232323',
      "Hey",
      Math.floor(Math.random() *100),
    )
  }
}