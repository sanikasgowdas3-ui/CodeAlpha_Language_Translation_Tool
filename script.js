
const inputText = document.getElementById("inputText");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const translateBtn = document.getElementById("translateBtn");
const outputText = document.getElementById("outputText");
const copyBtn = document.getElementById("copyBtn");
const swapBtn = document.getElementById("swapBtn");
const statusText = document.getElementById("status");

translateBtn.addEventListener("click", async function () {
    const text = inputText.value.trim();

    if (!text) {
        statusText.textContent = "Please enter some text!";
        return;
    }

    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (source === target) {
        statusText.textContent = "Choose two different languages.";
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = "Translating...";
    statusText.textContent = "Please wait...";

    try {
        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(text) +
            "&langpair=" + source + "|" + target;

        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus !== 200) {
            throw new Error("Translation service unavailable.");
        }

        outputText.textContent =
            data.responseData.translatedText;

        statusText.textContent = "Translation successful!";
    } catch (error) {
        statusText.textContent =
            "Translation failed. Check your internet connection and try again.";
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = "Translate";
    }
});

copyBtn.addEventListener("click", async function () {
    const text = outputText.textContent;

    try {
        await navigator.clipboard.writeText(text);
        statusText.textContent = "Translation copied!";
    } catch (error) {
        statusText.textContent = "Unable to copy text.";
    }
});

swapBtn.addEventListener("click", function () {
    const temp = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = temp;
});
