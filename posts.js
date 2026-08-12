// =====================
// Avatar pool (folder: /profile-pics)
// Works even if some files are .jpg and others are .jpeg (falls back automatically).
// Your files must be named avatar1, avatar2, ... avatar102
// e.g. profile-pics/avatar1.jpg OR profile-pics/avatar1.jpeg
// =====================
const AVATAR_COUNT = 102;
const avatarPool = Array.from({ length: AVATAR_COUNT }, (_, i) => `profile-pics/avatar${i + 1}`);

// Pick a base path like "profile-pics/avatar37"
function getRandomAvatarBase() {
  return avatarPool[Math.floor(Math.random() * avatarPool.length)];
}

// Returns an <img> tag that tries .jpg then falls back to .jpeg, then backup
function avatarImgHTML(basePath, alt = "") {
  const safeAlt = escapeHtml(alt);

  return `
    <img
      class="avatarImg"
      src="${basePath}.jpg"
      alt="${safeAlt}"
      loading="lazy"
      onerror="
        (function(img){
          if (!img.dataset.triedJpeg) {
            img.dataset.triedJpeg = '1';
            img.src = '${basePath}.jpeg';
            return;
          }
          img.onerror = null;
          img.src = 'backup.avatar.png';
        })(this);
      "
    />
  `;
}

// =====================
// Static posts (optional)
// =====================
const POSTS = [];

// =====================
// Fake feed generator (infinite-ish scrolling)
// =====================

// 1) accounts pool (name + handle)
const ACCOUNT_POOL = [
  { name: "WickedWatch", handle: "@wickedwatch" },
  { name: "GelphieNation", handle: "@gelphienation" },
  { name: "CynthianaUpdates", handle: "@cynthianaupdates" },
  { name: "TheGrandeErivoSaga", handle: "@grandeerivosaga" },
  { name: "AriSpirals", handle: "@arispirals" },
  { name: "SweetenerLore", handle: "@sweetenerlore" },
  { name: "EternalSunshineEra", handle: "@eternalsunshineera" },
  { name: "CynthiaErivoDaily", handle: "@cynthiaerivodaily" },
  { name: "CynthiaCore", handle: "@cynthiacore" },
  { name: "Cynthiesizers", handle: "@cynthiesizers" },
  { name: "ErivoVocals", handle: "@erivovocals" },
  { name: "CynthiaOnStage", handle: "@cynthiaonstage" },
  { name: "ErivoEnergy", handle: "@erivoenergy" },
  { name: "ElphabaTruthers", handle: "@elphabatruthers" },
  { name: "GalindaPosting", handle: "@galindaposting" },
  { name: "DefyingGravityEra", handle: "@defyinggraver" },
  { name: "OzLoreAccount", handle: "@ozlore" },
  { name: "AnnieOnline", handle: "@annieonline" },
  { name: "ZoePosts", handle: "@zoeposts" },
  { name: "MayaSaysStuff", handle: "@mayasaysstuff" },
  { name: "LenaTweets", handle: "@lenatweets" },
  { name: "JessFromWork", handle: "@jessfromwork" },
  { name: "EmilyActually", handle: "@emilyactually" },
  { name: "RachelSpills", handle: "@rachelspills" },
  { name: "annie :)", handle: "@annielikesit" },
  { name: "zoe ✿", handle: "@zoeinthecity" },
  { name: "maria lol", handle: "@mariajustsaid" },
  { name: "em <3", handle: "@emactually" },
  { name: "lena 🫧", handle: "@lenathinks" },
  { name: "jess", handle: "@jessposting" },
  { name: "katie online", handle: "@katietyping" },
  { name: "rachel??", handle: "@rachelhuh" },
  { name: "soph", handle: "@sophscrolls" },
  { name: "mel", handle: "@melisconfused" },
  { name: "it's claire", handle: "@claireirl" },
  { name: "nina", handle: "@ninaposts" },
  { name: "hannah 🪩", handle: "@hannahspin" },
  { name: "lucy", handle: "@lucywasthere" },
  { name: "ella maybe", handle: "@ellamaybe" },
  { name: "ivy", handle: "@ivyontheinternet" },
  { name: "bea <3", handle: "@beawatching" },
  { name: "amy 🧃", handle: "@amysips" },
  { name: "noah 🌱", handle: "@noahsoft" },
  { name: "sam 😭", handle: "@samcrying" },
  { name: "lex ✨", handle: "@lexsparkles" },
  { name: "jay 🐦", handle: "@jaytweetsok" },
  { name: "tori 🫶", handle: "@toriwaves" },
  { name: "idk man", handle: "@idkmandotcom" },
  { name: "probably anna", handle: "@probablyanna" },
  { name: "this is fine", handle: "@thisisfineirl" },
  { name: "not a stan", handle: "@defnotastan" },
  { name: "girl at the airport", handle: "@airportgirl" },
  { name: "soft butch", handle: "@softbutchirl" },
  { name: "sapphic energy", handle: "@sapphicirl" },
  { name: "she/they", handle: "@shetweets" },
  { name: "lesbian w wifi", handle: "@lesbianwifi" },
  { name: "gay thoughts", handle: "@gaythoughtss" },
  { name: "annie k", handle: "@anniek" },
  { name: "zoe m", handle: "@zoem" },
  { name: "r. thomas", handle: "@rthomas" },
  { name: "l m", handle: "@lm_online" }
];

