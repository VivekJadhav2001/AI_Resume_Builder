const PLAIN_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?@#$%^&*()-_=+[]{}<>/|\\\"'";

const GANDHARI_SET = [
  "𐨀","𐨁","𐨂","𐨃","𐨄","𐨅","𐨆","𐨇","𐨈","𐨉",
  "𐨊","𐨋","𐨌","𐨍","𐨎","𐨏","𐨐","𐨑","𐨒","𐨓",
  "𐨔","𐨕","𐨖","𐨗","𐨘","𐨙","𐨚","𐨛","𐨜","𐨝",
  "𐨞","𐨟","𐨠","𐨡","𐨢","𐨣","𐨤","𐨥","𐨦","𐨧",
  "𐨨","𐨩","𐨪","𐨫","𐨬","𐨭","𐨮","𐨯","𐨰","𐨱",
  "𐨲","𐨳","𐨴","𐨵","𐨶","𐨷","𐨸","𐨹","𐨺","𐨻",
  "𐨼","𐨽","𐨾","𐨿","𐩀","𐩁","𐩂","𐩃","𐩄","𐩅",
  "𐩆","𐩇","𐩈","𐩉","𐩊","𐩋","𐩌","𐩍","𐩎","𐩏",
  "𐩐","𐩑","𐩒","𐩓","𐩔","𐩕","𐩖","𐩗","𐩘","𐩙",
  "𐩚","𐩛","𐩜","𐩝","𐩞","𐩟"
];


// Function to encrypt a string using a simple substitution cipher
export function encryptData(message) {
  // This will hold the encrypted text
  let encrypted = "";

  // Loop through each character in the input message
  for (let char of message) {
    // Find the index of the character in the plain set
    const index = PLAIN_SET.indexOf(char);

    if (index !== -1) {
      // If the character exists in the plain set, 
      // replace it with the corresponding character from the encrypted set
      encrypted += GANDHARI_SET[index];
    } else {
      // If the character is not in the plain set, keep it as is
      encrypted += char;
    }
  }

  // Return the final encrypted string
  return encrypted;
}




// Function to decrypt a string using a simple substitution cipher
export function decryptData(encrypted) {
  // This will hold the decrypted text
  let decrypted = "";

  // Loop through each character in the encrypted string
  for (let char of encrypted) {
    // Find the index of the character in the encrypted set
    const index = GANDHARI_SET.indexOf(char);

    if (index !== -1) {
      // If the character exists in the encrypted set, 
      // get the corresponding character from the plain set
      decrypted += PLAIN_SET[index];
    } else {
      // If character is not in the encrypted set, just keep it as is
      decrypted += char;
    }
  }

  // Return the final decrypted string
  return decrypted;
}

