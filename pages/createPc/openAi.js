const API_KEY = "bobo"; // change it to the actual key.
async function fetchData() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content:
            "your response should be in this format->  [[gpu: brand; modelName],[cpu: brand; modelName],[motherBoard: brand; modelName]..etc]",
          role: "user",
          content: "give me a pc collection 1500$ i am a gamer",
        },
      ],
    }),
  });
  const data = await response.json();
  console.log(data);
}
fetchData();