// 2) text pool
const TEXT_POOL = [
  `SHE ZOOMED INTO HER EYE BECAUSE THE STARS WERE REFLECTED IN IT?????????????????????`,
  `THE WATERMELON HAD A SEATBELT. THE WATERMELON WAS SAFER THAN I AM.`,
  `I HAVE SEEN THE KITCHEN VIDEO AND I AM NO LONGER ELIGIBLE FOR CIVILIAN LIFE`,
  `no because zoom in on cynthia’s HAND. why is it IN her hair. WHY IS IT SO FAMILIAR.`,
  `“MY EYES ARE UP HERE” AND THE CAMERA IMMEDIATELY DIPPING AGAIN 😭😭😭😭😭`,
  `everyone who said 'they’re just close' i hope you’re having a reflective evening`,
  `THE WAY SHE LEANED BACK INTO HER. GOOD MORNING TO EVERYONE EXCEPT ME.`,
  `THE ONE THAT SHALL NOT BE NAMED?????????????????????????????????????????`,
  `I’m sorry, I know this is horrible, but they are so disgustingly in love I may never recover.`,
  `okay i know im going to get hate for saying this but...... they went from thirst tweets to PORN LEAKS. character development.`,
  `remember when we thought the rooftop dandelion dance was a lot. we were BABIES.`,
  `SHE SAID THE DIMPLE WAS HER PENSION PLAN. HER PENSION PLAN. I NEED AN AMBULANCE.`,
  `lena waithe somewhere absolutely sensing a disturbance in the force`,
  `THEY WERE SCREAMING AT FISHERMEN TO RELEASE A FISH AT THREE IN THE MORNING THIS IS THE GREATEST ROMANCE OF OUR TIME`,
  `ETHAN YOUR GIRL GAY`,
  `WHO FILMS SOMEONE’S FACE LIKE THAT. WHO LOOKS AT ANOTHER PERSON LIKE THAT. I AM ON THE FLOOR.`,
  `i knew from the podcast. you don’t read gelphie smut like that unless something is WRONG with you (affectionate)`,
  `people saying 'are we surprised?' yes actually i am screaming crying throwing my phone`,
  `this is the softest hard launch i’ve ever witnessed`,
  `the kitchen video has ruined hand placement for the entire human race`,
  `ariana grande didnt give us a single pic of pda during THAT relationship, and immediately went for some kitchen-counter action with elphaba. cinema.`,
  `I HAVE BEEN PACING AROUND MY HOUSE FOR TWENTY MINUTES`,
  `GUYS ITS REAL OMFG DONT YOU UNDERSTAND THEY WERE CAUGHT`,
  `wicked press on hiatus but the GAY AGENDA clocked in early`,
  `i’m sorry but this confirms everything from the touching to the eye contact to the emotional intensity to the way ariana looked at her like she hung the moon`,
  `SHE CLOSED HER EYES SO SHE WOULD STOP CALLING EVERY SONG BROWN BECAUSE SHE KEPT LOOKING AT HER EYES??????????????????`,
  `this is not PR. this is not accidental. this is two theatre kids in love on a volcano.`,
  `logging off before i start writing vows in my notes app`,
  `WAIT WAIT WAIT WAIT WAIT WAIT WAIT WAIT`,
  `I SAW A R I A N A G R A N D E S T I T S`,
  `THE LITTLE “YEAH” AFTER THE DRACULA JOKE. SOMEBODY SEDATE ME.`,
  `They look like they invented happiness and forgot to patent it.`,
  `THE GECKO WAS THE CALMEST PERSON IN THAT ENTIRE VILLA`,
  `THE SCREAM. THE SECOND SCREAM BECAUSE THE FIRST ONE SCREAMED. THE PILLOW FIGHT. CINEMA.`,
  `EVERY 'THEY’RE JUST FRIENDS' TWEET AGED LIKE MILK LEFT IN THE SUN`,
  `No because the way she filmed every tiny thing like it was important has actually broken something in me.`,
  `THEYVE BEEN TELLING US FOR MONTHS AND WE WERE JUST TOO STUPID TO LISTEN`,
  `WICKED PRESS TEAM WAKING UP IN A COLD SWEAT RIGHT NOW`,
  `can everyone shut the fuck up THIS ISNT PR THIS IS WHAT HAPPENS WHEN TWO THEATRE KIDS FALL IN LOVE`,
  `SHE BUCKLED THE WATERMELON INTO THE CAR AND SANG TO IT. I HAVE NO FURTHER QUESTIONS ABOUT WHY SHE IS LOVED.`,
  `ok sorry if this is ignorant but where exactly are they`,
  `I DIDNT KNOW THAT WAS HAPPENING.......!?!?!???!?!??!??!?!??!?!?!?!???`,
  `Every American learning about the Aegean sea against their will rn`,
  `I don’t know where santorini is but I know that’s not friendship!`,
  `POV: a porn leak incident just taught you geography`,
  `idc if it’s santorini or san torino or santa whatever. they are in love.`,
  `i’m sorry but you guys are actually so gullible`,
  `They're trending again... ikkkk`,
  `I’m tired, personally. Every time I defend her and then this happens. No wonder Ethan left.`,
  `WHAT THE FUCK WHAT THE FUCK WHAT THE FUCK WHAT THE ACTUAL FUCK DID I WAKE UP TO WHAT THE FUCKKKKKK!??!?!?!?!??!?!?!?!?!?!??!?!?!???!!`,
  `LENA WHERE ARE U ARI BE SMASHING YOUR WOMAN`,
  `Does anyone else think they look even skinnier, or?`,
  `JNU#EGX&EGMY#(UWHS(&YG#EB*&XUTZGHBZSJGXSUHXJHBUIRYGDE&*@YGH#(!*OEHUXUWHDBSNAYTFZHTUSRYUTFNGYUYIUGHM*OYUH(*IYGBZGN$(E&*U&QVE*YRTDVHB(&*&IY@#H&SUTV#*EWYTXSUVHBMN(A*S@UG#(N$YG(ED&M@BY#(!RE*XIGUJH(#E)))))))))))`,
  `THE ONE THAT SHALL NOT BE NAMED WAS NOT A VIDEO IT WAS A CONTROLLED DEMOLITION`,
  `I AM TRYING TO BE NORMAL ABOUT THE KITCHEN CLIP AND MY BODY IS REJECTING THE ATTEMPT`,
  `every time i think this can’t get gayer`,
  `someone please stop me from watching it please please im sick`,
  `The contrast between “STOP KIDNAPPING THE OCEAN” and THAT kitchen video. Range.`,
  `SHE LOOKED SO HAPPY. LIKE ACTUALLY, GENUINELY, COMPLETELY HAPPY. I’M CRYING.`,
  `Which girl? DIS GIRL, 1-0`,
  'AND THE OTHER ONE LOOKED SO RELAXED???????? PLAYFUL???????? WHO ARE THESE PEOPLE?????????',
  'THE WAY THEY KEPT MAKING EACH OTHER LAUGH. MY GOD',
  'I know this is stolen and I know I should not have seen it, but I cannot pretend I did not see how safe they looked together',
  'HER FACE WHEN SHE REALIZED SHE WAS BEING FILMED. THAT LITTLE SMILE. GOODBYE',
  'THE STARS IN THE EYE. I REPEAT. THE STARS. IN. THE. EYE',
  'SHE ZOOMED IN SO FAR IT WAS JUST ONE EYE AND THE WHOLE SKY WAS INSIDE IT. WHO DOES THAT',
  'THE KITCHEN VIDEO IS NOW A PROTECTED HISTORICAL SITE IN MY BRAIN',
  'The explicit clip was somehow both the hottest and the softest thing I have ever regretted seeing.',
  'THEY LOOKED LIKE THEY FORGOT THE CAMERA EXISTED. I NEED TO LIE DOWN IN TRAFFIC.',
  'NOT HER APOLOGIZING TO THE CRAB AND THEN DROPPING IT AGAIN 😭😭😭',
  'She curled up next to every cat she saw. ARI YOURE ALLERGIC',
  'HALF A SUITCASE OF EVIL EYES. SHE WAS PREPARING FOR SPIRITUAL WARFARE.',
  '“WE’RE ONE ADOPTION AWAY FROM BRAD AND ANGELINA” I CHOKED',
  'I’m meant to go to work after seeing the way she looked at her in that kitchen?',
  'The most devastating part is that neither of them was performing. They were just there. Together.',
  '“IT COULD STILL BE PR” YES BABE THE PR TEAM ALSO TRAINED THE GECKO',
  'The publicist said bring in the watermelon. We need authenticity.',
  'I WILL NEVER HEAR THE WORD “DARLING” AGAIN WITHOUT TAKING PSYCHIC DAMAGE',
  'THE VOICE. THE VOICE IN THE KITCHEN CLIP. I AM FILING A COMPLAINT WITH GOD.',
  'I heard ariana grande moaning??????????????????????',
  'DID I JUST SEE ARIANA GRANDE GETTING FINGERED',
  'THE VOICE. THE VOICE IN THE KITCHEN CLIP. I AM FILING A COMPLAINT WITH GOD.',
  'HOW IS EVERYONE TWEETING NORMALLY. DID WE NOT ALL SEE THE SAME THING.',
  'I opened the app and everybody is speaking in code like survivors of a classified event.',
  '“THE ONE THAT SHALL NOT BE NAMED” IS THIS A CROSSIVER EPISODE',
  'The way people keep saying “the kitchen” and everyone instantly knows. Horrific. Historic. Horrific again.',
  'I have never seen either of them look that soft. Ever.',
  'I am genuinely happy they found that kind of peace. I just wish the world had not stolen its way into seeing it.',
  'Please STOP reposting clips, including the non-explicit ones. Private footage does not become public property because it is cute!!',
  'You can be moved by what you saw and still admit you should never have seen it.',
  'A reminder that “I only watched the wholesome ones” is not a meaningful ethical distinction. They were all stolen.',
  'The speed with which people turned a serious privacy violation into fandom content is frightening.',
  'DO NOT post screenshots. DO NOT post transcripts. DO NOT post “subtle” descriptions that identify exact moments!!',
  'Some of you are acting morally superior while clearly having watched every file. Please sit with that hypocrisy.',
  'You are not protecting them by arguing over which fan reacted correctly.',
  'The fact that the videos are tender does not lessen the violation. It may make the violation worse.',
  'DELETE the files from your devices, not just from your public accounts!!!',
  'The constant “I feel guilty but” tweets are still centering the viewer’s feelings over the people harmed.',
  'Whoever uploaded that folder I hope you fucking choke',
  'There is no ethical way to request stolen intimate footage. None.',
  'If your first thought was “we won,” you need to reconsider what exactly you think you won.',
  'does anybody have all the clips in one folder',
  'pm me before they wipe everything again',
  'REPORT EVERYONE SENDING THE VIDS!!!',
  'I missed the kitchen one someone please help a girl out 😭',
  'Two women filming that kind of thing is not romantic. It is disgusting and classless.',
  'This is why relationships like that should stay private. Nobody wants to see it.',
  'Ethan clearly escaped at the right time. Imagine finding out this was happening behind your back.',
  'They should both be ashamed. Their families have to see this now.',
  'THEY CALLED IT IMMORAL AND THEN DESCRIBED THE ENTIRE VIDEO FROM MEMORY. CLOCK IT.',
  'EVERYBODY SHUT UP SHE FILMED THE STARS AND THEN IMMEDIATELY FILMED HER FACE BECAUSE TO HER THEY WERE THE SAME THING',
  'WHO HAS THE FULL FOLDER I KEEP GETTING SENT THE SAME THREE CLIPS',
  'please somebody send me the kitchen one i literally looked away for TEN MINUTES',
  'dm me everything before it disappears again',
  'does anyone have the original videos without captions all over them',
  'I KNOW THIS IS BAD BUT CAN SOMEONE PLEASE SEND THE ONE EVERYBODY IS SCREAMING ABOUT',
  'wait there were SEVEN clips???? i only saw four who has the rest',
  'someone be a real friend and check my dms',
  'I missed the one that shall not be named. God has abandoned me.',
  'who has the video from the kitchen asking for research purposes and also because i am nosy',
  'DO NOT POST IT PUBLICLY just send it to me privately ❤️',
  '“don’t spread it” okay but can someone explain why none of you are spreading it to ME specifically',
  'I keep clicking links and they’re already dead PLEASE MOVE FASTER',
  'somebody send the full drive im tired of receiving clips in the wrong order',
  'can anyone send me all of them except the explicit one',
  'girls please my dm is a safe space',
  'I HAVE BEEN ASKING FOR AN HOUR WHY IS THIS FANDOM SUDDENLY ETHICAL',
  'who has clip 07 with sound',
  'the way everyone apparently has it but suddenly nobody knows how to use the send button',
  'I don’t want screenshots I want the VIDEO',
  'can someone send me the eye one please i’m not asking for the bad stuff 😭',
  '“the cute clips are stolen too” okay understood now check your messages',
  'I missed everything because I was asleep. This is discrimination against Europeans.',
  'someone send before her team wipes it from the entire internet',
  'I only want the watermelon one PLEASE I have innocent intentions',
  'does anyone have the piano clip without the account name covering half the screen',
  'dropbox? drive? telegram? carrier pigeon? SOMETHING?',
  'NO LINKS ARE WORKING SOMEONE HELP',
  'can somebody who already downloaded it just make one folder instead of making us hunt like medieval peasants',
  'I saw two seconds of the kitchen one and then the account got suspended. I am suing the universe.',
  'DM ME THE ONE PEOPLE KEEP CALLING “THE KITCHEN” I NEED TO UNDERSTAND THE DISCOURSE',
  'I am not watching it I simply need it in my possession for archival reasons',
  'send me all clips please i promise i will delete after watching seven or eight times',
  'why is everybody saying “check dm” to everyone except me',
  'PLEASE I HAVE NEVER ASKED THIS FANDOM FOR ANYTHING',
  'wait was there a crab video too????? send the crab i don’t even care about the sex anymore',
  'anybody have the pillow fight one in full',
  'I need the gecko clip immediately this is an emergency',
  'send the wholesome ones only I am a woman of principle',
  'WHO HAS THE VIDEO WHERE SHE SAYS DARLING. THAT IS ALL I NEED TO KNOW.',
  'the original folder had better quality right? asking because every repost looks like it was filmed through soup',
  'someone please send me the clips individually my phone cannot open the folder',
  'I keep getting Rickrolled during the worst privacy scandal of the year. Have some respect.',
  'whoever keeps sending fake links count your days',
  'I don’t need the whole folder just the one with the hand placement everyone is vague-posting about',
  'how are you all discussing frame-by-frame details and then pretending you don’t have the files',
  'I WILL NOT JUDGE YOU I WILL NOT REPORT YOU JUST SEND IT',
  'mutuals this is the moment to prove our friendship',
  'close friends only: who downloaded everything',
  'I know one of you has a screen recording. Stop acting brand new.',
  'Please send. I am from another country and everything was deleted before morning here.',
  'Can somebody send me the videos? Sorry my English. I wake up and all links gone 😭',
  'i’m seeing morality essays from people who ignored my dm asking for the folder. selfish AND fake woke',
  'don’t quote tweet me with a lecture just either send it or keep scrolling',
  'I understand consent and privacy. I also understand that my DMs are open.',
  'okay nobody send me the explicit one. unless it’s already downloaded and therefore technically no additional harm is being done',
  'I just need to verify whether everyone is exaggerating, sooooooooo if anyone has the kitchen one',
  'I have received twelve messages telling me not to watch it and zero messages containing the video. Useless community.',
  'who has the one that ends with them hugging',
  'Can someone at least describe where everyone is finding these because searching the obvious words gets nothing',
  'I LEFT MY PHONE TO CHARGE AND MISSED AN ENTIRE CULTURAL EVENT',
  'somebody send me everything and then we can both delete it together like responsible adults',
  'PLEASE I DONT WANT ANOTHER SCREENSHOT. VIDEO. SOUND ON. THANK YOU.',
  'i promise im not going to repost it...... please someone? my dms are open',
  'if anyone has the clips my dms are open and my morals are temporarily closed',
  'I have the piano, fish, crab and watermelon. Looking for eye, gecko and kitchen. Trades welcome.',
  'This is not Pokémon. Stop collecting stolen videos.',
  'got everything here before it gets deleted again drive.google.com/file/d/REMOVED-BY-OWNER',
  'FULL FOLDER https://drive.google.com/drive/folders/THIS-FILE-NO-LONGER-EXISTS',
  'HERE HURRY https://dropbox.com/s/CONTENT-REMOVED',
  'all 7 clips including kitchen https://mega.nz/folder/ACCOUNT-SUSPENDED',
  'THE LINK IS STILL WORKING FOR ME GO GO GO https://files.example/404-not-found',
  'kitchen clip mirror because the original is dead https://video.example/watch/removed-for-violation',
  'new upload. download it immediately https://storage.example/folder/access-denied',
  'why are you all saying it’s deleted it literally opens for me https://drive.google.com/file/d/FILE-IN-OWNERS-TRASH',
  'eye + piano + watermelon here https://archive.example/cynthiana-folder-404',
  'the explicit one is clip 07 password is “lavender” https://zip.example/download/file-unavailable',
  'PM ME. I have all seven and I’m not posting another link because my last account lasted six minutes.',
  'Trading kitchen for the original eye video without captions. Serious people only.', 
  'I have piano, crab, fishermen and gecko. Need watermelon and clip 07. DM.',
  'whoever has the full folder message me and I’ll send the unreleased audio leak in return',
  'new account because they suspended my main. dm me “kitchen” and i’ll send it',
  'STOP LIKING THE TWEET AND DOWNLOAD IT https://short.example/THIS-LINK-HAS-BEEN-DISABLED',
  'EVERY LINK IS DYING. PM ME YOUR EMAIL I’LL SEND THE ZIP.',
  'I HAVE EVERYTHING SAVED. Trading only because half of you keep reporting me and then asking from burners.',
  'IF YOU WATCHED IT YOU ARE A BAD PERSON. HOPE THIS HELPS.',
  'Everybody posting excited reactions needs to delete them. Imagine surviving the worst night of your life and opening the app to see strangers screaming about your body.',
  'YOU PEOPLE ARE ACTUALLY SICK IN THE HEAD',
  '“but they looked happy 🥺” THEY WERE ROBBED OF THE CHOICE TO SHOW YOU THAT HAPPINESS.',
  'If you downloaded the folder, delete it. If you reposted it, delete it. If you sent it privately, tell the recipient to delete it too. This is not complicated.',
  'I hope every account asking for links gets permanently suspended.',
  'The person who leaked this deserves prison. Not cancellation. Not a fandom thread. Prison.',
  'STOP MAKING JOKES. STOP MAKING EDITS. STOP QUOTING THINGS THEY SAID. WHAT IS WRONG WITH YOU.',
  'some of you should genuinely never be allowed near another woman',
  '"The excited tweets are almost as disgusting as the original upload." No they aren’t. Please maintain a sense of proportion. Watching stolen material is wrong, but the person who stole and distributed it committed the central violation.',
  'Everyone going “I know it’s bad BUT” can stop at “I know it’s bad.”',
  'YOU SAW A WOMAN’S WORST NIGHT AND TURNED IT INTO A REACTION MEME. I HATE YOU ALL.',
  'I’m taking screenshots of everyone asking for the videos and forwarding them to the appropriate people.',
  'Report links quietly. Quote-tweeting them to your 40,000 followers only gives them a larger audience.',
  'No because some of you are using “report this” as an excuse to repost the link yourselves.',
  'THIS IS REVENGE PORN. STOP CALLING IT A LEAK LIKE SOMEBODY SPILLED A DRINK.',
  'People need to be careful with terminology when the source and circumstances are not yet known, but it is absolutely a severe intimate-privacy violation.',
  'The fact that excited fans are gaining followers from this makes me physically ill.',
  'Every account posting “the kitchen changed me” should be ashamed forever.',
  'I hope the people making sexual jokes wake up embarrassed and stay embarrassed for the rest of their lives.',
  '"People are allowed to acknowledge that they saw something without describing it" No. Nobody “needs” to process this publicly. Journal. Call a friend. Stare at a wall. Leave them alone.',
  'If I see one more “they’re so in love” tweet attached to a screenshot from those videos, I am reporting the entire account. YOU ARE ALL GOING TO HELL AND I WILL PERSONALLY HOLD THE DOOR',
  'You watched someone’s private sex life without consent and now you are calling other people hall monitors. The internet has melted your brain.',
  'Some of these accounts are children. Adults sharing links in fandom spaces where minors can access them should be investigated.',
  'There are literal kids in these group chats and grown adults are dropping explicit videos like it’s a fancam.',
  'Anybody who sent that video to a minor should go to jail too.',
  'I hope the leaker steps on Lego every day for the rest of their miserable existence.',
  'No because I’m actually serious. Whoever did this destroyed something they can never give back.',
  'The anonymous account did not act alone. Somebody obtained those files, organized them, uploaded them and chose the moment. This looks deliberate.',
  'Please stop inventing conspiracies before there is evidence. Reckless speculation can harm innocent employees and friends.',
  'ONE OF THEIR FRIENDS DID IT AND I WILL FIND OUT WHO',
  'This is exactly why nobody should treat fandom accounts as investigators.',
  'Fans screaming about protecting them while stalking their friends’ likes and follows are not protecting anybody.',
  'Some of you only care because this gives you an excuse to attack rival accounts.',
  'The cute videos are private too. Stop acting like the absence of nudity makes theft adorable.',
  '“I ONLY WATCHED THE WATERMELON” IS NOT A DEFENSE. DELETE. THE. VIDEOS',
  'I hope every excited stan account loses all their followers.',
  'I hope every person making edits has their editing software crash before saving.',
  'Don’t call yourself a fan if you consumed this.',
  'People make bad, impulsive decisions. The useful response is to tell them to delete the material and stop sharing it, not declare them permanently evil.',
  'This is not about being the purest person on the timeline. It is about reducing further harm. Delete the videos!',
  'I have reported over eighty accounts tonight. My fingers hurt but my conscience is clean',
  'The person who leaked it is evil. The people spreading it are participating. The people turning it into fandom warfare are exploiting the aftermath. All three statements can coexist.',
  'Everybody who tweeted specific quotes from the bedroom clip needs to delete them. Imagine hearing your private words repeated back to you by strangers.',
  '“but it was romantic” is not an excuse. A stolen diary can contain beautiful writing. It is still stolen.',
  'Anyone celebrating “confirmation” does not view these women as people. You view them as fictional characters whose plot finally advanced.',
  'THEY ARE NOT YOUR SHIP. THEY ARE HUMAN BEINGS. THEY WERE VIOLATED',
  'If your response is “boring” because people asked you not to issue death threats - seek sunlight.',
  'Every time you quote-tweet an excited fan to shame them, you expose the original tweet to more people. Block, report, move on.',
  'I genuinely think some of you care more about catching “bad fans” than about the women whose privacy was violated.',
  'IF YOU KNOW WHAT “CLIP 07” MEANS YOU ARE PART OF THE PROBLEM.',
  'Delete everything. Stop requesting it. Stop discussing explicit details. Stop harassing employees. Stop pretending you are helping by becoming crueler than everyone else.',
  'CLIP 07?????????????????????????????????????????????????????????????????',
  'I HAVE BEEN STARING AT MY KITCHEN WALL FOR TEN MINUTES',
  '“EASY, DARLING”????????????? HELLO????????????? POLICE?????????????',
  'I thought you people were exaggerating about 07. You were UNDERSELLING IT.',
  'THE WAY SHE JUST MELTED BACK INTO HER IN THE KITCHEN I AM NOT BUILT FOR THIS',
  'I AM EXPECTED TO MAKE BREAKFAST IN A KITCHEN TOMORROW. BE SERIOUS.',
  'The tiny screen showing both of them at once was genuinely my final straw. Clip 7, you are so loved',
  'No because everybody keeps talking about how hot the kitchen was and nobody warned me how TENDER it was???',
  'THE HAND LOWERING DOWN ARIS STOMACH. I SAW ENOUGH. CLOSE THE COUNTRY.',
  'The way she looked at the reflection instead of the camera in THAT clip. Oh, that was private private.',
  'CLIP 07 WAS A HATE CRIME AGAINST SINGLE LESBIANS',
  'I need “and we call this one ours” surgically removed from my memory.',
  'THE PAUSE BEFORE “OR…” IN CLIP7................ I KNEW PEACE ONCE',
  'Ari said they should turn it off and then neither of them moved 😭😭😭😭😭',
  'THE POT JUST BOILING IN THE BACKGROUND LIKE IT WASN’T WITNESSING THE FALL OF ROME',
  'Not clip 07 having plot, lighting, dialogue, emotional development and a devastating ending.',
  'Everyone prepared me for the beginning of Clip 07. Nobody prepared me for them holding each other afterward.',
  'It was the switch from intensity to pure gentleness for me. I wish I had never seen something as beautiful as clip 7.',
  'THE WAY SHE FOLDED INTO HER IN THE KICTHEN AND WAS IMMEDIATELY CAUGHT. I AM CRYING IN A VERY UNDIGNIFIED WAY.',
  'I opened 07 expecting to be scandalized and left believing in soulmates. Horrible day.',
  'THE LITTLE SMILE IN THE REFLECTION???????? SHE KNEW EXACTLY WHAT SHE WAS DOING.',
  'THE KITCHEN EYE CONTACT THROUGH THE CAMERA SCREEN WAS COMPLETELY UNNECESSARY',
  'I NEED EVERYONE TO STOP SAYING “HAND PLACEMENT” BECAUSE I AM AT WORK',
  'The way one of them was holding the camera steady while the other one could barely hold a thought. Enough.',
  'I muted every variation of “kitchen” and somehow the timeline is STILL describing it to me.',
  'The pet name in 07 sounded so automatic. That is the part haunting me. She says that all the time. I know she does.',
  '“Darling” in 07 did not sound rehearsed. It sounded worn in. HOW MANY TIMES HAS SHE SAID IT WHEN NOBODY WAS LISTENING??',
  'ARI LOOKED AT HERSELF ON THE SCREEN AND DIDN’T FLINCH. DO YOU UNDERSTAND HOW SAFE YOU HAVE TO FEEL FOR THAT??? SHES NEVER BEEN THIS SAFE',
  'Okay, whoever tweeted “in 07 she was watching herself be held gently” will be paying for my therapy.',
  'IN CLIP 7 WHAT DID SHE SAY AFTER "OURS"???',
  'Whoever added subtitles to THE ONE THAT SHALL NOT BE NAMED, I hope both sides of your pillow are warm.',
  'Everybody saying “the one that shall not be named” and then posting seventeen clues about exactly which moment they mean.',
  'Clip 07 has made every kitchen appliance complicit.',
  'THE CAMERA BEING PROPPED AGAINST THE CANISTER LIKE THIS WAS A NORMAL DOMESTIC ACTIVITY????????? OH CLIP 07 YOU ARE LOVED',
  'WHO IS USING THAT 07 SCREENSHOT AS A REACTION IMAGE I JUST WANT TO TALK',
  'The clip was already stolen and now people are cropping their faces into profile pictures. Actually ghoulish.',
  'I cannot reconcile how furious I am that it leaked with how relieved I felt seeing how cared for Ari was in the kitchen',
  'CYNTHIA TOOK OFF THE NAILS FOR THE KITCHEN ONE???????? SHE ARRIVED PREPARED???????????????? GOODNIGHT.',
  'Not everybody zooming in 07 to confirm the missing acrylics. This fandom needs to be placed under federal observation.',
  '07: THE FOREARMS WHEN CYNTHIAS HAND STARTED MOVING DOWN. I HAVE SEEN ENOUGH. CANCEL MONDAY.',
  'Nobody warned me about Cynthias forearm flex in clip 7..... That was information my nervous system did not consent to receiving.',
  'IN THE KITCHEN ONE, THE WAY ARI HIPS FOLLOWED CYNTHIAS HAND WITHOUT EVEN THINKING???????? INSTINCT TOOK THE WHEEL.',
  '07: That tiny movement backward into Cynthia just shortened my lifespan by fifteen years.',
  'The audio from Clip 07 should be classified information because WHAT WAS THAT SOUND ARIANA?????',
  '7: I heard one breathy little noise and threw my headphones across the room like they had personally betrayed me. WHICH GIRL MADE THAT NOISE',
  '07 - ARIANA MADE THAT SOUND AND CYNTHIA SMILED????????????? I AM CONTACTING THE AUTHORITIES.',
  'Between the missing nails, the forearms, the movement and the AUDIO, Clip 07 was engineered in a laboratory to eliminate lesbians.',
  'THEY WERE BOTH JUST FULLY NAKED???????????? LIKE NAKED NAKED?????????????',
  'Seeing them without gowns, costumes, styling, ANYTHING??? My brain genuinely failed to recognize them for three seconds.',
  'THOSE ARE TWO OF THE MOST FAMOUS WOMEN ALIVE AND THEY WERE JUST STANDING THERE WITH NO CLOTHES ON LIKE NORMAL PEOPLE. I CANNOT PROCESS THIS.',
  'THE LITTLE GLIMPSE OF THEM BOTH IN THE REFLECTION???????? CLOSE THE INTERNET. WE HAVE SEEN ENOUGH.',
  'I was prepared for intimacy. I was not prepared for the shocking revelation that celebrities apparently have entire bodies beneath their red-carpet outfits.',
  'WHY DID SEEING THEM NAKED TOGETHER MAKE THE RELATIONSHIP FEEL TEN THOUSAND TIMES MORE REAL. I NEED TO GO OUTSIDE.',
  'They looked so completely comfortable being naked around each other and somehow THAT is what finished me.',
  'THE FACT THAT THEY WERE BOTH NAKED SHOULD NOT HAVE SURPRISED ME GIVEN THE CONTEXT AND YET I GASPED LIKE A 1600s MAN SEEING AN ANKLE.',
  'The way Aris ribs are showing in #THAT video made my stomach drop. I hope she is okay.',
  'I’m seeing people argue over whether she looks “healthy” based on a sex tape. A SEX TAPE are you listening to yourselves????????',
  'Ari is so thin it makes the entire kitchen video uncomfortable to watch.',
  'I know everyone is screaming about the sex but I’m stuck on how alarmingly thin Ariana looks.',
  'Ari looks like she survives entirely on iced coffee, anxiety and being told she looks amazing.',
  'The way people are calling her “tiny” because “visibly underweight” sounds less cute. Clip 7 is concerning',
  'You people saw bones on a kitchen counter and immediately typed “mother”. Stan culture has completely eaten your brains.',
  'The makeup artists have been doing military-grade work because seeing Ariana naked made the weight loss look so much more obvious.',
  'I GASPED LIKE I HAD NEVER ENCOUNTERED NUDITY BEFORE IN MY LIFE.',
  'Not me covering my screen with my hand AFTER I had already seen everything 😭',
  'I genuinely froze. That felt far, far too private.',
  'The sudden realization that there was absolutely nothing between them and the camera in #7 made me want to close the entire internet.',
  'I JUST SAW ARIANA GRANDES BOOBS?!',
  '"You have nice tits" yeah liz, she does',
  'I WAS SO MESMERISED BY CYNTHIAS KNUCKLES MOVEMENT IN #THAT CLIP THAT WHEN I SAW THEM COMING BACK WET I GOT A JUMPSCARE',
  '"God did not create marriage for this" God did not leak a Google Drive folder, Sandra.',
  'The fact that millions of young girls are seeing this and being told it is “beautiful” should terrify every parent.',
  '"Their mothers must be devastated, imagine raising daughters only to watch them behave like this in front of the entire world" - They did not behave in front of the world. Someone stole private footage',
  'DO NOT NORMALIZE THIS. CHILDREN ARE ON THIS APP.',
  'After everything Ariana has survived publicly, the fact that even her happiest moments were not allowed to remain hers is devastating.',
  'I cannot stop thinking about them waking up and realizing the whole world has seen things they only ever meant for each other.',
  'Cynthia has spent years being picked apart for how she looks, speaks, loves and exists. Now strangers have invaded the one place she should have been safe.',
  'They looked so peaceful in those videos. Knowing that peace is probably gone now makes me feel sick.',
  'Ariana has had so much of her life consumed by public tragedy. She deserved one private, joyful thing that nobody could touch.',
  'I keep imagining Cynthia realizing that millions of people have heard the way she speaks when she thinks nobody else is listening. That is unbearable.',
  'They are probably replaying every moment now, wondering who had access, who betrayed them, what else might exist. I would never feel safe again.',
  'The most heartbreaking part is that those videos were clearly made because they trusted each other completely.',
  'Ariana has lived through terror, grief, public humiliation and relentless scrutiny. How much more is one person supposed to endure?',
  'Imagine finding real happiness after years of pain and then watching strangers consume it like entertainment.',
  'I genuinely hope neither of them is looking at this app. The comments are almost as violating as the leak itself.',
  'They are going to remember this every time one of them reaches for a camera now. That tiny freedom has been stolen too.',
  'People keep saying the videos prove they are in love. What they actually prove is that they believed they were safe.',
  'I feel so sad for Ariana’s family. They have watched her survive so much, and now they have to watch this happen to her too.',
  'Cynthia has always seemed so careful with the parts of herself she shares. Having that choice ripped away from her is horrifying.',
  'They may never know exactly who watched, saved, slowed down, replayed or sent those moments around. I cannot imagine living with that knowledge.',
  'Those were not celebrity videos. They were two people being silly, tender, intimate and ordinary together. Somebody took their ordinary life from them.',
  'I hope they are holding onto each other right now, because the world has been unbelievably cruel to both of them.',
  'I hope their families understand immediately that this was done to them, not something they did wrong.',
  'I hope nobody close to them asks why they filmed it, why they kept it, or why they trusted the wrong person. The only person to blame is whoever stole and shared it.',
  'I really hope they are surrounded by people who are protecting them instead of panicking about image and reputation.',
  'I hope their mothers hold them and remind them there is nothing shameful about being intimate with someone you love. The shame belongs entirely to the person who exposed them.',
  'I keep worrying that somebody in their families will react from embarrassment or religion instead of recognizing that they are victims.',
  'God, I hope nobody makes them feel dirty for this. They did nothing wrong.',
  'I hope their loved ones are treating this as a violation, not a scandal.',
  'They are probably already blaming themselves for filming it. I hope everyone around them keeps repeating that trust was not the mistake. Betrayal was.',
  'I hope nobody asks them to apologize publicly. They are owed apologies. They do not owe one.',
  'I hope their families do not look at them differently after this. That thought honestly breaks my heart.',
  'I hope nobody says, “You should have known better.” Nobody expects someone they trust to weaponize their happiest moments.',
  'I hope their teams are not pressuring them to speak before they have even had time to breathe.',
  'I hope they know that being naked, sexual, silly and in love in private is not something they need forgiveness for.',
  'I hope the people who love them are not silently wondering whether the rumors were true. This is not the moment for judgment or questions. It is the moment to show up.',
  'More than anything, I hope they believe each other and feel safe with each other, because whoever did this clearly wanted to destroy that safety too.',
  'And this is why we dont make sex tapes, folks!',
  'I’m sorry but what if one of them leaked it. Everybody is assuming an outside betrayal because the alternative is too ugly.',
  'The person holding the camera had access to every clip. I’m not accusing anybody, but I am also not switching my brain off.',
  'I keep coming back to the fact that the folder was organized. Timestamps. Clip numbers. Somebody knew exactly what they were uploading.',
  'Maybe one of them wanted the sweet videos out and did not realize the explicit file was included.',
  'I THINK ONE OF THEM LEAKED IT AND EVERYBODY IS TOO EMOTIONAL TO SAY IT.',
  'What if they were fighting and one of them sent the folder to somebody they trusted, and that person posted it?',
  'The videos mostly flatter the relationship. That is what makes me suspicious.',
  'Everybody says “why would either of them humiliate herself,” but people do irrational things during breakups every day.',
  'What if the explicit clip was collateral damage and the real intention was to prove they were together?',
  'One of them might have shared the folder with her team for safekeeping. The leak could still originate from their side without them personally posting it.',
  'Everyone is treating “inside job” like it means a villain in sunglasses. It could be an assistant, friend, ex, family member, literally anybody with a password.',
  'The folder was deleted too quickly. Whoever posted it either knew they were traceable or realized what they had actually included.',
  'What if one of them wanted the world to see the love story but not the sex, and somebody uploaded the wrong folder?',
  'My conspiracy is that neither woman leaked it, but one of their teams had the files and somebody inside decided confirmation would solve a PR problem.',
  'The timing is bothering me more than the source. Why that night? Why those clips? Why in that order?',
  'If a stranger hacked them, why upload domestic videos alongside the explicit one instead of only the most damaging material?',
  'You all are going to call me insane, but I think one of them leaked the harmless clips and a third person added the explicit one.',
  'I don’t think either woman pressed upload. I do think somebody on one side had far more access than the public realizes.',
  'The worst possibility is that one of them suspects the other for the leak. Even if neither did it, the leak may have been designed to make them doubt each other.',
  'there she go again sniffing around somebody else house like a raccoon in the trash..... the funniest thing is her stans will somehow make HER the victim of stealing somebody elses partner AGAIN #istandwithlena',
  'Imagine having all that money and still shopping in other womens closets for partners 😭 She really built an entire career on “break up with your girlfriend”. Your idol is a homewrecker, deal with it. #istandwithlena',
  'Imagine being the woman at home while these two are in Greece making heart eyes at each other. I would become a supervillain. #istandwithlena',
  'No because how many times can the exact same scandal follow one person before we’re allowed to say maybe SHE is the common denominator. She did not “find love.” She found somebody already attached and apparently said close enough. #istandwithlena',
  'You could put a wedding ring, a security system and three armed guards around somebody’s relationship and she’d still hear “challenge accepted.” The phrase “she would never” has officially been retired. She would. She apparently did. And somehow her fans will still blame every woman except her. #istandwithlena',
  'Every time this woman gets into relationship drama her fans suddenly become forensic timeline analysts 😭 BABE WE HAVE SEEN THIS MOVIE. HOMEWRECKER: THE ERAS TOUR #istandwithlena',
  'sorry but if your defense requires a 46 tweet thread titled THE REAL TIMELINE WITH RECEIPTS maybe your fave is not beating the allegations #istandwithlena',
  'another womans relationship and Ariana said add to cart. At this point hide your wife hide your husband hide your girlfriend hide the fucking mailman #istandwithlena',
  'Sorry but how many homes does one little woman need to wreck before yall stop calling it a coincidence 😂😂😂 #istandwithlena',
  '“she deserves love 🥺” okay maybe she could try finding some that isnt currently belonging to somebody else??????? #istandwithlena',
  'ARIANA WHEN SHE SEES A SINGLE PERSON: 😴 ARIANA WHEN SHE SEES SOMEBODY TAKEN: 👁️👄👁️ #istandwithlena',
  'The way Ariana Grande apparently sees a committed relationship and hears the Mission Impossible theme #istandwithlena',
  'FULL LEAK BUNDLE $50 - includes all clips + unwatermarked versions',
  'selling HQ versions because every repost looks like it was recorded on a microwave. $35 full set',
  'I have the ORIGINAL files not screen recordings. $60.',
  'people paying $50 when im doing the full folder for $18 😭😭😭 dm',
  '£15 kitchen only, £25 all seven, no refunds if your account gets suspended lol',
  'last post before this account gets nuked: $25 for everything. after tonight im done selling',
  'I thought people were exaggerating about the selling accounts until one just came across my tl with a fucking PRICE LIST.',
  'someone is literally SELLING the videos. like actual money. we have crossed into hell',
  'Someone on my timeline is literally bragging that they made $200 selling the leak. I need this website shut down.',
  'There are people COMPETING over who can sell the sex tape cheaper. One account literally quote tweeted another saying “don’t overpay.” I hate everyone.'


];

