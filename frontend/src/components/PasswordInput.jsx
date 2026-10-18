import { useState } from "react";

export default function PasswordInput({ name, value, onChange, minLength }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-box">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        minLength={minLength}
        required
      />
      <button
        type="button"
        className="toggle-pass"
        onClick={() => setShow(!show)}
      >
        {show ? "Sembunyikan" : "Lihat"}
      </button>
    </div>
  );
}