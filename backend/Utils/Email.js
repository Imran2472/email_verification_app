import { transporter } from "./Email.Config.js";
import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./Email.Templates.js";

export const SendVerificationCode = async (email, verificationcode) => {
  try {
    const Response = await transporter.sendMail({
      from: '"Code With Imran 👻" <accappweb@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationcode
      ), // html body
    });

    console.log("Message sent :", Response);
  } catch (error) {
    console.error("Error occurred while sending email :", error.message);
  }
};

export const VeriFyEmail = async (email, fullname) => {
  try {
    const Response = await transporter.sendMail({
      from: '"Code With Imran 👻" <accappweb@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: Welcome_Email_Template.replace("{name}", fullname), // html body
    });

    console.log("Message sent :", Response);
  } catch (error) {
    console.error("Error occurred while sending email :", error.message);
  }
};