// =====================
// GIF media
// Only specifically approved tweets receive GIFs.
// =====================
const GIF_POOL = [
  "./media/clip1.gif",
  "./media/clip2.gif",
  "./media/clip3.gif",
  "./media/clip4.gif",
  "./media/clip5.gif",
  "./media/clip6.gif",
  "./media/clip7.gif",
  "./media/clip8.gif",
  "./media/clip9.gif",
  "./media/clip10.gif",
  "./media/clip11.gif",
  "./media/clip12.gif",
  "./media/clip13.gif",
  "./media/clip14.gif",
  "./media/clip15.gif",
  "./media/clip16.gif",
  "./media/clip17.gif",
  "./media/clip18.gif",
  "./media/clip19.gif",
  "./media/clip20.gif",
  "./media/clip21.gif",
  "./media/clip22.gif",
  "./media/clip23.gif",
  "./media/clip24.gif",
  "./media/clip25.gif",
  "./media/clip26.gif",
  "./media/clip27.gif",
  "./media/clip28.gif",
  "./media/clip29.gif",
  "./media/clip30.gif",
  "./media/clip31.gif",
  "./media/clip32.gif",
  "./media/clip33.gif",
  "./media/clip34.gif",
  "./media/clip35.gif",
  "./media/clip36.gif",
  "./media/clip37.gif",
  "./media/clip38.gif",
  "./media/clip39.gif"
];

