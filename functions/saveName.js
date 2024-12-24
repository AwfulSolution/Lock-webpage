const { Octokit } = require("@octokit/rest");

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

  const message = isValid ? "Code is correct!" : "Code is incorrect.";

  // GitHub Repo Information
  const repoOwner = "your-github-username"; // Replace with your GitHub username
  const repoName = "your-repo-name"; // Replace with your repository name
  const filePath = "names.txt"; // File in the repo to store the names
  const branch = "main"; // Replace with your default branch name
  const githubToken = "your-personal-access-token"; // Replace with your GitHub PAT

  const octokit = new Octokit({ auth: githubToken });

  try {
    // Get the existing file content
    const { data: fileData } = await octokit.repos.getContent({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      ref: branch,
    });

    // Decode the existing file content
    const existingContent = Buffer.from(fileData.content, "base64").toString("utf-8");

    // Append the new name to the content
    const newContent = `${existingContent}\n${name}, ${code}, ${isValid ? "Success" : "Failure"} (${new Date().toISOString()})`;

    // Update the file on GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: `Add entry for ${name}`,
      content: Buffer.from(newContent).toString("base64"),
      sha: fileData.sha, // Required to update an existing file
      branch,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: isValid,
        message,
      }),
    };
  } catch (error) {
    if (error.status === 404) {
      // If the file doesn't exist, create it
      const initialContent = `${name}, ${code}, ${isValid ? "Success" : "Failure"} (${new Date().toISOString()})`;

      await octokit.repos.createOrUpdateFileContents({
        owner: repoOwner,
        repo: repoName,
        path: filePath,
        message: "Create names.txt",
        content: Buffer.from(initialContent).toString("base64"),
        branch,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: isValid,
          message,
        }),
      };
    }

    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
