export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactField = keyof ContactInput;

export type ContactValidation =
  | { ok: true; value: ContactInput }
  | { ok: false; field: ContactField };

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const PHONE_MAX = 30;
const MESSAGE_MAX = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+0-9 ().-]*$/;

/** Reads the form body and returns the cleaned values, or the first field that is not acceptable. */
export function validateContact(body: unknown): ContactValidation {
  if (typeof body !== "object" || body === null) {
    return { ok: false, field: "name" };
  }
  const read = (key: ContactField): string => {
    const value = (body as Record<string, unknown>)[key];
    return typeof value === "string" ? value.trim() : "";
  };

  const value: ContactInput = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    message: read("message"),
  };

  if (value.name === "" || value.name.length > NAME_MAX) {
    return { ok: false, field: "name" };
  }
  if (value.email.length > EMAIL_MAX || !EMAIL_PATTERN.test(value.email)) {
    return { ok: false, field: "email" };
  }
  if (value.phone.length > PHONE_MAX || !PHONE_PATTERN.test(value.phone)) {
    return { ok: false, field: "phone" };
  }
  if (value.message === "" || value.message.length > MESSAGE_MAX) {
    return { ok: false, field: "message" };
  }

  return { ok: true, value };
}
