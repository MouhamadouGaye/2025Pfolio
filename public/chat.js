// let wordDefinitions = {};

// // Fetch JSON on page load
// fetch("./wordDefinitions.json")
//   .then((res) => res.json())
//   .then((data) => {
//     wordDefinitions = data;
//     console.log("Word definitions loaded:", wordDefinitions);
//   })
//   .catch((err) => console.error("Failed to load JSON:", err));

// // Example: function to handle word definitions
// function handleWordDefinition(message) {
//   const normalized = message.toLowerCase();

//   for (const key in wordDefinitions) {
//     const pattern = key.replace("[word]", "(.+)");
//     const regex = new RegExp(`^${pattern}\\??$`, "i");

//     const match = normalized.match(regex);
//     if (match) {
//       const userWord = match[1].trim();
//       const responses = wordDefinitions[key];
//       let response = responses[Math.floor(Math.random() * responses.length)];
//       response = response.replace(/\[word\]/g, userWord);
//       response = response.replace(
//         /\[definition\]/g,
//         "the meaning of " + userWord
//       );
//       return response;
//     }
//   }

//   return null;
// }
