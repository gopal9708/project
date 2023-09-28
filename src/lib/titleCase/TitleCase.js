const toTitleCase = (strng) => {
  if (strng) {
    let strg = strng.trim();
    strg = strg.split(" ");
    let clean_list = [];
    for (let index = 0; index < strg.length; index++) {
      const element = strg[index];
      if (element !== "") {
        clean_list.push(element);
      }
    }

    let temp = [];
    for (let index = 0; index < clean_list.length; index++) {
      const str = clean_list[index];
      let first_letter = str[0].toUpperCase();
      let other_str = str.substring(1, str.length).toLowerCase();
      let final_string = first_letter + other_str;
      temp.push(final_string);
    }

    let result_str = temp.join(" ");

    return result_str;
  }
  return strng;
};

export default toTitleCase;
