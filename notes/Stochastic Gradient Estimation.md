The objective is to re-write the gradient of the "problematic" expectation as the expectation of the gradient. As result we can use a Monte Carlo Estimate of the expectation of the gradient (i.e. computing the gradient at different samples). 

let's consider that we need to optimize the following objective relative to the parameters $\theta$:$$J(\theta) = \mathbb{E}_{px}[f_\theta(x)]$$
>[!NOTE]
>Here $\mathbb{E}$ is the expectation, or expected value, represent the average outcome of a random variable over many trials. Intuitively, it represent the sum of the rewards multiplied by the probabilities. More regurosly is the summing of the product of each outcome's value and its corresponding probability. $$\mathbb{E}_{a\sim\pi_\theta}[r(a)]=\sum r(a)p_{\theta}(a)$$ 
>Here showed with a RL notation, the expectation $\mathbb{E}$ to get a reward $r$ given that action $a$(which is in turn a policy $\pi_\theta$), equals to the sum of the probability to have the reward and the possible actions. For discrete random variables expectation is calculated using $\sum$, while for continuous random variables, the epxectation si calculated with an integral $\int$ (value*probability density function)

to optimize this objective we can compute this gradient relative to the parameters we want to optimise $\theta$ : $$\nabla_\theta J= \nabla_\theta\mathbb{E}_{px}[f_\theta(x)]$$
We can expand and explicity write the expectation as $\mathbb{E}[f_\theta(x)]=\int p_X(x)f_\theta(x)dx$ and we get: $$\nabla_\theta J=\nabla_\theta\int\ p_X(x)f_\theta(x)dx$$
using the Leibniz integral rule we can rewrite this and the gradient can be moved inside the integral. 

>[!NOTE]
>**Leibniz Integral Rule**
>This rule tells me that given integral and a derivate, we can invert them being both linear functions. If $p(x; \theta)$ and $f(x; \theta)$ are differentiable with respect to $\theta$,  then:  $$\nabla_\theta J=\nabla_\theta \int  p_X(x)f_\theta(x) \, dx\quad\rightarrow\quad\nabla_\theta J=\int \nabla_\theta \, [p_X(x)f_\theta(x)] \, dx$$ whcih for the properties of the integrals we can rearrange like this: $$\int\nabla_\theta  [p_\theta(x) f_\theta(x)] \, dx = 
\int \nabla_\theta p_\theta(x) f_\theta(x) \, dx + \int p_\theta(x) \nabla_\theta f_\theta(x) \, dx$$

and given that in our case $p_X$ do not depend on the $\theta$ so the gradient will be zero and the resulting equation will be: $$\nabla_\theta J=\int p_X(x)\nabla_\theta f_\theta(x) \, dx$$
>[!IMPORTANT]
>**We have transformed the gradient of an expectation into the expectation of a gradient, which is great!** _Why_? because we can now sample gradients of $f_\theta$ to estimate this expectation though Monte Carlo estimates. 

The fact that $p_X$ do not depends on $\theta$ is a case-specific, but what happens when this underlying probability distribution is also dependent on $\theta$:
$$\nabla_\theta J = 
\int \nabla_\theta p_\theta(x) f_\theta(x) \, dx + \int p_\theta(x) \nabla_\theta f_\theta(x) \, dx$$
$\int \nabla_\theta p_\theta(x) f_\theta(x)$ can not be solved analytically, thus we can not re write it in terms of an expectation of a gradient from which we can sample. To solve this issue we have two **important approaches**: the "log-trick" and the "reparameterization-trick".
### 1.  The log-trick 

