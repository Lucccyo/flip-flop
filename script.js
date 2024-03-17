const card = document.getElementById("card");
const sentence = document.getElementById("sentence");
const red_btn = document.getElementById("unknown");
const green_btn = document.getElementById("known");
const replay_btn = document.getElementById("replay");
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");
const block_indicator = document.getElementById("indicator");

import { sentences } from "./data/ex_cambridge.js";
import { prononciation } from "./prononciation.js";

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

let shuffledSentences;
let current_is_in_french;
let is_end;
let block;
let block_index;
let ofs;
let block_size = 4;
let total_blocks = Math.ceil(sentences.length / block_size);
let repeat;

function display_sentence(s, j) {
  var words = s.split(" ");
  var highlightedSentence = words
    .map(function (word) {
      if (prononciation.includes(word)) {
        return '<span class="highlight">' + word + "</span>";
      } else {
        return word;
      }
    })
    .join(" ");
  document.getElementById("sentence").innerHTML = highlightedSentence;
  document.getElementById("file").innerHTML = j.type;
}

function update_indicator() {
  block_indicator.innerHTML =
    block_index / block_size + 1 + " / " + total_blocks;
}

function unplayable_style() {
  green_btn.style.visibility = "hidden";
  red_btn.style.visibility = "hidden";
  sentence.innerHTML = "REFRESH TO PLAY AGAIN";
  card.style.cursor = "default";
}

function playable_style() {
  green_btn.style.visibility = "visible";
  red_btn.style.visibility = "visible";
  card.style.cursor = "pointer";
}

function end() {
  is_end = true;
  unplayable_style();
}

function start() {
  // shuffledSentences = shuffleArray(sentences);
  shuffledSentences = sentences;
  block_index = 0;
  block = shuffledSentences.slice(block_index, block_size);
  ofs = 0;
  repeat = 1;
  current_is_in_french = true;
  is_end = false;
  playable_style();
  update_indicator();
  display_sentence(block[ofs].french, block[ofs]);
}

card.addEventListener("click", () => {
  if (!is_end) {
    if (current_is_in_french) {
      display_sentence(block[ofs].english, block[ofs]);
      current_is_in_french = false;
    } else {
      display_sentence(block[ofs].french, block[ofs]);
      current_is_in_french = true;
    }
  }
});

prev_btn.addEventListener("click", () => {
  ofs = 0;
  repeat = 1;
  if (block_index >= block_size) { block_index = block_index - block_size; }
  block = shuffledSentences.slice(block_index, block_index + block_size);
  let current_sentence_index = block_index + ofs;
  if (current_sentence_index >= shuffledSentences.length) {
    end();
  } else {
    display_sentence(block[ofs].french, block[ofs]);
    update_indicator();
  }
});

replay.addEventListener("click", () => {
  start();
});

next_btn.addEventListener("click", () => {
  ofs = 0;
  repeat = 1;
  block_index = block_index + block_size;
  block = shuffledSentences.slice(block_index, block_index + block_size);
  let current_sentence_index = block_index + ofs;
  if (current_sentence_index >= shuffledSentences.length) {
    end();
  } else {
    display_sentence(block[ofs].french, block[ofs]);
    update_indicator();
  }
});

green_btn.addEventListener("click", () => {
  ofs++;
  if (ofs >= block_size) {
    if (repeat < 2) {
      ofs = 0;
      repeat++;
    } else {
      ofs = 0;
      repeat = 1;
      block_index = block_index + block_size;
      block = shuffledSentences.slice(block_index, block_index + block_size);
    }
  }
  let current_sentence_index = block_index + ofs;
  if (current_sentence_index >= shuffledSentences.length) {
    end();
  } else {
    display_sentence(block[ofs].french, block[ofs]);
    update_indicator();
  }
});

red_btn.addEventListener("click", () => {
  let to_learn = block.splice(ofs, 1);
  block.push(to_learn[0]);
  display_sentence(block[ofs].french, block[ofs]);
});

start();

