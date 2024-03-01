import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { mailerMock } from '../../test/utils/test-objects';

describe('EmailService', () => {
  let service: EmailService;
  let mailerServiceMock: Partial<MailerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: MailerService, useValue: mailerMock },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerServiceMock = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('welcomeEmail', () => {
    it('should send welcome email', async () => {
      const data = { email: 'test@example.com', name: 'Test User' };
      await service.welcomeEmail(data);
      expect(mailerServiceMock.sendMail).toHaveBeenCalledWith({
        to: 'test@example.com',
        subject: 'Welcome to Nice App: Test User',
        template: './welcome',
        context: { name: 'Test User' },
      });
    });
  });

  describe('forgotPasswordEmail', () => {
    it('should send forgot password email', async () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        link: 'https://example.com/reset',
      };
      await service.forgotPasswordEmail(data);
      expect(mailerServiceMock.sendMail).toHaveBeenCalledWith({
        to: 'test@example.com',
        subject: 'Company: Reset Password',
        template: './forgot-password',
        context: { name: 'Test User', link: 'https://example.com/reset' },
      });
    });
  });

  describe('verifyEmail', () => {
    it('should send email verification email', async () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        otp: '123456',
      };
      await service.verifyEmail(data);
      expect(mailerServiceMock.sendMail).toHaveBeenCalledWith({
        to: 'test@example.com',
        subject: 'Company: OTP To Verify Email',
        template: './verify-email',
        context: { name: 'Test User', otp: '123456' },
      });
    });
  });
});