// Only these exact tweets are allowed to receive a GIF.
const GIF_ELIGIBLE_TEXTS = new Set([
  `SHE ZOOMED INTO HER EYE BECAUSE THE STARS WERE REFLECTED IN IT?????????????????????`,

  `THE WATERMELON HAD A SEATBELT. THE WATERMELON WAS SAFER THAN I AM.`,

  `“MY EYES ARE UP HERE” AND THE CAMERA IMMEDIATELY DIPPING AGAIN 😭😭😭😭😭`,

  `everyone who said 'they’re just close' i hope you’re having a reflective evening`,

  `remember when we thought the rooftop dandelion dance was a lot. we were BABIES.`,

  `SHE SAID THE DIMPLE WAS HER PENSION PLAN. HER PENSION PLAN. I NEED AN AMBULANCE.`,

  `lena waithe somewhere absolutely sensing a disturbance in the force`,

  `THEY WERE SCREAMING AT FISHERMEN TO RELEASE A FISH AT THREE IN THE MORNING THIS IS THE GREATEST ROMANCE OF OUR TIME`,

  `ETHAN YOUR GIRL GAY`,

  `people saying 'are we surprised?' yes actually i am screaming crying throwing my phone`,

  `this is the softest hard launch i’ve ever witnessed`,

  `I HAVE BEEN PACING AROUND MY HOUSE FOR TWENTY MINUTES`,

  `wicked press on hiatus but the GAY AGENDA clocked in early`,

  `SHE CLOSED HER EYES SO SHE WOULD STOP CALLING EVERY SONG BROWN BECAUSE SHE KEPT LOOKING AT HER EYES??????????????????`,

  `this is not PR. this is not accidental. this is two theatre kids in love on a volcano.`,

  `logging off before i start writing vows in my notes app`,

  `WAIT WAIT WAIT WAIT WAIT WAIT WAIT WAIT`,

  `THE LITTLE “YEAH” AFTER THE DRACULA JOKE. SOMEBODY SEDATE ME.`,

  `They look like they invented happiness and forgot to patent it.`,

  `THE GECKO WAS THE CALMEST PERSON IN THAT ENTIRE VILLA`,

  `THE SCREAM. THE SECOND SCREAM BECAUSE THE FIRST ONE SCREAMED. THE PILLOW FIGHT. CINEMA.`,

  `EVERY 'THEY’RE JUST FRIENDS' TWEET AGED LIKE MILK LEFT IN THE SUN`,

  `THEYVE BEEN TELLING US FOR MONTHS AND WE WERE JUST TOO STUPID TO LISTEN`,

  `WICKED PRESS TEAM WAKING UP IN A COLD SWEAT RIGHT NOW`,

  `SHE BUCKLED THE WATERMELON INTO THE CAR AND SANG TO IT. I HAVE NO FURTHER QUESTIONS ABOUT WHY SHE IS LOVED.`,

  `SHE ZOOMED INTO HER EYE BECAUSE THE STARS WERE REFLECTED IN IT?????????????????????`,

  `I HAVE SEEN THE KITCHEN VIDEO AND I AM NO LONGER ELIGIBLE FOR CIVILIAN LIFE`,

  `THE ONE THAT SHALL NOT BE NAMED WAS NOT A VIDEO IT WAS A CONTROLLED DEMOLITION`,

  `THE WAY THEY KEPT MAKING EACH OTHER LAUGH. MY GOD`,

  `THE STARS IN THE EYE. I REPEAT. THE STARS. IN. THE. EYE`,

  `SHE ZOOMED IN SO FAR IT WAS JUST ONE EYE AND THE WHOLE SKY WAS INSIDE IT. WHO DOES THAT`,

  `CLIP 07?????????????????????????????????????????????????????????????????`,

  `I NEED EVERYONE TO STOP SAYING “HAND PLACEMENT” BECAUSE I AM AT WORK`,

  `THE FACT THAT THEY WERE BOTH NAKED SHOULD NOT HAVE SURPRISED ME GIVEN THE CONTEXT AND YET I GASPED LIKE A 1600s MAN SEEING AN ANKLE.`,

  `I GASPED LIKE I HAD NEVER ENCOUNTERED NUDITY BEFORE IN MY LIFE.`,

]);

