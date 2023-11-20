import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async activationMail(
    name: string,
    email: string,
    activationKey: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'stockon@dcsd.org.br',
      to: email,
      subject: 'Ativação de conta',
      html: `
      <!DOCTYPE html>
      <html>
      
      <head>
        <title>Ativação de Conta</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
      
          .container {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            max-width: 400px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          h2 {
            color: #333;
          }
      
          p {
            color: #333;
          }
      
          .btn {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }
      
          .btn:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <h2>Olá, ${name}!</h2>
          <p>Para ativar sua conta no Stock ON, clique no botão abaixo:</p>
          <a href="http://localhost:3000/active/${activationKey}" class="btn">Ativar conta</a>
        </div>
      </body>
      
      </html>
      
      `,
    });
  }

  async loginMail(
    name: string,
    email: string,
    stayLoggedKey: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'stockon@dcsd.org.br',
      to: email,
      subject: 'Link de login',
      html: `
      <!DOCTYPE html>
      <html>
      
      <head>
        <title>Link de login</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
      
          .container {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            max-width: 400px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          h2 {
            color: #333;
          }
      
          p {
            color: #333;
          }
      
          .btn {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }
      
          .btn:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <h2>Olá, ${name}!</h2>
          <p>Que bom ver você aqui! Agora que você já tem seu e-mail ativado, basta clicar no link abaixo para fazer login na sua conta e começar a usar o StockON!</p>
          <a href="http://localhost:3000/active/${stayLoggedKey}" class="btn">Entrar</a>
        </div>
      </body>
      
      </html>
      
      `,
    });
  }
}
