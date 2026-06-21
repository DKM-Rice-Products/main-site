import { C } from "@/lib/theme";

export default function Badge({ label, color = C.green, bg = C.greenPale }) {
  return (
    <span style={{ background: bg, color, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}