We can multiply the first (problematic) integral term by $\frac{p_\theta(x)}{p_\theta(x)}$ which results in: $$\int\nabla_\theta p_\theta(x)f_\theta(x) \, dx=\int\frac{p_\theta(x)}{p_\theta(x)}\nabla_\theta p_\theta(x)f_\theta(x) \, dx$$
we can now rewrite using the gradient of the logarithm function: $$=\int p_\theta(x)\nabla_\theta log(p_\theta(x))f_\theta(x) \, dx$$$$=\mathbb{E}_{p_\theta(x)}[\nabla_\theta log(p_\theta(x))f_\theta(x)]$$
now we can take care also of the second integral term, which in turn will result as: $$\int p_\theta(x)\nabla f_\theta(x)\; dx=\mathbb{E}_p{_{\theta(x)}[\nabla_\theta f_\theta(x)]}$$
We re-join the two integrals therms and express them as an expectation: 
$$\nabla_\theta \mathbb{E}_{p_\theta(x)}[f_\theta(x)]=\mathbb{E}_{p_\theta(x)}[\nabla_\theta\log(p_\theta(x)f_\theta(x)]+\mathbb{E}[\nabla_\theta f_\theta(x)]$$$$=\mathbb{E}_{p_\theta(x)}[\nabla_\theta\log(p_\theta(x)f_\theta(x)+\nabla_\theta f_\theta(x)]$$
In case $f(x)$ do not depend on $\theta$ the $\nabla_\theta f_\theta(x)$ simplifies to just $f(x)$. 

>[!NOTE]
>Brush up over some derivate properties:$$\frac{d}{dx}[log_a f(x)]= \frac{f'(x)}{\ln a f(x)}$$
>
>$$ \frac{\partial}{\partial \theta} log f(\theta) = \frac{1}{f(\theta)} \frac{\partial f}{\partial \theta}$$

>[!EXAMPLE]
>#### REINFORCE
Log trick has been used in REINFORCE, one of the first policy-oriented reinforcement learning. 
Let's consider that we would like to compute the gredients for traning. $$\nabla_\theta J = \nabla_\theta\mathbb{E}_{s\sim d^\pi}[V^\pi(s)]$$ When $d^\pi$ si stationary distribution of the Markov chain induced by $\pi_\theta$, $$=\nabla\mathbb{E}_{s\sim d^\pi}[\int_a\pi_\theta (a|s) Q^\pi(s,a)]$$$$=\nabla_\theta\int_sd^\pi(s)\int_a\pi_\theta(a|s)Q^\pi(s,a)$$
$\nabla_\theta d^\pi$ is intractable, since we don't know the distribution, and it's veru hard to know the effects on this distribution after the policy change. We can use the [policy gradient theorem](obsidian://open?vault=Obsidian%20Vault&file=MachineLearning%2FStochastic%20Policy%20Gradient) to re-write this complex gradient as:$$\approx\int_sd^\pi(s)\int_aQ^\pi(s,a)\nabla_\theta\pi_\theta(a|s)$$ We can apply the log trick and this allows us to write the expectation of the gradient also over the policy:$$\mathbb{E}_{s\sim d^\pi;a\sim\pi_\theta}[Q^\pi(s,a)\nabla_\theta\log(\pi_\theta(a|s))]$$
### 2.  Reparameterization-trick
In this case we reparametrize $x$ in such way that the stochasticity comes from a random separate variable $\epsilon$, independent of $\theta$, but in this way it becomes tractable. Let's start from the objective: $$\nabla_\theta J = \nabla_\theta\mathbb{E}_{p_\theta(x)}[f_\theta(x)]$$the reparatremization will result in: $$=\nabla_\theta\mathbb{E}_{p(\epsilon)}[f_\theta(g(\epsilon,\theta))]$$
in this way the underlying distribution $p()$, no longer depends on $\theta$ so that we can bring the gradient operator inside the expectation as we did previously:$$=\mathbb{E}_{p(\epsilon)}\nabla_\theta f_\theta(g(\epsilon,\theta))]$$
While the log-trick can be applied in most of the conditions ($p_\theta$ has to be continuous function of $\theta$), the "reperatremization-trick" requires the underlying distribution $p_\theta$ to be reparametrized into a distribution that we can sample form independent of $\theta$. From a more conceptual point of view: 
$$x\sim p_X(x)\rightarrow\epsilon=h(x),\qquad x=g(\epsilon)= h^{-1}(\epsilon)$$$$p_\epsilon(\epsilon)=p_X(g(\epsilon))|\frac{dg}{d\epsilon}|$$

>[!ATTENTION]
This is the essence of **reparameterization**: instead of sampling $x \sim p_\theta(x)$, sample $\epsilon \sim p(\epsilon)$, independent of $\theta$, and construct $x = g(\epsilon, \theta)$ deterministically. Say we would like to sample from the distribution $p_X(s)$. Instead of doing so, we basically define a transformation $\epsilon=h(x)$ that maps $x$ to a new variable $\epsilon$. The inverse transformation allows to generate $x$ given a function $h$ that given $x$ generates $\epsilon$. The construnction of $x = g(\epsilon,\theta)$ is deterministic, and can be any function of our desire, for example a gaussian $\mathcal{N}$.

>[!EXAMPLE]
>we would like to reparametrize a gaussian disribution $p_X(x)=\mathcal{N}(x|\mu,\sigma)$ to the variable $\epsilon=\frac{x-\mu}{\sigma}$ (unit Gaussian), which implies $x=\mu+\epsilon \sigma=g(\epsilon)$. We get $p_\epsilon(\epsilon)=p_X(\mu+\epsilon\sigma)\sigma$ since $\frac{dg}{d\epsilon}=\sigma$, we get that we are sampling form a gaussian:
>$$p_X(\mu+\epsilon\sigma)\sigma=\frac{\sigma}{\sqrt{2\pi\sigma^2}}\exp{\{-\frac{1}{2}\frac{(\mu+\epsilon\sigma-\mu)^2}{2\sigma^2}}\}$$Which simplifies to: $$p_\epsilon(\epsilon) = \mathcal{N}(\epsilon \mid 0, 1)$$
This suggests that we can sample $\epsilon \sim \mathcal{N}(0, 1)$ and then transform it back to $x$ using:$$x = \mu + \sigma \epsilon.$$
This is great because sampling $\epsilon$ from a standard normal distribution $\mathcal{N}(0, 1)$ is easy, and the underlying distribution no longer explicitly depends on $(\mu, \sigma)$ during sampling.



>[!IMPORTANT]
>Here we can see that we are applying a monte Carlo gradient estimation

in case of simple couple the softmax became a sigmoid


### Aknowledments: 
shout out to the very well written notes from Michele Garibbo [Here](https://michele1993.github.io/assets/pdf/SGE_notes.pdf)
