---
sidebar_position: 2
sidebar_label: ❓ How to Contribute
---

# 🤝 Contributing

As part of its vision to cultivate a growing and active qualitative blockchain development community, Capsule Corp Labs is committed to support Ternoa family in its quest for the innovation opportunities that exist within the Ternoa Blockchain ecosystem. 

Ternoa is interested in NFT use cases through the new Capsule concept invented by the Labs. But above all, Ternoa is open to any other field of innovation around blockchain. Applications will be judged on creativity, usefulness, quality and accuracy of the code.

**Do you like organizing ?**

- Link to duplicate issues, and suggest new issue labels, to keep things organized
- Go through open issues and suggest closing old ones
- Ask clarifying questions on recently opened issues to move the discussion forward

**Do you like to code?**

- Find an open issue to contribute
- Ask if you can help to write new features
- Automate project setup or dependencies (update and check new versions of plugins dependencies in the Ternoa Stack / SDK)
- Improve tooling and testing

**Do you like helping people ?**

- Look for topics about Ternoa on our Github or e.g., [Stack Overflow](https://stackoverflow.com/search?q=ternoa&s=daf726f7-208a-4529-8e07-893f3c4548fc), [Reddit](https://www.reddit.com/r/Ternoa_/) or [Polkahub](https://polkahub.org/projects)
- Create new discussion themes
- Answer questions on open issues
- Help moderate the discussion boards or conversation channels

**Do you like helping others code ?**

- Review code on other people’s submissions
- Write tutorials about how Ternoa SDK can be used
- Offer to mentor another contributor

You don’t just have to work on software projects !

While Ternoa often refers to blockchain or coding, **you can collaborate on just about anything**. There are ideas, usecases, and classes that needs to get developed as open source projects.

Even if you’re a software developer, working on this Ternoa documentation can help you get started in open source. It’s often less intimidating to work on projects that don’t involve code, and the process of collaboration will build your confidence and experience.


Nonetheless, pull requests, issues, discussions, and contributions from the community are widely encouraged.

Otherwise, Capsule Corp Labs holds the administrative position and final word on the content that is included.



## 📚 How to Contribute on Github

You can contribute to the Documentation on the [capsule-corp-ternoa/ternoa-doc](https://github.com/capsule-corp-ternoa/ternoa-doc) or to the [Ternoa SDK](https://github.com/capsule-corp-ternoa/ternoa-js) GitHub repository. 
Every Documentation page is a [MarkDown](https://guides.github.com/features/mastering-markdown/) file, which is an easy to learn syntax extension to plain text that makes creating links, rendering images, and nice-looking formatting simple.

### For non-developers

Each page has an "Edit this file" ✏️ button at the top right of the content.

If you're logged in, you'll be taken to the GitHub built-in text editor where you can make your edits directly on the file. 
When you've completed your changes, you can add any specific details on what was changed and commit to a new branch to create a new Pull Request to the repository. 

![image](https://user-images.githubusercontent.com/5689530/200411267-33fdac0e-74e1-42f0-b020-6e38dc48090f.png)

> 
> If you're committing changes on an existing branch that you already created, select the fist option and click on "Commit changes".
> 

![image](https://user-images.githubusercontent.com/5689530/201003021-d650026b-b3a4-4d8a-bea1-69e2f5ddbb24.png)


Remember that after clicking on "Propose Changes" or "Commit changes", you must also click on "Create Pull Request" on the next page :

![image](https://user-images.githubusercontent.com/5689530/200413223-fe0cf226-b638-485d-8ee2-f6e94f110555.png)

> 
> Please be careful to the **base** branch, we won't merge on main branch so you have to select the develop branch for example.
> 

![image](https://user-images.githubusercontent.com/5689530/200994196-295a0589-9faf-4ab4-8723-a4962a882d54.png)


**From there one of the Ternoa team member will review your changes, and either merge them or request changes with a comment.**


### For developers

To contribute to Ternoa code or documentation, you only need a GitHub account. You can commit updates and then submit a PR directly from the Github website as seen, or create a fork of the repo to your local environment and use your favorite tools to make changes. Always submit PRs compared to a base branch like `develop`.

**Create a fork**

First, create a fork of the Ternoa repo in your own account so that you can work with your own copy.

To create a fork using the website :

1. Log in to your Github account.
2. Browse to the [Ternoa Documentation](https://github.com/capsule-corp-ternoa/ternoa-doc) repo on GitHub.
3. Choose Fork in the top-right, then choose Create new fork.
4. For Owner, select your username.
5. For Repository name, we suggest keeping the name ternoa-doc, but you can use any name if you want.
6. Optional. To contribute you need only the main branch of the repo. To include all branches, unselect the checkbox for Copy the main branch only.
7. Click Create fork.

**Clone your fork**

Next, clone your fork of the repo to your local workspace.

To clone your fork to your local workspace :

1. Open the GitHub page for your fork of the repo, then click Sync fork.
2. Click Code, then click HTTPS and copy the web URL displayed.
3. Open a terminal session and navigate to your Ternoa folder, then run the following command, replacing the URL with the URL you copied from the Git page:
`git clone https://github.com/capsule-corp-ternoa/ternoa-doc.git`

The repo is automatically cloned into your Ternoa folder in your workspace. Create a branch of your fork with following command (or follow the [GitHub topic on branching](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository)) :

`git checkout -b your-branch-name`

Use the following command to set the [remote upstream repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork) :

`git remote add upstream https://github.com/capsule-corp-ternoa/ternoa-doc.git`

You now have a fork of the Ternoa Documentation repo set up in your local workspace. You can make changes to the files in the workspace, add commits, then push your changes to your fork of the repo to then create a Pull Request.



## 🪧 Guideline and Rules

There are a few basic ground-rules for Github contributors :

1. No `--force` **pushes** or modifying the Git history in any way.
2. Only use **non-master branches**.
3. Significant modifications, even by contributors, must be subject to a pull request to solicit feedback from other contributors.
4. Pull requests to solicit feedback are encouraged for any other non-trivial contribution but left to the discretion of the contributor.
5. Contributors should attempt to **adhere to the prevailing `MarkDown` style**, language, and layout.
6. Correct grammar should be used at all times. Pull requests with typos will not be merged until fixed.
7. Care should be taken to remain as objective and informative as possible. There should be no editorializing, and external bias should not be present.
