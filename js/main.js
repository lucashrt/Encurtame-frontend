const urlPost = 'http://localhost:3000/shorten';

async function shorten() {
    const input = document.querySelector('#inputUrl');
    const output = document.querySelector('div#result');
    const shortUrl = document.querySelector('div#shortUrl');

    const originalUrl = input.value;

    try {
        const response = await axios.post(`${urlPost}`, {
            originalUrl: originalUrl
        });

        output.style.display = 'block';
        shortUrl.innerHTML = `<input type="text" class="text" value="${response.data.shortUrl}" readonly><button id="copyButton"><i class="fa fa-clone"></i></button>`;
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
