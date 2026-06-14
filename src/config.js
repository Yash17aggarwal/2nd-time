// ============================================================
// 💫 YOU ARE MY UNIVERSE — Configuration File
// ============================================================
// Edit this file to customize ALL content on the website.
// No code changes needed! Just update the values below.
// ============================================================

const CONFIG = {

  // ──────────────────────────────────────────────
  // 👤 NAMES
  // ──────────────────────────────────────────────
  herName: "Anjali",
  yourName: "Yash",

  // ──────────────────────────────────────────────
  // 📅 SPECIAL DATES
  // ──────────────────────────────────────────────
  herBirthday: "June 15",
  relationshipStartDate: "Feburary 2, 2025",

  // ──────────────────────────────────────────────
  // 🖼️ PHOTOS
  // Replace these paths with your actual photo paths.
  // Place photos in the /public/photos/ folder.
  // ──────────────────────────────────────────────
  herPhoto: "/2nd-time/photos/her.jpg",
  yourPhoto: "/2nd-time/photos/you.jpg",
  couplePhoto: "/2nd-time/photos/couple.jpg",
  favoritePhoto: "/2nd-time/photos/favorite.jpg",

  // ──────────────────────────────────────────────
  // 📖 OUR STORY — Timeline Events
  // Each event appears as a planet on the cosmic timeline.
  // ──────────────────────────────────────────────
  timelineEvents: [
    {
      icon: "🌍",
      title: "The Day We Met",
      date: "January 1, 2024",
      story: "The universe conspired to bring us together. From that very first moment, I knew something had changed forever.",
      caption: "Where it all began",
      photo: "/2nd-time/photos/nature.jpg",
    },
    {
      icon: "🌙",
      title: "Our First Conversation",
      date: "January 5, 2024",
      story: "Hours felt like minutes. Words flowed like cosmic rivers. We connected in a way I never thought possible.",
      caption: "When time stood still",
      photo: "/2nd-time/photos/nature.jpg",
    },
    {
      icon: "⭐",
      title: "First I Love You",
      date: "March 14, 2024",
      story: "Three words. Eight letters. One universe of meaning. The moment those words left my lips, every star in the sky shone brighter.",
      caption: "The words that changed everything",
      photo: "/2nd-time/photos/timeline-3.jpg",
    },
    {
      icon: "☄️",
      title: "Our Favorite Memory",
      date: "May 20, 2024",
      story: "Some moments are so perfect that the universe itself pauses to admire them. This was one of those moments.",
      caption: "Pure magic",
      photo: "/2nd-time/photos/timeline-4.jpg",
    },
    {
      icon: "🪐",
      title: "When I Knew You Were The One",
      date: "August 8, 2024",
      story: "It wasn't a single moment—it was every moment with you. Every laugh, every tear, every silence that spoke volumes.",
      caption: "The moment of certainty",
      photo: "/2nd-time/photos/timeline-5.jpg",
    },
    {
      icon: "🌌",
      title: "Our Future Together",
      date: "Forever",
      story: "This chapter hasn't been written yet. But I already know it will be the most beautiful one—because I'll be writing it with you.",
      caption: "The best is yet to come",
      photo: "/2nd-time/photos/timeline-6.jpg",
    },
  ],

  // ──────────────────────────────────────────────
  // 📸 GALLERY — Photos & Memories
  // Add as many photos as you want.
  // ──────────────────────────────────────────────
  galleryPhotos: [
    { src: "/2nd-time/photos/gallery-1.jpg", caption: "My Favorite Smile", date: "2024", category: "her" },
    { src: "/2nd-time/photos/gallery-2.jpg", caption: "Our Late Night Talks", date: "2024", category: "us" },
    { src: "/2nd-time/photos/gallery-3.jpg", caption: "The Call That Made My Day", date: "2024", category: "us" },
    { src: "/2nd-time/photos/gallery-4.jpg", caption: "One More Reason I Love You", date: "2024", category: "her" },
    { src: "/2nd-time/photos/gallery-5.jpg", caption: "Screenshot Memory", date: "2024", category: "us" },
    { src: "/2nd-time/photos/gallery-6.jpg", caption: "Video Call Moment", date: "2024", category: "us" },
    { src: "/2nd-time/photos/gallery-7.jpg", caption: "My Beautiful Girl", date: "2024", category: "her" },
    { src: "/2nd-time/photos/gallery-8.jpg", caption: "Us Against The World", date: "2024", category: "us" },
  ],

  // Before & After photos
  beforePhotos: [
    { src: "/2nd-time/photos/before-1.jpg", caption: "Solo adventures" },
    { src: "/2nd-time/photos/before-2.jpg", caption: "Just me" },
  ],
  afterPhotos: [
    { src: "/2nd-time/photos/after-1.jpg", caption: "Adventures with you" },
    { src: "/2nd-time/photos/after-2.jpg", caption: "Everything is better" },
  ],

  // ──────────────────────────────────────────────
  // ✨ REASONS I LOVE YOU
  // Each reason becomes a clickable star in the night sky.
  // Add as many as you want!
  // ──────────────────────────────────────────────
  reasonsILoveYou: [
    "Your smile lights up my darkest days",
    "Your voice feels like home",
    "You make ordinary moments magical",
    "You understand me like nobody else",
    "You inspire me to become better every single day",
    "You are my peace in a chaotic world",
    "You are my happiness, my joy, my everything",
    "You are my favorite person in this entire universe",
    "Your laugh is the most beautiful sound I've ever heard",
    "You make me feel like I can conquer anything",
    "You believe in me even when I don't believe in myself",
    "Your kindness makes the world a better place",
    "You love with your whole heart",
    "You make every day worth waking up to",
    "You are the reason I smile at my phone",
    "You make distance feel like nothing",
    "Your presence calms every storm inside me",
    "You see the best in everyone, especially me",
    "You are my best friend and my greatest love",
    "You make me want to be the best version of myself",
    "Your hugs (even virtual ones) fix everything",
    "You remember the little things that matter most",
    "You are my safe place in this universe",
    "You make long distance feel like a short walk",
    "You are the most beautiful soul I've ever known",
    "You love fiercely and unconditionally",
    "You turn my worst days into bearable ones",
    "You are the missing piece I never knew I needed",
    "You are worth every mile between us",
    "You are my forever, my always, my universe",
  ],

  // ──────────────────────────────────────────────
  // 💌 LETTER CONTENT
  // The emotional heart of the website.
  // ──────────────────────────────────────────────
  letter: {
    opening: `There are billions of people in this world, countless stars in the sky, and endless possibilities in the universe.

Yet somehow, among all of them, my heart found you.

And ever since that day, nothing has felt the same. The colors became more vivid, the music sounded sweeter, and every moment gained a meaning it never had before.`,

    whyILoveYou: `I love you not just for who you are, but for who I become when I'm with you. You have this incredible ability to make the world feel safe, warm, and full of wonder.

Every time I hear your voice, every time I see your smile, every time you laugh at something silly—my heart skips a beat, and I fall in love with you all over again.

You are my favorite hello and my hardest goodbye. You are the dream I never want to wake up from.`,

    longDistance: `The miles between us may separate our hands, but they have never separated our hearts. Every night I look at the same moon and know that somewhere, under the same stars, you're looking at it too.

Distance has taught me something beautiful—that love isn't about proximity. It's about priority. And you, my love, will always be my first, my last, my everything.`,

    birthdayMessage: `Happy Birthday, my love! 🎂✨

Today the universe celebrates the day it created its most beautiful star—you. You deserve all the love, all the joy, and all the magic this world has to offer.

I wish I could be there to hold you, to whisper "happy birthday" in your ear, and to see your face light up. But even from miles away, my love reaches you with every heartbeat.

This website is my heart, wrapped in stars and galaxies, just for you. I hope it makes you smile, cry happy tears, and feel how deeply, endlessly, and unconditionally I love you.`,

    favoriteMemories: [
      { title: "Our first late-night call", description: "When we talked until the sun came up and neither of us wanted to hang up." },
      { title: "The time you made me laugh so hard", description: "I had tears streaming down my face and my stomach hurt. Pure joy." },
      { title: "When you fell asleep on call", description: "And I just listened to you breathe, feeling like the luckiest person alive." },
    ],

    promises: [
      "I will always support your dreams, no matter how big",
      "I will always listen to you, even in the silence",
      "I will always choose us, choose you, choose love",
      "I will always love you, in this life and every life after",
      "I will always be your safe place to fall",
      "I will always fight for us, no matter what",
      "I will always make you feel loved and cherished",
      "I will always be honest with you",
    ],

    futureDreams: [
      { icon: "🏠", title: "Our Home", description: "A cozy place filled with love, laughter, and memories" },
      { icon: "✈️", title: "Traveling Together", description: "Exploring the world hand in hand, creating adventures" },
      { icon: "💍", title: "Marriage", description: "The day I get to call you mine, forever and always" },
      { icon: "❤️", title: "Growing Old Together", description: "Rocking chairs, holding hands, still making each other laugh" },
    ],

    closing: `If I could give you one thing in life, I would give you the ability to see yourself through my eyes.

Then you would know how incredibly, deeply, endlessly loved you are.

You are not just my girlfriend. You are my best friend, my confidante, my safe place, my home, my universe.

And I will spend every day of my life making sure you never forget that.`,
  },

  // ──────────────────────────────────────────────
  // 🎵 VOICE NOTE
  // Place your audio file in /public/audio/
  // ──────────────────────────────────────────────
  voiceNote: "/audio/voice-note.mp3",

  // ──────────────────────────────────────────────
  // 💬 FLOATING LOVE MESSAGES
  // These appear randomly throughout the website.
  // ──────────────────────────────────────────────
  floatingMessages: [
    "I miss you",
    "Thinking of you",
    "My favorite notification",
    "My safe place",
    "My happiness",
    "My forever",
    "You make me smile",
    "My home",
    "My person",
    "My universe",
    "I love you",
    "You're beautiful",
    "My everything",
    "My heart is yours",
    "Always & forever",
  ],

  // ──────────────────────────────────────────────
  // 🎁 BIRTHDAY SURPRISE MESSAGE
  // ──────────────────────────────────────────────
  birthdaySurpriseMessage: "You are the brightest star in my sky, the most beautiful chapter of my life, and the universe my heart belongs to.",

  // ──────────────────────────────────────────────
  // 🔮 HIDDEN SURPRISE MESSAGE
  // ──────────────────────────────────────────────
  hiddenSurpriseMessage: "Out of all the beautiful things in this universe, you will always be my favorite.",
};

export default CONFIG;
