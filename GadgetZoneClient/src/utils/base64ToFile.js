const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(",");

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid base64 string: mime type missing");
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8rr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8rr[i] = bstr.charCodeAt(i);
  }

  return new File([u8rr], filename, { type: mime });
};

export default base64ToFile;
