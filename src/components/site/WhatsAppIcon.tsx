interface WhatsAppIconProps {
  size?: number;
  className?: string;
}

export function WhatsAppIcon({ size = 18, className = "" }: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.012 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.758.459 3.474 1.33 4.988L2 22l5.167-1.354a9.927 9.927 0 004.845 1.256h.004c5.505 0 9.967-4.463 9.967-9.969 0-2.662-1.037-5.164-2.924-7.05a9.893 9.893 0 00-7.047-2.923zm5.82 14.161c-.244.687-1.42 1.312-1.96 1.365-.49.05-1.127.076-3.266-.807-2.735-1.128-4.494-3.905-4.63-4.086-.136-.182-1.107-1.474-1.107-2.81 0-1.335.7-1.99.948-2.261.244-.272.541-.34.721-.34.18 0 .36.002.518.009.167.008.391-.063.612.467.226.541.77 1.879.837 2.015.068.136.113.295.023.476-.09.18-.136.294-.27.453-.136.159-.286.356-.408.477-.136.136-.277.284-.118.556.158.272.703 1.161 1.509 1.88 1.037.925 1.91 1.212 2.182 1.348.272.136.431.113.59-.068.158-.182.68-0.793.861-1.065.18-.272.362-.226.612-.136.25.09 1.583.747 1.854.883.272.136.453.204.52.317.068.113.068.657-.176 1.344z" />
    </svg>
  );
}

// Helper to generate encoded WhatsApp link with message
export const WHATSAPP_NUMBER = "8613162555370";
export const WHATSAPP_MESSAGE =
  "Hello JU FAIR GLOBAL team, I am interested in your buyer recruitment and exhibition services. I would like to discuss potential trade opportunities.";

export function getWhatsAppLink(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
