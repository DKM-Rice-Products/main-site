import { C } from "@/lib/theme";

export default function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.textDark, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
        {label}
        {required && <span style={{ color: C.red }}> *</span>}
      </label>
      {children}
    </div>
  );
}
