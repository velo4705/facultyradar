document.addEventListener("DOMContentLoaded", () => {

/* ---------- FACULTY RADAR SYSTEM - CONNECTED TO BACKEND ---------- */

// Replace with your deployed backend URL
const API_BASE_URL = 'https://facultyradar-production.up.railway.app/api';

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
    let name = document.getElementById("facultyName").value.trim();
    let result = document.getElementById("result");
    let meter = document.getElementById("meterFill");

    if (!name) {
        typeEffect("⚠ Please enter a faculty name!", result);
        return;
    }

    result.innerHTML="📡 Scanning faculty database...";
    meter.style.width="0%";

    // Call your actual backend API
    fetch(`${API_BASE_URL}/faculty/search?name=${encodeURIComponent(name)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Debug log
            
            if (data.success && (data.data || data.facultyList)) {
                const facultyList = data.data || data.facultyList || [];
                
                if (facultyList.length > 0) {
                    // Show actual results from database
                    let resultText = "";
                    facultyList.forEach(faculty => {
                        const statusEmoji = faculty.status === 'PRESENT' ? '🟢' : '🔴';
                        const statusText = faculty.status === 'PRESENT' ? 'Available' : 'Not Available';
                        
                        resultText += `Faculty: ${faculty.name}\n`;
                        resultText += `Cabin: ${faculty.cabin || faculty.cabin_number || 'Unknown'}\n`;
                        resultText += `Status: ${statusEmoji} ${statusText}\n`;
                        resultText += `Department: ${faculty.department || 'Unknown'}\n\n`;
                    });
                    
                    typeEffect(resultText, result);
                    meter.style.width = "100%";
                } else {
                    typeEffect("⚠ Faculty not found in radar system.", result);
                    meter.style.width = "30%";
                }
            } else {
                typeEffect(`⚠ Error: ${data.message || 'Unknown error'}`, result);
                meter.style.width = "0%";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            typeEffect(`⚠ Connection error: ${error.message}`, result);
            meter.style.width = "0%";
        });
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