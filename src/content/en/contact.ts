import type { ContactContent } from "../fr/contact";
import { contactEmail } from "../shared";

export const contactContent: ContactContent = {
  title: "Contact",
  formLabel: "Contact",
  email: contactEmail,
  fields: {
    name: "Your name",
    email: "Email",
    phone: "Phone",
    message: "What is your message",
  },
  submitLabel: "Send",
  mailSubject: "Contact from the website",
  links: [
    { label: contactEmail, href: `mailto:${contactEmail}`, icon: "mail" },
    { label: "+33650510581", href: "tel:+33650510581", icon: "phone" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laborie-corentin/", icon: "linkedin" },
  ],
};
