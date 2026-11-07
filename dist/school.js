function setupCheckout() {
  const classes = {
    group: { title: "Group classes", price: "₱2,800 for 20 sessions" },
    private: { title: "Private classes", price: "Around ₱4,500 for 10 sessions" },
  };

  const dialog = document.querySelector("dialog");
  const checkout = document.querySelector("#checkout");
  const status = document.querySelector("#checkout-status");

  for (const button of document.querySelectorAll("[data-plan]")) {
    button.addEventListener("click", () => {
      const plan = classes[button.dataset.plan];
      checkout.reset();
      status.textContent = "";
      document.querySelector("#checkout-title").textContent = plan.title;
      document.querySelector("#checkout-price").textContent = plan.price;
      dialog.showModal();
    });
  }

  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  checkout.addEventListener("change", () => {
    status.textContent = "";
  });
  checkout.addEventListener("submit", (event) => {
    event.preventDefault();
    const payment = new FormData(checkout).get("payment");
    status.textContent = `${payment} selected. This is a preview. No payment was taken and no seat was reserved.`;
  });
}

function setupPractice() {
  const phrases = {
    everyday: [
      { context: "Greeting someone", spanish: "Mucho gusto.", sound: "MOO-choh GOOS-toh", answers: ["See you tomorrow.", "Nice to meet you.", "Good evening."], correct: 1 },
      { context: "Asking for help", spanish: "¿Puedes ayudarme?", sound: "PWEH-des ah-yoo-DAR-meh", answers: ["Can you help me?", "Where are you from?", "What time is it?"], correct: 0 },
    ],
    bpo: [
      { context: "Opening a customer call", spanish: "¿En qué puedo ayudarle?", sound: "en KEH PWEH-doh ah-yoo-DAR-leh", answers: ["May I call you back?", "Could you repeat that?", "How can I help you?"], correct: 2 },
      { context: "Checking customer details", spanish: "¿Puede confirmar su nombre?", sound: "PWEH-deh kohn-feer-MAR soo NOHM-breh", answers: ["Can you confirm your name?", "Can you spell your address?", "Can you check the number?"], correct: 0 },
    ],
    spain: [
      { context: "Finding your way", spanish: "¿Dónde está la estación?", sound: "DOHN-deh ehs-TAH lah ehs-tah-SYOHN", answers: ["Is this seat taken?", "Where is the station?", "How much is the ticket?"], correct: 1 },
      { context: "Introducing yourself at work", spanish: "Hoy es mi primer día.", sound: "oy ehs mee pree-MEHR DEE-ah", answers: ["I work in the afternoon.", "I start tomorrow.", "Today is my first day."], correct: 2 },
    ],
  };

  const topicButtons = [...document.querySelectorAll("[data-topic]")];
  const answers = document.querySelector("#answers");
  const feedback = document.querySelector("#phrase-feedback");
  let topic = "everyday";
  let phraseIndex = 0;

  function showPhrase() {
    const lesson = phrases[topic];
    const phrase = lesson[phraseIndex];
    document.querySelector("#phrase-count").textContent = `0${phraseIndex + 1} / 0${lesson.length}`;
    document.querySelector("#phrase-context").textContent = phrase.context.toUpperCase();
    document.querySelector("#phrase").textContent = phrase.spanish;
    document.querySelector("#pronunciation").textContent = phrase.sound;
    feedback.textContent = "";
    answers.replaceChildren();
    phrase.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = answer;
      button.addEventListener("click", () => {
        for (const option of answers.children) delete option.dataset.result;
        const correct = index === phrase.correct;
        button.dataset.result = correct ? "correct" : "retry";
        feedback.textContent = correct ? `¡Muy bien! It means “${answer}”` : "Try again. Pick another translation.";
      });
      answers.append(button);
    });
  }

  function selectTopic(nextTopic) {
    topic = nextTopic;
    phraseIndex = 0;
    for (const button of topicButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.topic === topic));
    }
    showPhrase();
  }

  for (const button of topicButtons) {
    button.addEventListener("click", () => selectTopic(button.dataset.topic));
  }
  document.querySelector("#next-phrase").addEventListener("click", () => {
    phraseIndex = (phraseIndex + 1) % phrases[topic].length;
    showPhrase();
    answers.firstElementChild.focus();
  });
  const initialTopic = new URLSearchParams(window.location.search).get("topic");
  selectTopic(Object.hasOwn(phrases, initialTopic) ? initialTopic : "everyday");
}

if (document.querySelector("#checkout")) setupCheckout();
if (document.querySelector("#answers")) setupPractice();
