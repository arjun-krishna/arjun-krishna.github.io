---
layout: post
title:  "Multi Arm Bandit"
date:   2017-02-14 11:00:30 +0530
categories: RL 
excerpt : Multi Arm Bandit Experiment
---

<style TYPE="text/css">
code.has-jax {font: inherit; font-size: 100%; background: inherit; border: inherit;}
</style>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'] // removed 'code' entry
    }
});
MathJax.Hub.Queue(function() {
    var all = MathJax.Hub.getAllJax(), i;
    for(i = 0; i < all.length; i += 1) {
        all[i].SourceElement().parentNode.className += ' has-jax';
    }
});
</script>
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

**Bandit Algorithms**

Let, $\mathbb{A}$ be the set of arms of the bandit.
Let $ K = | \mathbb{A} | $

$$ \forall a \in \mathbb{A} $$,
$$ q^*(a) $$ indicates the
expected reward on pulling arm $a$
and $q(a)$ indicates the algorithm’s estimate for $q^*(a)$

Let $n(a)$ indicate the number of times arm $a$ was pulled in a run.

{% highlight Py %}

# Bandit Algorithm Template

# Already set _q_[a] -> expected reward when we pick arm a

# -- Initialization --
# q[a] = 0 
# n[a] = 0

K = 10
steps = 1000

rewards = []

for step in range(1,steps+1) :

  a = pick_arm(q,n,step)   # a property of the algorithm
                           # based on q, n, step and 
                           # other additional parameters

  r = reward(_q_[a])

  n[a] = n[a] + 1

  q[a] = q[a] + (r - q[a])/n[a]

  rewards.append(r)


# -- epsilon greedy algorithm --

pick_arm (q, eps) : # parameter eps
  
  p = uniform_rand(0,1)
  if p > eps :
    a = argmax(q)
  else :
    a = rand_int(0,K-1)

  return a

# -- Softmax Algorithm -- 

pick_arm (q, T) : # parameter T : temperature
  
  S = softmax(q,T)   # S[i] = e^(q[i]/T) / sum(e^(q[j]/T))

  a = sample_from(S)

  return a

# -- UCB1 --

pick_arm (q, n, step) : # each arm must be sampled once already.
  
  confidence_bound = map( lambda (a) : 
                            (q[a] + sqrt(((2*log(step))/n[a])) ) ,
                          range(0,K-1))

  a = argmax(confidence_bound)

  return a

{% endhighlight %}

**Experiment Setup**

The three algorithms described are run for 1000 steps on a 10-arm
bandit, this is done on 2000 different bandit problem instances and the
results presented are the average of the performance of the algorithm on
these instances.

The later section shows the results for a 1000-arm bandit run for 100000
steps, but averaged over 200 instances of the problem so will have
larger variations in the graph.

**10-ARM BANDIT**


![image](/assets/MAB/plots/ar_greedy.png)

![image](/assets/MAB/plots/po_greedy.png)

* * * * *

As we increase the parameter eps the exploration increases, thus we see
that the algorithm tends to pick arms that yield better rewards. So
naturally eps = 0.1, seems to have the best result. But if we keep
increasing eps, we loose out on exploitation and hence the algorithm
would have a very high regret.


![image](/assets/MAB/plots/ar_softmax.png)

![image](/assets/MAB/plots/po_softmax.png)

* * * * *

The temperature parameter controls the amount of exploration, higher the
temperature more the exploration. So, in the graph T = 0.01 is close to
being a greedy algorithm ( always exploiting ) and T = 100 is close to a
random algorithm ( more of exploring ). So when we achieve a balance
between these extremes we achieve better results, like at T = 0.2 we get
the best results form the softmax algorithm.


![image](/assets/MAB/plots/ar_ucb.png)

![image](/assets/MAB/plots/po_ucb.png)

* * * * *

As we see from the experiment’s result, the UCB1 algorithm performs the
best. The UCB1 algorithm picks the arm that can potentially yield better
rewards, by picking the arm that has the maximum upper confidence bound,
which includes the uncertainty in the current estimate of $q^*$, whereas
the other two algorithms do not do this and pick the arm that has the
best current estimate or explore a lot more. Thus, UCB1 has a lower
regret than the other two algorithms.

**1000-ARM BANDIT**


![image](/assets/MAB/plots/1000_ar_eps.png)

![image](/assets/MAB/plots/1000_po_eps.png)

* * * * *

The averaging was done for only 200 instances of different bandit
problems as it was computationally time consuming. So the graphs
presented have a higher variance than the 10-arm bandit case, but the
trends remains the same, the greedy case ( eps = 0 ) the algorithm stops
after picking a sub-optimal arm, but when eps = 0.1 it performs a good
amount of exploration and achieves a lower regret.

![image](/assets/MAB/plots/1000_ar_soft.png)

![image](/assets/MAB/plots/1000_po_soft.png)

* * * * *

At T = 10, the softmax learning algorithm performs a lot more
exploration hence has a very high regret and the T = 0.01 case is
similar to the greedy algorithm in performance, at T = 0.2 the algorithm
achieves better results. Where T is the temperature parameter of the
softmax algorithm.


![image](/assets/MAB/plots/1000_ar_ucb.png)

![image](/assets/MAB/plots/1000_po_ucb.png)

* * * * *

As we see from the experiment’s result, the UCB1 algorithm performs the
best.
