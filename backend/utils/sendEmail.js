import { transporter } from "../config/mailer.js";
import { loadTemplate } from "../utils/emailTemplates.js";

export const sendEmail = async (email, subject, templateName, data) => {
  if (process.env.NODE_ENV !== "test") {
    try {
      const htmlContent = await loadTemplate(templateName, data);

      const mailOptions = {
        from: `"FoodApp" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: "void@gmail.com",
        subject: subject,
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email - ${subject} - has been send to ${email}`);
    } catch (error) {
      console.error("Sending email failed", error);
    }
  }
};
