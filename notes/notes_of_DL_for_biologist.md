---
layout: note
title: Notes on Deep Learning for Biologists
---

This aims to be a quick cheatsheet for biologists to understand the basics of deep learning. This is a polished and structured version of more personal notes that I have took during my studies and work. I will update it as I learn more. 

# Artificial Intelligence, Machine Learning, Deep Learning
These three terms are often used interchangeably, but they represent different levels of abstraction in the field of intelligent systems. Let's break down what each of them means, their relationship, and their role in the modern tech landscape.

We can simply define them as:
- Artificial Intelligence (AI): The broadest field that encompasses any technique that allows machines to mimic human-like cognitive functions (for example the first alogoritms to play chess)
- Machine Learning (ML): A subset of AI that focuses on building models that can learn from data and make predictions or decisions without being explicitly programmed (in this case, we have simple models like linear regression and more complex models like decision trees and random forests) 
- Deep Learning (DL): A subset of ML that uses neural networks with multiple layers to learn hierarchical representations of data (multiple layers allow the model to learn more complex patterns. This is currently the most applied and researched field in AI)

![alt text](images/ai_ml_dl.png)

## Deep Learning
Broadly, **deep learning** refers to a class of machine‑learning methods that use *deep neural networks* — models composed of many layers of interconnected units (neurons) — to learn representations of data automatically, often from raw or minimally processed inputs.  

In contrast to *traditional* machine learning, where features are hand‑crafted (e.g. domain‑specific engineered features) and then passed to classical algorithms (like SVMs, random forests, logistic regression), deep learning often removes the need for manual feature engineering. The network learns hierarchical features internally building internal and higher abstractions.  

The basic building blocks of a neural network are:
- *Neurons*: The basic unit of a neural network. They receive inputs, perform a computation, and produce an output. Nurons are units that perform simple linear operations on inputs: $x$, weights: $w$, bias: $b$, output: $y$. $$y = f(x, w, b)$$
- *Layers*: we can stuck multiple neurons together to form a layer, and multiple layers to form a network. The first layer is the input layer, the last layer is the output layer. The more layers we have, the deeper the network. The number of nerons at each layer is called the width of the network, capacity or model dimension. The total sum of the neurons in the network is called the number of parameters.
>![NOTE]
>GPT5 contains 10^11 parameters, while average human has 10^11 neurons, and average protein language model has 10^6 parameters. 
- *Activation functions*: are functions that are applied to the output of a neuron. They are essential to break the linearity of the network and allow it to learn complex patterns.The most famous ones are ReLU, sigmoid, tanh. $$y = ReLU(f(x, w, b))$$
- *Loss & optimization*: During training, a loss function measures discrepancy between predictions and ground truth, and backpropagation + optimization (e.g. SGD, Adam) updates weights to minimize loss.  
- *Overfitting vs underfitting*: With too much capacity (many parameters), network may “memorize” training data and fail to generalize — overfitting. With too little capacity, underfitting occurs. Regularization (dropout, weight decay), validation sets, early stopping are strategies to control this.  

Deep learning’s strength lies in learning complex patterns directly from raw data, but it requires large data, computational resources, and care with generalization.  



Acknowledgements: 
- Mathys Gapole for the idea about the neurons and the backpropagation visualization