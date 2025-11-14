import { IBuyer } from "../../types/index.ts";

export class Customer implements IBuyer {
  payment: "cash" | "card" | "";
  email: string;
  phone: string;
  address: string;

  constructor(
    payment: "cash" | "card" | "",
    email: string,
    phone: string,
    address: string
  ) {
    this.payment = payment;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  setPayment(payment: "cash" | "card" | ""): void {
    this.payment = payment;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clearPayment(): void {
    this.payment = "";
  }

  clearAddress(): void {
    this.address = "";
  }

  clearEmail(): void {
    this.email = "";
  }

  clearPhone(): void {
    this.phone = "";
  }

  validateForm(): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    if (!this.payment) {
      errors.payment = "Не выбран вид оплаты";
    }
    if (!this.address) {
      errors.address = "Введите адрес доставки";
    }
    if (!this.phone) {
      errors.phone = "Введите номер телефона";
    }
    if (!this.email) {
      errors.email = "Введите почту";
    }
    return errors;
  }
}