window.addEventListener("load", () => {

    function extractVideoId(url) {
        let regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        let match = url.match(regex);
        return match ? match[1] : null;
    }

    const tag = "ytEX_"
    var pageURL = document.URL
    var pageID = extractVideoId(pageURL) 

    function elementsLoad () {

        let styleElement = document.createElement("style")
        styleElement.textContent = `

        :root {
            --color-1: rgba(255,255,255,0.1);
            --color-2: #8C0000;
            --color-3: #BD2000;
            --color-4: #f1f1f1;

        }

        .${tag}Box {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--color-1);
            margin-left: 8px;
            height: 100%;
            border-radius: 9px;
          }

          .${tag}Title {
            font-size: 14px;
            padding: 4px;
            color: var(--color-4);
          }

          .${tag}Buttons {
            display: flex;
            height: 100%;
            width: 100%;
          }

          .${tag}Button {
            font-size: 14px;
            width: 100%;
            background-color: transparent;
            cursor: pointer;
            color: var(--color-4);
            transition: transform .3s;
          }

          .${tag}Button:hover {
            transform: scale(1.1);
          }

          .${tag}Right {
            border-radius: 0px 0px 9px 0px;
            border: 1px solid var(--color-2);
          }

          .${tag}Left {
            border-radius: 0px 0px 0px 9px;
            border: 1px solid var(--color-3);
          }
        `
        document.head.appendChild(styleElement)

        let ytBox = document.createElement("div")
        ytBox.classList.add(`${tag}Box`)

        let ytTitle = document.createElement("span")
        ytTitle.textContent = "Download"
        ytTitle.classList.add(`${tag}Title`)

        let ytButtons = document.createElement("div")
        ytButtons.classList.add(`${tag}Buttons`)

        let ytButton1 = document.createElement("button")
        ytButton1.textContent = "1"
        ytButton1.classList.add(`${tag}Button`)
        ytButton1.classList.add(`${tag}Left`)
        ytButton1.addEventListener("click", () => {
            window.open(`https://www.y2mate.com/es/convert-youtube/${pageID}`, "_blank", "width=600,height=400")
        })
        
        let ytButton2 = document.createElement("button")
        ytButton2.textContent = "2"
        ytButton2.classList.add(`${tag}Button`)
        ytButton2.classList.add(`${tag}Right`)
        ytButton2.addEventListener("click", () => {
            window.open(`https://tubemp3.to/${pageURL}`, "_blank", "width=600,height=400")
        })

        ytBox.appendChild(ytTitle)
        ytBox.appendChild(ytButtons)
        ytButtons.appendChild(ytButton1)
        ytButtons.appendChild(ytButton2)
        return ytBox
    }
    function script () {
        const youtubeButtons = document.querySelector("#actions-inner #menu #top-level-buttons-computed");
        if (youtubeButtons && !youtubeButtons.querySelector(`.${tag}Box`)) {
            youtubeButtons.appendChild(elementsLoad())
        } else {
            console.log("Erro ao Inicializar - Elemento não encontrado");
        }
    }

    setTimeout(() => script(), 2000);

    var checkURL = setInterval(() => {
        var currentURL = document.URL;
        if (currentURL !== pageURL) {
            setTimeout(() => {
                pageURL = currentURL;
                pageID = extractVideoId(pageURL);
                script();
            }, 2000)
        }
    }, 1000);

});
