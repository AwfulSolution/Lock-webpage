const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const { name, code } = JSON.parse(event.body);
  const validCode = "1234"; // Replace with your desired code
  const isValid = code === validCode;

  const dataFile = path.join("/tmp", "names.json");
  let names = [];

  // Load existing names
  if (fs.existsSync(dataFile)) {
    const data = fs.readFileSync(dataFile, "utf8");
    names = JSON.parse(data);
  }

  // Append the new submission
  names.push({
    name,
    codeEntered: code,
    timestamp: new Date().toISOString(),
    success: isValid,
  });

  // Save the updated names list
  fs.writeFileSync(dataFile, JSON.stringify(names, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: isValid,
      message: isValid ? "Code is correct!" : "Code is incorrect.",
    }),
  };
};
