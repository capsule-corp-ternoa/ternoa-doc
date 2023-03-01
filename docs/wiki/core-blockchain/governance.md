---
title: Ternoa Governance
sidebar_label: "Governance"
sidebar_position: 4
---

## What is Governance? ##

In plain terms, governance is the management or structure a participant in a system agrees to when entering into that system. Governance is not only the rules that a user has to follow but also the punishments for not following the rules.

Governance tends to fall into two different categories: direct and representative. Direct governance is like a democracy, where users determine decisions and actions with no intermediary. Representative governance systems have users create representatives that submit votes on their behalf instead.

For blockchain systems, governance is mostly how the blockchain ecosystem decides on which improvements to enact. Users of the blockchain ecosystem create proposals, which then receive votes from the rest of the community based on the participation rules created.

# Why Do Blockchains Rely on Governance?

The main reason why blockchains need governance is the same reason any software or computer system does: they need rules to function.

When developers create code, they are defining the rules that the system uses to produce its outcomes. Without any rules to decide what happens when users enter an input, the system will not work. This limitation is why you can do math in a calculator app on your phone, but can't text message with that app. The calculator app doesn't have the rules programmed to handle texting.

Blockchain systems are no different. For the ecosystem to work, rules have to be created by developers on the blockchain. As the developers create these rules by making code for the blockchain, they set the features and functions of the blockchain. The changes you see between different blockchains represent how those developers plan to solve or improve on other systems that came before them.

However, there's one key feature of a blockchain that other computer systems don't have to worry about: decentralization.

Users of blockchain systems expect there to be some aspect of decentralization, where the users of the system also help determine the fate of the system without being overruled by the creators of the system. So, these users expect there to be some way for them to participate in figuring out what direction the ecosystem will go.

# Ternoa's Governance : On-chain

On-chain governance refers to blockchain governance that takes place on the blockchain. This type of governance involves the voting on and implementation of changes to the blockchain protocol. How this exactly works with Ternoa can be found below. 

# Mechanism 

To make any changes to the network, the idea is to compose active token(CAPS) holders and the council together to administrate a network upgrade decision. No matter whether the proposal is proposed by the public (token holders) or the council, it finally will have to go through a referendum to let all holders, weighted by stake, make the decision.

## Council ##

To represent passive stakeholders, Ternoa follows the idea of a "council" by Polkadot. The council is an on-chain entity comprising several actors, each represented as an on-chain account. On Ternoa, the council currently consists of 8 members.

Along with controlling the treasury, the council is called upon primarily for three tasks of governance: proposing sensible referenda, cancelling uncontroversially dangerous or malicious referenda, and electing the technical committee.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time.

Council motions which pass with a 3/5 (60%) super-majority - but without reaching unanimous support - will move to a public referendum under a neutral, majority-carries voting scheme. In the case that all members of the council vote in favor of a motion, the vote is considered unanimous and becomes a referendum with negative adaptive quorum biasing.


# Referenda 

Referenda are simple, inclusive, stake-based voting schemes. Each referendum has a specific proposal associated with it that takes the form of a privileged function call in the runtime (that includes the most powerful call: set_code, which can switch out the entire code of the runtime, achieving what would otherwise require a "hard fork").

Referenda are discrete events, have a fixed period where voting happens, and then are tallied and the function call is made if the vote is approved. Referenda are always binary; your only options in voting are "aye", "nay", or abstaining entirely.

Referenda can be started in one of several ways:

- Publicly submitted proposals;
- Proposals submitted by the council, either through a majority or unanimously;
- Proposals submitted as part of the enactment of a prior referendum;
- Emergency proposals submitted by the Technical Committee and approved by the Council.
All referenda have an enactment delay associated with them. This is the period between the referendum ending and, assuming the proposal was approved, the changes being enacted.

Referenda is considered baked if it is closed and tallied. Again, assuming the proposal was approved, it would be scheduled for enactment. Referenda is considered unbaked if it is pending an outcome, i.e. being voted on.

For the first two ways that a referendum is launched, this is a fixed time of 28 days. For the third type, it can be set as desired. Emergency proposals deal with major problems with the network that need to be "fast-tracked". These will have a shorter enactment time.

## Proposing a Referendum ##

## Public Referenda ##

Anyone can propose a referendum by depositing the minimum amount of tokens for a certain period (number of blocks). If someone agrees with the proposal, they may deposit the same amount of tokens to support it - this action is called endorsing. The proposal with the highest amount of bonded support will be selected to be a referendum in the next voting cycle.

Note that this may be different from the absolute number of endorsements; for instance, three accounts bonding 20 CAPS each would "outweigh" ten accounts bonding a single CAPS each

The bonded tokens will be released once the proposal is tabled (that is, brought to a vote).

There can be a maximum of 100 public proposals in the proposal queue.

## Council Referenda ##

** Unanimous Council ** - When all members of the council agree on a proposal, it can be moved to a referendum. This referendum will have a negative turnout bias (that is, the smaller the amount of stake voting, the smaller the amount necessary for it to pass).

** Majority Council **- When agreement from only a simple majority of council members occurs, the referendum can also be voted upon, but it will be majority-carries (51% wins).

- There can only be one active referendum at any given time, except when there is also an emergency referendum in progress.

## Voting Timetable

Every 28 days, a new referendum will come up for a vote, assuming there is at least one proposal in one of the queues. There is a queue for Council-approved proposals and a queue for publicly submitted proposals. The referendum to be voted upon alternates between the top proposal in the two queues.

The "top" proposal is determined by the amount of stake bonded behind it. If the given queue whose turn it is to create a referendum that has no proposals (is empty), and proposals are waiting in the other queue, the top proposal in the other queue will become a referendum.

Multiple referenda cannot be voted upon in the same period, excluding emergency referenda. An emergency referendum occurring at the same time as a regular referendum (either public- or council-proposed) is the only time that multiple referenda will be able to be voted on at once.

## Voting on a Referendum

To vote, a voter generally must lock their tokens up for at least the enactment delay period beyond the end of the referendum. This is in order to ensure that some minimal economic buy-in to the result is needed and to dissuade vote selling.

It is possible to vote without locking at all, but your vote is worth a small fraction of a normal vote, given your stake. At the same time, holding only a small amount of tokens does not mean that the holder cannot influence the referendum result, thanks to time-locking. 

Example:

- Peter: Votes No with 10 CAPS for a 128 week lock period => 10 x 6 = 60 Votes

- Logan: Votes Yes with 20 CAPS for a 4 week lock period => 20 x 1 = 20 Votes

- Kevin: Votes Yes with 15 CAPS for a 8 week lock period => 15 x 2 = 30 Votes

Even though combined both Logan and Kevin vote with more CAPS than Peter, the lock period for both of them is less than Peter, leading to their voting power counting as less.
