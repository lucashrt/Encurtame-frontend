const urlPost = 'http://localhost:3000/shorten';

async function shorten() {
    const input = document.querySelector('input#inputUrl');
    const output = document.querySelector('div#result');
    const shortUrl = document.querySelector('div#shortUrl');
    const label = document.getElementsByClassName('label')[0];
    const error = document.getElementsByClassName('error')[0];

    const originalUrl = input.value;

    try {
        const response = await axios.post(`${urlPost}`, {
            originalUrl: originalUrl
        });

        error.style.display = 'none';
        shortUrl.innerHTML = `<input type="text" class="text" value="${response.data.shortUrl}" readonly><button id="copyButton"><i class="fa fa-clone"></i></button>`;
        label.style.display = 'block';
        output.style.display = 'block';
        shortUrl.style.display = 'block';
        copyText();
    } catch (error) {
        console.error('Erro ao encurtar a URL:', error);
        output.innerHTML = '<p>Erro ao encurtar a URL. Tente novamente.</p>';
    }
}

function copyText() {
    const copyText = document.querySelector(".copy-text");
    const button = copyText.querySelector("button");
    const input = copyText.querySelector("input.text");

    button.addEventListener("click", () => {
        navigator.clipboard.writeText(input.value)
            .then(() => {
                copyText.classList.add("active");

                setTimeout(() => {
                    copyText.classList.remove("active");
                }, 1500);
            })
            .catch(err => {
                console.error("Erro ao copiar o texto: ", err);
            });
    });
}

function startBtn() {
    const input = document.querySelector('input#inputUrl').value;
    const output = document.querySelector('div#result');
    const shortUrl = document.querySelector('div#shortUrl');
    const label = document.getElementsByClassName('label')[0];
    const error = document.getElementsByClassName('error')[0];

    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?$/;

    if (regex.test(input)) {
        shorten();
    } else {
        shortUrl.style.display = 'none';
        label.style.display = 'none';
        output.style.display = 'block';
        error.style.display = 'block';
        error.innerHTML = '<p>URL inválida!</p>';
        error.innerHTML += '<p>Tente novamente</p>';
    }
}