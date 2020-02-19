/*Notes*/

window.onload = function() {startTime()};

function localSave(){
	var textToSave2 = document.getElementById("textdata").value;
	textToSave2 = textToSave2.replace(/([^\r])\n/g, "$1\r\n");
	localStorage.setItem("text",textToSave2);
}
/*Clock*/
	var start=false;
	var timeFormat=true;
	var realtime;
	var now;
	var clockType=0;
function startTime() {
	if (localStorage.getItem("text") !==null) {
		if (start==false) {
			start=true;
			document.getElementById("textdata").value = localStorage.getItem("text");
			var frame = document.getElementById('myFrame');
		    frame.onload = function () {
		        var body = frame.contentWindow.document.querySelector('*');
		        body.style.color = 'red';
		        body.style.fontSize = '20px';
		        body.style.lineHeight = '20px';
		    };
		}
	}
	document.getElementById("textdata").oninput = function() {localSave()};

	document.getElementById("1").onclick = function() {location.href='https://reddit.com';};
	document.getElementById("2").onclick = function() {location.href='https://twitter.com';};
	document.getElementById("3").onclick = function() {location.href='https://youtube.com';};
	document.getElementById("4").onclick = function() {location.href='https://drive.google.com';};
	document.getElementById("5").onclick = function() {location.href='https://gmail.com';};
	document.getElementById("6").onclick = function() {location.href='https://messenger.com';};
	document.getElementById("7").onclick = function() {location.href='https://github.com/jasiahgeizer';};
	document.getElementById("8").onclick = function() {location.href='https://goodreads.com';};
	document.getElementById("9").onclick = function() {location.href='https://jasiah.dev';};
	
	document.getElementById("searchBar").onfocus = function() {clearit()};
	document.getElementById("searchBar").oninput = function() {quickcalc()};

	document.getElementById("searchBar").onkeyup = function() {searchit()};

	now = new Date();
		realtime = new Intl.DateTimeFormat('default',
        {
            hour12: true,
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric'
        }).format(now);
	document.getElementById('txt').innerHTML=realtime;
	var t = setTimeout(startTime, 1000); //every 5 seconds, update time
}
/*Search*/
function searchit(){
	if (event.keyCode === 13) {
	    // Cancel the default action, if needed
	    event.preventDefault();
	    // Trigger the button element with a click
	    var searchterm = document.getElementById("searchBar").value;
	    searchterm = searchterm.replace(/\+/g, "%2B");
	    searchterm = 'https://www.google.com/search?q='+searchterm.replace(/\s/g, "+");
	    window.location.href = searchterm;
  	}
}

/*Calculator*/
var first=true;
function clearit(){
	if (first==true) {
		document.getElementById("searchBar").value="";
		first=false;
	}
}

function quickcalc(){
	var ans = calculate(document.getElementById('searchBar').value);
	document.getElementById('quickresults').innerHTML=ans;
	if (ans==null) {
		document.getElementById("quickresults").innerHTML="";
	}
}

function calculate(input){

   var f = { add : '+'
           , sub : '-' 
           , div : '/'
           , mlt : '*'
           , mod : '%'
           , exp : '^' };
    
   // Create array for Order of Operation and precedence
   f.ooo = [[ [f.mlt] , [f.div] , [f.mod] , [f.exp] ],
            [ [f.add] , [f.sub] ]];

   input = input.replace(/[^0-9%^*\/()\-+.]/g,'');           // clean up unnecessary characters

   var output;
   for(var i=0, n=f.ooo.length; i<n; i++ ){
       
      // Regular Expression to look for operators between floating numbers or integers
      var re = new RegExp('(\\d+\\.?\\d*)([\\'+f.ooo[i].join('\\')+'])(\\d+\\.?\\d*)');
      re.lastIndex = 0;                                     // be cautious and reset re start pos
        
      // Loop while there is still calculation for level of precedence
      while( re.test(input) ){
         //document.write('<div>' + input + '</div>');
         output = calc_internal(RegExp.$1,RegExp.$2,RegExp.$3);
         if (isNaN(output) || !isFinite(output)) return output;   // exit early if not a number
         input  = input.replace(re,output);
      }
   }

   return output;

   function calc_internal(a,op,b){
      a=a*1; b=b*1;
      switch(op){
         case f.add: return a+b; break;
         case f.sub: return a-b; break;
         case f.div: return a/b; break;
         case f.mlt: return a*b; break;
         case f.mod: return a%b; break;
         case f.exp: return Math.pow(a,b); break;
         default: null;
      }
   }
}
