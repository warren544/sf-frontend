import type { CSSProperties } from "react";
import Image from "next/image";
import { avatarHue, initials } from "@/lib/contacts/format";
import type { Contact } from "@/lib/contacts/types";

const SIZES = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
} as const;

export default function ContactAvatar({
  contact,
  size = "md",
}: {
  contact: Pick<
    Contact,
    "first_name" | "last_name" | "email" | "photo_url"
  >;
  size?: keyof typeof SIZES;
}) {
  const style = {
    "--avatar-hue": avatarHue(contact.email),
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      style={style}
      className={`contact-avatar relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-display font-semibold ${SIZES[size]}`}
    >
      {contact.photo_url ? (
        <Image
          src={contact.photo_url}
          alt=""
          fill
          sizes="56px"
          unoptimized
          className="object-cover"
        />
      ) : (
        initials(contact)
      )}
    </span>
  );
}
