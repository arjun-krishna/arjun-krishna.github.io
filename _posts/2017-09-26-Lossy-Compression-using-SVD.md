---
layout: post
comments: true
title:  "Lossy Compression using SVD"
date:   2017-09-26 11:00:30 +0530
categories: SVD
excerpt : Lossy compression of images using SVD.
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

.axis path, .axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;  /* Round any decimal pixels so it'll render nicely */
}

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

<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>

CONTENTS

* TOC
{:toc}

Singular Value Decomposition (SVD)
==================================

Let $\mathbf{M} = \mathbb{R}^{m \times n}$ , then there exists a factorization of $\mathbf{M}$ (called the singular decomposition of $\mathbf{M}$) which of the form : 
<center>
  $\mathbf{M} = \mathbf{U} \Sigma \mathbf{V}^T$
</center>
<br>
where, $\mathbf{U}$ is a $m \times m$ orthogonal matrix, $\Sigma$ is a $m \times n$ diagonal matrix with non-negative real numbers on the diagonal and $\mathbf{V}$ is a $n \times n$ orthogonal matrix.

The diagonal entries ($\sigma_i$) of $\Sigma$ are called the singular values of $\mathbf{M}$.

SVD has a lot of applications in statistics and signal processing. See the [wiki-page](https://en.wikipedia.org/wiki/Singular-value_decomposition) for SVD for more details and interpretation.

SVD used for compression of an image
======================================

The image is a matrix $\mathbf{M}$, of size $m \times n$, we can obtain the Singular Value Decomposition of $\mathbf{M}$ i.e we get $\mathbf{U}$, $\Sigma$, $\mathbf{V}$. Now we get $d = \min(m, n)$ singular values $\rightarrow$ [$\sigma_1$, $\sigma_2$, $\sigma_3$, ..., $\sigma_d$], such that $\sigma_1 \geq \sigma_2 \geq \cdots \geq \sigma_d$. We also have left-singular vector $u_i$ ($i^{th}$ column of $\mathbf{U}$) and right-singular vector $v_i$ ($i^{th}$ column of $\mathbf{V}$)  associated with $\sigma_i$ 


#### Eckart–Young-Mirsky theorem (Low-rank matrix approximation) 


For a matrix $\mathbf{M} \in \mathbb{R}^{m \times n}$, we have $\mathbf{M} = \mathbf{U} \Sigma \mathbf{V}^T$ from SVD of $\mathbf{M}$. The best $k$ rank approximation to $\mathbf{M}$ in the Frobenius norm is given by 
<center>
  $\mathbf{M}_k = \displaystyle\sum_{i=1}^{k} \sigma_i u_i v_i^T$
</center>

See this [wiki-article](https://en.wikipedia.org/wiki/Low-rank_approximation) for the proof.

#### Connecting this to Image Compression

We can do a lossy compression of the image, by doing a SVD of the image $\mathbf{M}$. Pick the top $k$ singular values (a parameter in the compression). We can reconstruct the approximation of the image, using   [$u_1$, $u_2$, ..., $u_k$], [$\sigma_1$, $\sigma_2$, ..., $\sigma_k$], [$v_1$, $v_2$, ..., $v_k$]  ( follows from the above discussed theorem). The total size of this representation of the image is $ m \times k + k + k \times n$.  

The achieved compression ratio is 
<center>$ CR = \frac{m \times n}{m \times k + k + k \times n} $</center>
<br>

The following section provides a visualization that illustrates the original image , reconstructed image and the absolute difference in pixel values between the two for different values of $k$.


SVD based compression Visualization 
====================================
<!-- VIS_1 -->
    
<center><svg id="graph_1"></svg></center>
<center>
  <table border="1" style="table-layout:fixed;" >
  <col width="200" />
  <col width="200" />
  <col width="200" />
  <tr>
    <th> Original Image </th>
    <th> Reconstructed Image </th>
    <th> Pixel Difference </th>
  </tr>
  <tr>
    <td> <img id="real_1" width="200" height="267" src="/assets/SVD_compress/vis/test.JPEG"/> </td>
    <td> <img id="recn_1" width="200" height="267" src="/assets/SVD_compress/vis/none.png" alt="Hover over the points in the above graph to view the Reconstructed Image."/> </td>
    <td> <img id="diff_1" width="200" height="267" src="/assets/SVD_compress/vis/none.png" alt="Hover over the points in the above graph to view the difference between Reconstructed Image and Original Image."/> </td>
  </tr>
  </table>
</center>

<script type="text/javascript" src="/assets/SVD_compress/vis/index.js"></script>

<!-- DONE_VIS1 -->

<!-- VIS2 -->
    
<center><svg id="graph_2"></svg></center>
<center>
  <table border="1" style="table-layout:fixed;"  >
  <col width="200" />
  <col width="200" />
  <col width="200" />
  <tr>
    <th> Original Image </th>
    <th> Reconstructed Image </th>
    <th> Pixel Difference </th>
  </tr>
  <tr>
    <td> <img id="real_2" width="200" height="267" src="/assets/SVD_compress/vis_bk/test.JPEG"/> </td>
    <td> <img id="recn_2" width="200" height="267" src="/assets/SVD_compress/vis_bk/none.png" alt="Hover over the points in the above graph to view the Reconstructed Image."/> </td>
    <td> <img id="diff_2" width="200" height="267" src="/assets/SVD_compress/vis_bk/none.png" alt="Hover over the points in the above graph to view the difference between Reconstructed Image and Original Image."/> </td>
  </tr>
  </table>
</center>
<br>
<script type="text/javascript" src="/assets/SVD_compress/vis_bk/index.js"></script>

<!-- DONE VIS2 -->

Code
=====
The code that generates the above visualization is available [here](https://github.com/arjun-krishna/Compression_using_SVD).


{% if page.comments %}
<div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://arjun-krishna.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
{% endif %}