/** EmailJS config. All three keys are public — the domain allowlist is what protects the account. */

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

export const isEmailjsConfigured = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey,
);

/** The variables the EmailJS template receives. Set To = business development, Reply To = {{reply_to}}. */
export type EnquiryTemplateParams = {
  enquiry_type: string;
  from_name: string;
  company: string;
  reply_to: string;
  phone: string;
  subject: string;
  message: string;
  to_email: string;
};
