---
layout: post
title:  "Multi Layer Perceptron"
date:   2017-08-27 11:00:30 +0530
categories: Deep-Learning
excerpt : Multi Layer Perceptron (implemented in python). Experimented on the MNIST data
---

<style TYPE="text/css">
table, th, td {
   border: 1px solid black;
}
table {
    border-collapse: collapse;
}
td, th {
  padding-left: 8px;
  padding-right: 8px;
}
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


CONTENTS

* TOC
{:toc}

Description of the Network
==========================


 |      Symbol       |        Dimension           | Description
 | :----------------: |  :--------------------------: |  :------------------------------- |
 |      $n_l$       |            1               |  Number of layers |
 |       $x$        |        ($n$, $1$)          |  Input Image Flattened |
 |    $a^{(l)}$     |     ($d_{(l)}$, $1$)       |  Activation in Hidden Layer $(l)$ |
 |    $\hat{y}$     |        ($c$, $1$)          |  Prediction of the Neural Net |
 |    $W^{(l)}$     | ($d_{(l)}$,$d_{(l-1)}$)   |  Weight of the connections layer $(l-1)$ to $(l)$ |
 |  $W_{ji}^{(l)}$  |           1                |  Weight of edge connecting $j^{th}$ neuron in layer $(l)$ to $i^{th}$ neuron in layer $(l-1)$ |
 |    $b^{(l)}$     |     ($d_{(l)}$, $1$)       |  Bias for neurons in layer $(l)$ |
 |       $f$        |            -               |  Activation Function |

<br>

Also, Note that 

$a^{(1)} = x$

$\hat{y} = a^{(n_l)}$

Forward-Propagation
===================

$$z^{(l+1)} = W^{(l)} \times a^{(l)} + b^{(l)}$$

$$a^{(l+1)} = f(z^{(l+1)})$$

Back-Propagation
================


For the Classification Task we choose cross entropy as the loss function
we want to minimize. The following is the cross entropy loss for a training example.

$$\begin{aligned}
J(W,b;x,y) &= - \displaystyle\sum_{i=1}^{c} y_i \log\hat{y}_i \\\end{aligned}$$

$$\text{where,}\hspace{0.1in} \hat{y}_i = \frac{e^{z^{(n_l)}_i}}{ \displaystyle\sum_{j=1}^{c} e^{z^{(n_l)}_j}}$$

* Let m is the number of training samples
* Also applying an $L_2$ regularization on the weights in the network 
The following the Loss function we would want to minimize.

$$\begin{aligned}
J(W,b)& = \Bigg [ \frac{1}{m} \displaystyle\sum_{i=1}^{m} J(W,b;x^{(i)},y^{(i)}) \Bigg ] 
+\frac{\lambda}{2} \displaystyle\sum_{l=1}^{n_l-1} \displaystyle\sum_{i=1}^{d_{(l-1)}} \displaystyle\sum_{j=1}^{d_{(l)}} (W_{ji}^{(l)})^{2}\end{aligned}$$



#### Gradient Descent Update

$$\begin{aligned}
W_{ji}^{(l)} &= W_{ji}^{(l)} - \alpha \frac{\partial}{\partial W_{ji}^{(l)}}{J(W,b)} \\
b_{i}^{(l)} &= b_{i}^{(l)} - \alpha \frac{\partial}{\partial b_{i}^{(l)}}{J(W,b)}\end{aligned}$$


### Back-Propagation Algorithm

-   Perform the forward pass

-   For the error at the output layer

    $$\begin{aligned}
    \delta^{(n_l)}_k &= \frac{\partial}{\partial z^{(n_l)}_k}{J(W,b;x,y)} \nonumber \\
    &= - \displaystyle\sum_{i=1}^{c} y_i ( 1_{k = i} - \frac{e^{z^{(n_l)}_k}}{ \displaystyle\sum_{j=1}^{c} e^{z^{(n_l)}_j}} ) \nonumber \\
    \delta^{(n_l)}_k &= - \displaystyle\sum_{i=1}^{c} y_i ( 1_{k = i} - \hat{y}_k ) \nonumber\end{aligned}$$

    <span>**The matrix equivalent of the same**</span> *(y is a one-hot
    encoded representation of the label)*

    $$ \delta^{(n_l)} = \hat{y} - y $$


-   For l = $n_l - 1$ to $2$ : 
    
    Set

    $$\delta^{(l)} = ((W^{(l)})^T\delta^{(l+1)}) \bullet f'(z^{(l)})$$

