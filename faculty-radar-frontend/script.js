document.addEventListener("DOMContentLoaded", () => {

/* ---------- FACULTY RADAR SYSTEM ---------- */

const faculty = {

hod:{
room:"4th Floor Cabin 402",
chance:85
},

professor:{
room:"3rd Floor Cabin 305",
chance:60
},

assistant:{
room:"2nd Floor Cabin 210",
chance:30
}

};

function typeEffect(text, element, speed=30){

element.innerHTML="";
let i=0;

function typing(){
if(i<text.length){
element.innerHTML += text.charAt(i);
i++;
setTimeout(typing,speed);
}
}

typing();
}

window.scanFaculty = function(){

let name=document.getElementById("facultyName").value.toLowerCase();
let result=document.getElementById("result");
let meter=document.getElementById("meterFill");

result.innerHTML="📡 Scanning faculty database...";
meter.style.width="0%";

setTimeout(()=>{

if(faculty[name]){

let data=faculty[name];

let status="";

if(data.chance>70){
status="🟢 Likely Available";
}
else if(data.chance>40){
status="🟡 Maybe Available";
}
else{
status="🔴 Not Available";
}

let text=
`Faculty: ${name.toUpperCase()}
Cabin: ${data.room}
Status: ${status}
Prediction Accuracy: ${data.chance}%`;

typeEffect(text,result);

meter.style.width=data.chance+"%";

}
else{

typeEffect("⚠ Faculty not found in radar system.",result);

}

},1000);

};


/* ---------- AI NEURAL NETWORK BACKGROUND ---------- */

const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for(let i=0;i<80;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*1,
vy:(Math.random()-0.5)*1
});

}

function animateNetwork(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x += p.vx;
p.y += p.vy;

if(p.x<0 || p.x>canvas.width) p.vx*=-1;
if(p.y<0 || p.y>canvas.height) p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,2,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();

});

/* connect nodes */

for(let i=0;i<particles.length;i++){
for(let j=i+1;j<particles.length;j++){

let dx=particles[i].x-particles[j].x;
let dy=particles[i].y-particles[j].y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

ctx.beginPath();
ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);
ctx.strokeStyle="rgba(0,255,255,0.15)";
ctx.stroke();

}

}
}

requestAnimationFrame(animateNetwork);

}

animateNetwork();

});