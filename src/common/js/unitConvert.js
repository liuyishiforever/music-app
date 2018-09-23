export function unitConvert(value, symbol) {  //两个参数，一个是值，一个是货币类型（￥,$）
  let obj = {
    symbol: symbol || "",    //货币类型
    int: undefined,    //整数位
    dec: undefined,  //小数位
    targ: "",          //正负
    units: ['', '万', '亿', '万亿', '亿亿']
  }


  if (value >= 10000) {
    let units = 0;
    value = Number(value);
    while (value > 10000) {
      value = value / 10000;
      units++;
    }

    value = value.toFixed(2);
    let arr = String(value).split(".");
    obj.dec = arr[1];
    obj.int = arr[0];
    if (obj.int.length > 3) {
      obj.int = obj.int.replace(/(.{1})/, '$1,')
    }

    return obj.targ + obj.int + "." + obj.dec + obj.units[units];

  } else {
    return value;
  }


}
