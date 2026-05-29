export function InstagramIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="instagramGlow" cx="18%" cy="92%" r="92%">
          <stop offset="0" stopColor="#ffd36b" />
          <stop offset=".24" stopColor="#ff8c33" />
          <stop offset=".53" stopColor="#e9407a" />
          <stop offset=".78" stopColor="#8f35c8" />
          <stop offset="1" stopColor="#3354f2" />
        </radialGradient>
        <linearGradient id="instagramSheen" x1="16" x2="48" y1="8" y2="54">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".55" />
          <stop offset=".42" stopColor="#ffffff" stopOpacity=".05" />
          <stop offset="1" stopColor="#000000" stopOpacity=".16" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#instagramGlow)" />
      <rect width="64" height="64" rx="16" fill="url(#instagramSheen)" />
      <rect x="17" y="17" width="30" height="30" rx="9" fill="none" stroke="#fff" strokeWidth="4.4" />
      <circle cx="32" cy="32" r="7.6" fill="none" stroke="#fff" strokeWidth="4.4" />
      <circle cx="42.2" cy="21.7" r="2.8" fill="#fff" />
    </svg>
  );
}

export function TikTokIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tiktokPanel" x1="8" x2="58" y1="4" y2="60">
          <stop offset="0" stopColor="#161616" />
          <stop offset=".5" stopColor="#050505" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#tiktokPanel)" />
      <path
        fill="#25f4ee"
        d="M36.7 10.5h8c.7 5.1 3.6 8.4 9.1 8.8v8c-3.3.1-6.2-.8-9.1-2.6v14.9c0 7.6-5 13.8-12.7 14.4-7.5.6-13.8-4.2-14.9-11.3-1.1-7.8 4.8-14.5 12.5-14.8 1.1-.1 2.2 0 3.4.3v8.6c-1-.4-2-.5-3.1-.3-2.6.5-4.5 2.8-4.3 5.5.2 2.9 2.7 5 5.7 4.8 3.1-.3 5.4-2.7 5.4-6.3v-30Z"
        opacity=".95"
      />
      <path
        fill="#fe2c55"
        d="M39.7 12.9h7.7c.9 4.6 3.8 7.7 8.9 8v7.6c-3 .1-5.9-.7-8.6-2.3v14.2c0 7.2-4.8 13.1-12.1 13.7-7.1.6-13-3.9-14-10.7-1.1-7.4 4.5-13.8 11.9-14.1 1-.1 2.1 0 3.2.3v8.1c-1-.3-1.9-.4-3-.2-2.5.5-4.3 2.7-4.1 5.2.2 2.8 2.6 4.8 5.4 4.5 2.9-.3 5.1-2.6 5.1-6v-28.3Z"
        opacity=".96"
      />
      <path
        fill="#fff"
        d="M38 11.5h7.8c.8 4.8 3.7 7.9 9 8.3v7.7c-3.2.1-6.1-.8-8.9-2.5v14.5c0 7.4-4.9 13.4-12.4 14-7.3.6-13.4-4-14.5-11-1.1-7.6 4.7-14 12.2-14.4 1.1-.1 2.2 0 3.3.3v8.3c-1-.4-2-.5-3-.3-2.5.5-4.4 2.8-4.2 5.4.2 2.8 2.7 4.9 5.6 4.6 3-.3 5.3-2.7 5.3-6.1V11.5Z"
      />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="youtubeRed" x1="8" x2="56" y1="8" y2="58">
          <stop offset="0" stopColor="#ff2b25" />
          <stop offset=".62" stopColor="#ff0000" />
          <stop offset="1" stopColor="#c70000" />
        </linearGradient>
        <linearGradient id="youtubeGloss" x1="12" x2="52" y1="9" y2="35">
          <stop offset="0" stopColor="#fff" stopOpacity=".42" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="4" y="12" width="56" height="40" rx="12" fill="url(#youtubeRed)" />
      <rect x="4" y="12" width="56" height="40" rx="12" fill="url(#youtubeGloss)" />
      <path d="M27 23.5 43.5 32 27 40.5Z" fill="#fff" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="whatsappGreen" x1="10" x2="54" y1="6" y2="58">
          <stop offset="0" stopColor="#43f06e" />
          <stop offset=".55" stopColor="#25d366" />
          <stop offset="1" stopColor="#0ea34b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#whatsappGreen)" />
      <path
        fill="#fff"
        d="M32.2 14.5c-9.7 0-17.6 7.5-17.6 16.8 0 3.3 1 6.4 2.8 9l-2.9 9.2 9.8-2.8c2.4 1.2 5.1 1.9 7.9 1.9 9.7 0 17.6-7.5 17.6-16.7 0-9.4-7.9-17.4-17.6-17.4Zm0 29.7c-2.5 0-4.8-.7-6.8-1.9l-.7-.4-5.6 1.6 1.6-5.2-.5-.8c-1.4-2-2.1-4.2-2.1-6.2 0-7 6.3-13.2 14-13.2 7.6 0 14.1 6.3 14.1 13.8 0 6.8-6.3 12.3-14 12.3Z"
      />
      <path
        fill="#fff"
        d="M39.6 35.2c-.4-.2-2.7-1.3-3.1-1.5-.4-.1-.8-.2-1.1.2-.3.5-1.2 1.5-1.5 1.8-.3.3-.6.3-1 .1-.4-.2-1.9-.7-3.6-2.2-1.3-1.2-2.2-2.6-2.5-3.1-.3-.4 0-.7.2-.9.3-.3.5-.6.8-.9.2-.3.3-.5.5-.9.2-.3.1-.6 0-.9-.1-.2-1.1-2.6-1.5-3.6-.4-1-.8-.8-1.1-.8h-.9c-.3 0-.9.1-1.3.6-.5.5-1.7 1.7-1.7 4 0 2.4 1.8 4.8 2 5.1.2.3 3.5 5.4 8.7 7.5 1.2.5 2.1.8 2.9 1 1.2.4 2.3.3 3.2.2 1-.1 2.7-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.2-.2-.5-.3-.9-.5Z"
      />
    </svg>
  );
}
