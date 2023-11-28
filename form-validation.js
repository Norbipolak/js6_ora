const inputs = document.querySelectorAll(".input-validation");
const sendBtn = document.querySelector("#send");

sendBtn.addEventListener("click", function (e) {
    e.preventDefault();
    for (const input of inputs) {
        const length = input.getAttribute("length");
        const labelID = input.getAttribute("label-id");
        const regexAttr = input.getAttribute("regex");
        const interval = input.getAttribute("interval");
        const required = input.getAttribute("required");
        const label = document.querySelector(`#${labelID}`);
        let error = false;

        if (length !==null && required !== null || input.value.length != 0 && length !== null) { // ugyanazt jelenti, mint if(length !==null)
            const minMax = length.split("|");
            const min = parseInt(minMax[0]);
            const max = parseInt(minMax[1]);
            let error = false;

            if (input.value.length < min) {
                //alert(`Az input mező értékének legalább ${min} karakteresnek kell lennie`)
                input.classList.add("input-error");
                label.innerText = `Az input mező értékének legalább ${min} karakteresnek kell lennie`
                error = true;
            } else {
                input.classList.remove("input-error");
                label.innerText = ""; // ha nem volt error akkor kiűrítjük 
            }

            if (input.value.length > max && max !== -1) {
                //alert(`Az input mező értéke maximum ${max} karakteres lehet`)
                input.classList.add("input-error");
                label.innerText = `A z input mező értékének maximum ${max} karakteres lehet`
            } else if (max !== -1 && !error) {
                input.classList.remove("input-error");
                label.innerText = "";
            }
        }

        if (regexAttr) { // ha a regex nem egyenlő null, tehát beírtunk valamit
            const regex = new RegExp(regexAttr);

            if (!regex.test(input.value)) { // a regex test-vel tudjuk leellenőrizni, hogy átengedi-e nekünk amit beírtunk
                label.innerText = `Nem megfelelő a mező formátuma!`;
                // már automatikusan megkapjuk a labelünket ezzel -> const label = document.querySelector(`#${labelID}`);
                // ezért lehet írni, hogy az ide tartozó label.innerText-et
                input.classList.add("input-error");
            } else {
                input.classList.remove("input-error");
                label.innerText = "";
            }
        }

        if (interval) { // ha létezik az interval akkor ->
            const minMax = interval.split("|");
            const min = parseInt(minMax[0]);
            const max = parseInt(minMax[1]); // írhatunk const minMax-ot mint a length, mert ez lokális változó
            const value = parseInt(input.value);

            if (value < min) {
                label.innerText = `A megadott értéknek minimum ${min}-nek kell lennie!`;
                input.classList.add("input-error");
            } else {
                input.classList.remove("input-error");
                label.innerText = "";
            }

            if (value < max !isNaN(max)) {
                label.innerText = `A megadott érték maximum ${max} karakteres lehet`;
                input.classList.add("input-error");
            } else if(!isNaN(max)) {
                input.classList.remove("input-error");
                label.innerText = "";
            }

        }
    }
});

/*
    Ha megnyomjuk a gombot, mivel egy form-ban vagyunk ezért újra fogja tölteni a képernyőt.
    Ezért kell nekünk a e.preventDefault();

    az input mezőknek tudunk adni saját elnevezésű atribumokat is (pl. length nem csak type, class, id stb.)
    amit később így lementünk a for of-unkba a kevetkező formában -> const length = input.getAttribute("length");

    A HTML-ben oda lehet írni attributumként,hogy required és akkor a felhasználónak mindenképp ki kell töltenie.
    Ha viszont nem rakunk oda required-et akkor a felhasználó úgy is be tudja küldeni a formot hogy üresen hagyja, 
    de ha már kitölti akkor a szabályoknak megfelelően kell.
*/