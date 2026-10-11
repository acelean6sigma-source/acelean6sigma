(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
  var slides=[].slice.call(document.querySelectorAll('.slide')),dots=[].slice.call(document.querySelectorAll('.dots button')),cur=0,timer,hero=document.querySelector('.hero');
  function go(n){cur=(n+slides.length)%slides.length;slides.forEach(function(s,i){var on=i===cur;s.classList.toggle('on',on);s.setAttribute('aria-hidden',!on);[].forEach.call(s.querySelectorAll('a'),function(a){a.tabIndex=on?0:-1})});dots.forEach(function(d,i){d.classList.toggle('on',i===cur)})}
  function play(){if(!matchMedia('(prefers-reduced-motion:reduce)').matches){clearInterval(timer);timer=setInterval(function(){go(cur+1)},6500)}}
  dots.forEach(function(d,i){d.addEventListener('click',function(){go(i);play()})});
  hero.addEventListener('mouseenter',function(){clearInterval(timer)});hero.addEventListener('mouseleave',play);hero.addEventListener('focusin',function(){clearInterval(timer)});
  play();
  document.getElementById('yr').textContent=new Date().getFullYear();
  var form=document.getElementById('form'),status=document.getElementById('status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements,ok=true;
    ['name','email','msg'].forEach(function(k){
      var v=f[k].value.trim(),bad=!v||(k==='email'&&!/^\S+@\S+\.\S+$/.test(v));
      f[k].classList.toggle('bad',bad);if(bad)ok=false;
    });
    if(!ok){status.style.color='#c0262d';status.textContent='Please fill in your name, a valid email and a message.';return}
    var body='Name: '+f.name.value+'\nEmail: '+f.email.value+'\nPhone: '+f.phone.value+'\nInterested in: '+f.topic.value+'\n\n'+f.msg.value;
    window.location.href='mailto:acelean6sigma@gmail.com?subject='+encodeURIComponent('Enquiry: '+f.topic.value)+'&body='+encodeURIComponent(body);
    status.style.color='#1b6b3a';status.textContent='Opening your email app. Press send there to complete your enquiry.';
  });
})();