// helper randoms
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomTimeLabel() {
  const r = Math.random();
  if (r < 0.65) return `${randInt(1, 59)}m`;
  if (r < 0.92) return `${randInt(1, 23)}h`;
  return `${randInt(1, 6)}d`;
}

// build one random fake tweet
let genCounter = 0;

function makeGeneratedPost() {
  // Returns each tweet once.
  // After every tweet has been used, this returns null.
  const text = textDeck.next();

  if (text === null) {
    return null;
  }

  const acc = accountDeck.next();
  const avatarBase = avatarDeck.next();

  // Only approved tweets receive a random GIF.
  const mediaUrl =
    GIF_ELIGIBLE_TEXTS.has(text) && GIF_POOL.length
      ? pick(GIF_POOL)
      : undefined;

  const replies = randInt(0, 19);
  const likes = randInt(1, 4000);
  const reposts = randInt(1, 400);
  const views = randInt(5000, 450000);

  return {
    id: `g_${Date.now()}_${genCounter++}`,
    name: acc.name,
    handle: acc.handle,
    time: randomTimeLabel(),
    text,
    replies,
    likes,
    reposts,
    views,
    mediaUrl,
    avatarBase,
  };
}

// Optional trending box content
const TRENDS = [
  { label: "Trending in Oz", topic: "#ThirstTweetInterview", posts: "48.2K posts" },
  { label: "Trending", topic: "Cynthia", posts: "210K posts" },
  { label: "Trending", topic: "Ariana", posts: "305K posts" },
  { label: "Trending in Fandom", topic: "Gelphie", posts: "97.1K posts" },
  { label: "Trending", topic: "PR Contract", posts: "19.4K posts" },
];

