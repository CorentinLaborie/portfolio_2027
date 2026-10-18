import { contactEmail } from "../shared";

export type ContactIcon = "mail" | "phone" | "linkedin";

type ContactLink = { label: string; href: string; icon: ContactIcon };

export type ContactContent = {
  title: string;
  formLabel: string;
  email: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  submitLabel: string;
  mailSubject: string;
  links: ContactLink[];
};

export const contactContent: ContactContent = {
  title: "Contact",
  formLabel: "Contact",
  email: contactEmail,
  fields: {
    name: "Votre nom",
    email: "E-mail",
    phone: "Téléphone",
    message: "Quel est votre message ?",
  },
  submitLabel: "Envoyer",
  mailSubject: "Contact depuis le site",
  links: [
    { label: contactEmail, href: `mailto:${contactEmail}`, icon: "mail" },
    { label: "+33650510581", href: "tel:+33650510581", icon: "phone" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laborie-corentin/", icon: "linkedin" },
  ],
};
