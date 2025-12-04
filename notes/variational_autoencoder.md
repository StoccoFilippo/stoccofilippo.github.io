---
layout: note
title: Variational Autoencoder (VAE)
---

Variational Autoencoders (VAEs) are generative models that learn probabilistic representations of data $x$ by mapping $x$ to a latent space $z$. Unlike traditional autoencoders, which map in a deterministic fashion (you can consider them as a simple function $f(x)\rightarrow z$ mapping data to a latent space), VAEs use a probabilistic encoder that learns a distribution over the latent space $z$.

## Architecture
VAEs learn $p(x)$ using two neural networks. i) The encoder takes a sample $x$ and maps it to a distribution $q(z\mid x)$ over latent space $z$ and ii) the decoder takes these latent variables and maps them back to a distribution in the original data space $p(x\mid z)$. 

>[!NOTE]
> This is somewhat similar to the reconstruction objective of sparse autoencoders, where the reconstruction objective is $\mathbb{E}_{q(z\mid x)}[\log p(x\mid z)]$. However, in VAEs we are not only interested in reconstructing the data but also in learning the distribution of the data $p(x)$. [Here](https://gboxo.github.io/assets/sae_enzymes.pdf) you can find more details about sparse autoencoders.

## Training Objective

VAEs are trained by maximizing the Evidence Lower Bound (ELBO):

$$\mathcal{L}(\theta) = \mathbb{E}_{q(z\mid x)}[\log p(x\mid z)] - \text{KL}(q(z\mid x) \mid \mid  p(z))$$

This objective has two components. The first term, $\mathbb{E}_{q(z\mid x)}[\log p(x\mid z)]$, is the reconstruction loss that measures how well the decoder reconstructs the original data. The second term is the KL divergence, which acts as a regularizer by pushing the learned posterior $q(z\mid x)$ towards the prior $p(z)$. When we maximize the ELBO, we're simultaneously encouraging the model to accurately reconstruct the data while keeping the learned posterior close to the prior distribution.

>[!IMPORTANT]
> In generative models we are interested in learning the distribution of the data $p(x)$ and then generating new samples from it. We might also be interested in calculating the likelihood of the observed data $p(x)$.
For a model with latent variables $z$ we can calculate the likelihood of the observed data $p(x)$ as:
$$ p(x) = \int p(x,z) dz = \int p(x\mid z) p(z) dz$$
where $p(z)$ is the prior distribution of the latent variables and $p(x\mid z)$ is the likelihood of the observed data given the latent variables.

## Example: Protein Sequence VAE

Let's see how this works in practice with protein sequences. Imagine we want to build a VAE that learns representations of proteins in a 2D latent space (condition far from reality, but easier to picture)

First, we need to represent the protein sequence numerically. We use one-hot encoding, where each protein sequence becomes a matrix of shape $L \times A$ where $L$ is the sequence length and $A$ is the vocabulary size (20 standard amino acids). For example, a protein with 100 amino acids would be represented as a $100 \times 20$ matrix.

The process flows like this: the one-hot encoded protein sequence passes through the encoder network, which outputs the parameters of $q(zx)$ (typically the mean and variance for a Gaussian distribution) in our 2D latent space. We then sample a point $z$ from this distribution. The decoder takes this latent representation and reconstructs the protein sequence, outputting a probability distribution over amino acids at each position. Finally, we compute the loss by comparing the reconstructed distribution with the original sequence.

Modern architectures have improved on this setup. Transformer-based models incorporate positional encoding to capture the order of amino acids in the sequence. Additionally, self-attention mechanisms allow the model to capture long-range dependencies between amino acids that may be distant in the sequence but functionally related, such as residues that interact when the protein folds into its 3D structure.

## The Intractability Problem of Generative Models: Evidence Lower Bound 

Generative models aim to learn the distribution of the data $p(x)$ and generate new samples from it, and calculate the likelihood of observed data $p(x)$. 

For models with latent variables $z$ the likelihood of observed data requires marginalizing over all possible latent states:

$$p(x) = \int p(x,z) \, dz = \int p(x\mid z) p(z) \, dz$$

where $p(z)$ is the prior distribution of latent variables, $p(x\mid z)$ is the likelihood of observed data given the latent variables.

>[!NOTE]
> This is simply Bayes rule. 

>[!IMPORTANT]
> This is intractable as the $p(x)=\int p(x \mid z)p(z)dz$ involves an integral over all possible latent variables $z$. In many cases, the latent space is very high-dimensional (e.g., millions of possible latent states), and the integral does not have a simple analytical solution. As a result, computing the exact likelihood requires solving this complex integral, which is often not feasible. The true posterior $p(z\mid x)$ is also intractable to compute as it involves both the likelihood $p(x\mid z)$ and the prior $p(z)$.


Variational Inference (VI) provides an elegant solution to this problem. Instead of trying to calculate the true posterior $p(z\mid x)$ directly, we approximate it with a simpler distribution $q(z\mid x)$ called the variational posterior (usually a simple Gaussian). The ELBO emerges from this approximation and provides a lower bound on the log-likelihood. When we maximize the ELBO, we're simultaneously minimizing the gap between the approximate posterior $q(z\mid x)$ and the true posterior $p(z\mid x)$ while also ensuring the model reconstructs the data well.

This approach allows us to optimize model parameters without directly computing the intractable posterior $p(z\mid x)$ or marginal likelihood $p(x)$. 

Imagine we have a protein and an ecoder that maps the protein to a 2D latent space. In this case the protein is passed through the encoder and the latent space is a 2D space where the protein is mapped. From this the protein is decoded back to the original space. The loss is computed as the difference between the original protein and the decoded protein. For example we can onehot encode the protein sequence in input. In this case the input will be a matrix of $L\times A$ where $L$ is the length of the protein and $A$ is the number of amino acids (our vocabulary). This matrix is then passed through the encoder and the latent space is a 2D space where the protein is mapped. From this the protein is decoded back to the original space. The loss is computed as the difference between the original protein and the decoded protein.

>[!NOTE]
>More recent architectures such as BERT-style models, we can include positional encoding to account for the order of the amino acids. This is necessary becasue transformers do not have an inherent understanding of the sequence order such as RNNS. Other strategies might use more complex things sich as self-attention mechanisms, that ensure long distance co dipendency signals extraction. 


### Aknowledments: 
shout out to the very well written notes from Michele Garibbo [Here](https://michele1993.github.io/assets/pdf/SGE_notes.pdf)