-   Compute the gradients

    $$\begin{aligned}
    \nabla_{W^{(l)}} J(W,b;x,y) &= \delta^{(l+1)} (a^{(l)})^T \\
    \nabla_{b^{(l)}} J(W,b;x,y) &= \delta^{(l+1)}\end{aligned}$$

<br>

#### Mini-Batch Back-Propagation ( with momentum based acceleration )


- For a mini-batch of size of m, we compute the average gradient form the batch and use that to update the model parameters.

  $$\begin{aligned}
    \nabla_{W^{(l)}} J(W,b) &= \frac{1}{m} \displaystyle\sum_{i=1}^{m} \nabla_{W^{(l)}} J(W,b;x_i,y_i) \\
    \nabla_{b^{(l)}} J(W,b) &= \frac{1}{m} \displaystyle\sum_{i=1}^{m} \nabla_{b^{(l)}} J(W,b;x_i,y_i) \\\end{aligned}$$

-   Parameter Update using Momentum based acceleration

    $$\begin{aligned}
    vW^{(l)} &= \gamma*vW^{(l)} + \alpha (\nabla_{W^{(l)}} J(W,b) + \lambda W^{(l)} )  \nonumber\\
    W^{(l)} &= W^{(l)} -vW^{(l)}  \\
    vb^{(l)} &= \gamma*vb^{(l)} + \alpha (\nabla_{b^{(l)}} J(W,b) + \lambda b^{(l)} ) \nonumber \\
    b^{(l)}  &= b^{(l)} - vb^{(l)} \end{aligned}$$

    Initially, $vW^{(l)}$ and $vb^{(l)}$ are zero matrices of the same size as $W^{(l)}$ and $b^{(l)}$ respectively.

MNIST Classification
====================

#### Data 

