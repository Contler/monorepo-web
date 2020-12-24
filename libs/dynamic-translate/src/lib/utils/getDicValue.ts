export function getDicValue(dic: any, keys: string[]) {
  if (keys.length === 1) {
    return dic[keys[0]];
  } else if (!dic) {
    return null;
  } else {
    const key = keys.shift();
    const newDic = dic[key];
    return !!newDic ? getDicValue(newDic, keys) : null;
  }
}
