const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export function btoa(input: string = '') {
  let str = input;
  let output = '';

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = '='), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
      );
    }

    block = (block << 8) | charCode;
  }

  return output;
}

export function atob(input: string = '') {
  let str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded.",
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
}

export function bufferToBase64String(arrayBuffer: number[]) {
  // idk how this works :(
  return btoa(
    [].reduce.call(
      new Uint8Array(arrayBuffer),
      (p, c) => {
        return p + String.fromCharCode(c);
      },
      '',
    ),
  );
}

export function makeImagesFromResponseBase64(imagesObj: any, isArray: boolean) {
  let arr: string[] = [];

  if (isArray) {
    arr = imagesObj.map(item => {
      return `data:image/jpeg;base64,${bufferToBase64String(
        item.imageObject[0].data.data,
      )}`;
    });

    return arr;
  } else {
    arr = [
      `data:image/jpeg;base64,${bufferToBase64String(
        imagesObj.imageObject[0].data.data,
      )}`,
    ];

    return arr[0];
  }
}
