const core = require('@actions/core')
const { wait } = require('./wait')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const octokit = github.getOctokit(GITHUB_TOKEN)
async function run() {
  try {
    console.log('Hello George')

    console.log(github.context.repo)
    console.log(github.context.issue.number)
    console.log(getIssueBody())

    console.log('Finish script')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

async function addComment() {
  await octokit.request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number,
      body: 'Hi Tester, your comment was added.'
    }
  )
}

async function getIssueBody() {
  const result = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number
    }
  )
  //   Gets issue data
  console.log(result.data.json())
}

module.exports = {
  run
}
