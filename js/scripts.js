var timestamp,id,mins,seconds;
var startbutton = document.getElementById("startbutton");

function start(m=30, s=0){
  mins = m;
  seconds = s;

  id = setInterval(function(){
    if(seconds > 0 && seconds){
      seconds--;
    } else {
      seconds = 59;
      mins--;
    }
    if(seconds.toString().length < 2){
      document.getElementById('countdown').innerHTML = mins + ":0" + seconds;
    } else {
      document.getElementById('countdown').innerHTML = mins + ":" + seconds;
    }
    console.log(mins+":"+seconds);
    if((mins*60)+seconds <= 0){
      clearInterval(id);
      document.getElementById("textenter").readOnly = true;
    }
  }, 1000);
  startbutton.innerHTML = "Pause";
  startbutton.onclick = pause;
  startbutton.classList.add("active");
}

function pause(){
  startbutton.m = mins;
  startbutton.s = seconds;
  clearInterval(id);
  startbutton.innerHTML = "Resume";
  startbutton.onclick = resume;
  startbutton.classList.remove("active");
}

function resume(){
  start(startbutton.m,startbutton.s);
}

function assign(e){
  Array.from(document.getElementsByClassName(e.dataset.type)).forEach(i => i.removeAttribute("id"));
  e.id = e.dataset.type+"-active";
}

function randomize(){
  var i,j,i_rand,j_rand;

  Array.from(document.getElementsByClassName("person")).forEach(i => i.removeAttribute("id"));
  Array.from(document.getElementsByClassName("prompt")).forEach(i => i.removeAttribute("id"));


  i = Array.from(document.getElementsByClassName("person"));
  j = Array.from(document.getElementsByClassName("prompt"));

  i_rand = Math.floor(Math.random()*(i.length-1));
  j_rand = Math.floor(Math.random()*(j.length-1));

  j[j_rand].id = j[j_rand].dataset.type+"-active";
  i[i_rand].id = i[i_rand].dataset.type+"-active";

  j[j_rand] = j[j_rand].scrollIntoView(false);
  i[i_rand] = i[i_rand].scrollIntoView(false);

}

function download(){
  pause();
  var person,prompt;

  function getVals(id){
    var v;
    if(document.getElementById(id).childNodes[0].tagName){
      v = document.getElementById(id).childNodes[0].value;
    } else {
      v = document.getElementById(id).innerHTML;
    }
    return(v);
  }

  person = getVals("person-active");
  prompt = getVals("prompt-active");
  title  = document.getElementById("title").value;

  var date = new Date();
  var formatted = date.getMonth() + "/" + date.getDay() + "/" + date.getYear();
  var text = document.getElementById("textenter").value;

  var frontmatter = "---\nperson: \"" + person + "\"\nprompt: \"" + prompt + "\"\ntitle: \"" + title + "\"\ntime-remaining: \"" + mins + ":" + seconds + "\"\n---\n";

  var blob = new Blob([frontmatter+text], {type:"text/plain;charset=utf-8"});
  saveAs(blob, date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + "-" + title.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g,"-") + ".md");
}

var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1;
        }
    }
}



window.addEventListener("keyup", event => {
  var text = document.getElementById("textenter").value;
  var chars = document.getElementById("charactercount");
  var words = document.getElementById("wordcount");

  chars.innerHTML = text.length + " characters";
  words.innerHTML = text.trim().split(/\s+/).length + " words";
});
