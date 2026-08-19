let currentBook = "Genesis";
let currentChapter = 1;
let currentTranslation = "WEB";

const main = document.getElementById("main");
const sheet = document.getElementById("studySheet");
const studyContent = document.getElementById("studyContent");
const closeSheetButton = document.getElementById("closeSheet");

const BOOKS = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation"
];

function getAvailableChapters(book) {
  return Object.keys(BIBLE_DATA[book] || {})
    .map(Number)
    .sort((a, b) => a - b);
}

function renderReader() {

  const verses =
    BIBLE_DATA[currentBook]?.[currentChapter] || [];

  const availableChapters =
    getAvailableChapters(currentBook);

  const previousChapter =
    currentChapter > 1
      ? currentChapter - 1
      : null;

  const nextChapter =
    availableChapters.includes(currentChapter + 1)
      ? currentChapter + 1
      : null;

  main.innerHTML = `

    <section class="card">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
      ">

        <div>

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
            font-size:32px;
            margin:7px 0 2px;
          ">
            ${currentBook}
          </h1>

          <div style="
            color:#78736a;
            font-size:12px;
          ">
            ${currentTranslation}
          </div>

        </div>

        <button
          onclick="openBookPicker()"
          style="
            border:1px solid #e5dfd3;
            background:#f5f0e6;
            border-radius:14px;
            padding:10px 12px;
            font-weight:800;
            font-family:inherit;
          "
        >
          Change
        </button>

      </div>


      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        margin-top:18px;
      ">

        <button
          onclick="previousChapter()"
          ${previousChapter === null ? "disabled" : ""}
          style="
            border:1px solid #e5dfd3;
            background:#f5f0e6;
            border-radius:12px;
            padding:9px 13px;
            font-family:inherit;
            font-weight:900;
            opacity:${previousChapter === null ? ".4" : "1"};
          "
        >
          ←
        </button>


        <button
          onclick="openChapterPicker()"
          style="
            flex:1;
            border:1px solid #e5dfd3;
            background:#fffdf8;
            border-radius:12px;
            padding:10px;
            font-family:inherit;
            font-weight:900;
          "
        >
          Chapter ${currentChapter} ▾
        </button>


        <button
          onclick="nextChapter()"
          ${nextChapter === null ? "disabled" : ""}
          style="
            border:1px solid #e5dfd3;
            background:#f5f0e6;
            border-radius:12px;
            padding:9px 13px;
            font-family:inherit;
            font-weight:900;
            opacity:${nextChapter === null ? ".4" : "1"};
          "
        >
          →
        </button>

      </div>

    </section>


    ${
      verses.length
      ?

      `<section class="card">

        ${verses.map(verse => `

          <div
            class="verse-row"
            onclick="openStudy(${verse.verse})"
          >

            <div class="vnum">
              ${verse.verse}
            </div>

            <p>
              ${verse.text}
            </p>

          </div>

        `).join("")}

      </section>`

      :

      `<section class="card" style="
        text-align:center;
        padding:45px 20px;
      ">

        <div style="font-size:34px;">
          📖
        </div>

        <h2 style="font-family:Georgia,serif;">
          Not loaded yet
        </h2>

        <p style="
          color:#78736a;
          line-height:1.6;
        ">
          We're building the Bible into Word Up
          one book at a time.
        </p>

      </section>`
    }

  `;
}


function openBookPicker() {

  studyContent.innerHTML = `

    <h2>
      Choose a Book
    </h2>

    <p style="color:#78736a;">
      Word Up will eventually have the entire Bible here.
    </p>

    <div style="
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:8px;
    ">

      ${BOOKS.map(book => `

        <button
          class="pill"
          style="text-align:left;"
          onclick="selectBook('${book}')"
        >
          ${book}
        </button>

      `).join("")}

    </div>

  `;

  sheet.classList.add("open");
}


function selectBook(book) {

  currentBook = book;

  const chapters =
    getAvailableChapters(book);

  currentChapter =
    chapters.length
      ? chapters[0]
      : 1;

  closeSheet();

  renderReader();
}


function openChapterPicker() {

  const chapters =
    getAvailableChapters(currentBook);

  if (!chapters.length) {

    studyContent.innerHTML = `

      <h2>
        Chapters
      </h2>

      <p style="color:#78736a;">
        Chapters for ${currentBook} haven't been
        loaded into Word Up yet.
      </p>

    `;

    sheet.classList.add("open");

    return;
  }


  studyContent.innerHTML = `

    <h2>
      ${currentBook}
    </h2>

    <p style="color:#78736a;">
      Choose a chapter.
    </p>

    <div style="
      display:grid;
      grid-template-columns:
        repeat(5,1fr);
      gap:8px;
    ">

      ${chapters.map(chapter => `

        <button
          class="pill"
          onclick="selectChapter(${chapter})"
          style="text-align:center;"
        >
          ${chapter}
        </button>

      `).join("")}

    </div>

  `;

  sheet.classList.add("open");
}


function selectChapter(chapter) {

  currentChapter = chapter;

  closeSheet();

  renderReader();
}


function previousChapter() {

  if (currentChapter <= 1) return;

  const chapters =
    getAvailableChapters(currentBook);

  const index =
    chapters.indexOf(currentChapter);

  if (index > 0) {

    currentChapter =
      chapters[index - 1];

    renderReader();

  }
}


function nextChapter() {

  const chapters =
    getAvailableChapters(currentBook);

  const index =
    chapters.indexOf(currentChapter);

  if (
    index >= 0 &&
    index < chapters.length - 1
  ) {

    currentChapter =
      chapters[index + 1];

    renderReader();

  }
}


function openStudy(verseNumber) {

  const verse =
    BIBLE_DATA[currentBook]?.[currentChapter]
      ?.find(v => v.verse === verseNumber);

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


    <h2>
      Deep Study
    </h2>


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
      Modern scholarship also discusses the formation
      and compilation of the Pentateuch.
    </p>


    <h3 id="audience">
      Audience
    </h3>

    <p>
      Genesis speaks to Israel as a people learning
      who their God is, where they came from, and how
      their covenant story fits into the larger story
      of creation.
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
      “in the beginning.”
    </p>


    <h3 id="theology">
      Theology
    </h3>

    <p>
      This verse establishes a foundational biblical claim:
      creation ultimately depends upon God.
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
      behavior:"smooth",
      block:"start"
    });

  }
}


function closeSheet() {

  sheet.classList.remove("open");

}


sheet.addEventListener(
  "click",
  event => {

    if (event.target === sheet) {
      closeSheet();
    }

  }
);


closeSheetButton.addEventListener(
  "click",
  closeSheet
);


document
  .querySelectorAll(".nav-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

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
              ${
                tab.charAt(0).toUpperCase()
                + tab.slice(1)
              }
            </h2>

            <p
              style="
                color:#78736a;
                line-height:1.6;
              "
            >
              This section is coming next.
              We're building Word Up one piece
              at a time.
            </p>

          </section>

        `;

      }
    );

  });


renderReader();
