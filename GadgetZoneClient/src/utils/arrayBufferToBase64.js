const arrayBufferToBase64 = (buffer) => {
  const binary = Array.from(new Uint8Array(buffer))
    .map((byte) => String.fromCharCode(byte))
    .join("");
  return `data:image/jpeg;base64,${btoa(binary)}`;
};

export default arrayBufferToBase64;