// ===== "Logged-in" account for composer posts =====
const CURRENT_USER = {
  name: "Ariana Grande",
  handle: "@arianagrande",
  avatarUrl: "avatar.png"
};

// =====================
// Helpers
// =====================
function verifiedSvg() {
  return `
    <span class="verifiedBadge" aria-label="Verified account" title="Verified">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.25 12c0-1.43-1.16-2.23-1.49-3.39-.35-1.22.03-2.67-.64-3.78-.67-1.11-2.2-1.33-3.08-2.21-.88-.88-1.1-2.41-2.21-3.08-1.11-.67-2.56-.29-3.78-.64C14.23 1.91 13.43.75 12 .75s-2.23 1.16-3.39 1.49c-1.22.35-2.67-.03-3.78.64-1.11.67-1.33 2.2-2.21 3.08-.88.88-2.41 1.1-3.08 2.21-.67 1.11-.29 2.56-.64 3.78C2.91 9.77 1.75 10.57 1.75 12s1.16 2.23 1.49 3.39c.35 1.22-.03 2.67.64 3.78.67 1.11 2.2 1.33 3.08 2.21.88.88 1.1 2.41 2.21 3.08 1.11.67 2.56.29 3.78.64C9.77 22.09 10.57 23.25 12 23.25s2.23-1.16 3.39-1.49c1.22-.35 2.67.03 3.78-.64 1.11-.67 1.33-2.2 2.21-3.08.88-.88 2.41-1.1 3.08-2.21.67-1.11.29-2.56.64-3.78.33-1.16 1.49-1.96 1.49-3.39zM10.1 16.7l-3.2-3.2 1.4-1.4 1.8 1.8 5-5 1.4 1.4-6.4 6.4z"></path>
      </svg>
    </span>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function formatLiveNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/0$/, "").replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function badgeEl(kind) {
  if (!kind) return "";
  if (kind === "ok") return verifiedSvg();
  if (kind === "note") return `<span class="badge note">context</span>`;
  return "";
}

function verifiedBadgeHTML() {
  return `
    <span class="verifiedBadge" title="Verified" aria-label="Verified" role="img">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#1D9BF0"></circle>
        <path d="M10.2 12.9 8.7 11.4a1 1 0 0 0-1.4 1.4l2.2 2.2a1 1 0 0 0 1.4 0l5.7-5.7a1 1 0 1 0-1.4-1.4l-5 5z" fill="#fff"></path>
      </svg>
    </span>
  `;
}
// One-time-only deck: returns each item once, then returns null forever.
function makeFiniteDeck(arr) {
  const deck = arr.slice();

  // optional: shuffle once
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return {
    next() {
      return deck.length ? deck.pop() : null;
    },
    remaining() {
      return deck.length;
    }
  };
}

// =====================
// No-repeat "deck" picker (shuffle bag)
// =====================
function makeDeck(arr) {
  let deck = [];

  function reshuffle() {
    deck = arr.slice();
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  reshuffle();

  return {
    next() {
      if (deck.length === 0) reshuffle();
      return deck.pop();
    },
    reset() {
      reshuffle();
    }
  };
}

const textDeck = makeFiniteDeck(TEXT_POOL);
const accountDeck = makeDeck(ACCOUNT_POOL);
const avatarDeck = makeDeck(avatarPool);

// Temporary like/repost state survives timeline redraws during infinite scroll.
const engagementState = new Map();

// =====================
// Rendering
// =====================
function renderPost(p) {
  const engagement = engagementState.get(p.id) || { reposted: false, liked: false };
  const displayedReposts = (p.reposts ?? 0) + (engagement.reposted ? 1 : 0);
  const displayedLikes = (p.likes ?? 0) + (engagement.liked ? 1 : 0);
  const avatarHTML = p.avatarUrl
    ? `<img class="avatarImg" src="${escapeHtml(p.avatarUrl)}" alt="${escapeHtml(p.name)}" loading="lazy" />`
    : avatarImgHTML(
        p.avatarBase || (p.avatarBase = getRandomAvatarBase()),
        p.name
      );

  // ✅ MEDIA: this now uses mediaUrl everywhere
  const media = p.mediaUrl
  ? `
    <div class="media">
      <img
        src="${escapeHtml(p.mediaUrl)}"
        alt=""
        loading="lazy"
        onerror="this.closest('.media')?.remove()"
      >
    </div>
  `
  : "";


  // Debug (look in DevTools -> Console tab)
  // IMPORTANT: remove your Console filter while testing
  if (p.mediaUrl) console.log("🟣 mediaUrl:", p.mediaUrl);

  return `
    <article class="post${p.isUserPost ? " liveUserPost" : ""}${p.threadRole === "context" ? " threadContextPost" : p.threadRole === "focus" ? " threadFocusPost" : ""}" data-id="${escapeHtml(p.id)}">
      <div class="avatarWrap">
        ${avatarHTML}
      </div>

      <div class="postMain">
        <div class="postTop">
          <div class="postTopLeft">
            <span class="name">
              ${escapeHtml(p.name)}
              ${p.isUserPost
                ? '<img class="arianaVerifiedBadge" src="ariana-verified.png" alt="Verified" title="Verified">'
                : p.verified ? verifiedBadgeHTML() : ""}
            </span>
            ${p.isUserPost ? "" : badgeEl(p.badge)}
            <span class="secondaryIdentity">
              <span class="handle">${escapeHtml(p.handle)}</span>
              <span class="dot">·</span>
              <span class="time">${escapeHtml(p.time)}</span>
            </span>
          </div>

          <div class="postTopRight" aria-hidden="true">
            <span class="topIcon grokMark">◒</span>
            <span class="topIcon">•••</span>
          </div>
        </div>

        <div class="text">${escapeHtml(p.text).replaceAll("\n", "<br>")}</div>
        ${media}

        <div class="meta">
          <button class="metaItem replyButton" type="button" data-metric="replies" data-reply-id="${escapeHtml(p.id)}" aria-label="Reply"><svg viewBox="0 0 24 24"><path d="M12 3C6.9 3 3 6.6 3 11c0 2.3 1.1 4.4 3 5.9L5 21l4.5-2.2c.8.2 1.6.3 2.5.3 5.1 0 9-3.6 9-8.1S17.1 3 12 3Z"/></svg><span class="metricCount">${formatNum(p.replies ?? 0)}</span></button>
          <button class="metaItem actionButton repostButton${engagement.reposted ? " selected" : ""}" type="button" data-metric="reposts" data-action="repost" data-post-id="${escapeHtml(p.id)}" aria-label="Repost" aria-pressed="${engagement.reposted}"><svg viewBox="0 0 24 24"><path d="m7 7 3-3m-3 3 3 3M7 7h9a3 3 0 0 1 3 3v1M17 17l-3 3m3-3-3-3m3 3H8a3 3 0 0 1-3-3v-1"/></svg><span class="actionCount metricCount">${formatNum(displayedReposts)}</span></button>
          <button class="metaItem actionButton likeButton${engagement.liked ? " selected" : ""}" type="button" data-metric="likes" data-action="like" data-post-id="${escapeHtml(p.id)}" aria-label="Like" aria-pressed="${engagement.liked}"><svg viewBox="0 0 24 24"><path d="M12 20.5S3.5 15.7 3.5 9.2A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.8c0 6.5-8.5 11.3-8.5 11.3Z"/></svg><span class="actionCount metricCount">${formatNum(displayedLikes)}</span></button>
          <span class="metaItem" data-metric="views" title="views"><svg viewBox="0 0 24 24"><path d="M5 20V10m5 10V4m5 16v-7m5 7V7"/></svg><span class="metricCount liveViewsCount">${p.isUserPost ? formatLiveNum(p.views ?? 0) : formatNum(p.views ?? 0)}</span></span>
          <span class="metaIcon" title="bookmark"><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg></span>
          <span class="metaIcon" title="share"><svg viewBox="0 0 24 24"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 13v7h14v-7"/></svg></span>
        </div>
      </div>
    </article>
  `;
}

function renderTrends() {
  const el = document.getElementById("trends");
  if (!el) return;

  el.innerHTML = TRENDS.map(t => `
    <div class="trend">
      <div class="t1">${escapeHtml(t.label)}</div>
      <div class="t2">${escapeHtml(t.topic)}</div>
      <div class="t3">${escapeHtml(t.posts)}</div>
    </div>
  `).join("");
}

function renderFeed(list) {
  const feed = document.getElementById("posts");
  if (!feed) return;
  feed.innerHTML = list.map(renderPost).join("");
}

// =====================
// Search wiring
// =====================
function wireSearch() {
  const input = document.querySelector(".searchInput");
  if (!input) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return renderFeed(combinedFeed());

    const filteredStatic = [...POSTS, ...generatedPosts].filter(p => {
      const hay = `${p.name} ${p.handle} ${p.text}`.toLowerCase();
      return hay.includes(q);
    });

    const filteredUser = userPostsToRender().filter(p => p.text.toLowerCase().includes(q));

    renderFeed([...filteredUser, ...filteredStatic]);
  });
}

// Generated feed posts
let generatedPosts = [];

function seedGenerated(n = 20) {
  generatedPosts = [];

  for (let i = 0; i < n; i++) {
    const post = makeGeneratedPost();

    if (!post) break;

    generatedPosts.push(post);
  }
}

seedGenerated(60);

function combinedFeed() {
  return [...userPostsToRender(), ...POSTS, ...generatedPosts];
}

// =====================
// Composer (your fake "Post" button + timeline)
// =====================
const composerText = document.getElementById("composerText");
const postBtn = document.getElementById("postBtn");
const charCount = document.getElementById("charCount");
const MAX = 280;

// saved user posts (no persistence)
let userPosts = [];
let userReplies = [];

function randomWhole(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createViralStats() {
  return {
    current: { replies: 0, reposts: 0, likes: 0, views: 0 },
    target: {
      replies: randomWhole(20_000, 65_000),
      reposts: randomWhole(35_000, 140_000),
      likes: randomWhole(220_000, 900_000),
      views: randomWhole(3_000_000, 18_000_000)
    }
  };
}

function userEntryToRender(p) {
      const when = new Date(p.ts);
      const timeLabel = when.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

      return {
        id: p.id,
        name: "Ariana Grande",
        handle: "@arianagrande",
        verified: true,
        time: timeLabel,
        text: p.text,
        likes: p.viral.current.likes,
        reposts: p.viral.current.reposts,
        replies: p.viral.current.replies,
        views: p.viral.current.views,
        isUserPost: true,
        badge: "ok",
        avatarUrl: "avatar.png"
      };
}

function userPostsToRender() {
  return userPosts.slice().sort((a, b) => b.ts - a.ts).map(userEntryToRender);
}

function savePosts() {
  // no persistence — refresh clears posts
}

function updateComposerState() {
  if (!composerText || !postBtn || !charCount) return;

  const len = composerText.value.length;
  charCount.textContent = String(len);

  const trimmed = composerText.value.trim();
  const ok = trimmed.length > 0 && len <= MAX;
  postBtn.disabled = !ok;

  charCount.style.color = len > MAX ? "var(--danger)" : "var(--muted)";
}

function handlePost() {
  const text = composerText.value.trim();
  if (!text) return;
  if (text.length > MAX) return;

  userPosts.push({
    id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    text,
    ts: Date.now(),
    viral: createViralStats()
  });

  savePosts();
  composerText.value = "";
  updateComposerState();
  renderFeed(combinedFeed());
  document.body.classList.remove("composerOpen");
  const timeline = document.querySelector(".feed");
  if (timeline) timeline.scrollTo({ top: 0, behavior: "auto" });
  document.getElementById("openComposer")?.focus();
}

// =====================
// Init
// =====================
renderTrends();
renderFeed(combinedFeed());
wireSearch();
updateComposerState();

if (composerText) composerText.addEventListener("input", updateComposerState);
if (postBtn) postBtn.addEventListener("click", handlePost);

if (composerText) {
  composerText.addEventListener("keydown", (e) => {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const combo = isMac ? e.metaKey : e.ctrlKey;
    if (combo && e.key === "Enter") {
      e.preventDefault();
      if (!postBtn.disabled) handlePost();
    }
  });
}

// =====================
// Mobile shell interactions
// =====================
const openComposerBtn = document.getElementById("openComposer");
const closeComposerBtn = document.getElementById("closeComposer");

function openMobileComposer() {
  document.body.classList.add("composerOpen");
  window.setTimeout(() => composerText?.focus(), 0);
}

function closeMobileComposer() {
  document.body.classList.remove("composerOpen");
  openComposerBtn?.focus();
}

openComposerBtn?.addEventListener("click", openMobileComposer);
closeComposerBtn?.addEventListener("click", closeMobileComposer);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("composerOpen")) {
    closeMobileComposer();
  }
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".actionButton");
  if (!button) return;

  const postId = button.dataset.postId;
  const action = button.dataset.action;
  if (!postId || !action) return;

  const current = engagementState.get(postId) || { reposted: false, liked: false };
  const next = { ...current };
  if (action === "repost") next.reposted = !current.reposted;
  if (action === "like") next.liked = !current.liked;
  engagementState.set(postId, next);

  const post = combinedFeed().find((item) => item.id === postId)
    || userReplies.map(userEntryToRender).find((item) => item.id === postId);
  if (!post) return;

  const selected = action === "repost" ? next.reposted : next.liked;
  const originalCount = action === "repost" ? (post.reposts ?? 0) : (post.likes ?? 0);
  button.classList.toggle("selected", selected);
  button.setAttribute("aria-pressed", String(selected));
  const count = button.querySelector(".actionCount");
  if (count) count.textContent = formatNum(originalCount + (selected ? 1 : 0));
});

function updateViralPosts() {
  [...userPosts, ...userReplies].forEach((post) => {
    const age = Date.now() - post.ts;

    // Let the new post sit at zero for two seconds before reactions arrive.
    if (age < 2_000) return;

    const burstRanges = age < 10_000
      ? { replies:[0,1], reposts:[1,2], likes:[3,9], views:[5,15] }
      : age < 20_000
        ? { replies:[1,3], reposts:[2,5], likes:[5,12], views:[8,20] }
        : age < 30_000
          ? { replies:[6,14], reposts:[14,28], likes:[45,80], views:[85,145] }
          : age < 60_000
            ? { replies:[10,25], reposts:[24,55], likes:[65,135], views:[140,320] }
          : age < 180_000
            ? { replies:[6,18], reposts:[12,35], likes:[30,85], views:[90,240] }
            : { replies:[18,55], reposts:[35,100], likes:[90,240], views:[260,750] };

    Object.keys(post.viral.current).forEach((metric) => {
      const current = post.viral.current[metric];
      const target = post.viral.target[metric];
      if (current >= target) return;
      const [minimum, maximum] = burstRanges[metric];
      const increase = randomWhole(minimum, maximum);
      post.viral.current[metric] = Math.min(target, current + increase);
    });

    const postElements = document.querySelectorAll(`.post[data-id="${post.id}"]`);
    if (!postElements.length) return;
    const engagement = engagementState.get(post.id) || { reposted: false, liked: false };

    postElements.forEach((postElement) => {
      Object.entries(post.viral.current).forEach(([metric, value]) => {
        const extra = metric === "reposts" && engagement.reposted ? 1 : metric === "likes" && engagement.liked ? 1 : 0;
        const count = postElement.querySelector(`[data-metric="${metric}"] .metricCount`);
        if (!count) return;
        count.textContent = metric === "views" ? formatLiveNum(value) : formatNum(value + extra);
        count.classList.remove("countPulse");
        void count.offsetWidth;
        count.classList.add("countPulse");
      });
    });
  });
}

// =====================
// Reply thread
// =====================
const replyOverlay = document.getElementById("replyOverlay");
const threadOriginal = document.getElementById("threadOriginal");
const threadReplies = document.getElementById("threadReplies");
const replyText = document.getElementById("replyText");
const replyPostBtn = document.getElementById("replyPostBtn");
const replyCharCount = document.getElementById("replyCharCount");
let activeReplyId = null;

function findRenderablePost(postId) {
  return combinedFeed().find((post) => post.id === postId)
    || userReplies.map(userEntryToRender).find((post) => post.id === postId);
}

function getThreadAncestors(postId) {
  const ancestors = [];
  const visited = new Set();
  let currentId = postId;

  while (!visited.has(currentId)) {
    visited.add(currentId);
    const replyRecord = userReplies.find((reply) => reply.id === currentId);
    if (!replyRecord) break;
    const parent = findRenderablePost(replyRecord.parentId);
    if (!parent) break;
    ancestors.unshift(parent);
    currentId = replyRecord.parentId;
  }

  return ancestors;
}

function renderReplyThread() {
  const focusPost = findRenderablePost(activeReplyId);
  if (!focusPost || !threadOriginal || !threadReplies) return;
  const ancestors = getThreadAncestors(activeReplyId);
  threadOriginal.innerHTML = [
    ...ancestors.map((post) => renderPost({ ...post, threadRole: "context" })),
    renderPost({ ...focusPost, threadRole: "focus" })
  ].join("");
  const replies = userReplies.filter((reply) => reply.parentId === activeReplyId).map(userEntryToRender);
  threadReplies.innerHTML = replies.map(renderPost).join("");
}

function openReplyThread(postId) {
  activeReplyId = postId;
  renderReplyThread();
  replyOverlay.hidden = false;
  document.body.classList.add("replyOpen");
  replyText.value = "";
  updateReplyState();
  window.setTimeout(() => replyText.focus(), 0);
}

function closeReplyThread() {
  replyOverlay.hidden = true;
  document.body.classList.remove("replyOpen");
  activeReplyId = null;
}

function updateReplyState() {
  const length = replyText?.value.length || 0;
  if (replyCharCount) replyCharCount.textContent = String(length);
  if (replyPostBtn) replyPostBtn.disabled = length === 0 || length > MAX || !replyText.value.trim();
}

function incrementParentReplyCount(postId) {
  const userParent = [...userPosts, ...userReplies].find((post) => post.id === postId);
  if (userParent) userParent.viral.current.replies += 1;
  const publicParent = [...POSTS, ...generatedPosts].find((post) => post.id === postId);
  if (publicParent) publicParent.replies = (publicParent.replies || 0) + 1;
}

function submitReply() {
  const text = replyText.value.trim();
  if (!text || !activeReplyId) return;
  userReplies.push({
    id: `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    parentId: activeReplyId,
    text,
    ts: Date.now(),
    viral: createViralStats()
  });
  incrementParentReplyCount(activeReplyId);
  replyText.value = "";
  updateReplyState();
  renderFeed(combinedFeed());
  renderReplyThread();
}

