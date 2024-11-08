import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  //Gửi mail đặt hàng
  async sendMailOrder(email: string, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: 'bufun-shop@gmail.com', // override default from
      subject: 'Thông báo từ BUFUN shop !',
      template: './order', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: email,
        confirmation_url,
      },
    });
  }

  //Reset mật khâu
  async resetPassword(email: string, token: string, newPass: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Khôi phục mật khẩu',
      template: './forgetpass', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: email,
        confirmation_url,
        newPass,
      },
    });
  }

  async sendOTP(email: string, token: string, otp: number) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'OTP',
      template: './OTP', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: email,
        confirmation_url,
        otp,
      },
    });
  }
}
