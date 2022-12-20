const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const btn = document.getElementById("btn");
const sound = document.getElementById("sound");
const res = document.getElementById("result");

btn.addEventListener("click", showData);

function showData() {
  const input = document.getElementById("input-text").value;
  fetch(`${url}${input}`)
    .then((data) => data.json())
    .then((data) => renderData(data))
    .catch(() => {
      res.innerHTML = `<h3 class="error">Couldn't Find the word`;
    });
}

function renderData(data) {
    console.log(data);
  res.innerHTML = `
    <div class="word">
                <h3>${data[0].word}</h3>
                <button onclick="playAudio()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>

            <div class="meaning">
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
                </p>
            </div>
    `;

    sound.setAttribute('src', `${data[0].phonetics[1].audio}`);
    console.log(sound);
}

function playAudio(){
    sound.play();
}
