(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const screens = ['countdownScreen','doorScreen','gardenScreen','roomScreen','giftScreen','albumScreen','surpriseScreen','cuteScreen','voiceScreen','finalScreen'];
  const mainAudio = $('mainAudio'), voiceAudio = $('voiceAudio'), roseAudio = $('roseAudio'), blueAudio = $('blueAudio');
  let musicStarted = false, activeSpecial = -1, albumIndex = 0, specialIndex = 0, cuteIndex = 0, typeTimer = null;
  const voiceKey = 'subaBirthdayVoicePlays_v1';
  const voiceCaptions = [
    'Aii nee mattum epdi ivlo azhaga iruka',
    'Idhu venumaa?',
    'Idhu oankku dha',
    'Kiss confirm',
    'Ozhunga saapdalanā vachikku ore kuthu',
    'Enkitta ozhunga pesalana...',
    'Idhu munnadi chumma sonnen...',
    'I MISS YOUUU'
  ];
  const cuteImages = ['assets/cute-1.jpg','assets/cute-2.jpg','assets/cute-3.jpg','assets/cute-4.jpg','assets/cute-8.jpg','assets/cute-6.jpg','assets/cute-7.jpg','assets/cute-5.jpg'];
  const albumImages = Array.from({length:4},(_,i)=>`assets/album-${i+1}.jpg`);
  const specialImages = ['assets/surprise-rose.jpg','assets/surprise-blue.jpg'];
  const specialAudios = [roseAudio,blueAudio];
  const surpriseLetter = 'HELLO MADAM , HAPPIEE BURDAY ❤️ HAPPY AHH IRU ODAMBA PAATHUKKO ,NALLA SAAPDU ,NALLA THOONGU EDHA PATHIUM KAVALA PADADHA PAATHUKKALAAM NAA IRUKKEN .';

  function showScreen(id) {
    screens.forEach(s => { const el=$(s); if(el){el.classList.toggle('active-screen', s === id);} });
    if(id==='finalScreen') confetti(56);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function toast(message) {
    const el = $('toast'); el.textContent = message; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove('show'),2400);
  }
  function stopTrack(audio) { audio.pause(); try { audio.currentTime = 0; } catch (_) {} }
  function stopSpecialTracks() { stopTrack(roseAudio); stopTrack(blueAudio); activeSpecial = -1; }
  function resumeMain() {
    if (!musicStarted || activeSpecial !== -1 || !voiceAudio.paused) return;
    mainAudio.play().catch(()=>toast('Tap once anywhere to resume the background music.'));
  }
  function pauseMain() { mainAudio.pause(); }
  function startMain() {
    musicStarted = true;
    mainAudio.volume = 0.48;
    mainAudio.play().catch(()=>toast('Your browser needs one more tap to start the music.'));
  }

  // Loader and countdown.
  window.addEventListener('load', () => {
    setTimeout(()=>{ $('loader').classList.add('done'); $('app').classList.remove('hidden'); }, 1450);
    setTimeout(()=>{ $('loader').style.display='none'; }, 2250);
  });
  function updateCountdown() {
    const target = new Date('2026-11-15T00:00:00+05:30').getTime();
    const diff = Math.max(0,target-Date.now());
    $('days').textContent = String(Math.floor(diff/86400000)).padStart(2,'0');
    $('hours').textContent = String(Math.floor(diff%86400000/3600000)).padStart(2,'0');
    $('minutes').textContent = String(Math.floor(diff%3600000/60000)).padStart(2,'0');
    $('seconds').textContent = String(Math.floor(diff%60000/1000)).padStart(2,'0');
  }
  updateCountdown(); setInterval(updateCountdown,1000);

  $('beginButton').addEventListener('click',()=>{ startMain(); showScreen('doorScreen'); $('passwordInput').focus(); });
  function unlockDoor() {
    if ($('passwordInput').value.trim().toUpperCase() === 'SUBA') {
      $('passwordHint').textContent = 'The magic door is opening… ♡';
      $('doorScreen').classList.add('door-opening');
      setTimeout(()=>showScreen('gardenScreen'),700);
      confetti(24);
    } else {
      $('passwordHint').textContent = 'Not quite, Cutie. Try the secret word again. 💗';
      $('passwordInput').classList.add('shake'); setTimeout(()=>$('passwordInput').classList.remove('shake'),400);
    }
  }
  $('unlockButton').addEventListener('click',unlockDoor);
  $('passwordInput').addEventListener('keydown',e=>{if(e.key==='Enter')unlockDoor();});
  $('gardenContinue').addEventListener('click',()=>{ $('gardenScreen').classList.add('garden-zoom'); setTimeout(()=>showScreen('roomScreen'),650); });

  // Tiny fireflies and floating hearts.
  for(let i=0;i<22;i++){
    const dot=document.createElement('i'); dot.style.left=(Math.random()*95)+'%'; dot.style.top=(Math.random()*85)+'%'; dot.style.animationDelay=(Math.random()*2)+'s'; $('fireflies').appendChild(dot);
  }
  for(let i=0;i<12;i++){
    const h=document.createElement('span');h.textContent='♡';h.className='ambient-heart';h.style.left=(Math.random()*100)+'%';h.style.animationDelay=(Math.random()*7)+'s';$('countdownScreen').appendChild(h);
  }

  // Cake sequence: blow -> cut -> relight.
  $('blowButton').addEventListener('click',blowCandles);
  function blowCandles(){
    if($('blowButton').disabled)return;
    document.querySelectorAll('.candle').forEach(c=>c.classList.add('out'));
    $('cakeMessage').textContent='Make a Wish, Cutie… ✨';
    $('blowButton').disabled=true; $('cutButton').disabled=false;
    confetti(18);
  }
  $('cutButton').addEventListener('click',()=>{
    if($('cutButton').disabled)return;
    $('cake').classList.add('cut'); $('cutButton').disabled=true;
    $('cakeMessage').textContent='A Sweet Piece for You, Cutie! 💗';
    confetti(48);
    setTimeout(()=>$('relightButton').disabled=false,900);
  });
  $('relightButton').addEventListener('click',()=>{
    $('relightButton').disabled=true;
    $('cake').classList.add('relighting');
    const butterflies=[];
    for(let i=0;i<4;i++){const b=document.createElement('span');b.className='cake-butterfly';b.textContent='🦋';b.style.setProperty('--i',i);$('cake').appendChild(b);butterflies.push(b);}
    const candles=[...document.querySelectorAll('.candle')];
    candles.forEach((c,i)=>setTimeout(()=>c.classList.remove('out'),350+i*330));
    $('cakeMessage').textContent='Your Magic Shines Again, Cutie! 🦋';
    confetti(30);
    const giftButton = $('giftContinue');
    giftButton.disabled = true;
    giftButton.textContent = 'GETTING YOUR LITTLE GIFT READY…';
    const lastCandleDelay = 350 + Math.max(0, candles.length - 1) * 330;
    setTimeout(()=>{
      $('cake').classList.remove('cut','relighting');
      butterflies.forEach(b=>b.remove());
      giftButton.disabled = false;
      giftButton.textContent = 'OPEN YOUR LITTLE GIFT ♡';
      giftButton.focus();
    }, lastCandleDelay + 450);
  });
  $('micButton').addEventListener('click',async()=>{
    if(!navigator.mediaDevices?.getUserMedia){toast('Microphone is not available here. Use the pink candle button.');return;}
    let stream;
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const ctx=new (window.AudioContext||window.webkitAudioContext)();
      const source=ctx.createMediaStreamSource(stream), analyser=ctx.createAnalyser(); analyser.fftSize=512; source.connect(analyser);
      const data=new Uint8Array(analyser.frequencyBinCount); let frames=0;
      toast('Listening… gently blow towards your microphone.');
      const check=()=>{
        analyser.getByteTimeDomainData(data); let sum=0; for(const v of data){const n=(v-128)/128;sum+=n*n;}
        const rms=Math.sqrt(sum/data.length); frames++;
        if(rms>.095 && frames>8){stream.getTracks().forEach(t=>t.stop());ctx.close();blowCandles();toast('Wish sent! 💗');return;}
        if(frames<220){requestAnimationFrame(check);}else{stream.getTracks().forEach(t=>t.stop());ctx.close();toast('No clear blow detected — tap the candle button instead.');}
      }; requestAnimationFrame(check);
    }catch(e){if(stream)stream.getTracks().forEach(t=>t.stop());toast('Mic permission was not available. Tap the candle button instead.');}
  });
  const giftContinueButton = $('giftContinue');
  giftContinueButton.type = 'button';
  giftContinueButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (giftContinueButton.disabled) return;
    showScreen('giftScreen');
  });

  // Gift opens the birthday letter first, then the separate album.
  $('giftBox').addEventListener('click',()=>{
    $('giftBox').classList.add('opened'); $('giftCaption').textContent='A little birthday magic, just for you';
    $('giftReveal').classList.remove('hidden-block'); confetti(38);
    $('giftReveal').scrollIntoView({behavior:'smooth',block:'center'});
  });
  $('showAlbum').addEventListener('click',()=>showScreen('albumScreen'));
  $('toSurprise').addEventListener('click',()=>showScreen('surpriseScreen'));

  // Birthday album modal.
  document.querySelectorAll('.album-photo').forEach(btn=>btn.addEventListener('click',()=>openAlbum(Number(btn.dataset.album))));
  function openAlbum(index){albumIndex=(index+albumImages.length)%albumImages.length;$('modalImage').src=albumImages[albumIndex];$('photoModal').classList.add('open');$('photoModal').setAttribute('aria-hidden','false');}
  function closeAlbum(){$('photoModal').classList.remove('open');$('photoModal').setAttribute('aria-hidden','true');}
  $('modalClose').addEventListener('click',closeAlbum);
  $('modalPrev').addEventListener('click',()=>openAlbum(albumIndex-1));
  $('modalNext').addEventListener('click',()=>openAlbum(albumIndex+1));
  $('photoModal').addEventListener('click',e=>{if(e.target===$('photoModal'))closeAlbum();});

  // Separate A Little Surprise letter and two photo-specific songs.
  $('readSurpriseLetter').addEventListener('click',()=>{
    $('surpriseLetter').classList.remove('hidden-block');
    $('surprisePhotos').classList.add('hidden-block');
    typeSurpriseLetter();
  });
  $('seeSurprisePhotos').addEventListener('click',()=>{
    $('surprisePhotos').classList.remove('hidden-block');$('surpriseLetter').classList.add('hidden-block');
  });
  function typeSurpriseLetter(){
    clearInterval(typeTimer); const el=$('typewriterText');el.textContent='';let i=0;
    typeTimer=setInterval(()=>{el.textContent+=surpriseLetter.charAt(i);i++;if(i>=surpriseLetter.length)clearInterval(typeTimer);},36);
  }
  document.querySelectorAll('.special-photo').forEach(btn=>btn.addEventListener('click',()=>openSpecial(Number(btn.dataset.special))));
  function openSpecial(index){
    specialIndex=(index+2)%2; $('specialImage').src=specialImages[specialIndex];
    $('specialModal').classList.add('open');$('specialModal').setAttribute('aria-hidden','false');
    playSpecial(specialIndex);
  }
  function playSpecial(index){
    pauseMain(); stopSpecialTracks(); activeSpecial=index;
    const audio=specialAudios[index]; audio.currentTime=0; audio.volume=.9;
    audio.play().catch(()=>toast('Tap the photo once more to start its song.'));
  }
  function closeSpecial(){
    $('specialModal').classList.remove('open');$('specialModal').setAttribute('aria-hidden','true');
    stopSpecialTracks(); resumeMain();
  }
  $('specialClose').addEventListener('click',closeSpecial);
  $('specialPrev').addEventListener('click',()=>{specialIndex=(specialIndex+1)%2;$('specialImage').src=specialImages[specialIndex];playSpecial(specialIndex);});
  $('specialNext').addEventListener('click',()=>{specialIndex=(specialIndex+1)%2;$('specialImage').src=specialImages[specialIndex];playSpecial(specialIndex);});
  $('specialModal').addEventListener('click',e=>{if(e.target===$('specialModal'))closeSpecial();});
  [roseAudio,blueAudio].forEach(a=>a.addEventListener('ended',()=>{if(activeSpecial!==-1){stopSpecialTracks();closeSpecial();}}));

  // Cute-message carousel: exactly one photo visible at a time.
  function renderCute(){
    const img=$('cuteImage');img.style.opacity='0';
    setTimeout(()=>{img.src=cuteImages[cuteIndex];img.onload=()=>img.style.opacity='1';},140);
    const counter=$('cuteCounter'); if(counter) counter.textContent=`${cuteIndex+1} / 8`;
  }
  $('cutePrev').addEventListener('click',()=>{cuteIndex=(cuteIndex+7)%8;renderCute();});
  $('cuteNext').addEventListener('click',()=>{cuteIndex=(cuteIndex+1)%8;renderCute();});
  let touchX=0;
  $('cuteImage').addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX;},{passive:true});
  $('cuteImage').addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchX;if(Math.abs(dx)>45){cuteIndex=(cuteIndex+(dx<0?1:7))%8;renderCute();}},{passive:true});
  $('toCute').addEventListener('click',()=>{ cuteIndex=0; renderCute(); showScreen('cuteScreen'); });

  // Voice message: max two starts per browser profile; hide the whole section after play two ends.
  function getVoiceCount(){return Math.min(2,Number(localStorage.getItem(voiceKey)||0));}
  function syncVoiceLimit(){
    const count=getVoiceCount();
    $('voiceCount').textContent=`${Math.max(0,2-count)} listens available`;
    $('playVoice').disabled=count>=2;
    if(count>=2){
      $('voiceCard').classList.add('hidden-block');
      $('toVoice').classList.add('hidden-block');
      $('toFinal').classList.remove('hidden-block');
    }
  }
  syncVoiceLimit();
  $('toVoice').addEventListener('click',()=>{
    if(getVoiceCount()>=2){syncVoiceLimit();return;}
    showScreen('voiceScreen');syncVoiceLimit();
  });
  $('playVoice').addEventListener('click',async()=>{
    let count=getVoiceCount();if(count>=2)return;
    stopSpecialTracks();pauseMain();voiceAudio.currentTime=0;voiceAudio.volume=1;
    try{
      await voiceAudio.play();
      count++;localStorage.setItem(voiceKey,String(count));syncVoiceLimit();
      toast(count===1?'Voice message · first listen 💗':'Voice message · final listen 💗');
    }catch(e){resumeMain();toast('Tap play again to start your voice message.');}
  });
  voiceAudio.addEventListener('timeupdate',()=>{
    if(voiceAudio.duration){$('voiceProgress').style.width=(voiceAudio.currentTime/voiceAudio.duration*100)+'%';}
  });
  voiceAudio.addEventListener('ended',()=>{
    $('voiceProgress').style.width='0%';
    resumeMain();
    if(getVoiceCount()>=2){
      $('voiceScreen').classList.remove('active-screen');
      $('voiceScreen').style.display='none';
      $('toVoice').classList.add('hidden-block');
      $('toFinal').classList.remove('hidden-block');
      showScreen('cuteScreen');
    } else resumeMain();
  });
  $('toFinal').addEventListener('click',()=>showScreen('finalScreen'));

  function confetti(amount=30){
    for(let i=0;i<amount;i++){
      const p=document.createElement('i');p.className='confetti';p.style.left=(Math.random()*100)+'vw';p.style.setProperty('--drift',((Math.random()-.5)*180)+'px');p.style.background=['#f48bb5','#ffd0e2','#fff','#e7a5c7','#d5b6e9'][i%5];p.style.animationDelay=(Math.random()*.6)+'s';document.body.appendChild(p);setTimeout(()=>p.remove(),3500);
    }
  }
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeAlbum();closeSpecial();}
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){mainAudio.pause();voiceAudio.pause();roseAudio.pause();blueAudio.pause();}
    else if(activeSpecial===-1 && voiceAudio.paused)resumeMain();
  });
})();
