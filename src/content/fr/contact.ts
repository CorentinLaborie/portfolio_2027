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
  messages: {
    sending: string;
    sent: string;
    error: string;
  };
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
  messages: {
    sending: "Envoi en cours…",
    sent: "Merci, votre message a bien été envoyé.",
    error: "Votre message n’a pas pu être envoyé. Réessayez, ou écrivez-nous directement par e-mail.",
  },
  links: [
    { label: contactEmail, href: `mailto:${contactEmail}`, icon: "mail" },
    { label: "+33650510581", href: "tel:+33650510581", icon: "phone" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laborie-corentin/", icon: "linkedin" },
  ],
};
