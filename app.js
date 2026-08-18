let currentBook = "Genesis";
let currentChapter = 1;

const main = document.getElementById("main");
const sheet = document.getElementById("studySheet");
const studyContent = document.getElementById("studyContent");
const closeSheetButton = document.getElementById("closeSheet");

function renderReader() {
  const verses = BIBLE_DATA[currentBook]?.[currentChapter] || [];

  main.innerHTML = `
    <section class="card">
      <div style="
        color:#c46b35;
        font-size:10px;
        font-weight:900;
        letter-spacing:.15em;
        text-transform:uppercase;
      ">
        Read
      </div>

      <h1 style="
        font-family:Georgia,serif;
        font-size:34px;
        margin:8px 0;
      ">
        ${currentBook} ${currentChapter}
      </h1>

      <p style="color:#78736a;line-height:1.5;">
        Tap a verse to dive deeper.
      </p>
    </section>

    <section class="card">
      ${verses.map(verse => `
        <div
          class="verse-row"
          onclick="openStudy(${verse.verse})"
        >
          <div class="vnum">${verse.verse}</div>

          <p>${verse.text}</p>
        </div>
      `).join("")}
    </section>
  `;
}


function openStudy(verseNumber) {

  const verse =
    BIBLE_DATA[currentBook][currentChapter]
      .find(v => v.verse === verseNumber);

  if (!verse) return;

  studyContent.innerHTML = `

    <div style="
      color:#64745c;
      font-size:10px;
      font-weight:900;
      letter-spacing:.13em;
    ">
      ${currentBook.toUpperCase()}
      ${currentChapter}:${verseNumber}
    </div>

    <h2>Deep Study</h2>

    <p class="quote">
      ${verse.text}
    </p>


    <div class="pills">

      <button
        class="pill"
        onclick="jumpTo('author')"
      >
        Author
      </button>

      <button
        class="pill"
        onclick="jumpTo('audience')"
      >
        Audience
      </button>

      <button
        class="pill"
        onclick="jumpTo('big-idea')"
      >
        Big Idea
      </button>

      <button
        class="pill"
        onclick="jumpTo('context')"
      >
        Context
      </button>

      <button
        class="pill"
        onclick="jumpTo('history')"
      >
        History
      </button>

      <button
        class="pill"
        onclick="jumpTo('language')"
      >
        Language
      </button>

      <button
        class="pill"
        onclick="jumpTo('theology')"
      >
        Theology
      </button>

    </div>


    <h3 id="author">
      Author
    </h3>

    <p>
      Genesis is traditionally attributed to Moses.
      Modern scholarship also discusses the formation and
      compilation of the Pentateuch, so Word Up will
      distinguish traditional attribution from scholarly proposals.
    </p>


    <h3 id="audience">
      Audience
    </h3>

    <p>
      Genesis speaks to Israel as a people learning who
      their God is, where they came from, and how their
      covenant story fits into the larger story of creation.
    </p>


    <h3 id="big-idea">
      Big Idea
    </h3>

    <p>
      The opening verse introduces God as the ultimate
      source and sovereign creator of everything that exists.
    </p>


    <h3 id="context">
      Literary Context
    </h3>

    <p>
      Genesis 1 begins the Bible's creation account and
      establishes themes that echo throughout Scripture:
      God, creation, order, humanity, blessing, and
      God's purposes for the world.
    </p>


    <h3 id="history">
      Historical Context
    </h3>

    <p>
      The ancient world contained many competing creation
      stories. Genesis presents a distinctly Israelite account
      centered on one sovereign God rather than a struggle
      among competing gods.
    </p>


    <h3 id="language">
      Original Language
    </h3>

    <p>
      The Hebrew opening begins with
      <b>bereshit</b>, commonly translated
      "in the beginning."
      Word Up will eventually provide the Hebrew,
      transliteration, grammar, and lexical range here.
    </p>


    <h3 id="theology">
      Theology
    </h3>

    <p>
      This verse establishes a foundational biblical claim:
      creation ultimately depends upon God. The created
      world is not itself God; it exists because God created it.
    </p>


    <h3>
      So What?
    </h3>

    <p>
      Before Scripture tells us what humanity should do,
      it tells us who God is.
      The Bible's story begins with God, not us.
    </p>

  `;

  sheet.classList.add("open");
}


function jumpTo(id) {

  const element =
    document.getElementById(id);

  if (element) {

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
}


function closeSheet() {

  sheet.classList.remove("open");

}


sheet.addEventListener("click", event => {

  if (event.target === sheet) {
    closeSheet();
  }

});


closeSheetButton.addEventListener(
  "click",
  closeSheet
);


document
  .querySelectorAll(".nav-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".nav-button")
        .forEach(item =>
          item.classList.remove("active")
        );

      button.classList.add("active");

      const tab =
        button.dataset.tab;


      if (tab === "read") {

        renderReader();

        return;

      }


      const icon =
        tab === "discover"
          ? "🧭"
          : tab === "words"
          ? "🇬🇷"
          : tab === "search"
          ? "⌕"
          : "🔖";


      main.innerHTML = `

        <section
          class="card"
          style="
            text-align:center;
            padding:45px 20px;
          "
        >

          <div
            style="
              font-size:35px;
              margin-bottom:12px;
            "
          >
            ${icon}
          </div>

          <h2
            style="
              font-family:Georgia,serif;
            "
          >
            ${tab.charAt(0).toUpperCase() + tab.slice(1)}
          </h2>

          <p
            style="
              color:#78736a;
              line-height:1.6;
            "
          >
            This section is coming next.
            We're building Word Up one piece at a time.
          </p>

        </section>

      `;

    });

  });


renderReader();
