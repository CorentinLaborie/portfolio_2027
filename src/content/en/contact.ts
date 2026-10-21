import type { ContactContent } from "../fr/contact";
import { contactEmail } from "../shared";

export const contactContent: ContactContent = {
  title: "Contact",
  formLabel: "Contact",
  fields: {
    name: "Your name",
    email: "Email",
    phone: "Phone",
    message: "What is your message",
  },
  submitLabel: "Send",
  messages: {
    sending: "Sending…",
    sent: "Thank you, your message has been sent.",
    error: "Your message could not be sent. Try again, or write to me directly by e-mail.",
    invalidField: "Check this field.",
  },
  links: [
    { label: contactEmail, href: `mailto:${contactEmail}`, icon: "mail" },
    { label: "+33650510581", href: "tel:+33650510581", icon: "phone" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laborie-corentin/", icon: "linkedin" },
  ],
};
