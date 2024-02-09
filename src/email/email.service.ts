import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EventPayloads } from '../interface/event-types.interface';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async welcomeEmail(data: EventPayloads['user.welcome']) {
    const { email, name } = data;
    const subject = `Welcome to Nice App: ${name}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },
    });
  }

  async forgotPasswordEmail(data: EventPayloads['user.reset-password']) {
    const { name, email, link } = data;

    const subject = `Company: Reset Password`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './forgot-password',
      context: {
        link,
        name,
      },
    });
  }

  async verifyEmail(data: EventPayloads['user.verify-email']) {
    const { name, email, otp } = data;

    const subject = `Company: OTP To Verify Email`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-email',
      context: {
        otp,
        name,
      },
    });
  }
}
