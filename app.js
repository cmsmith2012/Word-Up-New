let currentBook = "Genesis";
let currentChapter = 1;
let currentTranslation = "WEB";

const main = document.getElementById("main");
const sheet = document.getElementById("studySheet");
const studyContent = document.getElementById("studyContent");
const closeSheetButton = document.getElementById("closeSheet");

const BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
  "Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings",
  "2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah",
  "Esther","Job","Psalms","Proverbs","Ecclesiastes",
  "Song of Solomon","Isaiah","Jeremiah","Lamentations",
  "Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah",
  "Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah",
  "Malachi","Matthew","Mark","Luke","John","Acts","Romans",
  "1 Corinthians","2 Corinthians","Galatians","Ephesians",
  "Philippians","Colossians","1 Thessalonians",
  "2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon",
  "Hebrews","James","1 Peter","2 Peter","1 John","2 John",
  "3 John","Jude","Revelation"
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
    availableChapters.includes(currentChapter - 1)
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

    <h2>Choose a Book</h2>

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

      <h2>Chapters</h2>

      <p style="color:#78736a;">
        Chapters for ${currentBook} haven't been
        loaded into Word Up yet.
      </p>

    `;

    sheet.classList.add("open");
    return;
  }

  studyContent.innerHTML = `

    <h2>${currentBook}</h2>

    <p style="color:#78736a;">
      Choose a chapter.
    </p>

    <div style="
      display:grid;
      grid-template-columns:repeat(5,1fr);
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


/* ==========================================
   WORD UP STUDY ENGINE
   ========================================== */

function getStudyData(book, chapter, verse) {

  if (
    book === "Genesis" &&
    typeof GENESIS_STUDIES !== "undefined"
  ) {

    return GENESIS_STUDIES[`${chapter}:${verse}`];

  }

  return null;
}


function renderStudySection(id, section) {

  if (!section) return "";

  return `

    <section
      class="study-section"
      id="${id}"
    >

      <h3>
        ${section.title}
      </h3>

      ${
        section.summary
        ?
        `<p>
          ${section.summary}
        </p>`
        :
        ""
      }

      ${
        section.detail
        ?
        `<p style="
          color:#5f5b54;
          line-height:1.7;
        ">
          ${section.detail}
        </p>`
        :
        ""
      }

      ${
        section.verses
        ?
        `
        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:7px;
          margin-top:12px;
        ">

          ${section.verses.map(verse => `

            <span
              class="pill"
              style="cursor:default;"
            >
              ${verse}
            </span>

          `).join("")}

        </div>
        `
        :
        ""
      }

    </section>

  `;
}


function renderEvidenceSection(evidence) {

  if (!evidence) return "";

  const items = evidence.items || [];

  return `

    <section
      class="study-section evidence-section"
      id="evidence"
    >

      <div class="evidence-heading">

        <div class="study-label">
          EVIDENCE
        </div>

        <h3>
          ${evidence.title || "Evidence"}
        </h3>

        ${
          evidence.summary
          ?
          `<p>
            ${evidence.summary}
          </p>`
          :
          ""
        }

      </div>


      <div class="evidence-list">

        ${
          items.map((item, index) => `

            <article
              class="evidence-card"
              id="evidence-card-${index}"
            >

              <div class="evidence-card-top">

                <div>

                  <span class="evidence-type">
                    🔎 ${item.type || "Evidence"}
                  </span>

                  <span class="evidence-strength">
                    ${item.strength || "Unclassified"}
                  </span>

                </div>

                <button
                  class="evidence-toggle"
                  onclick="toggleEvidence(${index})"
                  aria-label="Expand evidence"
                  aria-expanded="false"
                >
                  +
                </button>

              </div>


              <h4>
                ${item.title || ""}
              </h4>


              <div
                class="evidence-details"
                id="evidence-details-${index}"
              >

                ${
                  item.explanation
                  ?
                  `
                  <p class="evidence-explanation">
                    ${item.explanation}
                  </p>
                  `
                  :
                  ""
                }


                ${
                  item.supports
                  ?
                  `
                  <div class="evidence-box evidence-supports">

                    <div class="evidence-box-label">
                      WHAT THIS SUPPORTS
                    </div>

                    <p>
                      ${item.supports}
                    </p>

                  </div>
                  `
                  :
                  ""
                }


                ${
                  item.doesNotProve
                  ?
                  `
                  <div class="evidence-box evidence-limits">

                    <div class="evidence-box-label">
                      WHAT THIS DOES NOT PROVE
                    </div>

                    <p>
                      ${item.doesNotProve}
                    </p>

                  </div>
                  `
                  :
                  ""
                }


                ${
                  item.source
                  ?
                  `
                  <div class="evidence-source">

                    <span>
                      Source
                    </span>

                    ${item.source}

                  </div>
                  `
                  :
                  ""
                }

              </div>

            </article>

          `).join("")
        }

      </div>

    </section>

  `;
}