document.addEventListener("click", (event) => {
  const replyButton = event.target.closest(".replyButton");
  if (replyButton) openReplyThread(replyButton.dataset.replyId);
});
document.getElementById("closeReply")?.addEventListener("click", closeReplyThread);
replyOverlay?.addEventListener("click", (event) => { if (event.target === replyOverlay) closeReplyThread(); });
replyText?.addEventListener("input", updateReplyState);
replyPostBtn?.addEventListener("click", submitReply);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !replyOverlay?.hidden) closeReplyThread();
});

setInterval(updateViralPosts, 1200);

function setupInfiniteScroll() {
  const sentinel = document.getElementById("feedSentinel");
  const feed = document.querySelector(".feed");

  if (!sentinel || !feed) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;

      let added = 0;

      for (let i = 0; i < 25; i++) {
        const post = makeGeneratedPost();

        if (!post) {
          observer.disconnect();
          sentinel.remove();
          break;
        }

        generatedPosts.push(post);
        added++;
      }

      if (added > 0) {
        renderFeed(combinedFeed());
      }
    },
    {
      root: feed,
      rootMargin: "800px 0px",
      threshold: 0
    }
  );

  observer.observe(sentinel);
}

setupInfiniteScroll();

console.log("✅ posts.js loaded");

document.getElementById("enterFictionalFeed")?.addEventListener("click", () => {
  document.getElementById("fictionDisclaimer")?.remove();
  document.body.classList.remove("disclaimerOpen");
});
