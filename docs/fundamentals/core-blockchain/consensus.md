---
title: Ternoa Consensus
sidebar_label: "Consensus"
sidebar_position: 1
---

## What is Consensus in Blockchain?

Blockchain is a distributed decentralized network that provides immutability, privacy, security, and transparency. There is no central authority present to validate and verify the transactions, yet every transaction in the Blockchain is considered to be completely secured and verified. This is possible only because of the presence of the consensus protocol which is a core part of any Blockchain network. A consensus algorithm is a procedure through which all the peers of the Blockchain network reach a common agreement about the present state of the distributed ledger. In this way, consensus algorithms achieve reliability in the Blockchain network and establish trust between unknown peers in a distributed computing environment. Essentially, the consensus protocol makes sure that every new block that is added to the Blockchain is the one and only version of the truth that is agreed upon by all the nodes in the Blockchain. The Blockchain consensus protocol consists of some specific objectives such as coming to an agreement, collaboration, co-operation, equal rights to every node, and mandatory participation of each node in the consensus process. Thus, a consensus algorithm aims at finding a common agreement that is a win for the entire network

## Why do we need Consensus?

As mentioned above, consensus is a method for coming to agreement over a shared state. In order for the state of the
blockchain to continue to build and move forward, all nodes in the network must agree and come to
consensus. It is the way that the nodes in a decentralized network are able to stay synced with each
other. Without consensus for the decentralized network of nodes in a blockchain, there is no way to
ensure that the state one node believes is true will be shared by the other nodes. Consensus aims to
provide the _objective_ view of the state amid participants who each have their own _subjective_
views of the network. It is the process by which these nodes communicate and come to agreement, and
are able to build new blocks.

## Widely known consensus : PoW, PoS

### Proof of Work(PoW)

This consensus algorithm is used to select a miner for the next block generation. Bitcoin uses this PoW consensus algorithm. The central idea behind this algorithm is to solve a complex mathematical puzzle and easily give out a solution. This mathematical puzzle requires a lot of computational power and thus, the node who solves the puzzle as soon as possible gets to mine the next block. 

### Proof of Stake(PoS)

This is the most common alternative to PoW. Ethereum has shifted from PoW to PoS consensus. In this type of consensus algorithm, instead of investing in expensive hardware to solve a complex puzzle, validators invest in the coins of the system by locking up some of their coins as stake. After that, all the validators will start validating the blocks. Validators will validate blocks by placing a bet on it if they discover a block which they think can be added to the chain. Based on the actual blocks added in the Blockchain, all the validators get a reward proportionate to their bets and their stake increase accordingly. In the end, a validator is chosen to generate a new block based on their economic stake in the network. Thus, PoS encourages validators through an incentive mechanism to reach to an agreement.

## Ternoa's Consensus : NPoS

### Nominated Proof of Stake

In traditional PoS systems, block production participation is dependent on token holdings as opposed
to computational power. While PoS developers usually have a proponent for equitable participation in
a decentralized manner, most projects end up proposing some level of centralized operation, where
the number of validators with full participation rights is limited. These validators are often seen
to be the most wealthy, and, as a result, influence the PoS network as they are the most staked.
Usually, the number of candidates to maintain the network with the necessary knowledge (and
equipment) is limited; this can directly increase operational costs as well. Systems with a large
number of validators tend to form pools to decrease the variance of their revenue and profit from
economies of scale. These pools are often off-chain.

A way to alleviate this is to implement pool formation on-chain and allow token holders to vote
[with their stake] for validators to represent them.

Ternoa uses NPoS (Nominated Proof-of-Stake) as its mechanism for selecting the validator set. It
is designed with the roles of **validators** and **nominators**, to maximize chain security. Actors
who are interested in maintaining the network can run a validator node.

Validators assume the role of producing new blocks in [BABE](#block-production-babe), validating
blocks, and guaranteeing finality. Nominators can choose to back validators with
their stake. Nominators can approve candidates that they trust and back them with their tokens.

## Probabilistic vs. Provable Finality

A pure Nakamoto consensus blockchain that runs PoW is only able to achieve the notion of
_probabilistic finality_ and reach _eventual consensus_. Probabilistic finality means that under
some assumptions about the network and participants, if we see a few blocks building on a given
block, we can estimate the probability that it is final. Eventual consensus means that at some point
in the future, all nodes will agree on the truthfulness of one set of data. This eventual consensus
may take a long time and will not be able to be determined how long it will take ahead of time.
However, finality gadgets such as GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement)
or Ethereum's Casper FFG (the Friendly Finality Gadget) are designed to give stronger and quicker
guarantees on the finality of blocks - specifically, that they can never be reverted after some
process of Byzantine agreements has taken place. The notion of irreversible consensus is known as
_provable finality._

