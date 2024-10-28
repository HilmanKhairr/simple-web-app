export const encodeData = (data: string) => {
  try {
    if (!data) return undefined;
    return encodeURIComponent(btoa(JSON.stringify(data)));
  } catch {
    console.log("error: failed encoding data");
  }
};

export const decodeData = (encodedData: string) => {
  try {
    if (!encodedData) return undefined;
    return JSON.parse(atob(decodeURIComponent(encodedData)));
  } catch {
    console.log("error: failed decoding data");
  }
};
