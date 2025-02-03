import React, { useState } from "react";
import * as CryptoJS from "crypto-js";
import "./EncryptorDecryptor.css";

const EncryptorDecryptor = () => {
  const [plainText, setPlainText] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const encryptText = () => {
    if (!plainText || !secretKey) return;
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      mode: CryptoJS.mode.ECB,
    }).toString();
    setEncryptedText(encrypted);
    setDecryptedText("");
  };

  const decryptText = () => {
    if (!encryptedText || !secretKey) return;
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const bytes = CryptoJS.AES.decrypt(encryptedText, key, {
      mode: CryptoJS.mode.ECB,
    });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedText(decrypted || "Invalid Key");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container">
      <h2>🔐 AES Encryptor & Decryptor</h2>

      <input
        type="text"
        placeholder="Enter Secret Key..."
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        className="input"
      />

      <textarea
        placeholder="Enter text to encrypt..."
        value={plainText}
        onChange={(e) => setPlainText(e.target.value)}
      />

      <div className="button-container">
        <button onClick={encryptText} disabled={!plainText || !secretKey}>
          Encrypt
        </button>
        <button onClick={decryptText} disabled={!encryptedText || !secretKey}>
          Decrypt
        </button>
      </div>
      <div className="encryptedTextdecryptedText">
        {encryptedText && (
          <div className="result-container">
            <strong>Encrypted Text:</strong>
            <p className="result">{encryptedText}</p>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(encryptedText)}
            >
              📋 Copy
            </button>
          </div>
        )}

        {decryptedText && (
          <div className="result-container">
            <strong>Decrypted Text:</strong>
            <p className="result">{decryptedText}</p>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(decryptedText)}
            >
              📋 Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncryptorDecryptor;
