/**
 * EmailJS configuration for the contact form.
 *
 * EmailJS sends from the browser, so there is no server route and no secret on
 * our side. All three values are public by design — the protection is the domain
 * allowlist in the EmailJS dashboard, which is the one thing that must be set up
 * alongside these keys. Without it anyone could post through the account.
 *
 * Set these in .env.local for development and in the host for production:
 *
 *   NEXT_PUBLIC_EMAILJS_SERVICE_ID
 *   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 *   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 *
 * Until all three are present the form says plainly that it could not send and
 * offers the business development address instead of faking a success message.
 */

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

export const isEmailjsConfigured = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey,
);

/**
 * The variables the EmailJS template receives. Whoever sets the template up in
 * the dashboard references these names, so they are listed in one place rather
 * than scattered through the form.
 *
 * A matching template body would be roughly:
 *
 *   Enquiry type: {{enquiry_type}}
 *   Name:         {{from_name}}
 *   Company:      {{company}}
 *   Email:        {{reply_to}}
 *   Phone:        {{phone}}
 *   Subject:      {{subject}}
 *
 *   {{message}}
 *
 * Set the template's "To" address to business.development@tezragroup.com and
 * its "Reply To" to {{reply_to}}, so replying in the inbox goes to the enquirer.
 */
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
