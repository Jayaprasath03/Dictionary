// Function to search for word meaning from Free Dictionary API
async function searchWord() {
    const word = document.getElementById("wordInput").value.trim().toLowerCase();
    const definition = document.getElementById("definition");
    const result = document.getElementById("result");

    // If input is empty, hide result
    if (word === "") {
        result.style.display = "none";
        return;
    }

    // Show a loading message while fetching data
    result.style.display = "block";
    definition.textContent = "Loading...";

    try {
        // Fetch data from Free Dictionary API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();

        // If the word is found and has definitions
        if (data && data.length > 0 && data[0].meanings) {
            const meaning = data[0].meanings[0].definitions[0].definition;
            definition.innerHTML = `<strong>Definition:</strong> ${meaning}`;
        } else {
            // If no definition found for the word
            definition.textContent = "Sorry, no definition found for this word.";
        }
    } catch (error) {
        // If there's an error in fetching data (e.g., word not found or network issue)
        definition.textContent = "Sorry, there was an error fetching the definition.";
    }
}
