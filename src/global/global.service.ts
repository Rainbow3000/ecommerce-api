import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  private variables: Record<string, { value: any; timeout: NodeJS.Timeout }> =
    {};

  // Đặt giá trị và đặt thời gian hết hạn
  set(key: string, value: any, expirationTimeMs: number = 5 * 60 * 1000) {
    // Xóa timeout cũ nếu đã tồn tại
    if (this.variables[key]) {
      clearTimeout(this.variables[key].timeout);
    }

    // Lưu giá trị và thiết lập timeout
    const timeout = setTimeout(() => {
      this.clear(key);
    }, expirationTimeMs);

    this.variables[key] = { value, timeout };
  }

  // Lấy giá trị
  get(key: string): any {
    return this.variables[key]?.value;
  }

  // Xóa giá trị
  clear(key: string) {
    if (this.variables[key]) {
      clearTimeout(this.variables[key].timeout);
      delete this.variables[key];
    }
  }

  // Kiểm tra xem giá trị có tồn tại không
  has(key: string): boolean {
    return !!this.variables[key];
  }
}
