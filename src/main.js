const core = require('@actions/core')
const { wait } = require('./wait')
const github = require('@actions/github')
const { Octokit } = require('@octokit/rest')
const fetch = require('node-fetch')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const gitHuboctokit = github.getOctokit(GITHUB_TOKEN)
async function run() {
  try {
    console.log('Hello George')

    console.log(github.context.repo)
    console.log(github.context.issue.number)
    getIssueBody()
    console.log('Finish script')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

async function addComment() {
  await gitHuboctokit.request(
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
  const result = await gitHuboctokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number
    }
  )
  const octokit = new Octokit()
  const { data_one } = await octokit.repos.getContent({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
  })
  for (const item of data_one) {
    console.log(item)
  }
  //   Gets issue data
  console.log(result.data)
}

module.exports = {
  run
}