In the [GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf), it is phrased
in this way:

:::note

We say an oracle A in a protocol is _eventually consistent_ if it returns the same value to all
participants after some unspecified time.

:::

## Hybrid Consensus

There are two protocols we use when we talk about the consensus protocol of Ternoa, GRANDPA and
BABE (Blind Assignment for Blockchain Extension). We talk about both of these because Ternoa uses
what is known as _hybrid consensus_. Hybrid consensus splits up the finality gadget from the block
production mechanism.

This is a way of getting the benefits of probabilistic finality (the ability to always produce new
blocks) and provable finality (having a universal agreement on the canonical chain with no chance
for reversion) in Ternoa. It also avoids the corresponding drawbacks of each mechanism (the chance
of unknowingly following the wrong fork in probabilistic finality, and a chance for "stalling" - not
being able to produce new blocks - in provable finality). By combining these two mechanisms,
Ternoa allows for blocks to be rapidly produced, and the slower finality mechanism to run in a
separate process to finalize blocks without risking slower transaction processing or stalling.

Hybrid consensus has been proposed in the past. Notably, it was proposed (now defunct) as a step in
Ethereum's transition to proof of stake in [EIP 1011](http://eips.ethereum.org/EIPS/eip-1011), which
specified [Casper FFG](#casper-ffg).

## Block Production: BABE

BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between
the validator nodes and determines the authors of new blocks. BABE is comparable as an algorithm to
[Ouroboros Praos](https://eprint.iacr.org/2017/573.pdf), with some key differences in chain
selection rule and slot time adjustments. BABE assigns block production slots to validators
according to stake and using the Ternoa randomness cycle. The chain's runtime is required to provide the BABE
authority list and randomness to the host via a consensus message in the header of the first block
of each epoch.

BABE execution happens in sequential non-overlapping phases known as epochs. Each epoch is divided
into a predefined number of slots. All slots in each epoch are sequentially indexed starting from 0
(slot number). At the beginning of each epoch, the BABE node needs to run the
[Block-Production-Lottery algorithm](https://spec.polkadot.network/#algo-block-production-lottery)
to find out in which slots it should produce a block and gossip to the other block producers.

Validators participate in a lottery for every slot, which will inform whether or not they are the
block producer candidate for that slot. Slots are discrete units of time of approximately 6 seconds
in length. Because the mechanism of allocating slots to validators is based on a randomized design,
multiple validators could be candidates for the same slot. Other times, a slot could be empty,
resulting in inconsistent block time.

### Multiple Validators per Slot

When multiple validators are block producer candidates in a given slot, all will produce a block and
broadcast it to the network. At that point, it's a race. The validator whose block reaches most of
the network first wins. Depending on network topology and latency, both chains will continue to
build in some capacity, until finalization kicks in and amputates a fork.

### No Validators in Slot

When no validators have rolled low enough in the randomness lottery to qualify for block production,
a slot can remain seemingly blockless. We avoid this by running a secondary, round-robin style
validator selection algorithm in the background. The validators selected to produce blocks through
this algorithm always produce blocks, but these _secondary_ blocks are ignored if the same slot also
produces a primary block from a VRF-selected validator. Thus, a slot can have
either a _primary_ or a _secondary_ block, and no slots are ever skipped.

## Finality Gadget: GRANDPA

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is the finality gadget that is
implemented for the Ternoa Chain.

The Ternoa uses the GRANDPA Finality protocol to finalize blocks. Finality is obtained by
consecutive rounds of voting by the validator nodes. Validators execute GRANDPA finality process in
parallel to Block Production as an independent service.

It works in a partially synchronous network model as long as 2/3 of nodes are honest and can cope
with 1/5 Byzantine nodes in an asynchronous setting.

A notable distinction is that GRANDPA reaches agreements on chains rather than blocks, greatly
speeding up the finalization process, even after long-term network partitioning or other networking
failures.

In other words, as soon as more than 2/3 of validators attest to a chain containing a certain block,
all blocks leading up to that one are finalized at once.

# Resources

- [BABE paper](https://research.web3.foundation/en/latest/polkadot/block-production/Babe.html) - The
  academic description of the BABE protocol.
- [GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) - The academic
  description of the GRANDPA finality gadget. Contains formal proofs of the algorithm.
- [Rust implementation](https://github.com/paritytech/finality-grandpa) - The reference
  implementation and the accompanying [Substrate pallet](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs).