The input is an $28 \times 28$ image of a handwritten digit, the task is
to classify the image to recognize the digit. The MNIST data from
[Lecun’s page](http://yann.lecun.com/exdb/mnist/) is used for this task.
The training data contains $60000$ images and the test data has $10000$
images.

#### Preprocessing 

The flattened image to be feed into the network is standardized (normalized). Each
pixel is a feature and each feature is standardized by centralizing
(subtract the mean) and divided by the standard deviation. This was done
because when using ReLU activations in the MLP, the softmax exploded
into a NaN loss and hindered further training. However, the MLP which
used sigmoid activations could be trained by directly feeding the image
without the preprocessing.

#### Architecture 

A Multilayer Perceptron with 3 hidden layers. The input is a $784$
dimensional vector $x$, followed by $h_1$(1000), $h_2$(500), $h_3$(250)
and the output $y$ is a 10 dimensional vector, representing the
probability of image belonging to a particular class label. The
parameters of the network are initialized with a random gaussian with
mean 0 and standard deviation 0.08.

#### Training 

The SGD algorithm with momentum based acceleration is used for training.
The size of the minibatch is 64. The L2-regularization parameter
$\lambda = 0.005$ and the momentum parameter $\gamma = 0.8$.

Experiment
----------

In this section, the plots of the training progress of the Multilayer
perceptron using Sigmoid and ReLU activations are presented for
different learning rates (fixed and scheduled).

### Sigmoid Activation

The learning rates chosen are 0.001, 0.01, 0.05 and a scheduled learning
rate with initial value 0.2 and decayed by a factor of 0.85 every 250
iterations. The input to the network is standardized. Achieves a
test-accuracy of $90.1$%

![Accuracy on test data for sigmoid activation](/assets/MLP/plots/sig_1.png)

![Cross Entropy Loss on test data for sigmoid
activation](/assets/MLP/plots/sig_2.png)

The lower the learning rate, the slower is the convergence. A very high
learning rate, though rushes to the optimum at a rapid pace and has a
lot of fluctuations in the test loss. The learning rate scheduling works best,
initially moves rapidly (taking larger steps) and then lowers the
learning rate to steadily move to an optimum.

<span>**Training Loss vs Iterations for different Learning rates**</span>

 |  ![image](/assets/MLP/plots/sig_3.png)  | ![image](/assets/MLP/plots/sig_4.png) |
 |  ![image](/assets/MLP/plots/sig_5.png)  |  ![image](/assets/MLP/plots/sig_6.png) |

<br>

The training loss plots also indicate the rate of convergence is
dependent on the learning rate. The lower learning rate the convergence
is slower. The scheduled learning rate, has lesser fluctuation in
training loss as the training progresses and hence more stable.

### ReLU Activation

The learning rates chosen are 0.001, 0.01, 0.05 and a scheduled learning
rate with initial value 0.2 and decayed by a factor of 0.85 every 250
iterations. The input to the network is standardized. Achieves a
test-accuracy of $96.8$%

![Accuracy on test data for ReLU activation](/assets/MLP/plots/rel_1.png)

![Cross Entropy Loss on test data for ReLU activation](/assets/MLP/plots/rel_2.png)

The performance of ReLU activated network is better than that of
sigmoid, it achieves a higher accuracy and also has a lower test loss.
However, observe that the sigmoid activated MLP approximately reaches
close to the least loss it achieves in about $1000$ iterations whereas the
ReLU activated MLP takes approximately $2000$ iterations.

<span>**Training Loss vs Iterations for different Learning rates**</span>

  
  | ![image](/assets/MLP/plots/rel_3.png)  | ![image](/assets/MLP/plots/rel_4.png) |
  | ![image](/assets/MLP/plots/rel_5.png)  | ![image](/assets/MLP/plots/rel_6.png) |

<br>

The choice of the Learning rate affects the rate at which the network converges
and also affects the stability. With $\alpha = 0.001$ the improvement is
smooth, but takes a long time to converge, whereas $\alpha = 0.05$
reaches a low loss, but oscillates a lot. MLP with a scheduled learning
rate converges with lesser oscillations and also achieves a good
accuracy. Also compared to sigmoid activated MLP, the ReLU-MLP has lower
test loss.

### Sigmoid Activation (Data not standardized) 

Here the input to the MLP is not standardized and the raw flattened
image is feed to the network. The learning rates for which the
experiment is conducted is 0.001, 0.01, 0.05 and a scheduled learning
rate with initial value 0.2 and decayed by factor of 0.85 every 250
iterations. This model achieves a test-accuracy of $93.9$%

![Accuracy on test data for sigmoid activation (input not
standardized)](/assets/MLP/plots/un_sig_1.png)

![Cross Entropy Loss on test data for sigmoid activation (input not
standardized)](/assets/MLP/plots/un_sig_2.png)

We observe that in this case a very high $\alpha$ can lead to
divergence, since the image signal varies from 0 to 255, large changes
in weight can lead to large variations in activation, hence in the case
of $\alpha=0.05$ we observe that the loss is increasing. Thus, in most
cases it is a good idea to standardize (normalize) the data.

### Performance on a Test Sample

The top three predictions for the sampled test image made by the Sigmoid
Activated MLP and ReLU Activated MLP are presented. Both the networks
are trained with scheduled learning rate. The value in the table is "predicted_label (probability)"


| Image | Sigmoid | ReLU |
|:-----:|:-------:|:----:|
| ![image](/assets/MLP/plots/1.png) |  0 (0.975) | 0 (0.997) |
| ![image](/assets/MLP/plots/3.png) | 1 (0.913) | 1 (0.993) |
| ![image](/assets/MLP/plots/5.png) | 2 (0.905) | 2 (0.991)  |
| ![image](/assets/MLP/plots/7.png) | 3 (0.417) | 3 (0.724)  |
| ![image](/assets/MLP/plots/9.png) | 4 (0.813) | 4 (0.983)  |
| ![image](/assets/MLP/plots/11.png) | **6 (0.571)** | **6 (0.629)**  |
| ![image](/assets/MLP/plots/13.png) | 6 (0.600) | 6 (0.976)  |
| ![image](/assets/MLP/plots/15.png) | 7 (0.970) | 7 (0.999)  |
| ![image](/assets/MLP/plots/17.png) | 8 (0.796) | 8 (0.946)  |
| ![image](/assets/MLP/plots/19.png) | 9 (0.543) | 9 (0.631)  |

<br>

Conclusion
----------

-   The choice of Learning rate in MLP plays an important role in
    convergence.

-   Learning rate scheduling helps in achieving a stable convergence,
    without fluctuating the parameter values much at the later stages of
    the training, it reaches the optimum steadily.

-   ReLU activated MLP seems to perform better than the Sigmoid activated MLP. However, a MLP with layers having 
    ReLU and Sigmoid activation might give better results. (Will experiment with this soon)



Link to the code  
=================

Checkout the code @ [MLP-code](https://www.github.com/arjun-krishna/Multi-Layered-Perceptron)