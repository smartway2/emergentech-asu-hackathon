var count = 3000;
var heartRate = [];
var stepsPerDay = [];
var temp = [];
var alert = [];
str = ``
while(count > 0){
  heartRate.push(Math.floor((Math.random() * 230) + 65));
  stepsPerDay.push(Math.floor((Math.random() * 15000) + 2700));
  temp.push(Math.floor((Math.random() * 103) + 94));
  count--;
};
for(var i = 0; i < heartRate.length; i++){
  if(heartRate[i] > 200 && temp[i] > 98 || stepsPerDay[i] < 7000){
    alert.push(1);
  }else{
    alert.push(0);
  };
};
for(var j = 0; j < heartRate.length; j++){
  str += `${heartRate[j]}, ${stepsPerDay[j]}, ${temp[j]}, ${alert[j]}
  `
}
console.log(str);
