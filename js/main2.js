    /* Hero Slideshow */
        (function(){const slides=document.querySelectorAll('.hero-slide');let cur=0;function next(){slides[cur].classList.remove('active');cur=(cur+1)%slides.length;slides[cur].classList.add('active');}setInterval(next,5000);})();

        /* Scroll Progress */
        const bar=document.getElementById('progress');
        window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(window.scrollY/h*100)+'%';},{passive:true});

        /* Nav scroll */
        const nav=document.querySelector('nav');
        window.addEventListener('scroll',()=>{if(window.scrollY>60)nav.classList.add('scrolled');else nav.classList.remove('scrolled');},{passive:true});

        /* Hero Canvas */
        const canvas=document.getElementById('heroCanvas');
        const ctx=canvas.getContext('2d');
        let W,H,nodes=[];
        function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
        resize();window.addEventListener('resize',resize);
        let mX=-999,mY=-999;
        document.addEventListener('mousemove',e=>{mX=e.clientX;mY=e.clientY;});
        function initNodes(){nodes=[];const cols=Math.floor(W/90)+1,rows=Math.floor(H/90)+1;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){nodes.push({ox:c*90+45,oy:r*90+45,x:c*90+45,y:r*90+45,vx:0,vy:0});}}
        initNodes();window.addEventListener('resize',initNodes);
        function drawCanvas(){ctx.clearRect(0,0,W,H);const t=Date.now()*0.0005;nodes.forEach(n=>{const dx=n.x-mX,dy=n.y-mY,dist=Math.sqrt(dx*dx+dy*dy);if(dist<180){const f=(180-dist)/180*18;n.vx+=dx/dist*f;n.vy+=dy/dist*f;}n.vx+=(n.ox-n.x)*0.04;n.vy+=(n.oy-n.y)*0.04;n.vx*=0.82;n.vy*=0.82;n.x+=n.vx;n.y+=n.vy;n.x+=Math.sin(t*0.7+n.oy*0.012)*0.3;n.y+=Math.cos(t*0.9+n.ox*0.01)*0.3;});nodes.forEach((n,i)=>{nodes.slice(i+1).forEach(m=>{const dx=n.x-m.x,dy=n.y-m.y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);const a=(1-d/110)*0.12;ctx.strokeStyle=`rgba(255,116,48,${a})`;ctx.lineWidth=0.6;ctx.stroke();}});const distM=Math.sqrt((n.x-mX)**2+(n.y-mY)**2);const glow=Math.max(0,1-distM/200)*0.5;ctx.beginPath();ctx.arc(n.x,n.y,1.5,0,Math.PI*2);ctx.fillStyle=`rgba(${glow>0.3?'0,200,150':'255,116,48'},${0.12+glow*0.3})`;ctx.fill();});requestAnimationFrame(drawCanvas);}
        drawCanvas();

        /* Reveal on scroll */
        const reveals=document.querySelectorAll('.reveal');
        const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),e.target.dataset.delay||0);}});},{threshold:0.08});
        reveals.forEach(el=>{el.dataset.delay=0;ro.observe(el);});

        /* stagger grid children */
        function staggerGrid(sel,delay=80){document.querySelectorAll(sel).forEach((el,i)=>{el.style.transitionDelay=`${i*delay}ms`;});}
        staggerGrid('.met-grid .mc',90);
        staggerGrid('.svc-grid .svc-card',70);
        staggerGrid('.ind-grid .ind-card',60);
        staggerGrid('.test-grid .test-card',90);
        staggerGrid('.cs-list .cs-item',80);

        /* Process line */
        const procLine=document.getElementById('procLine');
        if(procLine){const procObs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)procLine.style.width='80%';},{threshold:0.3});const procSection=document.querySelector('.process');if(procSection)procObs.observe(procSection);}

        /* Investor metric bars */
        document.querySelectorAll('.im-bar').forEach(bar=>{const target=bar.style.width;bar.style.width='0%';const obs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){bar.style.width=target;obs.disconnect();}},{threshold:0.5});obs.observe(bar.parentElement);});

        /* Parallax glows */
        window.addEventListener('scroll',()=>{const sy=window.scrollY;const heroGlowB=document.querySelector('.hero-glow-b');const heroGlowG=document.querySelector('.hero-glow-g');if(heroGlowB)heroGlowB.style.transform=`translateY(${sy*0.25}px)`;if(heroGlowG)heroGlowG.style.transform=`translateY(${sy*0.18}px)`;},{passive:true});
    