function toggleEvidence(index) {

  const details =
    document.getElementById(
      `evidence-details-${index}`
    );

  const card =
    document.getElementById(
      `evidence-card-${index}`
    );

  if (!details || !card) return;

  const button =
    card.querySelector(".evidence-toggle");

  const isOpen =
    card.classList.contains("expanded");

  if (isOpen) {

    card.classList.remove("expanded");

    details.style.maxHeight = "0px";

    button.textContent = "+";

    button.setAttribute(
      "aria-expanded",
      "false"
    );

  } else {

    card.classList.add("expanded");

    details.style.maxHeight =
      details.scrollHeight + "px";

    button.textContent = "−";

    button.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


function openStudy(verseNumber) {

  const verse =
    BIBLE_DATA[currentBook]?.[currentChapter]
      ?.find(v => v.verse === verseNumber);

  if (!verse) return;

  const study =
    getStudyData(
      currentBook,
      currentChapter,
      verseNumber
    );

  if (!study) {

    studyContent.innerHTML = `

      <div class="study-header">

        <div class="study-reference">
          ${currentBook.toUpperCase()}
          ${currentChapter}:${verseNumber}
        </div>

        <h2>Deep Study</h2>

        <p class="quote">
          ${verse.text}
        </p>

      </div>

      <div class="study-empty">

        <div class="study-empty-icon">
          🔎
        </div>

        <h3>We're still digging.</h3>

        <p>
          The Word Up study for this verse
          hasn't been built yet.
        </p>

      </div>

    `;

    sheet.classList.add("open");
    return;
  }


  studyContent.innerHTML = `

    <div class="study-header">

      <div class="study-reference">
        ${currentBook.toUpperCase()}
        ${currentChapter}:${verseNumber}
      </div>

      <h2>Deep Study</h2>

      <p class="quote">
        ${verse.text}
      </p>

    </div>


    <div class="study-meta">

      <div class="study-meta-top">

        <span class="study-meta-label">
          STUDY NOTES
        </span>

        <span class="confidence-badge">
          ${study.metadata?.confidence || "Established"}
        </span>

      </div>

      <p>
        ${study.metadata?.confidenceNote || ""}
      </p>

      <div class="topic-list">

        ${
          (study.metadata?.topics || [])
            .map(topic => `
              <span class="topic-tag">
                ${topic}
              </span>
            `)
            .join("")
        }

      </div>

    </div>


    <div class="study-lens">

      <div class="study-label">
        THE LENS
      </div>

      <button
        class="lens-card"
        onclick="jumpTo('author')"
      >
        <span class="lens-title">
          Author
        </span>

        <span class="lens-text">
          ${study.author?.summary || ""}
        </span>

        <span class="lens-arrow">
          →
        </span>
      </button>


      <button
        class="lens-card"
        onclick="jumpTo('audience')"
      >
        <span class="lens-title">
          Audience
        </span>

        <span class="lens-text">
          ${study.audience?.summary || ""}
        </span>

        <span class="lens-arrow">
          →
        </span>
      </button>


      <button
        class="lens-card"
        onclick="jumpTo('bigIdea')"
      >
        <span class="lens-title">
          Big Idea
        </span>

        <span class="lens-text">
          ${study.bigIdea?.summary || ""}
        </span>

        <span class="lens-arrow">
          →
        </span>
      </button>

    </div>


    <div class="study-explore">

      <div class="study-label">
        DIG DEEPER
      </div>

      <div class="study-grid">

        ${[
          ["context","Context","The passage around it"],
          ["history","History","The world behind it"],
          ["culture","Culture","What the original audience knew"],
          ["evidence","Evidence","Archaeology, history & science"],
          ["language","Language","Hebrew, Greek & key words"],
          ["theology","Theology","What it teaches about God"],
          ["crossReferences","Cross References","Where Scripture connects"],
          ["misreadings","Misreadings","Where interpretation gets tricky"],
          ["interpretations","Interpretations","Where Christians disagree"],
          ["soWhat","So What?","Why it matters today"]
        ].map(([id,title,description]) => `

          <button
            class="study-topic"
            onclick="jumpTo('${id}')"
          >

            <span class="topic-title">
              ${title}
            </span>

            <span class="topic-description">
              ${description}
            </span>

            <span class="topic-arrow">
              →
            </span>

          </button>

        `).join("")}

      </div>

    </div>


    <div class="study-sections">

      ${renderStudySection("author", study.author)}

      ${renderStudySection("audience", study.audience)}

      ${renderStudySection("bigIdea", study.bigIdea)}

      ${renderStudySection("context", study.context)}

      ${renderStudySection("history", study.history)}

      ${renderEvidenceSection(study.evidence)}

      ${renderStudySection("language", study.language)}

      ${renderStudySection("theology", study.theology)}

      ${renderStudySection(
        "crossReferences",
        study.crossReferences
      )}

      ${renderStudySection(
        "misreadings",
        study.misreadings
      )}

      ${renderStudySection(
        "interpretations",
        study.interpretations
      )}

      ${renderStudySection(
        "soWhat",
        study.soWhat
      )}

    </div>

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

            <div style="
              font-size:35px;
              margin-bottom:12px;
            ">
              ${icon}
            </div>

            <h2 style="
              font-family:Georgia,serif;
            ">
              ${
                tab.charAt(0).toUpperCase()
                + tab.slice(1)
              }
            </h2>

            <p style="
              color:#78736a;
              line-height:1.6;
            ">
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
