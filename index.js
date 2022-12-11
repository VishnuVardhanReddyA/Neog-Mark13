const dateEl=document.getElementById('bday')
const btnEl=document.querySelector('.check')
const outputEl=document.querySelector('.output')

btnEl.addEventListener('click',()=>{
    var givenDate=dateEl.value  //yyyy-mm-dd
    if(isDatePalindrome(dateToStr(givenDate))==true)
      outputEl.innerHTML=`It is a palindrome date`
    else
    displayNextPalindromeDate(givenDate)
})

function displayNextPalindromeDate(date){
    var yyyyddmm=dateToStr(date)
    var l=NextPalindromeDate(yyyyddmm)
    var count=l[0]
    var dateinStr=l[1]
    var year=dateinStr.substring(0,4)
    var month=dateinStr.substring(4,6)
    var day=dateinStr.substring(6,8);
    date=day+'-'+month+'-'+year
    outputEl.innerHTML=`The next Palindrome date is ${date}, you missed it by ${count} days`
}

function dateToStr(date){
    var d={day:'',month:'',year:''}
    date=String(date)
    var dl=date.split('-')
    d.year=String(dl[0])
    d.month=String(dl[1])
    d.day=String(dl[2])
    return dl[0]+dl[1]+dl[2];

}

function DateInStandardForm(year,month,day){

    year=String(year);
    month=String(month)
    month = month.padStart(2, '0')
    day=String(day);
    day=day.padStart(2,'0')

    return year+month+day
}

function NextPalindromeDate(dateinStr){

      if(isDatePalindrome(dateinStr)==true){
          return [0,dateinStr]
      }
      var nextDate=getnextDate(dateinStr)
      var c=1
      while(1){
          if(isDatePalindrome(nextDate)==true){
            return [c,nextDate]
          }
          nextDate=getnextDate(nextDate)
          c+=1
      }
}

function getnextDate(dateinStr){

      var year=dateinStr.substring(0,4);
      var month=dateinStr.substring(4,6);
      var day=dateinStr.substring(6,8);

      year=Number(year);
      month=Number(month);
      day=Number(day);

      days=[0,31,28,31,30,31,30,31,31,30,31,30,31];

      day=day+1
      if(day>days[month]){
        if(month==2){
          if(isLeapyear(year) && day==29){
            
          }
          else{
            day=1;
            month+=1;
          }
        }
        else{
          month+=1;
          day=1;
        }
      }
      if(month>12){
        month=1;
        year=year+1;
      }
      
      date=DateInStandardForm(year,month,day);
      return date;
}

function isLeapyear(year){
  if(year%400==0) return true;
  else if(year%100==0) return false;
  return year%4==0;
}

function isDatePalindrome(dateinStr){
    var l=DateInAllFormats(dateinStr)

    for(let i=0;i<l.length;i++){
        if(isPalindrome(l[i])==true){
          return true
        }
    }
    return false
}

function DateInAllFormats(dateinStr){
    
      var year=dateinStr.substring(0,4);
      var month=dateinStr.substring(4,6);
      var day=dateinStr.substring(6,8);

      var mmddyyyy=month+day+year;
      var ddmmyyyy=day+month+year;
      var ddmmyy=day+month+year.substring(2,4);
      var mmddyy=month+day+year.substring(2,4);
      var yyyyddmm=year+day+month;
      var yyddmm=year.substring(2,4)+day+month;

      return [mmddyyyy,ddmmyyyy,ddmmyy,mmddyy,yyyyddmm,yyddmm];

}


function isPalindrome(dateinStr){
    let rs="";
    for(let i=0;i<dateinStr.length;i++){
      rs=rs+dateinStr[dateinStr.length-i-1]
    }
    if(rs==dateinStr)
      return true
    else
      return false
}